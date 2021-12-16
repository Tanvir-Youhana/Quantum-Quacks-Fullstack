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
import "./MarketHoliday.css";

export default function MarketHoliday() {
  // exchange name date
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Exchange",
        accessor: "exchange",
      },
    ],
    []
  );

  useEffect(() => {
    async function getData() {
      await instance.get("/retrieveMarketHolidays").then((response) => {
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
      <div className="title"> MARKET HOLIDAY </div>
      <Paper>
        <form>
          <Table columns={columns} data={data} />
        </form>
      </Paper>
    </div>
  );
}
