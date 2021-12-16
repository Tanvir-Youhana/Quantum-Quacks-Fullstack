import React from "react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Logo from "./qq.png";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./UpdatePassword.css";
//import axios, { Axios } from "axios";
import instance from "../axios";
import Navbar from "./Navbar";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";

//const iconStyl = { fontSize: 35, color: "orange" };

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [passwordStatus, setPasswordStatus] = useState("");

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "150px auto",
  };
  const avatarStyle = { backgroundColor: "orange" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };

  const updatePassword = () => {
    try {
      instance
        .put(
          "/setting",
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            Swal.fire({ icon: "error", title: response.data.error });
          } else {
            Swal.fire({ icon: "success", title: response.data.message });
          }
        });
    } catch (e) {
      console.log("Error Check: " + e);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Grid className="login__container">
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <VpnKeyOutlinedIcon />
              </Avatar>
              <h2>Update Password </h2>
            </Grid>
            <TextField
              label="Old Password"
              type="password"
              placeholder="Enter old password..."
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              fullWidth
              required
              style={stylField}
            />
            <TextField
              label="New Password"
              placeholder="Enter new password..."
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              fullWidth
              required
              style={stylField}
            />
            <TextField
              label="Confirm Password"
              placeholder="Enter confirm password..."
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              fullWidth
              required
              style={stylField}
            />
            <Button
              type="submit"
              color="success"
              variant="contained"
              onClick={updatePassword}
              halfWidth
              style={stylButn}
            >
              Update Password
            </Button>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
export default UpdatePassword;
