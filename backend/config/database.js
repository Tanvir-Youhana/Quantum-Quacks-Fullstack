import { Sequelize } from "sequelize";
require("dotenv").config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

// Need to change credentials 
const db = new Sequelize('DB_DATABASE', 'DB_USER', 'DB_PASSWORD', { // (Database_Name, User, Password)
    host: "DB_HOST",
    dialect: "mysql"
});
 
export default db;