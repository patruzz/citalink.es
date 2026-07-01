/* global routerAdd, $apis, $os, $app, Record */
/// <reference path="../../../backend/pb_data/types.d.ts" />

// Tracked copy of backend/pb_hooks/voice-agent-ingest.pb.js.
// Keep route callbacks self-contained for PocketBase 0.22 JSVM compatibility.

routerAdd("GET", "/api/citalink/voice/health", (e) => {
  var value = (item) => item === undefined || item === null ? "" : String(item).trim();
  var collectionExists = (name) => {
    try {
      $app.dao().findCollectionByNameOrId(name);
      return true;
    } catch (error) {
      return false;
    }
  };

  return e.json(200, {
    ok: true,
    service: "citalink-voice-ingest",
    serviceSecretConfigured: Boolean(value($os.getenv("CITALINK_SERVICE_SECRET"))),
    collections: {
      callSessions: collectionExists("callSessions"),
      agentActions: collectionExists("agentActions"),
      doNotContact: collectionExists("doNotContact"),
    },
  });
});

routerAdd("POST", "/api/citalink/voice/session", (e) => {
  var value = (item) => item === undefined || item === null ? "" : String(item).trim();
  var read = (obj, key) => {
    if (!obj) return undefined;
    if (obj[key] !== undefined) return obj[key];
    if (typeof obj.get === "function") return obj.get(key);
    return undefined;
  };
  var header = (requestInfo, key) => {
    try {
      if (e.request && e.request.header && typeof e.request.header.get === "function") {
        return e.request.header.get(key) || "";
      }
    } catch (error) {
      return "";
    }
    return read(requestInfo.headers, key);
  };
  var authorized = (requestInfo) => {
    var secret = value($os.getenv("CITALINK_SERVICE_SECRET"));
    if (!secret) return false;
    var provided = value(
      header(requestInfo, "x-citalink-service-secret") ||
      read(requestInfo.headers, "x_citalink_service_secret") ||
      read(requestInfo.headers, "X-Citalink-Service-Secret") ||
      read(requestInfo.headers, "X-CitaLink-Service-Secret")
    );
    return provided === secret;
  };
  var findSession = (dao, callSessionId, twilioCallSid) => {
    try {
      if (value(callSessionId)) {
        return dao.findFirstRecordByFilter("callSessions", "callSessionId={:value}", { value: callSessionId });
      }
    } catch (error) {
      // Continue with Twilio SID lookup.
    }
    try {
      if (value(twilioCallSid)) {
        return dao.findFirstRecordByFilter("callSessions", "twilioCallSid={:value}", { value: twilioCallSid });
      }
    } catch (error) {
      return null;
    }
    return null;
  };
  var appendEvent = (record, eventType, payload) => {
    var events = [];
    try {
      var existing = record.get("rawEvents");
      if (Array.isArray(existing)) {
        events = existing;
      } else if (existing) {
        events = [existing];
      }
    } catch (error) {
      events = [];
    }
    events.push({ at: new Date().toISOString(), type: value(eventType) || "session", payload });
    if (events.length > 80) events = events.slice(events.length - 80);
    record.set("rawEvents", events);
  };
  var setIfValue = (record, field, item) => {
    if (value(item)) record.set(field, item);
  };
  var upsertSession = (body, eventType) => {
    var dao = $app.dao();
    var callSessionId = value(read(body, "callSessionId"));
    var twilioCallSid = value(read(body, "twilioCallSid"));
    var record = findSession(dao, callSessionId, twilioCallSid);
    if (!record) {
      var collection = dao.findCollectionByNameOrId("callSessions");
      record = new Record(collection, {});
      record.set("callSessionId", callSessionId || ("call_" + Date.now()));
      record.set("direction", "outbound");
      record.set("status", "created");
    }

    setIfValue(record, "clientId", read(body, "clientId"));
    setIfValue(record, "contactId", read(body, "contactId"));
    setIfValue(record, "twilioCallSid", twilioCallSid);
    setIfValue(record, "fromNumber", read(body, "fromNumber"));
    setIfValue(record, "toNumber", read(body, "toNumber"));
    setIfValue(record, "direction", read(body, "direction"));
    setIfValue(record, "status", read(body, "status"));
    setIfValue(record, "legalBasis", read(body, "legalBasis"));
    setIfValue(record, "objective", read(body, "objective"));
    setIfValue(record, "outcome", read(body, "outcome"));

    appendEvent(record, eventType, read(body, "rawEvent") || body);
    dao.saveRecord(record);
    return record;
  };

  var requestInfo = $apis.requestInfo(e);
  if (!authorized(requestInfo)) {
    return e.json(401, { ok: false, error: "No autorizado." });
  }

  try {
    var body = requestInfo.data || requestInfo.body || {};
    var record = upsertSession(body, "session");
    return e.json(200, {
      ok: true,
      callSessionRecordId: record.id,
      callSessionId: record.getString("callSessionId"),
      status: record.getString("status"),
    });
  } catch (error) {
    $app.logger().error("Voice session ingest failed", "error", error.message || String(error));
    return e.json(400, { ok: false, error: error.message || String(error) });
  }
});

