import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import db from "../config/database.js";
//const SECRET = "asbadbbdbbh7";
import session from "express-session";

export const auth = (req, res) => {
  console.log("auth test");
  res.json(req.user);
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    //console.log(users.every(user => user instanceof User)); // true
    //console.log("All users: ", JSON.stringify(users));
    //res.json("Test!");
    res.json(users);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    console.log("register start");
    const { first_name, last_name, email, password } = req.body;

    // Check if email already exist
    const isEmailExist = await User.findOne({ where: { email: email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
    if (isEmailExist) {
      return res.status(202).json({ error: "Email has already been taken." });
    }
    bcrypt.hash(password, 10).then((hash) => {
      User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hash,
      });
      res.json({ message: "Registration Successful" });
    });

    // const newUser = new User({first_name, last_name, email, password});
    // const savedUser = await newUser.save().catch((err) => {
    //     console.log("Error: ", err);
    //     return res.status(500).json({message: "Cannot register user at the moment"})
    // })
    // if(savedUser)
    // {
    //     res.json({message: "Your registration has been successfully completed"})
    // }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const login = async (req, res) => {
  try {
    console.log("login test");
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) return res.json({ error: "User Doesn't Exist" });

    bcrypt.compare(password, user.password).then((match) => {
      if (!match)
        return res.json({ error: "Wrong Username And Password Combination" });

      const accessToken = jwt.sign(
        { email: user.email, id: user.id },
        "importantsecret"
      );
      return res.json(accessToken);
      //return res.json({token: accessToken, email: email, id: user.id});
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

export const getLogin = async (req, res) => {
  if (req.session.email) {
    res.send({ loggedIn: true, email: req.session.email });
  } else {
    res.send({ loggedIn: false });
  }
};
export const updatePassword = async (req, res) => {
  try {
    // Check if user did not type in the correct old password
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ where: { email: req.user.email } });

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
      if (!match) return res.json({ error: "Old password is incorrect!" });

      // Check if newPassword and confirmPassword are matching
      if (newPassword != confirmPassword) {
        return res.json({
          error: "The new password and confirm password does not match",
        });
      }
      bcrypt.hash(newPassword, 10).then((hash) => {
        User.update({ password: hash }, { where: { email: req.user.email } });
        console.log("Successfully updated password");
        return res.json({ message: "Successfully updated password!" });
      });
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
