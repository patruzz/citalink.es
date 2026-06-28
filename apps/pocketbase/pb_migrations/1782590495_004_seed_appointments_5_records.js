/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("appointments");

  const record0 = new Record(collection);
    record0.id = "qbuhdjkzaafwq2x";
    const record0_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record0_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record0.set("userId", record0_userIdLookup.id);
    record0.set("leadName", "Carlos Mendez");
    record0.set("company", "TechVision Solutions");
    record0.set("date", "2024-02-15");
    record0.set("channel", "video_call");
    record0.set("status", "scheduled");
    record0.set("notes", "Product demo scheduled for 2 PM CET");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.id = "uqlv77gzdigvl1g";
    const record1_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record1_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record1.set("userId", record1_userIdLookup.id);
    record1.set("leadName", "Ana Lopez");
    record1.set("company", "Enterprise Systems Inc");
    record1.set("date", "2024-02-18");
    record1.set("channel", "in_person");
    record1.set("status", "scheduled");
    record1.set("notes", "Office visit to discuss enterprise plan");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.id = "e7v3cf07wcpkrak";
    const record2_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record2_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record2.set("userId", record2_userIdLookup.id);
    record2.set("leadName", "Maria Garcia");
    record2.set("company", "Innovate Consulting");
    record2.set("date", "2024-02-20");
    record2.set("channel", "phone");
    record2.set("status", "pending");
    record2.set("notes", "Follow-up call to discuss proposal feedback");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.id = "64luna2675t6sfj";
    const record3_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record3_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record3.set("userId", record3_userIdLookup.id);
    record3.set("leadName", "Pedro Sanchez");
    record3.set("company", "Growth Partners");
    record3.set("date", "2024-02-22");
    record3.set("channel", "video_call");
    record3.set("status", "scheduled");
    record3.set("notes", "Contract negotiation meeting");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.id = "3u8b8l93dhrl2sf";
    const record4_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record4_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record4.set("userId", record4_userIdLookup.id);
    record4.set("leadName", "Isabel Ruiz");
    record4.set("company", "Security First Corp");
    record4.set("date", "2024-02-25");
    record4.set("channel", "video_call");
    record4.set("status", "pending");
    record4.set("notes", "Security features presentation");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  const seededRecordIds = ["3u8b8l93dhrl2sf", "64luna2675t6sfj", "e7v3cf07wcpkrak", "uqlv77gzdigvl1g", "qbuhdjkzaafwq2x"];
  for (const seededRecordId of seededRecordIds) {
    try {
      app.delete(app.findRecordById("appointments", seededRecordId));
    } catch (error) {
      if (error.message.includes("no rows in result set")) {
        continue;
      }
      throw error;
    }
  }
})
