import React from "react";
import Navbar from "./Navbar";
import { Paper } from "@mui/material";
import "./EarningCalendar.css";
import instance from "../axios"; 
import {useState, useMemo, useEffect} from "react"; 
//import axios from "axios";
import { useTable } from "react-table";
import Table from "./Table"; 
import "./predictionTable.css";


function EarningCalendar() {
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
      accessor: "name",
    },
    
    {
      Header: "Report Date",
      accessor: "reportDate",
    },
    {
      Header: "Fiscal Date Ending",
      accessor: "fiscalDateEnding",
    },
    {
      Header: "Estimate",
      accessor: "estimate",
    },
    {
      Header: "Currency",
      accessor: "currency",
    },
  ], []); 



  useEffect(() => {
    async function getData() {
      await instance
        .get("/retrieveEarningCalendar")
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
      <div className="title"> EARNING CALENDAR </div> 
      <Paper>
        <form> 
        <Table columns={columns} data={data} />
        </form>
      </Paper>
    </div> 
    );
}

export default EarningCalendar;
