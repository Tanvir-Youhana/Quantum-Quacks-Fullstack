import express from "express";
import db from "./config/database.js";
//import productRoutes from "./routes/index.js";
import userRoutes from "./routes/index.js"; 
import cors from "cors";
import User from "./models/userModel.js";
import bodyParser from "body-parser"; 
import cookieParser from "cookie-parser";
import session from "express-session";


const app = express();
app.use(express.json());
// const db = require("./models");
const port= process.env.DB_PORT
try {
    await db.authenticate();
    console.log('Database connected...');
    db.sync();
    console.log('Creating all the tables defined in user');
} catch (error) {
    console.error('Connection error:', error);
}

/*
db.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
  });
*/
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true 
}));
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "emailID",
    secret: "asbadbbdbbh7",
    resave: false,
    saveUninitialize: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}));

//app.use('/', staticRoutes); 
//app.use(bodyParser.urlencoded({extended: false}));  
//app.use(bodyParser.json());
app.use('/', userRoutes); 
//app.use('/products', productRoutes);
// db.Sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server running at port ${port}...`));



