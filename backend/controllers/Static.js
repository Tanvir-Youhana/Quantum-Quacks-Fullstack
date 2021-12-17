import axios from "axios";
import db from "../config/database.js";
import marketHolidays from "../models/marketHolidays.js";
import trendingTickers from "../models/trendingTickers.js";
import ipoCalendar from "../models/ipoCalendar.js";
import earningCalendar from "../models/earningCalendar.js";
import listingStatus from "../models/listingStatus.js";
import dotenv  from "dotenv";
//import csv from "csvtojson";
//import csv from "csv"; 
import fs from "fs";


dotenv.config()

export const getListingStatus = async(req, res) => {
    try {
        const alphaVantageKey = process.env.alphaVantageKey; 
        axios.get("https://www.alphavantage.co/query?function=LISTING_STATUS&date=2014-07-10&state=delisted&apikey=demo")
        .then(response => {
            listingStatus.bulkCreate(response.data);
            return res.json(response.data); 
        })
    } catch(e)
    {
        res.status(500).send(e.message); 
    }
}
export const getEarningCalendar = async(req, res) => {
    try {
        const alphaVantageKey = process.env.alphaVantageKey; 
        axios.get("https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=demo")
        .then(response => {
            //earningCalendar.bulkCreate(response.data);
            return res.json(response.data); 
            
        })
    } catch(e) {
        return res.status(500).send(e.message); 
    }
}

export const getIPOCalendar = async(req, res) => {
    try {
        const alphaVantageKey = process.env.alphaVantageKey; 
        const input = fs.createReadStream()
        /*
        csv()
        .fromStream(axios.get("https://www.alphavantage.co/query?function=IPO_CALENDAR&apikey=demo"))
        .subscribe((json)=> {
            return new Promise((resolve, reject) => {
                resolve() 
                ipoCalendar.bulkCreate(json.data);
                console.log("TEST2: " + json.data);
                return res.json(json.data); 
            })

        });
        */
        //axios.get(cvsFilePath)
        /*
        .then(response => {
            ipoCalendar.bulkCreate(response.data);
            console.log("TEST2: " + JSON.parse(response.data));
            return res.json(response.data); 
        })
        */
    } catch (e) {
        return res.status(500).send(e.message); 
    }
}

export const getMarketHolidays = async(req, res) => {
    try {
        const polygonKey = process.env.polygonKey; 
        axios.get(`https://api.polygon.io/v1/marketstatus/upcoming?apiKey=${polygonKey}`)
        .then(response => {
            marketHolidays.bulkCreate(response.data); 
            return res.json(response.data); 
        }); 
    } catch(e) {
        res.status(500).send(e.message); 
    }
}

export const retrieveMarketHolidays = async(req, res) => {
    try {
        const data = await marketHolidays.findAll();
        return res.status(201).send(data); 


    } catch(e) {
        res.status(500).send(e.message); 
    }
}


export const retrieveipoCalendar = async(req, res) => {
    try {
        const data = await ipoCalendar.findAll();
        return res.status(201).send(data); 


    } catch(e) {
        res.status(500).send(e.message); 
    }
}


export const retrieveEarningCalendar = async(req, res) => {
    try {
        const data = await earningCalendar.findAll();
        return res.status(201).send(data); 


    } catch(e) {
        res.status(500).send(e.message); 
    }
}


export const getTrendingTickers = async(req, res) => {
    try {
        /*
        const {symbol, name, lastPrice, change, percent_change} = req.body; 
        const newTrendingTickers = await trendingTickers.create({
            symbol: symbol,
            name: name,
            lastPrice: lastPrice, 
            change: change, 
            percent_change: percent_change
        });
        */

        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/market/get-trending-tickers',
            params: {region: 'US'},
            headers: {
              'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
              'x-rapidapi-key': '0fc5c4eebfmsha6486809f8d8d5ep124d90jsnb134f7a3a10c'
            }
          };

        await axios.request(options).then(function (response) {
/*
           const data = response.data; 
           const insert_columns = Object.keys(data[0]);
           const insert_data = data.reduce((a,i) => [...a, Object.values(i)], []);
        db.sequelize.query('INSERT INTO trending_tickers (??) VALUES ?', [insert_columns, insert_data], (error, output) => {
               console.log(output);
           })
  */         
            //trendingTickers.bulkCreate((response.data.toString())); 
            //trendingTickers.bulkCreate(response.data.finance.result.quotes); 

           const objs = response.data.finance.result[0].quotes;
           
           trendingTickers.bulkCreate(objs,{individualHooks: true})
           .then(function() {
               trendingTickers.findAll(); 
           })
           .then(function(response2) {
               res.json(response2);
           })
           .catch(function(error) {
               res.json(error); 
           })
            //res.status(201).json(objs);
        }).catch(function (error) {
            console.error(error);
        });
    } catch (e)
    {
        res.status(500).send(e.message); 
    }
}

export const retrieveTrendingTickers = async(req, res) => {
    try {
        const data = await trendingTickers.findAll();
        return res.status(201).send(data); 


    } catch(e) {
        res.status(500).send(e.message); 
    }
}