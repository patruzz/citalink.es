/// <reference path="../pb_data/types.d.ts" />

const addFieldIfMissing = (collection, field) => {
  try {
    collection.fields.getByName(field.name);
  } catch (error) {
    collection.fields.add(field);
  }
};

migrate((app) => {
  const emailConversations = app.findCollectionByNameOrId("emailConversations");
  addFieldIfMissing(emailConversations, new TextField({ name: "messageId" }));
  addFieldIfMissing(emailConversations, new TextField({ name: "receivedAt" }));
  addFieldIfMissing(emailConversations, new JSONField({ name: "rawPayload" }));
  app.save(emailConversations);

  const agentActions = app.findCollectionByNameOrId("agentActions");
  addFieldIfMissing(agentActions, new TextField({ name: "nextStep" }));
  addFieldIfMissing(agentActions, new TextField({ name: "legalBasis" }));
  app.save(agentActions);

  const marketingCampaigns = app.findCollectionByNameOrId("marketingCampaigns");
  addFieldIfMissing(marketingCampaigns, new TextField({ name: "legalBasis" }));
  addFieldIfMissing(marketingCampaigns, new TextField({ name: "audienceSource" }));
  addFieldIfMissing(marketingCampaigns, new TextField({ name: "optOutInstructions" }));
  addFieldIfMissing(marketingCampaigns, new TextField({ name: "complianceStatus" }));
  app.save(marketingCampaigns);
}, (app) => {
  const emailConversations = app.findCollectionByNameOrId("emailConversations");
  emailConversations.fields.removeByName("messageId");
  emailConversations.fields.removeByName("receivedAt");
  emailConversations.fields.removeByName("rawPayload");
  app.save(emailConversations);

  const agentActions = app.findCollectionByNameOrId("agentActions");
  agentActions.fields.removeByName("nextStep");
  agentActions.fields.removeByName("legalBasis");
  app.save(agentActions);

  const marketingCampaigns = app.findCollectionByNameOrId("marketingCampaigns");
  marketingCampaigns.fields.removeByName("legalBasis");
  marketingCampaigns.fields.removeByName("audienceSource");
  marketingCampaigns.fields.removeByName("optOutInstructions");
  marketingCampaigns.fields.removeByName("complianceStatus");
  app.save(marketingCampaigns);
});
