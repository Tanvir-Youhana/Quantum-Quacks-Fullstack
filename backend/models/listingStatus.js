import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const listingStatus = db.define('listing_status',{
    symbol:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    exchange: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    assetType: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    ipoDate: {
        type: DataTypes.DOUBLE,
        allowNull: true, 
    },
    delistingDate: {
        type: DataTypes.DATE,
        allowNull: true, 
    }
}, {
    freezeTableName: true,
    timestamps:false,
    createdAt: false,
    updatedAt: false,
}); 
 
export default listingStatus;