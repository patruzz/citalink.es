/// <reference path="../pb_data/types.d.ts" />

const authRule = "@request.auth.id != ''";

const timestamps = () => [
  new AutodateField({ name: "createdAt", onCreate: true, onUpdate: false }),
  new AutodateField({ name: "created", onCreate: true, onUpdate: false }),
  new AutodateField({ name: "updated", onCreate: true, onUpdate: true }),
];

const saveCollectionIfMissing = (app, name, fields) => {
  try {
    app.findCollectionByNameOrId(name);
    console.log(`Collection ${name} already exists, skipping`);
    return;
  } catch (e) {
    if (!e.message.includes("no rows in result set")) {
      throw e;
    }
  }

  const collection = new Collection({
    name,
    type: "base",
    system: false,
    listRule: authRule,
    viewRule: authRule,
    createRule: authRule,
    updateRule: authRule,
    deleteRule: authRule,
  });

  collection.fields.add(...fields, ...timestamps());
  app.save(collection);
};

migrate((app) => {
  const demoRequests = app.findCollectionByNameOrId("demoRequests");
  demoRequests.fields.add(
    new TextField({ name: "notificationStatus" }),
    new TextField({ name: "notificationError" }),
    new TextField({ name: "classification" }),
    new TextField({ name: "aiSummary" }),
    new BoolField({ name: "requiresApproval" })
  );
  app.save(demoRequests);

  saveCollectionIfMissing(app, "emailConversations", [
    new TextField({ name: "direction" }),
    new EmailField({ name: "fromEmail" }),
    new EmailField({ name: "toEmail" }),
    new TextField({ name: "subject" }),
    new TextField({ name: "body" }),
    new TextField({ name: "intent" }),
    new TextField({ name: "status" }),
    new TextField({ name: "suggestedReply" }),
    new BoolField({ name: "requiresApproval" }),
    new TextField({ name: "channel" }),
    new TextField({ name: "sourceCollection" }),
    new TextField({ name: "sourceRecordId" }),
  ]);

  saveCollectionIfMissing(app, "agentActions", [
    new TextField({ name: "agentName", required: true }),
    new TextField({ name: "actionType" }),
    new TextField({ name: "channel" }),
    new TextField({ name: "status" }),
    new EmailField({ name: "targetEmail" }),
    new TextField({ name: "targetPhone" }),
    new TextField({ name: "targetName" }),
    new TextField({ name: "summary" }),
    new JSONField({ name: "payload" }),
    new BoolField({ name: "requiresApproval" }),
    new BoolField({ name: "approved" }),
    new TextField({ name: "error" }),
    new TextField({ name: "sourceCollection" }),
    new TextField({ name: "sourceRecordId" }),
  ]);

  saveCollectionIfMissing(app, "marketingCampaigns", [
    new TextField({ name: "name", required: true }),
    new TextField({ name: "sector" }),
    new TextField({ name: "channel" }),
    new TextField({ name: "status" }),
    new TextField({ name: "audience" }),
    new TextField({ name: "draftSubject" }),
    new TextField({ name: "draftBody" }),
    new NumberField({ name: "targetCount" }),
    new BoolField({ name: "requiresApproval" }),
    new BoolField({ name: "approved" }),
  ]);

  saveCollectionIfMissing(app, "doNotContact", [
    new EmailField({ name: "email" }),
    new TextField({ name: "phone" }),
    new TextField({ name: "reason" }),
    new TextField({ name: "source" }),
    new BoolField({ name: "active" }),
  ]);
}, (app) => {
  const demoRequests = app.findCollectionByNameOrId("demoRequests");
  demoRequests.fields.removeByName("notificationStatus");
  demoRequests.fields.removeByName("notificationError");
  demoRequests.fields.removeByName("classification");
  demoRequests.fields.removeByName("aiSummary");
  demoRequests.fields.removeByName("requiresApproval");
  app.save(demoRequests);

  for (const name of ["emailConversations", "agentActions", "marketingCampaigns", "doNotContact"]) {
    try {
      const collection = app.findCollectionByNameOrId(name);
      app.delete(collection);
    } catch (e) {
      if (!e.message.includes("no rows in result set")) {
        throw e;
      }
    }
  }
});
