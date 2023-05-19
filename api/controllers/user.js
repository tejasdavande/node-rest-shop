const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send({
        error: false,
        message: "Email id already exists.",
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          req.status(400).json({ message: "password hashing not done" });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
          });
          console.log(user);
          user.save();
          res.status(201).json({ message: "new user saved" });
        }
      });
    }
  } catch (error) {
    throw error;
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "user not available" });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          res.status(404).json({ message: "password not encoded" });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "30h",
            }
          );
          res.status(200).json({
            message: "Auth succesfull",
            token: token,
          });
        }
      });
    }
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedResponse = await User.deleteOne({ _id: req.params.userId });
    if (deletedResponse) {
      res.status(200).json({
        message: "user found and deleted",
      });
    } else {
      res.status(200).json({
        error: true,
        message: "user not found",
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signup,
  login,
  deleteUser,
};
