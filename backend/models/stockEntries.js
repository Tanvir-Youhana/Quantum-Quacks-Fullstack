import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const stockEntry = db.define('stock_entry',{
    entryID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tickerName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    prediction: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    timeFrame:
    {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    confidentLevel: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    description: 
    {
        type: DataTypes.STRING,
        allowNull: true,
    },
    priceRange:
    {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true,
    timestamps:false,
    createdAt: false,
    updatedAt: false,
}); 
 
export default stockEntry;