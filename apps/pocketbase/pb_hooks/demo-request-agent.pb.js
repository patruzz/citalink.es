/// <reference path="../pb_data/types.d.ts" />

var demoContactEmail = () => $os.getenv("CONTACT_EMAIL") || "pat@citalink.es";
var demoDefaultFrom = () => $os.getenv("SMTP_FROM") || demoContactEmail();

var demoValue = (record, field) => (record.getString(field) || "").trim();

var demoHasValue = (value) => value !== undefined && value !== null && String(value).trim() !== "";

var demoEscapeHtml = (value) => String(value || "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

var demoApplySmtpEnvConfig = () => {
  const smtpHost = $os.getenv("SMTP_HOST");
  if (!demoHasValue(smtpHost)) return;

  const settings = $app.settings();
  settings.smtp.enabled = true;
  settings.smtp.host = smtpHost;
  settings.smtp.port = parseInt($os.getenv("SMTP_PORT") || "465", 10);
  settings.smtp.username = $os.getenv("SMTP_USER") || "";
  settings.smtp.password = $os.getenv("SMTP_PASS") || "";
  settings.smtp.tls = ($os.getenv("SMTP_TLS") || "true").toLowerCase() === "true";
  settings.smtp.authMethod = $os.getenv("SMTP_AUTH_METHOD") || "PLAIN";
  settings.meta.senderAddress = demoDefaultFrom();
  settings.meta.senderName = "CitaLink";
};

var demoMailerReady = () => {
  demoApplySmtpEnvConfig();
  const smtp = $app.settings().smtp;
  const smtpReady = smtp.enabled &&
    demoHasValue(smtp.host) &&
    demoHasValue(smtp.username) &&
    demoHasValue(smtp.password);
  const builderReady = demoHasValue($os.getenv("BUILDER_MAILER_API_URL")) &&
    demoHasValue($os.getenv("BUILDER_MAILER_API_KEY")) &&
    demoHasValue($os.getenv("BUILDER_MAILER_SENDER_ADDRESS"));

  return smtpReady || builderReady;
};

var demoClassification = (record) => {
  const text = `${demoValue(record, "message")} ${demoValue(record, "sector")} ${demoValue(record, "mainChannel")}`.toLowerCase();
  if (text.includes("baja") || text.includes("no contactar") || text.includes("unsubscribe")) {
    return { intent: "baja", confidence: 0.9, summary: "El contacto pide baja o no ser contactado.", requiresApproval: false };
  }
  if (text.includes("precio") || text.includes("coste") || text.includes("tarifa")) {
    return { intent: "precio", confidence: 0.75, summary: "El lead muestra interes en precios.", requiresApproval: true };
  }
  if (text.includes("soporte") || text.includes("problema") || text.includes("incidencia")) {
    return { intent: "soporte", confidence: 0.7, summary: "El contacto parece pedir soporte.", requiresApproval: true };
  }
  return { intent: "demo", confidence: 0.7, summary: "Solicitud de demo recibida desde la web.", requiresApproval: false };
};

var demoSendEmail = (to, subject, html) => {
  const message = new MailerMessage({
    from: { address: demoDefaultFrom(), name: "CitaLink" },
    to: [{ address: to }],
    subject,
    html,
  });

  $app.newMailClient().send(message);
};

var demoInternalEmailHtml = (record, classification) => `
  <h2>Nueva solicitud de demo</h2>
  <p><strong>Nombre:</strong> ${demoEscapeHtml(demoValue(record, "name"))}</p>
  <p><strong>Empresa:</strong> ${demoEscapeHtml(demoValue(record, "company"))}</p>
  <p><strong>Email:</strong> ${demoEscapeHtml(demoValue(record, "email"))}</p>
  <p><strong>Telefono:</strong> ${demoEscapeHtml(demoValue(record, "phone"))}</p>
  <p><strong>Sector:</strong> ${demoEscapeHtml(demoValue(record, "sector"))}</p>
  <p><strong>Canal:</strong> ${demoEscapeHtml(demoValue(record, "mainChannel"))}</p>
  <p><strong>Leads/mes:</strong> ${demoEscapeHtml(record.get("monthlyLeads") || "")}</p>
  <p><strong>Clasificacion:</strong> ${demoEscapeHtml(classification.intent)} (${demoEscapeHtml(classification.confidence)})</p>
  <p><strong>Resumen:</strong> ${demoEscapeHtml(classification.summary)}</p>
  <p><strong>Mensaje:</strong><br>${demoEscapeHtml(demoValue(record, "message"))}</p>
`;

var demoProspectEmailHtml = (record) => `
  <p>Hola ${demoEscapeHtml(demoValue(record, "name"))},</p>
  <p>Hemos recibido tu solicitud de demo de CitaLink.</p>
  <p>Revisaremos el flujo comercial de ${demoEscapeHtml(demoValue(record, "company"))} y te contactaremos para coordinar una reunion.</p>
  <p>Gracias,<br>Equipo CitaLink</p>
`;

var demoSaveRecord = (collectionName, data) => {
  try {
    const collection = $app.findCollectionByNameOrId(collectionName);
    const record = new Record(collection, data);
    $app.save(record);
  } catch (error) {
    $app.logger().warn(`Unable to save ${collectionName}`, "error", error.message);
  }
};

var demoPrepareRecord = (record) => {
  if (demoHasValue(record.getString("notificationStatus"))) return;

  const email = demoValue(record, "email").toLowerCase();
  const phone = demoValue(record, "phone");
  const classification = demoClassification(record);

  record.set("classification", classification.intent);
  record.set("aiSummary", classification.summary);
  record.set("requiresApproval", classification.requiresApproval);

  if (classification.intent === "baja") {
    record.set("status", "blocked");
    record.set("notificationStatus", "blocked");
    record.set("notificationError", "");
    demoSaveRecord("doNotContact", {
      email,
      phone,
      reason: "Solicitud de baja o no contacto desde demo.",
      source: "demoRequests",
      active: true,
    });
    return;
  }

  if (!demoMailerReady()) {
    record.set("notificationStatus", "smtp_missing");
    record.set("notificationError", "Mailer no configurado. Configura SMTP o Builder Mailer para enviar emails.");
    return;
  }

  try {
    demoSendEmail(
      demoContactEmail(),
      `Nueva demo CitaLink: ${demoValue(record, "company") || demoValue(record, "name")}`,
      demoInternalEmailHtml(record, classification)
    );

    if (demoHasValue(email)) {
      demoSendEmail(email, "Hemos recibido tu solicitud de demo de CitaLink", demoProspectEmailHtml(record));
    }

    record.set("notificationStatus", "sent");
    record.set("notificationError", "");
  } catch (error) {
    record.set("notificationStatus", "failed");
    record.set("notificationError", error.message || String(error));
    record.set("requiresApproval", true);
  }
};

onRecordCreateExecute((e) => {
  var modelValue = (record, field) => (record.getString(field) || "").trim();
  var modelHasValue = (value) => value !== undefined && value !== null && String(value).trim() !== "";
  var modelEscapeHtml = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  var modelApplySmtpEnvConfig = () => {
    const smtpHost = $os.getenv("SMTP_HOST");
    if (!modelHasValue(smtpHost)) return;

    const settings = $app.settings();
    settings.smtp.enabled = true;
    settings.smtp.host = smtpHost;
    settings.smtp.port = parseInt($os.getenv("SMTP_PORT") || "465", 10);
    settings.smtp.username = $os.getenv("SMTP_USER") || "";
    settings.smtp.password = $os.getenv("SMTP_PASS") || "";
    settings.smtp.tls = ($os.getenv("SMTP_TLS") || "true").toLowerCase() === "true";
    settings.smtp.authMethod = $os.getenv("SMTP_AUTH_METHOD") || "PLAIN";
    settings.meta.senderAddress = $os.getenv("SMTP_FROM") || $os.getenv("CONTACT_EMAIL") || "pat@citalink.es";
    settings.meta.senderName = "CitaLink";
  };
  var modelMailerReady = () => {
    modelApplySmtpEnvConfig();
    const smtp = $app.settings().smtp;
    const smtpReady = smtp.enabled &&
      modelHasValue(smtp.host) &&
      modelHasValue(smtp.username) &&
      modelHasValue(smtp.password);
    const builderReady = modelHasValue($os.getenv("BUILDER_MAILER_API_URL")) &&
      modelHasValue($os.getenv("BUILDER_MAILER_API_KEY")) &&
      modelHasValue($os.getenv("BUILDER_MAILER_SENDER_ADDRESS"));

    return smtpReady || builderReady;
  };
  var modelClassification = (record) => {
    const text = `${modelValue(record, "message")} ${modelValue(record, "sector")} ${modelValue(record, "mainChannel")}`.toLowerCase();
    if (text.includes("baja") || text.includes("no contactar") || text.includes("unsubscribe")) {
      return { intent: "baja", confidence: 0.9, summary: "El contacto pide baja o no ser contactado.", requiresApproval: false };
    }
    if (text.includes("precio") || text.includes("coste") || text.includes("tarifa")) {
      return { intent: "precio", confidence: 0.75, summary: "El lead muestra interes en precios.", requiresApproval: true };
    }
    if (text.includes("soporte") || text.includes("problema") || text.includes("incidencia")) {
      return { intent: "soporte", confidence: 0.7, summary: "El contacto parece pedir soporte.", requiresApproval: true };
    }
    return { intent: "demo", confidence: 0.7, summary: "Solicitud de demo recibida desde la web.", requiresApproval: false };
  };
  var modelSendEmail = (to, subject, html) => {
    const message = new MailerMessage({
      from: { address: $os.getenv("SMTP_FROM") || $os.getenv("CONTACT_EMAIL") || "pat@citalink.es", name: "CitaLink" },
      to: [{ address: to }],
      subject,
      html,
    });

    $app.newMailClient().send(message);
  };

  try {
    const record = e.record;
    if (modelHasValue(record.getString("notificationStatus"))) return e.next();

    const email = modelValue(record, "email").toLowerCase();
    const phone = modelValue(record, "phone");
    const classification = modelClassification(record);

    record.set("classification", classification.intent);
    record.set("aiSummary", classification.summary);
    record.set("requiresApproval", classification.requiresApproval);

    if (classification.intent === "baja") {
      record.set("status", "blocked");
      record.set("notificationStatus", "blocked");
      record.set("notificationError", "");
      try {
        const collection = $app.findCollectionByNameOrId("doNotContact");
        const blocked = new Record(collection, {
          email,
          phone,
          reason: "Solicitud de baja o no contacto desde demo.",
          source: "demoRequests",
          active: true,
        });
        $app.save(blocked);
      } catch (saveError) {
        $app.logger().warn("Unable to save doNotContact", "error", saveError.message);
      }
      return e.next();
    }

    if (!modelMailerReady()) {
      record.set("notificationStatus", "smtp_missing");
      record.set("notificationError", "Mailer no configurado. Configura SMTP o Builder Mailer para enviar emails.");
      return e.next();
    }

    try {
      const internalHtml = `
        <h2>Nueva solicitud de demo</h2>
        <p><strong>Nombre:</strong> ${modelEscapeHtml(modelValue(record, "name"))}</p>
        <p><strong>Empresa:</strong> ${modelEscapeHtml(modelValue(record, "company"))}</p>
        <p><strong>Email:</strong> ${modelEscapeHtml(email)}</p>
        <p><strong>Telefono:</strong> ${modelEscapeHtml(phone)}</p>
        <p><strong>Clasificacion:</strong> ${modelEscapeHtml(classification.intent)} (${modelEscapeHtml(classification.confidence)})</p>
        <p><strong>Resumen:</strong> ${modelEscapeHtml(classification.summary)}</p>
        <p><strong>Mensaje:</strong><br>${modelEscapeHtml(modelValue(record, "message"))}</p>
      `;
      const prospectHtml = `
        <p>Hola ${modelEscapeHtml(modelValue(record, "name"))},</p>
        <p>Hemos recibido tu solicitud de demo de CitaLink.</p>
        <p>Revisaremos el flujo comercial de ${modelEscapeHtml(modelValue(record, "company"))} y te contactaremos para coordinar una reunion.</p>
        <p>Gracias,<br>Equipo CitaLink</p>
      `;

      modelSendEmail(
        $os.getenv("CONTACT_EMAIL") || "pat@citalink.es",
        `Nueva demo CitaLink: ${modelValue(record, "company") || modelValue(record, "name")}`,
        internalHtml
      );

      if (modelHasValue(email)) {
        modelSendEmail(email, "Hemos recibido tu solicitud de demo de CitaLink", prospectHtml);
      }

      record.set("notificationStatus", "sent");
      record.set("notificationError", "");
    } catch (emailError) {
      record.set("notificationStatus", "failed");
      record.set("notificationError", emailError.message || String(emailError));
      record.set("requiresApproval", true);
    }
  } catch (error) {
    $app.logger().error("Demo model hook failed without blocking record", "error", error.message);
    e.record.set("notificationStatus", "failed");
    e.record.set("notificationError", error.message || String(error));
    e.record.set("requiresApproval", true);
  }

  return e.next();
}, "demoRequests");

onRecordCreateRequest((e) => {
  var localValue = (record, field) => (record.getString(field) || "").trim();
  var localHasValue = (value) => value !== undefined && value !== null && String(value).trim() !== "";
  var localMailerReady = () => {
    demoApplySmtpEnvConfig();
    const smtp = $app.settings().smtp;
    const smtpReady = smtp.enabled &&
      localHasValue(smtp.host) &&
      localHasValue(smtp.username) &&
      localHasValue(smtp.password);
    const builderReady = localHasValue($os.getenv("BUILDER_MAILER_API_URL")) &&
      localHasValue($os.getenv("BUILDER_MAILER_API_KEY")) &&
      localHasValue($os.getenv("BUILDER_MAILER_SENDER_ADDRESS"));

    return smtpReady || builderReady;
  };
  var localClassification = (record) => {
    const text = `${localValue(record, "message")} ${localValue(record, "sector")} ${localValue(record, "mainChannel")}`.toLowerCase();
    if (text.includes("baja") || text.includes("no contactar") || text.includes("unsubscribe")) {
      return { intent: "baja", confidence: 0.9, summary: "El contacto pide baja o no ser contactado.", requiresApproval: false };
    }
    if (text.includes("precio") || text.includes("coste") || text.includes("tarifa")) {
      return { intent: "precio", confidence: 0.75, summary: "El lead muestra interes en precios.", requiresApproval: true };
    }
    if (text.includes("soporte") || text.includes("problema") || text.includes("incidencia")) {
      return { intent: "soporte", confidence: 0.7, summary: "El contacto parece pedir soporte.", requiresApproval: true };
    }
    return { intent: "demo", confidence: 0.7, summary: "Solicitud de demo recibida desde la web.", requiresApproval: false };
  };
  var localSaveRecord = (collectionName, data) => {
    try {
      const collection = $app.findCollectionByNameOrId(collectionName);
      const record = new Record(collection, data);
      $app.save(record);
    } catch (error) {
      $app.logger().warn(`Unable to save ${collectionName}`, "error", error.message);
    }
  };

  let record;
  let email;
  let phone;
  let classification;
  let blocked;
  let mailerReady;

  try {
    const collectionName = e.collection?.name || e.record?.collection()?.name;
    if (collectionName !== "demoRequests") return e.next();

    record = e.record;
    email = localValue(record, "email").toLowerCase();
    phone = localValue(record, "phone");
    classification = localClassification(record);
    blocked = classification.intent === "baja";
    mailerReady = localMailerReady();

    record.set("classification", classification.intent);
    record.set("aiSummary", classification.summary);
    record.set("requiresApproval", classification.requiresApproval);

    if (blocked) {
      record.set("status", "blocked");
      record.set("notificationStatus", "blocked");
      record.set("notificationError", "");
      localSaveRecord("doNotContact", {
        email,
        phone,
        reason: "Solicitud de baja o no contacto desde demo.",
        source: "demoRequests",
        active: true,
      });
    } else if (!mailerReady) {
      record.set("notificationStatus", "smtp_missing");
      record.set("notificationError", "Mailer no configurado. Configura SMTP o Builder Mailer para enviar emails.");
    } else {
      try {
        demoSendEmail(
          demoContactEmail(),
          `Nueva demo CitaLink: ${localValue(record, "company") || localValue(record, "name")}`,
          demoInternalEmailHtml(record, classification)
        );

        if (localHasValue(email)) {
          demoSendEmail(
            email,
            "Hemos recibido tu solicitud de demo de CitaLink",
            demoProspectEmailHtml(record)
          );
        }

        record.set("notificationStatus", "sent");
        record.set("notificationError", "");
      } catch (emailError) {
        record.set("notificationStatus", "failed");
        record.set("notificationError", emailError.message || String(emailError));
        record.set("requiresApproval", true);
      }
    }
  } catch (error) {
    $app.logger().error("Demo request preprocess failed without blocking record", "error", error.message);
    return e.next();
  }

  e.next();
}, "demoRequests");
