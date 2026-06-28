/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("companySettings");

  const record0 = new Record(collection);
    record0.id = "1w579eiw70e4jfi";
    const record0_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record0_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record0.set("userId", record0_userIdLookup.id);
    record0.set("companyName", "Demo Company Inc");
    record0.set("contactEmail", "contact@democompany.com");
    record0.set("businessHours", "Monday-Friday 9:00 AM - 6:00 PM CET");
    record0.set("contactPolicy", "Contact only during business hours. No calls before 9 AM or after 6 PM.");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  const seededRecordIds = ["1w579eiw70e4jfi"];
  for (const seededRecordId of seededRecordIds) {
    try {
      app.delete(app.findRecordById("companySettings", seededRecordId));
    } catch (error) {
      if (error.message.includes("no rows in result set")) {
        continue;
      }
      throw error;
    }
  }
})
