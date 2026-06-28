/// <reference path="../pb_data/types.d.ts" />

const MARKETING_MODEL = $os.getenv("OPENAI_MODEL") || "gpt-5.5";

const marketingGetString = (record, field) => (record.getString(field) || "").trim();

const marketingExtractOutputText = (data) => {
  if (data.output_text) return data.output_text;
  const output = data.output || [];
  for (const item of output) {
    for (const content of item.content || []) {
      if (content.text) return content.text;
    }
  }
  return "";
};

const fallbackMarketingDraft = (record) => {
  const sector = marketingGetString(record, "sector") || "empresas B2B";
  const channel = marketingGetString(record, "channel") || "email";
  return {
    draftSubject: `Cómo convertir más leads en citas en ${sector}`,
    draftBody: `Hola,\n\nEn CitaLink ayudamos a equipos de ${sector} a responder antes, cualificar contactos y agendar citas con agentes de IA supervisados.\n\n¿Tiene sentido revisar vuestro flujo actual de ${channel} en una demo de 30 minutos?\n\nUn saludo,\nCitaLink`,
  };
};

const generateMarketingDraft = (record) => {
  const apiKey = $os.getenv("OPENAI_API_KEY");
  if (!apiKey) return fallbackMarketingDraft(record);

  try {
    const response = $http.send({
      url: "https://api.openai.com/v1/responses",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MARKETING_MODEL,
        input: [
          {
            role: "system",
            content: "Genera un borrador comercial B2B responsable para CitaLink. No prometas resultados garantizados. Devuelve solo JSON válido.",
          },
          {
            role: "user",
            content: JSON.stringify({
              campaign: marketingGetString(record, "name"),
              sector: marketingGetString(record, "sector"),
              channel: marketingGetString(record, "channel"),
              audience: marketingGetString(record, "audience"),
            }),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "citalink_marketing_draft",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                draftSubject: { type: "string" },
                draftBody: { type: "string" },
              },
              required: ["draftSubject", "draftBody"],
            },
          },
        },
      }),
      timeout: 12,
    });

    if (response.statusCode < 200 || response.statusCode >= 300) {
      return fallbackMarketingDraft(record);
    }

    return JSON.parse(marketingExtractOutputText(response.json));
  } catch (error) {
    $app.logger().warn("Marketing draft fallback", "error", error.message);
    return fallbackMarketingDraft(record);
  }
};

onRecordAfterCreateSuccess((e) => {
  try {
    const record = e.record;
    if (record.collection().name !== "marketingCampaigns") return e.next();
    if (marketingGetString(record, "draftBody")) return e.next();

    const draft = generateMarketingDraft(record);
    record.set("draftSubject", draft.draftSubject);
    record.set("draftBody", draft.draftBody);
    record.set("status", "review");
    record.set("requiresApproval", true);
    record.set("approved", false);
    $app.save(record);

    try {
      const actions = $app.findCollectionByNameOrId("agentActions");
      const action = new Record(actions, {
        agentName: "Marketing Agent",
        actionType: "generate_campaign_draft",
        channel: marketingGetString(record, "channel") || "multicanal",
        status: "review",
        summary: `Borrador generado para la campaña ${marketingGetString(record, "name")}.`,
        payload: draft,
        requiresApproval: true,
        approved: false,
        sourceCollection: "marketingCampaigns",
        sourceRecordId: record.id,
      });
      $app.save(action);
    } catch (error) {
      $app.logger().warn("Unable to save marketing agent action", "error", error.message);
    }
  } catch (error) {
    $app.logger().error("Marketing agent hook failed without blocking record", "error", error.message);
  }

  return e.next();
});
