"use strict";
const express = require("express");
const PORT = 8000;
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
app.use(morgan("tiny"));
app.use(express.json());
require("dotenv").config();

const {
  getAllListing,
  getListingByUser,
  getListingByCategories,
  addListing,
  getCurrentUser,
  modifyProfile,
} = require("./handlers");

app.get("/user", getCurrentUser);
app.post("/listing", addListing);
app.put("/profile", modifyProfile);

app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
