import React from "react";
import Navbar from "./Navbar";
import { Paper } from "@mui/material";
import "./IPOcalendar.css";
import instance from "../axios"; 
import {useState, useMemo, useEffect} from "react"; 
//import axios from "axios";
import { useTable } from "react-table";
import Table from "./Table"; 
import "./predictionTable.css";

function IPOcalendar() {

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
      accessor: "name",
    },
    {
      Header: "Date",
      accessor: "ipoDate",
    },
    {
      Header: "Low Price Range",
      accessor: "priceRangeLow",
    },
    {
      Header: "High Price Range",
      accessor: "priceRangeHigh",
    },
    {
      Header: "Exchange",
      accessor: "exchange",
    },

  ], []); 

  useEffect(() => {
    async function getData() {
      await instance
        .get("/retrieveipoCalendar")
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
      <div className="title">IPO CALENDAR</div>
      <div className="table">
        <Paper>
          <form>
            <Table columns={columns} data={data}/>
          </form>
        </Paper>
      </div>
    </div>
  );
}

export default IPOcalendar;
