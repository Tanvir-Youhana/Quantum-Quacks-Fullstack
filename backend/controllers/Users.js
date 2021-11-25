import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        //console.log(users.every(user => user instanceof User)); // true
        //console.log("All users: ", JSON.stringify(users));
        //res.json("Test!");
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }  
}