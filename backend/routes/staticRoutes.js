import express from "express"; 
import {
    getTrendingTickers
} from "../controllers/Static.js";

const router = express.Router(); 

router.get('/test', getTrendingTickers);