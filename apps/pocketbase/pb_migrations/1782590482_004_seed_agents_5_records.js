/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("agents");

  const record0 = new Record(collection);
    record0.id = "jokutvp6yy151rl";
    const record0_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record0_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record0.set("userId", record0_userIdLookup.id);
    record0.set("name", "Email SDR");
    record0.set("type", "email");
    record0.set("channel", "email");
    record0.set("active", true);
    record0.set("tone", "profesional");
    record0.set("objective", "prospecci\u00f3n y seguimiento");
    record0.set("workingHours", "9-18");
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
    record1.id = "j6hjabaxeyx14ll";
    const record1_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record1_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record1.set("userId", record1_userIdLookup.id);
    record1.set("name", "Phone SDR");
    record1.set("type", "phone");
    record1.set("channel", "tel\u00e9fono");
    record1.set("active", true);
    record1.set("tone", "amable");
    record1.set("objective", "llamadas y agenda");
    record1.set("workingHours", "9-18");
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
    record2.id = "oxp0ytgnjf07s1n";
    const record2_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record2_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record2.set("userId", record2_userIdLookup.id);
    record2.set("name", "Qualifier");
    record2.set("type", "qualifier");
    record2.set("channel", "multi");
    record2.set("active", true);
    record2.set("tone", "anal\u00edtico");
    record2.set("objective", "puntuaci\u00f3n de leads");
    record2.set("workingHours", "24/7");
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
    record3.id = "h1k535df77wmegr";
    const record3_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record3_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record3.set("userId", record3_userIdLookup.id);
    record3.set("name", "Scheduler");
    record3.set("type", "scheduler");
    record3.set("channel", "multi");
    record3.set("active", true);
    record3.set("tone", "eficiente");
    record3.set("objective", "confirmaci\u00f3n de citas");
    record3.set("workingHours", "9-20");
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
    record4.id = "fhcsexcgu6rn7o1";
    const record4_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record4_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record4.set("userId", record4_userIdLookup.id);
    record4.set("name", "Compliance");
    record4.set("type", "compliance");
    record4.set("channel", "multi");
    record4.set("active", true);
    record4.set("tone", "riguroso");
    record4.set("objective", "gesti\u00f3n de consentimiento");
    record4.set("workingHours", "24/7");
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
  const seededRecordIds = ["fhcsexcgu6rn7o1", "h1k535df77wmegr", "oxp0ytgnjf07s1n", "j6hjabaxeyx14ll", "jokutvp6yy151rl"];
  for (const seededRecordId of seededRecordIds) {
    try {
      app.delete(app.findRecordById("agents", seededRecordId));
    } catch (error) {
      if (error.message.includes("no rows in result set")) {
        continue;
      }
      throw error;
    }
  }
})
