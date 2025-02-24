import "dotenv/config";
import process from "process";
import express from "express";
import crypto from "crypto";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const BOT_TOKEN = process.env.BOT_TOKEN;

function validateTelegramData(initData) {
    console.log("============: ", initData);
    
    const secret = crypto
        .createHmac("sha256", "WebAppData")
        .update(BOT_TOKEN)
        .digest();

    const urlParams = new URLSearchParams(initData);

    const hash = urlParams.get("hash");
    urlParams.delete("hash");

    // Sort the keys in the URL parameters
    const dataCheckString = Array.from(urlParams)
        .map(([key, value]) => `${key}=${value}`)
        .sort()
        .join("\n");

    const computedHash = crypto
        .createHmac("sha256", secret)
        .update(dataCheckString)
        .digest("hex");

    return hash === computedHash;
}

app.post("/auth", (req, res) => {
    const { initData } = req.body;

    if (!initData || !validateTelegramData(initData)) {
        return res
            .status(403)
            .json({ success: false, error: "Invalid request" });
    }

    const urlParams = new URLSearchParams(initData);

    const user = JSON.parse(urlParams.get("user"));

    return res.status(200).json({ success: true, user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
