const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");


// Initialize Firebase Admin
const serviceAccount = require("../scripts/serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://aerocog-in-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Export Firestore for use in the script
const db = admin.firestore();


// File path for expertData.js
const dataFilePath = path.join(__dirname, "../data/expertsData.js");
async function listenExperts() {
  const expertsCollection = db.collection("experts");

  expertsCollection.onSnapshot(snapshot => {
    const experts = [];
    snapshot.forEach(doc => {
      const expertData = doc.data();
      experts.push(expertData);
    });

    // Convert experts array into a JavaScript exportable file
    const fileContent = `export const expertData = ${JSON.stringify(experts, null, 2)};`;

    // Write to expertData.js
    fs.writeFileSync(dataFilePath, fileContent, "utf8");
    console.log("expertData.js updated successfully!");
  });
}

listenExperts();
console.log("Firebase Admin Initialized");
module.exports = { db };
