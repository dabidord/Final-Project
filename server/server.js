"use strict";
const express = require("express");
const PORT = 8000;
const app = express();
app.use(express.json());
require("dotenv").config();

const { addListing, modifyProfile } = require("./handlers");

app.post("/listing", addListing);
app.put("/profile", modifyProfile);

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
