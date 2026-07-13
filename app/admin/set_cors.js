const { Storage } = require("@google-cloud/storage");

// 1. Point this to your Firebase Service Account JSON key file
// (You can download one from: Firebase Console > Project Settings > Service Accounts > Generate new private key)
const serviceAccountPath = "./serviceAccountKey.json";

const bucketName = "vyralifyin1.firebasestorage.app";

const storage = new Storage({
    keyFilename: serviceAccountPath,
});

async function setCors() {
    try {
        await storage.bucket(bucketName).setCorsConfiguration([
            {
                maxAgeSeconds: 3600,
                method: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
                origin: ["*"], // Allows uploads from localhost and vyralify.in
                responseHeader: ["Content-Type", "Authorization"],
            },
        ]);
        console.log("✅ CORS configuration set successfully!");
    } catch (error) {
        console.error("❌ Failed to set CORS:", error);
    }
}

setCors();
