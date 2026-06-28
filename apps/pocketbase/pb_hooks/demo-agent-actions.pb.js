/// <reference path="../pb_data/types.d.ts" />

const demoActionValue = (record, field) => (record.getString(field) || "").trim();

const demoActionSave = (collectionName, data) => {
  try {
    const collection = $app.findCollectionByNameOrId(collectionName);
    const record = new Record(collection, data);
    $app.save(record);
    return record;
  } catch (error) {
    $app.logger().warn(`Unable to save ${collectionName}`, "error", error.message);
    return null;
  }
};

const demoActionStatus = (record) => {
  const notificationStatus = demoActionValue(record, "notificationStatus");
  if (notificationStatus === "blocked") return "blocked";
  if (notificationStatus === "failed" || notificationStatus === "smtp_missing") return "review";
  if (notificationStatus === "sent") return record.getBool("requiresApproval") ? "review" : "approved";
  return record.getBool("requiresApproval") ? "review" : "draft";
};

onRecordAfterCreateSuccess((e) => {
  try {
    const record = e.record;
    const email = demoActionValue(record, "email").toLowerCase();
    const intent = demoActionValue(record, "classification") || "demo";
    const status = demoActionStatus(record);
    const company = demoActionValue(record, "company");
    const name = demoActionValue(record, "name");
    const summary = demoActionValue(record, "aiSummary") || `Solicitud de demo de ${company || name || email}.`;
    const requiresApproval = record.getBool("requiresApproval") || status === "review";

    demoActionSave("emailConversations", {
      direction: "demo",
      fromEmail: email,
      toEmail: $os.getenv("CONTACT_EMAIL") || "pat@citalink.es",
      subject: `Demo CitaLink: ${company || name || email}`,
      body: demoActionValue(record, "message"),
      intent,
      status,
      suggestedReply:
        intent === "baja"
          ? ""
          : `Hola ${name || ""}, hemos recibido tu solicitud de demo de CitaLink. Te proponemos revisar tu flujo comercial en una llamada breve.`,
      requiresApproval,
      channel: "email",
      sourceCollection: "demoRequests",
      sourceRecordId: record.id,
    });

    demoActionSave("agentActions", {
      agentName: intent === "baja" ? "Compliance Agent" : "Demo Agent",
      actionType: intent === "baja" ? "block_contact" : "follow_up_demo",
      channel: "email",
      status,
      targetEmail: email,
      targetPhone: demoActionValue(record, "phone"),
      targetName: name,
      summary,
      payload: {
        company,
        intent,
        notificationStatus: demoActionValue(record, "notificationStatus"),
      },
      requiresApproval,
      approved: status === "approved",
      sourceCollection: "demoRequests",
      sourceRecordId: record.id,
      nextStep: intent === "baja" ? "No contactar." : "Revisar borrador y proponer reunion.",
      legalBasis: "inbound_request",
    });
  } catch (error) {
    $app.logger().warn("Unable to create demo agent action", "error", error.message);
  }

  return e.next();
}, "demoRequests");
