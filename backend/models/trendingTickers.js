import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const trendingTickers = db.define('trending_tickers',{
    symbol:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    shortName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    regularMarketPrice:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },

    regularMarketChange: {
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false, 
    },
    regularMarketChangePercent:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false, 
    },

}, {
    freezeTableName: true,
    timestamps:false,
    createdAt: false,
    updatedAt: false,
}); 
 
export default trendingTickers;