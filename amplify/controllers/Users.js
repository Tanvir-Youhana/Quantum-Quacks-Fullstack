import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import db from "../config/database.js";
const SECRET = "asbadbbdbbh7";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        //console.log(users.every(user => user instanceof User)); // true
        //console.log("All users: ", JSON.stringify(users));
        //res.json("Test!");
        res.json(users);
    } catch (error) {
        res.json({
            message: error.message
        });
    }
}

export const register = async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body; 
        // Check if email already exist 
        const isEmailExist = await User.findOne({where: {email}}).catch(
            (err) => {
                console.log("Error: ", err)
            }); 
        if(isEmailExist)
        {
            return res.status(202).json({message: "Email has already been taken."})
        }
        const newUser = new User({first_name, last_name, email, password});
        const savedUser = await newUser.save().catch((err) => {
            console.log("Error: ", err);
            return res.status(500).json({message: "Cannot register user at the moment"})
        })
        if(savedUser)
        {
            res.json({message: "Your registration has been successfully completed"})
        }

    } catch (e)
    {
        res.status(500).send(e.message); 
    }
}

export const login = async (req, res) => {
    try 
    {
        const {email, password, first_name, last_name} = req.body; 
        const user = await User.findOne({where: {email}}).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );
        // If email does not exist or if password is incorrect 
        if(!user || (user.password !== password))
        {
            return res.status(202).json({message: "Email or password does not match!"});
        }
        res.status(201).json({message: "Login successful!"}); 
    } catch (e)
    {
        res.status(500).send(e.message); 
    }
}