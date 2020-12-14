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

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        message: "Error in hashing the password",
        error: err,
      });
    } else {
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: hash,
        location: req.body.location,
        mobileNumber: req.body.mobileNumber,
      });

      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "new user created",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error in creating a new user",
            error: err,
          });
        });
    }
  });
});

module.exports = router;
