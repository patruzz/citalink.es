/// <reference path="../pb_data/types.d.ts" />

const campaignValue = (record, field) => (record.getString(field) || "").trim();

const campaignCompliance = (record) => {
  const legalBasis = campaignValue(record, "legalBasis");
  const optOutInstructions = campaignValue(record, "optOutInstructions") || "Responder con BAJA.";

  if (!legalBasis) {
    return {
      status: "blocked_missing_legal_basis",
      legalBasis: "",
      optOutInstructions,
      summary: "Campana bloqueada hasta documentar base legal.",
      nextStep: "Completar legalBasis y revisar audiencia antes de enviar.",
    };
  }

  return {
    status: "ready_for_review",
    legalBasis,
    optOutInstructions,
    summary: "Campana lista para revision humana antes de envio.",
    nextStep: "Revisar borrador, audiencia y bajas antes de aprobar.",
  };
};

const saveCampaignComplianceAction = (record, compliance) => {
  try {
    const collection = $app.findCollectionByNameOrId("agentActions");
    const action = new Record(collection, {
      agentName: "Compliance Agent",
      actionType: "review_marketing_compliance",
      channel: campaignValue(record, "channel") || "multicanal",
      status: "review",
      summary: compliance.summary,
      payload: {
        campaignName: campaignValue(record, "name"),
        audienceSource: campaignValue(record, "audienceSource"),
        optOutInstructions: compliance.optOutInstructions,
      },
      requiresApproval: true,
      approved: false,
      sourceCollection: "marketingCampaigns",
      sourceRecordId: record.id,
      nextStep: compliance.nextStep,
      legalBasis: compliance.legalBasis,
    });
    $app.save(action);
  } catch (error) {
    $app.logger().warn("Unable to save campaign compliance action", "error", error.message);
  }
};

const applyCampaignCompliance = (record) => {
  const compliance = campaignCompliance(record);
  record.set("requiresApproval", true);
  record.set("approved", false);
  record.set("status", "review");
  record.set("complianceStatus", compliance.status);
  record.set("optOutInstructions", compliance.optOutInstructions);
  return compliance;
};

onRecordCreateExecute((e) => {
  try {
    applyCampaignCompliance(e.record);
  } catch (error) {
    $app.logger().error("Marketing compliance create hook failed", "error", error.message);
  }

  return e.next();
}, "marketingCampaigns");

onRecordAfterCreateSuccess((e) => {
  try {
    const compliance = campaignCompliance(e.record);
    saveCampaignComplianceAction(e.record, compliance);
  } catch (error) {
    $app.logger().warn("Marketing compliance action hook failed", "error", error.message);
  }

  return e.next();
}, "marketingCampaigns");

onRecordUpdateExecute((e) => {
  try {
    const record = e.record;
    const compliance = campaignCompliance(record);
    if (!compliance.legalBasis || record.getBool("approved")) {
      record.set("approved", false);
      record.set("requiresApproval", true);
      record.set("status", "review");
      record.set("complianceStatus", compliance.status);
      record.set("optOutInstructions", compliance.optOutInstructions);
    }
  } catch (error) {
    $app.logger().error("Marketing compliance update hook failed", "error", error.message);
  }

  return e.next();
}, "marketingCampaigns");
