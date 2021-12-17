import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grow, Slide, Zoom, Collapse } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import instance from "../axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";


export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [addStatus, setAddStatus] = useState(""); 

  const [tickerName, setTickerName] = useState("");
  const [prediction, setPrediction] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [confidentLevel, setConfidentLevel] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("");
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {

    // Check input, looks right
    console.log(
      "tickerName: " + tickerName, 
      "prediction: " + prediction, 
      "timeFrame: " + timeFrame, 
      "confidentLevel: " + confidentLevel, 
      "description: " + description, 
      "priceRange: " + priceRange
    )

    // Storing user entry in database
    console.log("TEST TEST");
    instance
      .post("/entry/ticker", {
        tickerName: tickerName,
        prediction: prediction,
        timeFrame: timeFrame,
        confidentLevel: confidentLevel,
        description: description,
        priceRange: priceRange,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
       .then((response) => {
         if(response.data.error)
         {
            setOpen(false);
            Swal.fire({icon: "error", title: response.data.error });
         } else {
            setOpen(false);
            window.location.reload();
         }

        });

  };
  
  // useEffect(() => {
  //   instance.get("/entry/ticker").then((response) => {
  //     if (response.data.loggedIn === true)
  //       setLoginStatus(response.data.email[0].email);
  //     console.log(response);
  //   });
  // }, []);
  

  return (
    <div>
      <Button size="medium" variant="contained" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Collapse}>
        <DialogTitle>Add Stock Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the required information
          </DialogContentText>
          <TextField
            autoFocus
            label="Ticker name"
            placeholder="Enter Ticker name  ex: APPL"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setTickerName(e.target.value);
            }}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Prediction</FormLabel>
            <RadioGroup
              row
              aria-label="Prediction"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Bullish"
                control={<Radio />}
                label="Bullish"
                onClick={(e) => {
                  setPrediction(e.target.value);
                }}
              />
              <FormControlLabel
                value="Bearish"
                control={<Radio />}
                label="Bearish"
                onClick={(e) => {
                  setPrediction(e.target.value);
                }}
              />
            </RadioGroup>
          </FormControl>
          <p></p>
          <FormControl component="fieldset">
            <FormLabel component="legend">Time Frame</FormLabel>
            <RadioGroup
              row
              aria-label="Time frame"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="EOD" control={<Radio />} label="EOD" 
              onClick={(e) => {
                setTimeFrame(e.target.value);
              }}/>
              <FormControlLabel value="EOW" control={<Radio />} label="EOW" 
              onClick={(e) => {
                setTimeFrame(e.target.value);
              }}/>
              <FormControlLabel value="EOM" control={<Radio />} label="EOM" 
              onClick={(e) => {
                setTimeFrame(e.target.value);
              }}/>
            </RadioGroup>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            label="Confident Level"
            type="number"
            fullWidth
            variant="standard"
            placeholder="Enter a confident level from 1 to 10"
            onChange={(e) => {
              setConfidentLevel(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Description"
            fullWidth
            variant="standard"
            placeholder="Enter Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Price Range"
            fullWidth
            variant="standard"
            placeholder="Enter Price Range..."
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose2}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
