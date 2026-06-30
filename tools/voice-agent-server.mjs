import { createHmac, createHash, randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { URL, URLSearchParams } from 'node:url';

const rootDir = process.cwd();

const loadEnvFile = (fileName) => {
  const filePath = `${rootDir}/${fileName}`;
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (!process.env[key]) {
      process.env[key] = rest.join('=').trim();
    }
  }
};

loadEnvFile('.env.local');
loadEnvFile('.env');

const host = process.env.VOICE_AGENT_HOST || '127.0.0.1';
const port = Number(process.env.VOICE_AGENT_PORT || 8787);
const publicUrl = (process.env.VOICE_AGENT_PUBLIC_URL || process.env.TWILIO_WEBHOOK_BASE_URL || `http://${host}:${port}`).replace(/\/+$/, '');
const publicWsUrl = publicUrl.replace(/^http:/, 'ws:').replace(/^https:/, 'wss:');
const realtimeModel = process.env.OPENAI_REALTIME_MODEL || 'gpt-4o-realtime-preview';
const allowedLegalBasis = new Set(['inbound_request', 'existing_customer', 'consent', 'manual_approved_business_basis']);

const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== '';
const twilioConfigured = () => hasValue(process.env.TWILIO_ACCOUNT_SID) && hasValue(process.env.TWILIO_AUTH_TOKEN) && hasValue(process.env.TWILIO_PHONE_NUMBER);
const openaiConfigured = () => hasValue(process.env.OPENAI_API_KEY);

const readBody = (request) => new Promise((resolve, reject) => {
  const chunks = [];
  request.on('data', (chunk) => chunks.push(chunk));
  request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  request.on('error', reject);
});

const sendJson = (response, status, payload) => {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
};

const sendXml = (response, status, xml) => {
  response.writeHead(status, { 'Content-Type': 'text/xml; charset=utf-8' });
  response.end(xml);
};

const parsePayload = async (request) => {
  const raw = await readBody(request);
  const contentType = request.headers['content-type'] || '';
  if (contentType.includes('application/json')) {
    return { raw, data: raw ? JSON.parse(raw) : {} };
  }
  const params = new URLSearchParams(raw);
  return { raw, data: Object.fromEntries(params.entries()) };
};

const xmlEscape = (value) => String(value || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const isLocalRequest = (request) => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(request.socket.remoteAddress);

const isAuthorized = (request) => {
  const secret = process.env.CITALINK_SERVICE_SECRET;
  if (!hasValue(secret)) return isLocalRequest(request);
  return request.headers['x-citalink-service-secret'] === secret;
};

const businessHoursOk = (date = new Date()) => {
  const day = date.getDay();
  const hour = date.getHours();
  if (day === 0 || day === 6) return false;
  return (hour >= 10 && hour < 14) || (hour >= 16 && hour < 18);
};

const validateCallRequest = (data) => {
  const phone = String(data.to || '').trim();
  const legalBasis = String(data.legalBasis || '').trim();
  const objective = String(data.objective || '').trim();

  if (!phone) return { ok: false, status: 422, error: 'to es obligatorio.' };
  if (!/^\+?[1-9]\d{7,14}$/.test(phone.replace(/\s+/g, ''))) {
    return { ok: false, status: 422, error: 'to debe ser un telefono E.164 o convertible.' };
  }
  if (!allowedLegalBasis.has(legalBasis)) {
    return { ok: false, status: 422, error: 'legalBasis no permitido.' };
  }
  if (!objective) return { ok: false, status: 422, error: 'objective es obligatorio.' };
  if (data.doNotContact === true || data.doNotContact === 'true') {
    return { ok: false, status: 409, error: 'Contacto bloqueado por doNotContact.' };
  }

  return { ok: true };
};

const twilioSignatureUrl = (requestUrl) => {
  const incoming = new URL(requestUrl, publicUrl);
  return `${publicUrl}${incoming.pathname}${incoming.search}`;
};

const validateTwilioSignature = (request, params) => {
  if (process.env.TWILIO_SIGNATURE_DISABLED === 'true') return true;
  if (!hasValue(process.env.TWILIO_AUTH_TOKEN)) return true;

  const signature = request.headers['x-twilio-signature'];
  if (!signature) return false;

  const url = twilioSignatureUrl(request.url);
  const sortedKeys = Object.keys(params).sort();
  const body = sortedKeys.reduce((acc, key) => `${acc}${key}${params[key]}`, url);
  const expected = createHmac('sha1', process.env.TWILIO_AUTH_TOKEN).update(body).digest('base64');
  return expected === signature;
};

const createTwilioCall = async ({ to, callSessionId, contactName, objective }) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  const twimlUrl = `${publicUrl}/twilio/voice?callSessionId=${encodeURIComponent(callSessionId)}&contactName=${encodeURIComponent(contactName || '')}&objective=${encodeURIComponent(objective || '')}`;
  const statusCallback = `${publicUrl}/twilio/status`;

  const body = new URLSearchParams({
    To: to,
    From: from,
    Url: twimlUrl,
    Method: 'POST',
    StatusCallback: statusCallback,
    StatusCallbackMethod: 'POST',
    StatusCallbackEvent: 'initiated ringing answered completed',
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || `Twilio call failed with ${response.status}`);
  }

  return payload;
};

