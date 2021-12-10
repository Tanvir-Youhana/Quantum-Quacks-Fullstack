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
    currentPrice: {
        type: DataTypes.DECIMAL(10,2),
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
    },
    expirationAt: 
    {
        type: DataTypes.DATE, 
        allowNull: true,    
    }
}, {
    freezeTableName: true,
    timestamps:true,
    createdAt: true,
    updatedAt: false,
}); 
 
export default stockEntry;