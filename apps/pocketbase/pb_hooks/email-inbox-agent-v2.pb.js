/// <reference path="../pb_data/types.d.ts" />

const inboundValue = (value) => (value === undefined || value === null ? "" : String(value).trim());

const inboundRead = (obj, key) => {
  if (!obj) return undefined;
  if (obj[key] !== undefined) return obj[key];
  if (typeof obj.get === "function") return obj.get(key);
  return undefined;
};

const inboundPick = (body, keys) => {
  for (const key of keys) {
    const value = inboundRead(body, key);
    if (inboundValue(value)) return inboundValue(value);
  }
  return "";
};

const inboundIntent = (subject, body) => {
  const text = `${subject} ${body}`.toLowerCase();
  if (text.includes("baja") || text.includes("no contactar") || text.includes("unsubscribe")) {
    return {
      intent: "baja",
      status: "blocked",
      summary: "El contacto pide baja o no ser contactado.",
      nextStep: "Registrar baja y bloquear campanas.",
      requiresApproval: false,
    };
  }
  if (text.includes("precio") || text.includes("coste") || text.includes("tarifa") || text.includes("presupuesto")) {
    return {
      intent: "precio",
      status: "review",
      summary: "El contacto pregunta por precios o condiciones comerciales.",
      nextStep: "Revisar borrador y responder con propuesta de demo.",
      requiresApproval: true,
    };
  }
  if (text.includes("demo") || text.includes("reunion") || text.includes("llamada")) {
    return {
      intent: "demo",
      status: "review",
      summary: "El contacto muestra intencion de agendar una demo o llamada.",
      nextStep: "Proponer dos franjas de reunion.",
      requiresApproval: true,
    };
  }
  if (text.includes("soporte") || text.includes("problema") || text.includes("incidencia")) {
    return {
      intent: "soporte",
      status: "review",
      summary: "El contacto parece pedir soporte o reportar una incidencia.",
      nextStep: "Derivar a respuesta humana.",
      requiresApproval: true,
    };
  }
  if (text.includes("viagra") || text.includes("casino") || text.includes("crypto")) {
    return {
      intent: "spam",
      status: "blocked",
      summary: "El correo parece spam.",
      nextStep: "Ignorar y no contactar.",
      requiresApproval: false,
    };
  }
  return {
    intent: "otro",
    status: "review",
    summary: "Correo entrante pendiente de revision humana.",
    nextStep: "Revisar contexto antes de responder.",
    requiresApproval: true,
  };
};

const inboundSaveRecord = (collectionName, data) => {
  const collection = $app.findCollectionByNameOrId(collectionName);
  const record = new Record(collection, data);
  $app.save(record);
  return record;
};

const inboundHeader = (e, requestInfo, key) => {
  try {
    if (e.request && e.request.header && typeof e.request.header.get === "function") {
      const value = e.request.header.get(key);
      if (inboundValue(value)) return value;
    }
  } catch (error) {
    // Fall back to requestInfo headers below.
  }
  return inboundRead(requestInfo.headers, key);
};

routerAdd("GET", "/api/citalink/email/inbound/health", (e) => {
  const requestInfo = e.requestInfo();
  return e.json(200, {
    ok: true,
    hasNativeSecret: Boolean(inboundHeader(e, requestInfo, "x-citalink-webhook-secret")),
    hasInfoSecret: Boolean(
      inboundRead(requestInfo.headers, "x-citalink-webhook-secret") ||
      inboundRead(requestInfo.headers, "x_citalink_webhook_secret")
    ),
  });
});

