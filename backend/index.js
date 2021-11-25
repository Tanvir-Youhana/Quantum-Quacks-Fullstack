import express from "express";
import db from "./config/database.js";
//import productRoutes from "./routes/index.js";
import userRoutes from "./routes/index.js"; 
import cors from "cors";
import User from "./models/userModel.js";
 
const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}


/*
db.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
  });
*/

app.use(cors());
app.use(express.json());
app.use('/', userRoutes); 
//app.use('/products', productRoutes);

app.listen(5000, () => console.log('Server running at port 5000'));

