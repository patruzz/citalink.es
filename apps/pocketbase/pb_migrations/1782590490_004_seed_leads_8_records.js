/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("leads");

  const record0 = new Record(collection);
    record0.id = "in8352o0rxrcuzg";
    const record0_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record0_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record0.set("userId", record0_userIdLookup.id);
    record0.set("name", "Carlos Mendez");
    record0.set("company", "TechVision Solutions");
    record0.set("email", "carlos.mendez@techvision.com");
    record0.set("phone", "+34 912 345 678");
    record0.set("sector", "Technology");
    record0.set("source", "LinkedIn");
    record0.set("status", "qualified");
    record0.set("score", 85);
    record0.set("nextAction", "Schedule demo");
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
    record1.id = "zsw0qnw3j68o61i";
    const record1_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record1_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record1.set("userId", record1_userIdLookup.id);
    record1.set("name", "Maria Garcia");
    record1.set("company", "Innovate Consulting");
    record1.set("email", "maria.garcia@innovate.es");
    record1.set("phone", "+34 934 567 890");
    record1.set("sector", "Consulting");
    record1.set("source", "Referral");
    record1.set("status", "contacted");
    record1.set("score", 72);
    record1.set("nextAction", "Send proposal");
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
    record2.id = "khxtvvzprb31y9v";
    const record2_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record2_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record2.set("userId", record2_userIdLookup.id);
    record2.set("name", "Juan Rodriguez");
    record2.set("company", "Digital Dynamics");
    record2.set("email", "juan.rodriguez@digitaldyn.com");
    record2.set("phone", "+34 956 234 567");
    record2.set("sector", "Marketing");
    record2.set("source", "Cold Email");
    record2.set("status", "new");
    record2.set("score", 45);
    record2.set("nextAction", "Initial contact");
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
    record3.id = "jyomwc69opojgde";
    const record3_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record3_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record3.set("userId", record3_userIdLookup.id);
    record3.set("name", "Ana Lopez");
    record3.set("company", "Enterprise Systems Inc");
    record3.set("email", "ana.lopez@enterprise.com");
    record3.set("phone", "+34 913 456 789");
    record3.set("sector", "Enterprise Software");
    record3.set("source", "Event");
    record3.set("status", "negotiating");
    record3.set("score", 92);
    record3.set("nextAction", "Contract review");
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
    record4.id = "i3z0m1arui5ww3k";
    const record4_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record4_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record4.set("userId", record4_userIdLookup.id);
    record4.set("name", "Pedro Sanchez");
    record4.set("company", "Growth Partners");
    record4.set("email", "pedro.sanchez@growthpartners.com");
    record4.set("phone", "+34 923 456 789");
    record4.set("sector", "Business Services");
    record4.set("source", "Website");
    record4.set("status", "qualified");
    record4.set("score", 78);
    record4.set("nextAction", "Follow-up call");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.id = "kcmdrixgxaircpw";
    const record5_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record5_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record5.set("userId", record5_userIdLookup.id);
    record5.set("name", "Sofia Martinez");
    record5.set("company", "Cloud Innovations");
    record5.set("email", "sofia.martinez@cloudinnovate.com");
    record5.set("phone", "+34 934 123 456");
    record5.set("sector", "Cloud Computing");
    record5.set("source", "LinkedIn");
    record5.set("status", "contacted");
    record5.set("score", 68);
    record5.set("nextAction", "Send case study");
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.id = "z9zetxiqhiimn97";
    const record6_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record6_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record6.set("userId", record6_userIdLookup.id);
    record6.set("name", "Miguel Fernandez");
    record6.set("company", "Data Analytics Pro");
    record6.set("email", "miguel.fernandez@dataanalytics.com");
    record6.set("phone", "+34 945 678 901");
    record6.set("sector", "Data & Analytics");
    record6.set("source", "Webinar");
    record6.set("status", "new");
    record6.set("score", 55);
    record6.set("nextAction", "Qualify interest");
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.id = "g62u0m1rw76hy6j";
    const record7_userIdLookup = app.findFirstRecordByFilter("users", "email='demo@example.com'");
    if (!record7_userIdLookup) { throw new Error("Lookup failed for userId: no record in 'users' matching \"email='demo@example.com'\""); }
    record7.set("userId", record7_userIdLookup.id);
    record7.set("name", "Isabel Ruiz");
    record7.set("company", "Security First Corp");
    record7.set("email", "isabel.ruiz@securityfirst.com");
    record7.set("phone", "+34 956 789 012");
    record7.set("sector", "Cybersecurity");
    record7.set("source", "Referral");
    record7.set("status", "qualified");
    record7.set("score", 88);
    record7.set("nextAction", "Schedule presentation");
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  const seededRecordIds = ["g62u0m1rw76hy6j", "z9zetxiqhiimn97", "kcmdrixgxaircpw", "i3z0m1arui5ww3k", "jyomwc69opojgde", "khxtvvzprb31y9v", "zsw0qnw3j68o61i", "in8352o0rxrcuzg"];
  for (const seededRecordId of seededRecordIds) {
    try {
      app.delete(app.findRecordById("leads", seededRecordId));
    } catch (error) {
      if (error.message.includes("no rows in result set")) {
        continue;
      }
      throw error;
    }
  }
})
