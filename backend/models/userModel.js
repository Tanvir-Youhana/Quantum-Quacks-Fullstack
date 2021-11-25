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
    first_name: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    last_name:
    {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
    }
}, {
    freezeTableName: true,
    timestamps:false,
    createdAt: false,
    updatedAt: false,
}); 
 
export default User;