import stockEntry from '../models/stockEntries.js';
import checkEntry from '../models/checkEntries.js';
import yahooFinance from 'yahoo-finance'; 
import StockSocket from 'stocksocket';
import cts from 'check-ticker-symbol';
import moment from 'moment-timezone';
import { Sequelize } from "sequelize";

// Get current user stock list. Still work in progress. 
export const userStockList = async(req, res) => {
    try {
        const list = await stockEntry.findAll({
            attributes: ['tickerName'],
            where: {
                userID: req.params.id
            }
        })
        // JSON.stringify(list, null, 2); 
        return res.status(201).json(list); 
    } catch (e)
    {
        return res.status(500).send(e.message); 
    }
}


// Add user's prediciton entry to database
export const addStockEntry = async(req, res) => {
    try {
        const {userID, tickerName, prediction, timeFrame, confidentLevel, description, priceRange} = req.body; 

        // Set userID to stored user.id  
            //const userID = userID; 
        // Check if tickerName is valid 
        /*
        */
       if(!cts.valid(tickerName))
       {
           return res.status(404).json({message: "Ticker name is invalid."});
       }
       // Check if entry has same tickerName + timeFrame
       /*
       const duplicatEntry = await stockEntry.findOne({
           attributes: ['tickerName', 'timeFrame'],
           where: {
               userID: userID,
               tickerName: tickerName,
               timeFrame: timeFrame

            }}).catch(
           (err) => {
               console.log("Error: ", err); 
           }
       );
       if(duplicatEntry)
        {
            return res.status(404).json({message: "Entry already exist"});
        }
        */

        // Make sure we get userID from jswebtoken 

        // Get currentPrice
        let currentPrice; 
        await yahooFinance.quote({
            symbol: tickerName,
            modules: ['price'] //summaryDetail
        }, function(err, quotes) {
            if(err)
            {
                return res.status(404).json("error");
            } else {
                 currentPrice = (quotes.price.regularMarketPrice).toFixed(2);
            }
        })

        console.log("currentPrice: " + currentPrice);

        let expirationAt = new Date("July 21, 1983 01:15:00"); 
        const newStockEntry = await stockEntry.create({
            userID: userID, // req.params.user_id from jswebtoken
            tickerName: tickerName,    // Valid Ticker Name
            prediction: prediction,    // Bullish / Bearish 
            timeFrame: timeFrame,      // EOD / EOW / EOM
            confidentLevel: confidentLevel, // 1 - 10 
            description: description, // [String]
            priceRange: priceRange, // [String] 
            currentPrice: currentPrice, // get currentPrice from API 
            expirationAt: expirationAt //  Calculate expiration using Sequelize 
        });
        res.json("Stock Entry added!")
        
        // Create expirationAt
        if(timeFrame == "EOD") {
            //newStockEntry.expirationAt = newStockEntry.createdAt;
            //newStockEntry.expirationAt = new Date(new Date(newStockEntry.createdAt).getTime() + 24 * 60 * 60 * 1000);

            newStockEntry.expirationAt = new Date(newStockEntry.createdAt).setHours(16, 0, 0); 

            await newStockEntry.save(); 
            console.log("Check ExpirationAt: " + newStockEntry.expirationAt);
        } 


        const {checkEntryID, actualPrice, accuracy} = req.body; 

        const newCheckEntry = await checkEntry.create({
            checkEntryID: checkEntryID,
            actualPrice: actualPrice,
            accuracy: accuracy
        })
        console.log("Check Entry also added!"); 

    } catch (e) 
    {
        return res.status(500).send(e.message); 
    }
}

// Currently use this to get historical price data. 
export const getHistorical = async(req, res) => {
    yahooFinance.historical({
        symbol: req.params.symbol, // req.params.symbol 
        from: '2021-12-01',
        to: '2021-12-08',
    }, function(err, quotes) {
        if(err)
        {
            return res.status(404).json("error");
        } else {
            return res.status(201).json(quotes); 
        }
    })
}

// Currently use this to get current price
export const yahooRealTime = async(req, res) => {

    yahooFinance.quote({
        symbol: 'KO',
        modules: ['price'] //summaryDetail
    }, function(err, quotes) {
        if(err)
        {
            return res.status(404).json("error");
        } else {
            return res.status(201).json(quotes); 
            //return res.status(201).json(quotes.price.regularMarketPrice);
        }
    })
}

// Currently not using this. Constantly output price but not sure how to use it. 
/*
export const addTickers = async(req, res) => {
    const tickerName = req.params.ticker;
    StockSocket.addTicker(stock);
}

export const getRealTime = async(req, res) => {

        
        StockSocket.addTicker("AAPL", stockPriceChanged);

        function stockPriceChanged(data)
        {
            //console.log(data);
            res.json(data); 
        }
                //StockSocket.removeTicker("AAPL"); 
                
               
        StockSocket.addTicker("AAPL", function(err, stockPriceChanged) {
            if(err)
            {
                return res.status(404).json("error");
            } else {
                return res.status(201).json(stockPriceChanged);
            }
        })
}   
*/