const handleCreateCall = async (request, response) => {
  if (!isAuthorized(request)) {
    return sendJson(response, 401, { ok: false, error: 'No autorizado.' });
  }

  let data;
  try {
    ({ data } = await parsePayload(request));
  } catch (error) {
    return sendJson(response, 400, { ok: false, error: 'Payload invalido.' });
  }

  const validation = validateCallRequest(data);
  if (!validation.ok) {
    return sendJson(response, validation.status, { ok: false, error: validation.error });
  }

  const dryRun = data.dryRun === true || data.dryRun === 'true' || !twilioConfigured();
  if (!dryRun && !businessHoursOk()) {
    return sendJson(response, 409, { ok: false, error: 'Fuera de horario comercial permitido.' });
  }

  const callSessionId = data.callSessionId || `call_${Date.now()}_${randomUUID().slice(0, 8)}`;
  if (dryRun) {
    return sendJson(response, 200, {
      ok: true,
      dryRun: true,
      callSessionId,
      status: 'queued_dry_run',
      twilioConfigured: twilioConfigured(),
      openaiConfigured: openaiConfigured(),
    });
  }

  try {
    const twilioCall = await createTwilioCall({
      to: data.to,
      callSessionId,
      contactName: data.contactName,
      objective: data.objective,
    });
    return sendJson(response, 200, {
      ok: true,
      dryRun: false,
      callSessionId,
      twilioCallSid: twilioCall.sid,
      status: twilioCall.status,
    });
  } catch (error) {
    return sendJson(response, 502, { ok: false, error: error.message || String(error) });
  }
};

const twimlForCall = (requestUrl) => {
  const url = new URL(requestUrl, publicUrl);
  const callSessionId = url.searchParams.get('callSessionId') || `call_${Date.now()}`;
  const contactName = url.searchParams.get('contactName') || '';
  const objective = url.searchParams.get('objective') || 'Cualificar lead y agendar una cita si hay interes.';

  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="${xmlEscape(`${publicWsUrl}/twilio/media`)}">
      <Parameter name="callSessionId" value="${xmlEscape(callSessionId)}" />
      <Parameter name="contactName" value="${xmlEscape(contactName)}" />
      <Parameter name="objective" value="${xmlEscape(objective)}" />
    </Stream>
  </Connect>
</Response>`;
};

const handleTwilioVoice = async (request, response) => {
  const { data } = request.method === 'POST' ? await parsePayload(request) : { data: {} };
  if (!validateTwilioSignature(request, data)) {
    return sendXml(response, 403, '<Response><Reject /></Response>');
  }
  return sendXml(response, 200, twimlForCall(request.url));
};

const handleTwilioStatus = async (request, response) => {
  const { data } = await parsePayload(request);
  if (!validateTwilioSignature(request, data)) {
    return sendJson(response, 403, { ok: false, error: 'Firma Twilio invalida.' });
  }
  return sendJson(response, 200, {
    ok: true,
    callSid: data.CallSid,
    callStatus: data.CallStatus,
  });
};

const sendWsText = (socket, payload) => {
  const text = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const data = Buffer.from(text);
  let header;

  if (data.length < 126) {
    header = Buffer.from([0x81, data.length]);
  } else if (data.length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(data.length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(data.length), 2);
  }

  socket.write(Buffer.concat([header, data]));
};

const attachWsParser = (socket, onText) => {
  let buffer = Buffer.alloc(0);
  socket.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);

    while (buffer.length >= 2) {
      const first = buffer[0];
      const second = buffer[1];
      const opcode = first & 0x0f;
      const masked = (second & 0x80) !== 0;
      let length = second & 0x7f;
      let offset = 2;

      if (length === 126) {
        if (buffer.length < offset + 2) return;
        length = buffer.readUInt16BE(offset);
        offset += 2;
      } else if (length === 127) {
        if (buffer.length < offset + 8) return;
        length = Number(buffer.readBigUInt64BE(offset));
        offset += 8;
      }

      const maskOffset = offset;
      if (masked) offset += 4;
      if (buffer.length < offset + length) return;

      let payload = buffer.subarray(offset, offset + length);
      if (masked) {
        const mask = buffer.subarray(maskOffset, maskOffset + 4);
        payload = Buffer.from(payload.map((byte, index) => byte ^ mask[index % 4]));
      }

      buffer = buffer.subarray(offset + length);
      if (opcode === 0x8) {
        socket.end();
        return;
      }
      if (opcode === 0x9) {
        socket.write(Buffer.from([0x8a, 0x00]));
        continue;
      }
      if (opcode === 0x1) {
        onText(payload.toString('utf8'));
      }
    }
  });
};

const connectRealtime = ({ twilioSocket, getStreamSid, contactName, objective }) => {
  if (!openaiConfigured()) return null;

  const ws = new WebSocket(`wss://api.openai.com/v1/realtime?model=${encodeURIComponent(realtimeModel)}`, [], {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'OpenAI-Beta': 'realtime=v1',
    },
  });

  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({
      type: 'session.update',
      session: {
        modalities: ['audio', 'text'],
        voice: 'alloy',
        input_audio_format: 'g711_ulaw',
        output_audio_format: 'g711_ulaw',
        turn_detection: { type: 'server_vad' },
        instructions: [
          'Eres el asistente telefonico virtual de CitaLink para captacion B2B.',
          'Identificate como asistente virtual al principio de la llamada.',
          'Objetivo: ' + objective,
          contactName ? 'Contacto: ' + contactName : '',
          'No prometas resultados garantizados.',
          'Si la persona pide no recibir llamadas, confirma la baja y termina.',
          'Si hay interes, intenta acordar una reunion breve y pide email si falta.',
        ].filter(Boolean).join('\n'),
      },
    }));
    ws.send(JSON.stringify({
      type: 'response.create',
      response: {
        modalities: ['audio', 'text'],
        instructions: 'Saluda, presentate como asistente virtual de CitaLink y pregunta si puede hablar un momento.',
      },
    }));
  });

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'response.audio.delta' && data.delta && getStreamSid()) {
      sendWsText(twilioSocket, {
        event: 'media',
        streamSid: getStreamSid(),
        media: { payload: data.delta },
      });
    }
    if (data.type === 'error') {
      sendWsText(twilioSocket, {
        event: 'mark',
        streamSid: getStreamSid(),
        mark: { name: 'openai_error' },
      });
    }
  });

  ws.addEventListener('error', () => {
    sendWsText(twilioSocket, {
      event: 'mark',
      streamSid: getStreamSid(),
      mark: { name: 'openai_connection_error' },
    });
  });

  return ws;
};

