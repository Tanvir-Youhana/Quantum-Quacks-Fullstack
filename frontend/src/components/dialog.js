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

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
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
              />
              <FormControlLabel
                value="Bearish"
                control={<Radio />}
                label="Bearish"
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
              <FormControlLabel value="EOD" control={<Radio />} label="EOD" />
              <FormControlLabel value="EOW" control={<Radio />} label="EOW" />
              <FormControlLabel value="EOM" control={<Radio />} label="EOM" />
            </RadioGroup>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Confident Level"
            type="number"
            fullWidth
            variant="standard"
            placeholder="Enter a confident level from 1 to 10"
          />

          <TextField
            autoFocus
            margin="dense"
            label="Description"
            fullWidth
            variant="standard"
            placeholder="Enter Description"
          />

          <TextField
            autoFocus
            margin="dense"
            label="Price Range"
            fullWidth
            variant="standard"
            placeholder="Enter Price Range..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
