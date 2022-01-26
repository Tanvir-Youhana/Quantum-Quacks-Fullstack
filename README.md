# Quantum-Quacks-Fullstack-App

### Project 2 for CSC 336: Database Systems (Fall 2021)  

Hosted on Heroku: 
## https://quantumquacks-frontend.herokuapp.com/ 


This website allow users to input their prediction of a particular stock. The website will then tell them if their prediction was accurate based on the selected Time Frame. This website features several tables, which are: IPO Calendar, Earning Calendar, Market Holidays, and live Trending Stocks (from YahooFinance API)

What makes this software interesting is that it uses real-time stock APIs. In our search feature, we offer an interactive chart of the searched stock. There we can see the price action of a stock and its data much more detailed than popular website such as Robinhood where it provides line chart rather than candles chart.

Lastly, but the most important feature is the stock prediction itself. As soon as you input the required information in the entry box, you will get the current price of your chosen stock and the expiration Date based on the time interval you chose. As of right now we have three choices, EOD (End of Day), EOW (End of Week), EOM (End of Month). This means that if you select End of Week, your stock entry will “expire” 7 days from now and so on. On the right side is the “Actual Table”, and if you press the “Refresh Actual Table” button, it will update to the actual price of that expiration date.  

## Run on localhost: 
1) Clone the repo
2) Install dependencies in the frontend and backend folder
   ```
   cd frontend && npm i && cd ../backend && npm i 
   ```
3) Change directory to frontend and run npm start to run the frontend
  ```
  cd frontend && npm start 
  ```
4) Change directory to backend and run node index.js to run the backend
  ``` 
  cd backend && node index.js
  ```

## Contributors
- Quoc Do 
- Tanvir Youhana
- Md Islam
- Refat Monjur 

## Documentation
[Project Report](https://github.com/QuocHHDo/Quantum-Quacks-Fullstack-App/blob/c19bf9974163a7544a6c29e76a62224657299ba7/Quantum-Quacks-FullStack-Report.pdf)

Video Demo

[![Video Demo](https://img.youtube.com/vi/ouFWHd1M6Lc/0.jpg)](https://www.youtube.com/watch?v=ouFWHd1M6Lc)