const handleMediaSocket = (request, socket) => {
  const accept = createHash('sha1')
    .update(`${request.headers['sec-websocket-key']}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`)
    .digest('base64');
  socket.write([
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${accept}`,
    '',
    '',
  ].join('\r\n'));

  let streamSid = '';
  let realtimeSocket = null;

  attachWsParser(socket, (text) => {
    const message = JSON.parse(text);
    if (message.event === 'start') {
      streamSid = message.start?.streamSid || '';
      const params = message.start?.customParameters || {};
      realtimeSocket = connectRealtime({
        twilioSocket: socket,
        getStreamSid: () => streamSid,
        contactName: params.contactName || '',
        objective: params.objective || 'Cualificar lead y agendar cita.',
      });
      return;
    }

    if (message.event === 'media' && realtimeSocket?.readyState === WebSocket.OPEN) {
      realtimeSocket.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: message.media?.payload || '',
      }));
      return;
    }

    if (message.event === 'stop') {
      realtimeSocket?.close();
      socket.end();
    }
  });

  socket.on('close', () => realtimeSocket?.close());
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);

  try {
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, {
        ok: true,
        service: 'citalink-voice-agent',
        publicUrl,
        mediaStreamUrl: `${publicWsUrl}/twilio/media`,
        twilioConfigured: twilioConfigured(),
        openaiConfigured: openaiConfigured(),
        signatureValidation: process.env.TWILIO_SIGNATURE_DISABLED === 'true' ? 'disabled' : 'enabled',
      });
    }

    if (request.method === 'POST' && url.pathname === '/api/citalink/voice/calls') {
      return handleCreateCall(request, response);
    }

    if ((request.method === 'POST' || request.method === 'GET') && url.pathname === '/twilio/voice') {
      return handleTwilioVoice(request, response);
    }

    if (request.method === 'POST' && url.pathname === '/twilio/status') {
      return handleTwilioStatus(request, response);
    }

    return sendJson(response, 404, { ok: false, error: 'Not found.' });
  } catch (error) {
    return sendJson(response, 500, { ok: false, error: error.message || String(error) });
  }
});

server.on('upgrade', (request, socket) => {
  const url = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);
  if (url.pathname !== '/twilio/media') {
    socket.end('HTTP/1.1 404 Not Found\r\n\r\n');
    return;
  }
  handleMediaSocket(request, socket);
});

server.listen(port, host, () => {
  console.log(`CitaLink voice agent listening on http://${host}:${port}`);
});
