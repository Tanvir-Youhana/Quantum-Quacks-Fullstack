import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const ipoCalendar = db.define('ipo_calendar',{
    symbol:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ipoDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    priceRangeLow: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    priceRangeHigh: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    exchange: {
        type: DataTypes.STRING,
        allowNull: true, 
    }
}, {
    freezeTableName: true,
    timestamps:false,
    createdAt: false,
    updatedAt: false,
}); 
 
export default ipoCalendar;