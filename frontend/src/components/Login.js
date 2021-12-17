import React from "react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Login.css";
import axios, { Axios } from "axios";
import instance from "../axios";
import Logo from "./qq.png";
import { useHistory } from "react-router-dom";
import NavbarLR from "./NavbarLR";
// import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  let history = useHistory();

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "150px auto",
  };
  const avatarStyle = { backgroundColor: "orange" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };

  instance.defaults.withCredentials = true;

  // const login = () => {
  //     instance.post("/login", {
  //         email: email,
  //         password: password
  //     }).then((response) => {
  //         if(response.data.message)
  //         {
  //             setLoginStatus(response.data.message)

  //         } else {
  //             setLoginStatus(response.data[0].email);
  //             // history.push("/Home");
  //         }
  //     })
  // };
  const login = () => {
    const data = { email: email, password: password };
    instance.post("/login", data).then((response) => {
      if (response.data.error) {
        Swal.fire({ icon: "error", title: response.data.error });
      } else {
        localStorage.setItem("accessToken", response.data);
        history.push("/Home");
      }
    });
  };
  useEffect(() => {
    instance.get("/login").then((response) => {
      if (response.data.loggedIn === true)
        setLoginStatus(response.data.email[0].email);
      console.log(response);
    });
  }, []);

  return (
    <div className="login">
      <div className="app__header">
        <NavbarLR />
      </div>
      <Grid className="login__container">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign in </h2>
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            required
            style={stylField}
          />
          <TextField
            label="Password"
            placeholder="Enter password..."
            onChange={(e) => {
              setPassword(e.target.value);
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
            onClick={login}
            halfWidth
            style={stylButn}
          >
            Sign in
          </Button>

          <Typography>
            {" "}
            Don't have an Account?
            <Link href="./signup" underline="hover">
              {"Sign Up"}
            </Link>
            <h1> {loginStatus} </h1>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
