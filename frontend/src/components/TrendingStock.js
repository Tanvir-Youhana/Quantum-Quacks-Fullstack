import React from "react";
import Navbar from "./Navbar";
import { Paper } from "@mui/material";
import "./MarketHoliday.css";
import instance from "../axios"; 
import {useState, useMemo, useEffect} from "react"; 
//import axios from "axios";
import { useTable } from "react-table";
import Table from "./Table"; 
import "./predictionTable.css";

export default function TrendingStock() {
  // exchange name date
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true); 

  const columns = useMemo(
    () => [
    {
      Header: "Symbol",
      accessor: "symbol",
    },
    {
      Header: "Name",
      accessor: "shortName",
    },
    {
      Header: "Price",
      accessor: "regularMarketPrice",
    },
    {
      Header: "Price Change",
      accessor: "regularMarketChange",
    },
    {
      Header: "Percent Change",
      accessor: "regularMarketChangePercent"
    }
  ], []); 



  useEffect(() => {
    async function getData() {
      await instance
        .get("/retrieveTrendingTickers")
        .then((response) => {

          console.log(response.data);
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
      </div> 
      <div className="title"> TRENDING TICKERS </div> 
      <Paper>
        <form> 
        <Table columns={columns} data={data} />
        </form>
      </Paper>
    </div> 
    );
}