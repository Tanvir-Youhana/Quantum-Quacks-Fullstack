import React from "react";
import Navbar from "./Navbar";
import { Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./MarketHoliday.css";
import instance from "../axios";
import { useState, useMemo, useEffect } from "react";
//import axios from "axios";
import { useTable } from "react-table";
import Table from "./Table";
import "./predictionTable.css";
import FormDialog from "./dialog";
import "./Home.css"; 

export default function Home() {
  // exchange name date
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [data2, setData2] = useState([]);
  const [loadingData2, setLoadingData2] = useState(true); 

  const [data3, setData3] = useState([]);
  const [loadingData3, setLoadingData3] = useState(true); 

  const [idDelete, setIdDelete] = useState(""); 

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "entryID",
      }, 
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
      new Promise(r => setTimeout(r, 2000));
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
        .get("/retrieveActualList",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log("TEST2: " + response.data);
          if(response.data.error)
          {
            alert(response.data.error); 
          } else { 
            setData2(response.data);
            setLoadingData2(false);
          }


        })
    }
    if (loadingData) {
      getData();
    }
    if (loadingData2) {
      getData2(); 
    }
  }, []);

  const handleRefresh = () => {
    instance.get("/checkUserEntry",
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      console.log("TEST3: " + response.data); 
      setData2(response.data); 
      setLoadingData2(false); 

      //window.location.reload();
    })
  }

  const handleDelete = () => {
    instance.delete("/deleteEntryRow", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },

      data: {
        entryID: idDelete
      },
    })
    .then((response) => {

      console.log("Response: ", response.data); 
      
    })
    window.location.reload();
  }

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
            <div>
              <Button onClick={handleRefresh}>Refresh Actual List</Button>
            </div>
            <div>
              <Button onClick={handleDelete}>Delete</Button>
                <TextField
              autoFocus
              label="ID: "
              placeholder="Enter Ticker name  ex: APPL"
              halfWidth
              variant="outlined"
              color="secondary"
              type= "number"
              onChange={(e) => {
                setIdDelete(e.target.value);
              }}
              />
            </div>
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
