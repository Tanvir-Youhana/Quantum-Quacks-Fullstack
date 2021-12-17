import stockEntry from '../models/stockEntries.js';
import checkEntry from '../models/checkEntries.js';
import yahooFinance from 'yahoo-finance'; 
import cts from 'check-ticker-symbol';
import { Sequelize } from 'sequelize';
import User from '../models/userModel.js';

// Refresh button next to each entry. Still work in progress.
export const checkUserEntry = async(req, res) => {
    try {
        // SELECT currentPrice, WHERE userID = this.userID AND expirationAT < currentDate
        const entry = await stockEntry.findAll({
            where: {
                userID: req.params.userID,
                entryID: req.params.entryID
                /*
                expirationAt: {
                    [Op.lt]:
                    Sequelize.fn('NOW')
                }
                */
            }
        });
        const check = await checkEntry.findAll({
            where: {
                entryID: req.params.entryID 
            }
        });
        // Get acutalPrice
        let actualPrice; 
        await yahooFinance.quote({
            symbol: entry.tickerName,
            modules: ['price']
        }, function(err, quotes) {
            if (err)
            {
                return res.status(404).json("error");
            } else {
                actualPrice = (quotes.price.regularMarketPrice).toFixed(2); 
            }
        });
        
        // Create accuracy 
        if(entry.currentPrice < check.actualPrice)
        {
            if(entry.prediction == "Bearish")
            {
                check.accuracy = "False";
            } else {
                check.accuracy = "True";
            }
        }
        if(entry.currentPrice > check.actualPrice)
        {
            if(entry.prediction == "Bearish")
            {
                check.accuracy = "True";
            } else {
                check.accuracy = "False";
            }
        }
        if(entry.currentPrice == check.actualPrice)
        {
            check.accuracy = "Sideways"; 
            console.log("Current Price and Actual Price are equal!");
        }

    } catch(e)
    {
        res.stauts(500).send(e.message); 
    }
}

// View old stock entries that already at least 1 day expired. Work in progress.
export const oldStockEntries = async(req, res) => {
    try {
        // 1 day = 86,400,000 ms
        const list = await stockEntry.findAll({
            attributes: ['tickerName', 'prediction', 'timeFrame'],
            where: {
                userID: req.params.userID,
                expirationAt: {
                    [Op.lte]:
                    Sequelize.fn('NOW').getTime() - 86400000,
                }
            }
        });
    } catch(e) 
    {
        res.status(500).send(e.message); 
    }
}

// Retrieve current user stock list 
export const retrieveStockList = async(req, res) => {
    try {
        const user = await User.findOne({where: {email: req.user.email}});
        const userID = user.id; 
        
        const data = await stockEntry.findAll({
            where: {
                userID: userID,
            }
        });
        console.log("StockList data: " + data); 
        return res.status(201).send(data); 
    } catch (e) {
        res.status(500).send(e.message); 
    }
}

// View current user stock list. Still work in progress
export const userStockList = async(req, res) => {
    try {
        const user = await User.findOne({where: {email: req.user.email}});
        const userID = user.id; 

        const list = await stockEntry.findAll({
            attributes: ['tickerName', 'prediciton', 'timeFrame'],
            where: {
                userID: userID,
                // expirationAt: {
                //     [Op.gte]:
                //     Sequelize.fn('NOW').getTime() - 86400000
                // }
            }
        })
        console.log("List: " + list); 
        return res.status(201).json(list); 
    } catch (e)
    {
        return res.status(500).send(e.message); 
    }
}


// Add user's prediciton entry to database
export const addStockEntry = async(req, res) => {
    try {
        const {tickerName, prediction, timeFrame, confidentLevel, description, priceRange} = req.body; 
        
        const user = await User.findOne({where: {email: req.user.email}});
        //console.log("user: ",user); 
        const userID = user.id; 
        //console.log("UserID: " + userID); 
       if(!cts.valid(tickerName))
       {
           return res.status(404).json({message: "Ticker name is invalid."});
       }
       // Check if entry has same tickerName + timeFrame
       
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

        // Make sure prediction has valid input
        if(prediction != "Bullish" && prediction != "Bearish")
        {
            return res.status(404).json({message: "Invalid prediction input"}); 
        }
        // Make sure timeFrame has valid input
        console.log("timeFrame: " + timeFrame); 
        if(timeFrame != "EOD" && timeFrame != "EOW" && timeFrame != "EOM")
        {
            return res.status(404).json({message: "Invalid timeFrame input"});
        }
        // Make sure confidentLevel has valid input 
        if(confidentLevel < 1 || confidentLevel > 10)
        {
            return res.status(404).json({message: "Invalid confidentLevel input"});
        }
        

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

        let expirationAt = null; 

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
        if(timeFrame == "EOW")
        {
            // 7 days = 604,800,000 ms
            newStockEntry.expirationAt = new Date(new Date(newStockEntry.createdAt).getTime() + 604800000).setHours(16,0,0);
            await newStockEntry.save(); 
            console.log("Check ExpirationAt: " + newStockEntry.expirationAt);
        }
        if(timeFrame == "EOM")
        {
            // 1 month = 2,629,800,000 ms
            newStockEntry.expirationAt = new Date(new Date(newStockEntry.createdAt).getTime() + 2629800000).setHours(16,0,0);
            await newStockEntry.save();
            console.log("Check ExpirationAt: " + newStockEntry.expirationAt); 
        }


        // Create newCheckEntry row for newStockEntry 
        const {actualPrice, accuracy} = req.body; 
        const checkEntryID = newStockEntry.entryID; 

        const newCheckEntry = await checkEntry.create({
            checkEntryID: checkEntryID,
            actualPrice: actualPrice,
            accuracy: accuracy
        });

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
        symbol: 'TSLA',
        modules: ['price', 'summaryDetail'] //summaryDetail
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