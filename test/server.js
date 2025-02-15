const express = require("express");
const crypto = require("crypto");
const authsy = require("../src/index");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

const secretKey = "mySecretKey";
const auth = new authsy(secretKey, true, false);

function getClientIP(req) {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
}

app.post("/generate-token", (req, res) => {
    const { userId, tokenVersion } = req.body;
    const token = auth.signToken({ userId }, tokenVersion)
    res.json({ token });
});

app.post("/verify-token", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const result = auth.verifyToken(token);
    res.json(result);
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
