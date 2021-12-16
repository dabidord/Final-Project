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
    await client.connect();
    console.log("connected");
    const db = client.db("FinalProject");
    const result = await db.collection("ads").find(query).toArray();
    if (!result || result.length == 0) {
      // Return error if no results or errors
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

const addReview = async (req, res) => {
  const { email } = req.params;
  const { rating, review, from } = req.body;
  const _id = uuidv4();
  const timestamp = new Date().toISOString();
  const values = {
    $set: {
      rating,
    },
    $push: {
      reviews: { _id, review, from, rating, timestamp },
    },
  };
  //https://docs.mongodb.com/manual/reference/operator/update/push/
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const rating = await db.collection("users").updateOne({ email }, values);
    if (rating) {
      res.status(200).json({ status: 200, added: rating });
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
  const { nickname, name, location, bio, email, userpicture, rating } =
    req.body;
  const timestamp = new Date().toISOString();
  const updatedValuez = {
    $set: {
      location: location,
      bio: bio,
      nickname: nickname,
      name: name,
      userpicture: userpicture,
    },
  };
  const updatedValues = {
    $set: {
      location: location,
      bio: bio,
      nickname: nickname,
      name: name,
      userpicture: userpicture,
      rating: rating,
    },
  };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const foundUser = await db.collection("users").findOne({ email });
    if (foundUser.rating) {
      const update1 = await db
        .collection("users")
        .updateOne({ email }, updatedValuez);
      if (update1) {
        res.status(200).json({ status: 200, modify: update1, timestamp });
      } else {
        res.status(404).json({ status: 404, message: "Not Found" });
      }
    } else {
      const update2 = await db
        .collection("users")
        .updateOne({ email }, updatedValues);
      if (update2) {
        res.status(200).json({ status: 200, modify: update2, timestamp });
      } else {
        res.status(404).json({ status: 404, message: "Not Found" });
      }
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const addReaction = async (req, res) => {
  const { _id } = req.params;
  const { from, reaction, user } = req.body;
  const timestamp = new Date().toISOString();
  const values = {
    $push: {
      reactions: { user, from, reaction, timestamp },
    },
  };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const reaction = await db.collection("ads").updateOne({ _id }, values);
    if (reaction) {
      res.status(200).json({ status: 200, added: values });
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

module.exports = {
  getAllListing,
  getListingByUser,
  getListingById,
  addListing,
  getUserById,
  addReview,
  modifyProfile,
  addReaction,
};
