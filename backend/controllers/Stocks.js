import yahooFinance from 'yahoo-finance'; 
import StockSocket from 'stocksocket';
import SI from 'nodejs-stock-info';



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