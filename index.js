const express = require("express");
const admin = require("firebase-admin");
const PlayFab = require("playfab-sdk");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase admin SDK
const serviceAccount = require("./myserviceaccountjson.json"); //Create a firebase service account and add the json file to the root directory and update the file name here
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// PlayFab settings
PlayFab.settings.titleId = "TITLEID"; // CHANGE THIS WITH YOUR TITLEID
PlayFab.settings.developerSecretKey = "KEY"; //ADD YOUR PLAYFAB DEVELOPER SECRET KEY
var PlayFabServer = PlayFab.PlayFabServer;
app.use(bodyParser.json());
app.use(express.json());

app.post("/verify-app-check-token", async (req, res) => {
  try {
    console.log(req.body);
    const token = req.body.appCheckToken;
    const playFabId = req.body.playFabId;
    const updateData = {
      PlayFabId: playFabId,
      Data: { verified: "false" },
    };
    if (!token || !playFabId) {
      return res.status(400).send({ error: "Token or PlayFabId is missing" });
    }

    if (token === "error") {
      updateUser(updateData, res);
      return;
    }
    // Verify Firebase App Check token
    const decodedToken = await admin.appCheck().verifyToken(token);
    console.log(decodedToken);
    if (decodedToken) {
      // Store "verified" in PlayFab readonly user data
      updateData.Data = { verified: "true" };
      updateUser(updateData, res);
    } else {
      console.log("invalid token");
      return res.status(401).send({ error: "Invalid token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

const updateUser = (updateData, res) => {
  PlayFabServer.UpdateUserInternalData(updateData, (error, result) => {
    if (error) {
      return res.status(500).send({ error: error.errorMessage });
    }
    return res.send({ success: true });
  });
};

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
