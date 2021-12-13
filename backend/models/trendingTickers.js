import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const trendingTickers = db.define('trending_tickers',{
    symbol:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastPrice:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    change: {
        type: DataTypes.DOUBLE, 
        allowNull: false, 
    },
    percent_change:
    {
        type: DataTypes.DOUBLE,
        allowNull: false, 
    },

}, {
    freezeTableName: true,
    timestamps:false,
    createdAt: false,
    updatedAt: false,
}); 
 
export default trendingTickers;