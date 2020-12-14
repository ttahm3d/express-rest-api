const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/Users");

router.get("/", async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    password: req.body.password,
    location: req.body.location,
    mobileNumber: req.body.mobileNumber,
  });

  try {
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "User saved successfully", savedUser: savedUser });
  }
});

module.exports = router;