routerAdd("POST", "/api/citalink/voice/status", (e) => {
  var value = (item) => item === undefined || item === null ? "" : String(item).trim();
  var read = (obj, key) => {
    if (!obj) return undefined;
    if (obj[key] !== undefined) return obj[key];
    if (typeof obj.get === "function") return obj.get(key);
    return undefined;
  };
  var header = (requestInfo, key) => {
    try {
      if (e.request && e.request.header && typeof e.request.header.get === "function") {
        return e.request.header.get(key) || "";
      }
    } catch (error) {
      return "";
    }
    return read(requestInfo.headers, key);
  };
  var authorized = (requestInfo) => {
    var secret = value($os.getenv("CITALINK_SERVICE_SECRET"));
    if (!secret) return false;
    var provided = value(
      header(requestInfo, "x-citalink-service-secret") ||
      read(requestInfo.headers, "x_citalink_service_secret") ||
      read(requestInfo.headers, "X-Citalink-Service-Secret") ||
      read(requestInfo.headers, "X-CitaLink-Service-Secret")
    );
    return provided === secret;
  };
  var findSession = (dao, callSessionId, twilioCallSid) => {
    try {
      if (value(callSessionId)) {
        return dao.findFirstRecordByFilter("callSessions", "callSessionId={:value}", { value: callSessionId });
      }
    } catch (error) {
      // Continue with Twilio SID lookup.
    }
    try {
      if (value(twilioCallSid)) {
        return dao.findFirstRecordByFilter("callSessions", "twilioCallSid={:value}", { value: twilioCallSid });
      }
    } catch (error) {
      return null;
    }
    return null;
  };
  var appendEvent = (record, eventType, payload) => {
    var events = [];
    try {
      var existing = record.get("rawEvents");
      if (Array.isArray(existing)) {
        events = existing;
      } else if (existing) {
        events = [existing];
      }
    } catch (error) {
      events = [];
    }
    events.push({ at: new Date().toISOString(), type: value(eventType) || "status", payload });
    if (events.length > 80) events = events.slice(events.length - 80);
    record.set("rawEvents", events);
  };
  var setIfValue = (record, field, item) => {
    if (value(item)) record.set(field, item);
  };
  var upsertSession = (body, eventType) => {
    var dao = $app.dao();
    var callSessionId = value(read(body, "callSessionId"));
    var twilioCallSid = value(read(body, "twilioCallSid"));
    var record = findSession(dao, callSessionId, twilioCallSid);
    if (!record) {
      var collection = dao.findCollectionByNameOrId("callSessions");
      record = new Record(collection, {});
      record.set("callSessionId", callSessionId || ("call_" + Date.now()));
      record.set("direction", "outbound");
      record.set("status", "created");
    }

    setIfValue(record, "twilioCallSid", twilioCallSid);
    setIfValue(record, "status", read(body, "status"));
    setIfValue(record, "legalBasis", read(body, "legalBasis"));
    setIfValue(record, "objective", read(body, "objective"));
    setIfValue(record, "outcome", read(body, "outcome"));

    var status = value(read(body, "status"));
    var now = new Date().toISOString();
    if (!value(record.getString("startedAt")) && (status === "answered" || status === "in_progress" || status === "media_stopped")) {
      record.set("startedAt", now);
    }
    if (["completed", "failed", "busy", "no-answer", "canceled", "create_failed"].indexOf(status) >= 0) {
      record.set("endedAt", now);
    }

    var duration = Number(read(body, "durationSeconds") || 0);
    if (!Number.isNaN(duration) && duration > 0) record.set("durationSeconds", duration);

    appendEvent(record, eventType, read(body, "rawEvent") || body);
    dao.saveRecord(record);
    return record;
  };
  var saveAction = (record, body, actionType, summary, nextStep) => {
    try {
      var dao = $app.dao();
      var actions = dao.findCollectionByNameOrId("agentActions");
      var action = new Record(actions, {
        agentName: "Voice Sales Agent",
        actionType,
        channel: "phone",
        status: "review",
        targetPhone: record.getString("toNumber"),
        targetName: value(read(body, "contactName")) || record.getString("toNumber"),
        summary,
        payload: {
          callSessionId: record.getString("callSessionId"),
          twilioCallSid: record.getString("twilioCallSid"),
          callStatus: record.getString("status"),
        },
        requiresApproval: true,
        approved: false,
        sourceCollection: "callSessions",
        sourceRecordId: record.id,
        nextStep,
        legalBasis: record.getString("legalBasis") || value(read(body, "legalBasis")),
      });
      dao.saveRecord(action);
      return action;
    } catch (error) {
      $app.logger().warn("Unable to save voice agent action", "error", error.message || String(error));
      return null;
    }
  };

  var requestInfo = $apis.requestInfo(e);
  if (!authorized(requestInfo)) {
    return e.json(401, { ok: false, error: "No autorizado." });
  }

  try {
    var body = requestInfo.data || requestInfo.body || {};
    var record = upsertSession(body, "status");
    var status = record.getString("status");
    if (["completed", "failed", "busy", "no-answer", "canceled", "create_failed"].indexOf(status) >= 0) {
      saveAction(
        record,
        body,
        status === "completed" ? "review_call_outcome" : "call_follow_up",
        status === "completed"
          ? "Llamada finalizada. Revisar resultado y decidir siguiente paso comercial."
          : "Llamada no completada o fallida. Revisar si procede reintento manual.",
        status === "completed"
          ? "Revisar conversacion, actualizar lead y agendar seguimiento si hay interes."
          : "Comprobar base legal, horario y numero antes de reintentar."
      );
    }
    return e.json(200, {
      ok: true,
      callSessionRecordId: record.id,
      callSessionId: record.getString("callSessionId"),
      status,
    });
  } catch (error) {
    $app.logger().error("Voice status ingest failed", "error", error.message || String(error));
    return e.json(400, { ok: false, error: error.message || String(error) });
  }
});

