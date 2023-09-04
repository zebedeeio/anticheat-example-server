const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");
const PlayFab = require("playfab-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase admin SDK
const serviceAccount = require("./flappysats-ec2c0-942613c139cf.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// PlayFab settings
PlayFab.settings.titleId = "E6240";
PlayFab.settings.developerSecretKey =
  "IAIFIIFBHJXJMME8JBGY99HW4GMD1PCWF1J4BEAPNGMN64BHXX";

app.use(express.json());

app.post("/verify-app-check-token", async (req, res) => {
  const token = req.body.token;
  const playFabId = req.body.playFabId;

  if (!token || !playFabId) {
    return res.status(400).send({ error: "Token or PlayFabId is missing" });
  }

  try {
    // Verify Firebase App Check token
    const decodedToken = await admin.appCheck().verifyToken(token);

    if (decodedToken) {
      // Store "verified" in PlayFab readonly user data
      const updateData = {
        PlayFabId: playFabId,
        Data: { verified: "true" },
      };

      PlayFab.UpdateUserReadOnlyData(updateData, (error, result) => {
        if (error) {
          return res.status(500).send({ error: error.errorMessage });
        }
        return res.send({ success: true });
      });
    } else {
      return res.status(401).send({ error: "Invalid token" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
