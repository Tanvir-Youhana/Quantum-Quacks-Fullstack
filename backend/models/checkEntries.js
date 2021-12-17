import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const entryCheck = db.define('check_entry',{
    checkID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    checkEntryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actualPrice: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    accuracy: {
        type: DataTypes.STRING,
        allowNull: true 
    }
}, {
    freezeTableName: true,
    timestamps:true,
    createdAt: true,
    updatedAt: false,
}); 
 
export default entryCheck;