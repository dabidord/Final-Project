"use-strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

const addListing = async (req, res) => {
  const { Title, Category, Zone, Description, email } = req.body;
  const _id = uuidv4();
  console.log(req.body);

  if (!Title || !Category || !Zone || !Description || !email) {
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

const modifyProfile = async (req, res) => {
  const { Nickname, Name, Location, Bio, email } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  const updatedValues = {
    $set: {
      Location,
      Bio,
      Nickname,
      Name,
    },
  };

  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");
    const update = await db
      .collection("users")
      .updateOne(email, { updatedValues });
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

module.exports = { addListing, modifyProfile };
