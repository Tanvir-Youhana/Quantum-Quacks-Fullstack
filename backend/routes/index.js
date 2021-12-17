import express from "express";
import {auth, getAllUsers, register, login, getLogin, updatePassword } from "../controllers/Users.js";
import {chartTest, tickerValidity, deleteEntryRow, retrieveStockList, checkUserEntry, oldStockEntries, yahooRealTime, userStockList, addStockEntry, getHistorical, retrieveActualList} from "../controllers/Stocks.js";
import {retrieveTrendingTickers, getEarningCalendar, getIPOCalendar, getListingStatus, getMarketHolidays, getTrendingTickers, retrieveMarketHolidays,retrieveipoCalendar,retrieveEarningCalendar } from "../controllers/Static.js";
import validateToken from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Delete
router.delete('/deleteEntryRow', validateToken, deleteEntryRow); 

// Retrieve Database
router.get('/retrieveTrendingTickers', retrieveTrendingTickers);
router.get('/retrieveMarketHolidays', retrieveMarketHolidays);
router.get('/retrieveipoCalendar', retrieveipoCalendar);
router.get('/retrieveEarningCalendar', retrieveEarningCalendar); 
router.get('/retrieveStockList', validateToken, retrieveStockList);
router.get('/retrieveActualList', validateToken, retrieveActualList); 
// Static Routes
router.get('/ListingStatus', getListingStatus);
router.get('/earningCalendar', getEarningCalendar); 
router.get('/ipoCalendar', getIPOCalendar);
router.get('/marketHolidays', getMarketHolidays); 
router.get('/trendingTickers', getTrendingTickers);

// Stock Routes
//router.get('/', getAllUsers);
router.get('/checkUserEntry', validateToken, checkUserEntry);
router.get('/oldStockEntries', oldStockEntries);
router.get('/yahooRealTime', yahooRealTime); 
router.get('/stocklist', userStockList); 
router.post('/entry/ticker', validateToken, addStockEntry);
router.get('/stock/:symbol', getHistorical); 
router.get('/chart/:symbol', chartTest); 	
router.get('/ticker/:ticker', tickerValidity)

// User Routes
router.get('/auth', validateToken, auth);
router.post('/login', login);
router.get('/login', getLogin); 
router.post('/register', register); 
router.put('/setting', validateToken, updatePassword);
 
export default router;
