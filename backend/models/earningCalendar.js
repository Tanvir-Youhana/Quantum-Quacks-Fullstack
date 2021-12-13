import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const earningCalendar = db.define('earning_calendar',{
    symbol:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reportDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fiscalDateEnding: {
        type: DataTypes.DATE,
        allowNull: true 
    },
    estimate: {
        type: DataTypes.DOUBLE,
        allowNull: true, 
    },
    exchange: {
        type: DataTypes.STRING,
        allowNull: true, 
    }
}, {
    freezeTableName: false,
    timestamps:false,
    createdAt: false,
    updatedAt: false,
}); 
 
export default earningCalendar;