"use strict";
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("tiny"));
app.use(express.json());
const PORT = 8000;

const {
  getAllListing,
  getListingByUser,
  getListingById,
  addListing,
  getUserById,
  addUserInfo,
  addReview,
  modifyProfile,
} = require("./handlers");

app.get("/listing", getAllListing);
app.get("/user/listing/:email", getListingByUser);
app.get("/listing/:_id", getListingById);
app.post("/listing", addListing);
app.put("/user/:email", addUserInfo);
app.get("/user/:email", getUserById);
app.put("/userrate/:email", addReview);
app.put("/profile", modifyProfile);

app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
