import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const User = db.define('user',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    password: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps:false,
    createdAt: false,
    updatedAt: false,
}); 
 
export default User;