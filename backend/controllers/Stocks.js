import stockEntry from '../models/stockEntries.js';
import checkEntry from '../models/checkEntries.js';
import yahooFinance from 'yahoo-finance'; 
import cts from 'check-ticker-symbol';
import { Sequelize } from 'sequelize';
import User from '../models/userModel.js';
import trendingTickers from '../models/trendingTickers.js';

export const deleteEntryRow = async(req, res) => {
    try {
        const { entryID } = req.body; 
        const user = await User.findOne({where: {email: req.user.email}});
        const userID = user.id; 

        const user_entry = await stockEntry.findOne({
            where: {
                entryID: entryID,
                userID: userID 
            }
        })
        await user_entry.destroy(); 

        res.json({message: "Successfully deleted row"}); 
    } catch(e)
    {
        res.status(500).send(e.message); 
    }
}

export const retrieveActualList = async(req, res) => {
    try {
        const user = await User.findOne({where: {email: req.user.email}});
        const userID = user.id; 

        // entry gives only the entryID that matches the userID
        const entry = await stockEntry.findAll({
            raw: true, 
            where: {
                userID: userID,
            }
        })
        .then(entries => entries.map(entry => entry.entryID));
        console.log("Selected entryID: " + entry); 

        // data finds all rows in checkEntry table that matches userID from checkEntryID 
        const data = await checkEntry.findAll({
            where: {
                checkEntryID: entry
            }
        });
        console.log("retrieveActualList called"); 
        //console.log("StockList data: " + data); 
        return res.status(201).send(data); 
    } catch (e) {
        res.status(500).send(e.message); 
    }
}

