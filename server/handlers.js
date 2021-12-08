"use-strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

const getAllListing = async (req, res) => {};

const getListingByUser = async (req, res) => {};

const getListingByCategories = async (req, res) => {};

const addListing = async (req, res) => {
  const { title, category, zone, description, email } = req.body;
  const _id = uuidv4();
  console.log(req.body);

  if (!title || !category || !zone || !description || !email) {
    return res.status(404).json({ status: 404, data: "Some info is missing" });
  }
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const add = await db.collection("ads").insertOne({ _id, ...req.body });
    if (add) {
      res.status(200).json({ status: 200, added: req.body });
    } else {
      res.status(404).json({ status: 404, message: "Not Found" });
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const getCurrentUser = async (req, res) => {
  const { email } = req.query;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");
    const result = await db.collection("users").findOne({ email });
    if (result) {
      res.status(200).json({ status: 200, email, data: result });
    } else {
      res.status(404).json({ status: 404, email, message: "Not found" });
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: err });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const modifyProfile = async (req, res) => {
  const { nickname, name, location, bio, email } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  const updatedValues = {
    $set: {
      location: location,
      bio: bio,
      nickname: nickname,
      name: name,
    },
  };
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const update = await db
      .collection("users")
      .updateOne({ email }, updatedValues);
    if (update) {
      res.status(200).json({ status: 200, modify: update });
    } else {
      res.status(404).json({ status: 404, message: "Not Found" });
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

module.exports = {
  getAllListing,
  getListingByUser,
  getListingByCategories,
  addListing,
  getCurrentUser,
  modifyProfile,
};
