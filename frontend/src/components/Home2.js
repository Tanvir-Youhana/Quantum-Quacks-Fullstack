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

  const columns1 = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "symbol",
      },
      {
        Header: "Prediction",
        accessor: "name",
      },
      {
        Header: "Price",
        accessor: "ipoDate",
      },
      {
          Header: "Time",
          accessor: "priceRangeLow",
        },
        {
          Header: "Price",
          accessor: "priceRangeHigh",
        },
    ],
    []
  );
  const columns2 = useMemo(
    () => [
      {
        Header: "Actual Price",
        accessor: "symbol",
      },

      {
        Header: "Status",
        accessor: "name",
      },
    ],
    []
  );

  useEffect(() => {
    async function getData() {
      await instance.get("/retrieveStockList").then((response) => {
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
      </div >
      <div className="bigContainer">
          <div className= "leftContainer">
          <div className="title"> Your Stocks Prediction's List </div>
      <Paper>
        <form>
          <Table columns={columns1} data={data} />
        </form>
      </Paper>
          </div>
      <div className="rightContainer">
      <div className="title"> Actual List </div>
      <Paper>
        <form>
          <Table columns={columns2} data={data} />
        </form>
      </Paper>
      </div>
      <FormDialog />
      </div>
    </div>
  );
}
