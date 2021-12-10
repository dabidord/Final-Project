"use strict";
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("tiny"));
app.use(express.json());
const PORT = 8080;

const {
  getAllListing,
  getListingByUser,
  getListingById,
  addListing,
  getUserById,
  addUserInfo,
  modifyProfile,
} = require("./handlers");

app.get("/listing", getAllListing);
app.get("/listingUser", getListingByUser);
app.get("/listing/:_id", getListingById);
app.put("/user/:email", addUserInfo);
app.get("/user/:email", getUserById);
app.post("/listing", addListing);
app.put("/profile", modifyProfile);

app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