routerAdd("POST", "/api/citalink/voice/event", (e) => {
  var value = (item) => item === undefined || item === null ? "" : String(item).trim();
  var read = (obj, key) => {
    if (!obj) return undefined;
    if (obj[key] !== undefined) return obj[key];
    if (typeof obj.get === "function") return obj.get(key);
    return undefined;
  };
  var header = (requestInfo, key) => {
    try {
      if (e.request && e.request.header && typeof e.request.header.get === "function") {
        return e.request.header.get(key) || "";
      }
    } catch (error) {
      return "";
    }
    return read(requestInfo.headers, key);
  };
  var authorized = (requestInfo) => {
    var secret = value($os.getenv("CITALINK_SERVICE_SECRET"));
    if (!secret) return false;
    var provided = value(
      header(requestInfo, "x-citalink-service-secret") ||
      read(requestInfo.headers, "x_citalink_service_secret") ||
      read(requestInfo.headers, "X-Citalink-Service-Secret") ||
      read(requestInfo.headers, "X-CitaLink-Service-Secret")
    );
    return provided === secret;
  };
  var findSession = (dao, callSessionId, twilioCallSid) => {
    try {
      if (value(callSessionId)) {
        return dao.findFirstRecordByFilter("callSessions", "callSessionId={:value}", { value: callSessionId });
      }
    } catch (error) {
      // Continue with Twilio SID lookup.
    }
    try {
      if (value(twilioCallSid)) {
        return dao.findFirstRecordByFilter("callSessions", "twilioCallSid={:value}", { value: twilioCallSid });
      }
    } catch (error) {
      return null;
    }
    return null;
  };
  var appendEvent = (record, eventType, payload) => {
    var events = [];
    try {
      var existing = record.get("rawEvents");
      if (Array.isArray(existing)) {
        events = existing;
      } else if (existing) {
        events = [existing];
      }
    } catch (error) {
      events = [];
    }
    events.push({ at: new Date().toISOString(), type: value(eventType) || "event", payload });
    if (events.length > 80) events = events.slice(events.length - 80);
    record.set("rawEvents", events);
  };
  var setIfValue = (record, field, item) => {
    if (value(item)) record.set(field, item);
  };
  var upsertSession = (body, eventType) => {
    var dao = $app.dao();
    var callSessionId = value(read(body, "callSessionId"));
    var twilioCallSid = value(read(body, "twilioCallSid"));
    var record = findSession(dao, callSessionId, twilioCallSid);
    if (!record) {
      var collection = dao.findCollectionByNameOrId("callSessions");
      record = new Record(collection, {});
      record.set("callSessionId", callSessionId || ("call_" + Date.now()));
      record.set("direction", "outbound");
      record.set("status", "created");
    }

    setIfValue(record, "twilioCallSid", twilioCallSid);
    setIfValue(record, "status", read(body, "status"));
    setIfValue(record, "legalBasis", read(body, "legalBasis"));
    setIfValue(record, "objective", read(body, "objective"));
    setIfValue(record, "outcome", read(body, "outcome"));

    var now = new Date().toISOString();
    var status = value(read(body, "status"));
    if (!value(record.getString("startedAt")) && (status === "answered" || status === "in_progress" || status === "media_stopped")) {
      record.set("startedAt", now);
    }

    var transcriptDelta = value(read(body, "transcriptDelta"));
    if (transcriptDelta) {
      var speaker = value(read(body, "speaker")) || "agent";
      var currentTranscript = record.getString("transcript") || "";
      record.set("transcript", currentTranscript + (currentTranscript ? "\n" : "") + speaker + ": " + transcriptDelta);
    }

    appendEvent(record, eventType, read(body, "rawEvent") || body);
    dao.saveRecord(record);
    return record;
  };

  var requestInfo = $apis.requestInfo(e);
  if (!authorized(requestInfo)) {
    return e.json(401, { ok: false, error: "No autorizado." });
  }

  try {
    var body = requestInfo.data || requestInfo.body || {};
    var eventType = value(read(body, "eventType")) || "event";
    var record = upsertSession(body, eventType);
    return e.json(200, {
      ok: true,
      callSessionRecordId: record.id,
      callSessionId: record.getString("callSessionId"),
      status: record.getString("status"),
    });
  } catch (error) {
    $app.logger().error("Voice event ingest failed", "error", error.message || String(error));
    return e.json(400, { ok: false, error: error.message || String(error) });
  }
});
