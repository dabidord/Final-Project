const express = require("express");
const PORT = 8000;
var app = express();
require("dotenv").config();
const { auth, requiresAuth } = require("express-openid-connect");
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};
app.use(express.json());
app.use(auth(config));

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