// Refresh button next to each entry. Still work in progress.
export const checkUserEntry = async(req, res) => {
    try {
        const user = await User.findOne({where: {email: req.user.email}});
        const userID = user.id; 

        // entry_row finds all row in Stock Entry table that matches userID
        // and already expires
        console.log("userID: " + userID); 
        const entry_row = await stockEntry.findAll({
            where: {
                userID: userID, 
            }
        });;
        //console.log("Checker: ", new Date()); 
        //console.log("Entry_row: ", entry_row); 
        // entry gives only the entryID that matches the userID
        const NOW = (new Date()).toISOString(); 
        //console.log("NOW: " + NOW); 

        //const day = moment(dateToFetch, 'YYYY-MM-DD').end('day')
        const test = await stockEntry.findAll({
            where: {
                userID: userID, 
            }
        }); 
        console.log("Test: ", test); 

        const entry = await stockEntry.findAll({
            where: {
                userID: userID,
            }
        })
        .then(entries => entries.map(entry => entry.entryID));
        //console.log("entry Value: ", entry);
        //console.log("First Entry: ", entry_row[0]);
        console.log("Selected entryID: " + entry); 

        // check finds all rows in checkEntry table that matches userID from checkEntryID 
        const check = await checkEntry.findAll({
            where: {
                checkEntryID: entry
            }
        });
        // Puts entries into actual table 
        for(let i = 0; i < entry.length; ++i)
        {
            console.log("Index: " + i + " , " + "checkEntryID: " + check[i].checkEntryID)

            // Get acutalPrice
            let actualPrice; 
            await yahooFinance.quote({
                symbol: entry_row[i].tickerName,
                modules: ['price']
            }, function(err, quotes) {
                if (err)
                {
                    return res.json("error");
                } else {
                    actualPrice = (quotes.price.regularMarketPrice).toFixed(2); 
                    check[i].update({actualPrice: actualPrice}), {
                        where: {
                            checkEntryID: entry_row[i].entryID
                        }
                    }
                }
            })
            console.log("The actual price: " + actualPrice); 
            //console.log("The current price: " + entry_row[i].currentPrice); 
            // Create accuracy 
            if(entry_row[i].currentPrice < actualPrice)
            {
                console.log("CHECKING");
                if(entry_row[i].prediction == "Bearish")
                {
                    console.log("TEST97");
                    await check[i].update({accuracy: "False"}), {
                        where: {
                            checkEntryID: entry_row[i].entryID
                        }
                    }
                    console.log("HELLO?");
                    //check[i].accuracy = "False";
                } else {
                    await check[i].update({accuracy: "True"}), {
                        where: {
                            checkEntryID: entry_row[i].entryID
                        }
                    //check[i].accuracy = "True";
                    }
                }
            }
            if(entry_row[i].currentPrice > actualPrice)
            {
                if(entry_row[i].prediction == "Bearish")
                {
                    console.log("TEST98");
                    await check[i].update({accuracy: "True"}), {
                        where: {
                            checkEntryID: entry_row[i].entryID
                        }
                    }
                } else {
                    console.log("TEST99");
                    await check[i].update({accuracy: "False"}), {
                        where: {
                            checkEntryID: entry_row[i].entryID
                        }
                    }
                }
            }
            if(entry_row[i].currentPrice == actualPrice)
            {
                console.log("TEST100");
                await check[i].update({accuracy: "Sideways"}), {
                    where: {
                        checkEntryID: entry_row[i].entryID
                    }
                }
                console.log("Current Price and Actual Price are equal!");
                //check[i].accuracy = "Sideways"; 

            }

            console.log("End of for loop iteration");
        }
        const data = await checkEntry.findAll({
            where: {
                checkEntryID: entry,
            }
        });
        console.log("End of Program");
        console.log("DATA: ", data)
        return res.status(201).send(data); 

    } catch(e)
    {
        res.status(500).send(e.message); 
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
        //console.log("StockList data: " + data); 
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
           return res.json({error: "Ticker name is invalid."});
       }
       // Check if entry has same tickerName + timeFrame
       
       const duplicatEntry = await stockEntry.findOne({
           attributes: ['tickerName', 'timeFrame'],
           where: {
               userID: userID,
               tickerName: tickerName,
               timeFrame: timeFrame

            }})

       console.log("duplicateEntry: ", duplicatEntry); 
       if(duplicatEntry != null)
        {
            return res.json({error: "Entry already exist"});
        } 

        // Make sure prediction has valid input
        if(prediction != "Bullish" && prediction != "Bearish")
        {
            return res.json({error: "Invalid prediction input"}); 
        }
        // Make sure timeFrame has valid input
        console.log("timeFrame: " + timeFrame); 
        if(timeFrame != "EOD" && timeFrame != "EOW" && timeFrame != "EOM")
        {
            return res.json({error: "Invalid timeFrame input"});
        }
        console.log("confidentLevel: " + confidentLevel);
        // Make sure confidentLevel has valid input 
        if( confidentLevel < 1 && confidentLevel > 10)
        {
            return res.json({error: "Invalid confident input. Please enter a number from 1 to 10"});
        }
        

        // Get currentPrice
        let currentPrice; 
        await yahooFinance.quote({
            symbol: tickerName,
            modules: ['price'] //summaryDetail
        }, function(err, quotes) {
            if(err)
            {
                res.json("error");
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
        console.log("Stock entry added!");   
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

        console.log("TEST HERE");

        //const {actualPrice, accuracy} = req.body; 
        let actualPrice;
        let accuracy = "Pending"; 

        const checkEntryID = newStockEntry.entryID; 

        console.log("actualPrice: " + actualPrice);
        console.log("accuracy: " + accuracy); 
        console.log("checkEntryID: " + checkEntryID);
        // Create newCheckEntry row for newStockEntry 
        const newCheckEntry = await checkEntry.create({
            checkEntryID: checkEntryID,
            actualPrice: actualPrice,
            accuracy: accuracy
        });

        console.log("Check Entry also added!"); 
        return res.json({message: "Successfully added entry!"})

    } catch (e) 
    {
        return res.status(500).send(e.message); 
    }
}

// Currently use this to get historical price data. 
export const getHistorical = async(req, res) => {
    yahooFinance.historical({
        symbol: req.params.symbol, // req.params.symbol 
        from: '2015-01-01',
        to: '2021-12-16',
    }, function(err, quotes) {
        if(err)
        {
            return res.status(404).json("error");
        } else {
            
            const result = quotes.map(function(e) {
                const timestamp = Date.parse(e.date);
                const close = e.close.toFixed(2); 
                return [timestamp, close]; 
            })
            //const date = quotes[1].date;
           // const timestamp = Date.parse(date);

            //const close = quotes[1].close; 

            //console.log("Date: " +  timestamp);
            //console.log("Close: " + close); 
            //console.log(result); 

            return res.status(201).json(result); 
        }
    })
}

export const chartTest = async(req, res) => {
    yahooFinance.historical({
        symbol: req.params.symbol, // req.params.symbol 
        from: '2021-01-01',
        to: '2021-12-16',
    }, function(err, quotes) {
        if(err)
        {
            return res.status(404).json("error");
        } else {
            
            const result = quotes.map(function(e) {
                const timestamp = Date.parse(e.date);
                const open = parseFloat(e.open.toFixed(2)); 
                const high = parseFloat(e.high.toFixed(2));
                const low = parseFloat(e.low.toFixed(2));
                const close = parseFloat(e.close.toFixed(2)); 
                const volume = e.volume; 
                return [timestamp, open, high, low, close, volume]; 
            })
            //const date = quotes[1].date;
           // const timestamp = Date.parse(date);

            //const close = quotes[1].close; 

            //console.log("Date: " +  timestamp);
            //console.log("Close: " + close); 
            //console.log(result); 
            //console.log("Symbol: " + req.params.symbol); 
            const sorted = result.sort(function(a,b) { 
                return a[0] - b[0];
            })
            return res.status(201).json(sorted); 
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

export const tickerValidity = async(req, res) => {
    try {
        if(!cts.valid(req.params.ticker))
        {
            return res.status(404).json({error: "Error! Ticker name is invalid."});
        } else {
            return res.status(200).json({message: "Ticker name is valid"}); 
        }
    } catch(e) 
    {
        res.status(500).send(e.message); 
    }
}