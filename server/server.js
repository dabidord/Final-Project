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
  addReview,
  modifyProfile,
  addReaction,
} = require("./handlers");

app.get("/listing", getAllListing);
app.get("/user/listing/:email", getListingByUser);
app.get("/listing/:_id", getListingById);
app.post("/listing", addListing);
app.get("/user/:email", getUserById);
app.put("/userrate/:email", addReview);
app.put("/profile", modifyProfile);
app.post("/reaction/:_id", addReaction);

app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
