import React from "react";
import Navbar from "./Navbar";
import { Paper } from "@mui/material";
import "./MarketHoliday.css";
import instance from "../axios";
import { useState, useMemo, useEffect } from "react";
//import axios from "axios";
import { useTable } from "react-table";
import Table from "./Table";
import "./predictionTable.css";
import FormDialog from "./dialog";
import "./Home2.css";



export default function Home2() {
  // exchange name date
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [data2, setData2] = useState([]);
  const [loadingData2, setLoadingData2] = useState(true); 

  const columns1 = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "tickerName",
      },
      {
        Header: "Current Price",
        accessor: "currentPrice",
      },
      {
        Header: "Prediction",
        accessor: "prediction",
      },
      {
          Header: "Time Frame",
          accessor: "timeFrame",
        },
    ],
    []
  );
  const columns2 = useMemo(
    () => [
      {
        Header: "Actual Price",
        accessor: "actualPrice",
      },

      {
        Header: "Accuracy",
        accessor: "accuracy",
      },
    ],
    []
  );

  useEffect(() => {
    async function getData() {
      instance
        .get("/retrieveStockList",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log("TEST: " + response.data);
          setData(response.data);
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div >
      <div className="bigContainer">
          <div className= "leftContainer">
            <div className="title"> Your Stocks Prediction's List </div>
            <Paper>
              <form>
                <Table columns={columns1} data={data} />
              </form>
            </Paper>
            <FormDialog/>
          </div>
          <div className="rightContainer">
            <div className="title"> Actual List </div>
            <Paper>
              <form>
                <Table columns={columns2} data={data} />
              </form>
            </Paper>
          </div>
        </div> 
      </div>
  );
}
