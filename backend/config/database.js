import { Sequelize } from "sequelize";


// Need to change credentials 
const db = new Sequelize('mern_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;