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

  const columns = useMemo(
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
    // Prediction Table
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

    // Actual Table
    async function getData2() {
      instance 
        .get("/checkUserEntry",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log("TEST2: " + response.data);
          setData2(response.data);
          setLoadingData2(false);
        })
    }
    if (loadingData) {
      getData();
    }
    if (loadingData2) {
      getData2(); 
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
                <Table columns={columns} data={data} />
              </form>
            </Paper>
            <FormDialog/>
          </div>
          <div className="rightContainer">
            <div className="title"> Actual List </div>
            <Paper>
              <form>
                <Table columns={columns2} data={data2} />
              </form>
            </Paper>
          </div>
        </div> 
      </div>
  );
}
