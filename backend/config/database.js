import { Sequelize } from "sequelize";


// Need to change credentials 
const db = new Sequelize('fullstack', 'root', 'root', { // (Database_Name, User, Password)
    host: "localhost",
    dialect: "mysql"
});
 
export default db;