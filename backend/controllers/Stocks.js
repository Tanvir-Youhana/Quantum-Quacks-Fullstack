import stockEntry from '../models/stockEntries.js';
import yahooFinance from 'yahoo-finance'; 
import StockSocket from 'stocksocket';
import SI from 'nodejs-stock-info';
import cts from 'check-ticker-symbol';

export const userStockList = async(req, res) => {
    try {
        const list = await stockEntry.findAll({
            attributes: ['tickerName'],
            where: {
                userID: req.params.id
            }
        })
        return res.status(201).json(list); 
    } catch (e)
    {
        return res.status(500).send(e.message); 
    }
}

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

        // Make sure we get userID from jswebtoken 

        const newStockEntry = await stockEntry.create({
            userID: userID, // req.params.user_id from jswebtoken
            tickerName: tickerName,    // Valid Ticker Name
            prediction: prediction,    // Bullish / Bearish 
            timeFrame: timeFrame,      // EOD / EOW / EOM
            confidentLevel: confidentLevel, // 1 - 10 
            description: description, // [String]
            priceRange: priceRange, // [String] 
        });
        res.json("Stock Entry added!")

    } catch (e) 
    {
        return res.status(500).send(e.message); 
    }
}



export const test = async(req, res) => {
    try{

        
    } catch (e)
    {
        return res.status(500).send(e.message); 
    }
}

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
                /*
               
        StockSocket.addTicker("AAPL", function(err, stockPriceChanged) {
            if(err)
            {
                return res.status(404).json("error");
            } else {
                return res.status(201).json(stockPriceChanged);
            }
        })
        */

}   
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