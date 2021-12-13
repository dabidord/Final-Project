"use-strict";
require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

const getAllListing = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    const { category, zone } = req.query;

    const query = {};
    if (category !== undefined) {
      query["category"] = category;
    }
    if (zone !== undefined) {
      query["zone"] = zone;
    }
    console.log(query);

    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");
    const result = await db.collection("ads").find(query).toArray();
    if (!result || result.length == 0) {
      // Return error if no results or errors
      console.log(result);

      return res.status(500).json({
        status: 500,
        data: req.query,
        message: "Could not find any items",
      });
    } else {
      // Return data if OK
      res.status(200).json({
        status: 200,
        data: result,
        message: `Found ${result.length} results`,
      });
    }
    client.close();
    console.log("disconnected");
  } catch (err) {
    res.status(404).json({ status: 404, message: err });
  }
};

const getListingById = async (req, res) => {
  const { _id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");
    const result = await db.collection("ads").findOne({ _id });
    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, message: "Not found" });
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: err });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const getListingByUser = async (req, res) => {
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");
    const result = await db.collection("ads").find({ email }).toArray();
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

const addListing = async (req, res) => {
  const {
    title,
    category,
    zone,
    description,
    email,
    name,
    nickname,
    userpicture,
    location,
    price,
  } = req.body;
  const _id = uuidv4();
  const timestamp = new Date().toISOString();

  if (
    !title ||
    !category ||
    !zone ||
    !description ||
    !email ||
    !name ||
    !nickname ||
    !userpicture ||
    !location ||
    !price
  ) {
    return res.status(404).json({ status: 404, data: "Some info is missing" });
  }
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const add = await db
      .collection("ads")
      .insertOne({ _id, ...req.body, timestamp });
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

const getUserById = async (req, res) => {
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");
    const user = await db.collection("users").findOne({ email });
    if (user) {
      res.status(200).json({ status: 200, email, data: user });
    } else {
      res.status(404).json({ status: 404, email, message: "Not Found" });
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: err });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const addUserInfo = async (req, res) => {
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  const { userpicture } = req.body;
  try {
    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");
    const add = await db.collection("users").updateOne({ email }, ...req.body);
    if (add) {
      res.status(200).json({ status: 200, email, added: req.body });
    } else {
      res.status(404).json({ status: 404, email, message: "Not Found" });
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: err });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const addReview = async (req, res) => {
  const { email } = req.params;
  const { rating, review } = req.body;
  const values = {
    $set: {
      rating,
    },
    $push: {
      reviews: review,
    },
  };
  //https://docs.mongodb.com/manual/reference/operator/update/push/
  const timestamp = new Date().toISOString();
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const rating = await db.collection("users").updateOne({ email }, values);
    if (rating) {
      console.log(rating);
      res.status(200).json({ status: 200, added: rating, timestamp });
    } else {
      res.status(404).json({ status: 404, message: "Not Found" });
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: "Not Found" });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const modifyProfile = async (req, res) => {
  const { nickname, name, location, bio, email, userpicture } = req.body;
  const timestamp = new Date().toISOString();

  const updatedValues = {
    $set: {
      location: location,
      bio: bio,
      nickname: nickname,
      name: name,
      userpicture: userpicture,
    },
  };

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const update = await db
      .collection("users")
      .updateOne({ email }, updatedValues);
    if (update) {
      res.status(200).json({ status: 200, modify: update, timestamp });
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
  getListingById,
  addListing,
  getUserById,
  addUserInfo,
  addReview,
  modifyProfile,
};