routerAdd("POST", "/api/citalink/email/inbound", (e) => {
  const secret = $os.getenv("EMAIL_WEBHOOK_SECRET");
  if (!secret) {
    return e.json(503, {
      ok: false,
      error: "EMAIL_WEBHOOK_SECRET no configurado",
    });
  }

  const requestInfo = e.requestInfo();
  const providedSecret = inboundValue(
    inboundHeader(e, requestInfo, "x-citalink-webhook-secret") ||
    inboundRead(requestInfo.headers, "x-citalink-webhook-secret") ||
    inboundRead(requestInfo.headers, "x_citalink_webhook_secret") ||
    inboundRead(requestInfo.headers, "X-Citalink-Webhook-Secret") ||
    inboundRead(requestInfo.headers, "X-CitaLink-Webhook-Secret")
  );
  if (providedSecret !== secret) {
    return e.json(401, {
      ok: false,
      error: "Webhook no autorizado",
    });
  }

  try {
    const body = requestInfo.body || {};
    const fromEmail = inboundPick(body, ["fromEmail", "from", "sender", "email"]).toLowerCase();
    const toEmail = inboundPick(body, ["toEmail", "to", "recipient"]) || "pat@citalink.es";
    const subject = inboundPick(body, ["subject", "title"]);
    const messageBody = inboundPick(body, ["body", "text", "html", "message"]);
    const messageId = inboundPick(body, ["messageId", "id", "uid"]);
    const receivedAt = inboundPick(body, ["receivedAt", "date"]) || new Date().toISOString();

    if (!fromEmail || !subject) {
      return e.json(400, {
        ok: false,
        error: "fromEmail y subject son obligatorios",
      });
    }

    const classification = inboundIntent(subject, messageBody);
    if (inboundValue(inboundHeader(e, requestInfo, "x-citalink-debug") || inboundRead(requestInfo.headers, "x-citalink-debug") || inboundRead(requestInfo.headers, "x_citalink_debug")) === "1") {
      return e.json(200, {
        ok: true,
        debug: true,
        fromEmail,
        toEmail,
        subject,
        hasBody: Boolean(messageBody),
        messageId,
        intent: classification.intent,
      });
    }

    const suggestedReply = classification.intent === "baja"
      ? ""
      : "Hola, gracias por escribir a CitaLink. Hemos recibido tu mensaje y te responderemos con el siguiente paso.";
    const rawPayload = {
      fromEmail,
      toEmail,
      subject,
      body: messageBody,
      messageId,
      receivedAt,
    };

    const conversation = inboundSaveRecord("emailConversations", {
      direction: "inbound",
      fromEmail,
      toEmail,
      subject,
      body: messageBody,
      intent: classification.intent,
      status: classification.status,
      suggestedReply,
      requiresApproval: classification.requiresApproval,
      channel: "email",
      sourceCollection: "hostingerMail",
      sourceRecordId: messageId,
      messageId,
      receivedAt,
      rawPayload,
    });

    if (classification.intent === "baja") {
      inboundSaveRecord("doNotContact", {
        email: fromEmail,
        phone: "",
        reason: "Baja solicitada por email entrante.",
        source: "emailConversations",
        active: true,
      });
    }

    const action = inboundSaveRecord("agentActions", {
      agentName: classification.intent === "baja" ? "Compliance Agent" : "Email Response Agent",
      actionType: classification.intent === "baja" ? "block_contact" : "draft_reply",
      channel: "email",
      status: classification.status,
      targetEmail: fromEmail,
      targetName: fromEmail,
      summary: classification.summary,
      payload: {
        subject,
        suggestedReply,
      },
      requiresApproval: classification.requiresApproval,
      approved: false,
      sourceCollection: "emailConversations",
      sourceRecordId: conversation.id,
      nextStep: classification.nextStep,
      legalBasis: classification.intent === "baja" ? "opt_out" : "inbound_request",
    });

    return e.json(200, {
      ok: true,
      conversationId: conversation.id,
      actionId: action.id,
      intent: classification.intent,
      status: classification.status,
    });
  } catch (error) {
    $app.logger().error("Inbound email processing failed", "error", error.message);
    return e.json(400, {
      ok: false,
      error: error.message || "Inbound email processing failed",
    });
  }
});
