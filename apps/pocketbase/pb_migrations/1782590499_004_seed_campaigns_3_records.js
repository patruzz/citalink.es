/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("campaigns");

  const record0 = new Record(collection);
    record0.id = "v1h528qxp1ykmmn";
    const record0_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record0_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record0.set("userId", record0_userIdLookup.id);
    record0.set("name", "Enterprise Tech Outreach Q1");
    record0.set("sector", "Enterprise Software");
    record0.set("channel", "email");
    record0.set("status", "active");
    record0.set("leadsCount", 45);
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
    record1.id = "qgfvr5mejlk405m";
    const record1_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record1_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record1.set("userId", record1_userIdLookup.id);
    record1.set("name", "Cloud Solutions LinkedIn Campaign");
    record1.set("sector", "Cloud Computing");
    record1.set("channel", "linkedin");
    record1.set("status", "active");
    record1.set("leadsCount", 32);
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
    record2.id = "qppadhaoawolvhb";
    const record2_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record2_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record2.set("userId", record2_userIdLookup.id);
    record2.set("name", "Cybersecurity Webinar Series");
    record2.set("sector", "Cybersecurity");
    record2.set("channel", "webinar");
    record2.set("status", "planning");
    record2.set("leadsCount", 0);
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  const seededRecordIds = ["qppadhaoawolvhb", "qgfvr5mejlk405m", "v1h528qxp1ykmmn"];
  for (const seededRecordId of seededRecordIds) {
    try {
      app.delete(app.findRecordById("campaigns", seededRecordId));
    } catch (error) {
      if (error.message.includes("no rows in result set")) {
        continue;
      }
      throw error;
    }
  }
})
