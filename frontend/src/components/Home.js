import React from "react";
import Navbar from "./Navbar";
import { createTheme, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import instance from "../axios";
import { useState, useMemo, useEffect } from "react";
//import axios from "axios";
import { useTable } from "react-table";
import Table from "./Table";
// import "./predictionTable.css";
import FormDialog from "./dialog";
import "./Home.css"; 
import Moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ThemeProvider } from "@emotion/react";
import { purple } from "@mui/material/colors";
import { useThemeWithoutDefault } from "@mui/system";


const theme = createTheme (
  {
    variant: "#001a34",
    palette:{
      primary:
      {
        main: "#fefefe"
      },
      secondary: purple,
      background: "#fefefe"
    }
  }
)

export default function Home() {

  // const classes = useStyles();

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
        {
          Header: "Confident Level",
          accessor: "confidentLevel",
        },
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Price Range",
          accessor: "priceRange",
        },
        {
          Header: "Expiration Date",
          accessor: d => {
            return Moment(d.expirationAt)
              .local()
              .format("MM-DD-YYYY h:mm a")
          },
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
    console.log("Check5");
    instance.get("/checkUserEntry",
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
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
           

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <FormDialog />
            <Button variant="contained" size="medium" onClick={handleRefresh}>Refresh Actual List</Button>
            <Button variant="contained"  size="medium" startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
            </ButtonGroup>






            {/* <FormDialog />
            <div className= "refreshPosition">
              <Button variant="contained" onClick={handleRefresh}>Refresh Actual List</Button>
            </div>*/}
            <div className= "deletePosition">
              {/* <Button variant="contained"  startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button> */}
               
               <ThemeProvider theme= {theme}>
               <TextField
              autoFocus
              label="Delete ID: "
              placeholder="Choice a ID to delete"
              halfWidth
              variant="filled"
              color="secondary"
              background= {useThemeWithoutDefault}
              type= "number"
              background-color= "white" 
              // InputLabelProps={{className:textfield__label}}   
              // inputProps={{ className: classes.input }}
              // className={classes.root}
              onChange={(e) => {
                setIdDelete(e.target.value);
              }}
              />
               </ThemeProvider>
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
