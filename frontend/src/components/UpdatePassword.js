import React from "react";
import { useState, useEffect } from 'react';
import Logo from "./qq.png";
import {Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@mui/material'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import "./UpdatePassword.css";
import axios, { Axios } from "axios"
import instance from "../axios";
import Navbar from "./Navbar";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const iconStyl = { fontSize: 35, color: "orange" };

function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [loginStatus, setLoginStatus] = useState(""); 

  const paperStyle={padding :20, height: '50vh', width: 280, margin:"150px auto"}
  const avatarStyle={backgroundColor: 'orange'}
  const stylButn ={margin:'8px 0'}
  const stylField ={margin:'8px 0'}

  const login = () => {
      instance.post("/login", {
          email: email,
          password: password 
      }).then((response) => {
          if(response.data.message)
          {
              setLoginStatus(response.data.message)
          } else {
              setLoginStatus(response.data[0].email);
          }
      })
  };

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>
      <Grid className='login__container' > 
                <Paper elevation={10} style={paperStyle}>
                   <Grid align = 'center'>
                       <Avatar style={avatarStyle}><VpnKeyOutlinedIcon />
                   </Avatar>
                  <h2>Update Password </h2>
                  </Grid>
                <TextField 
                    label= 'Old Password'
                    type ="password"
                    placeholder= 'Enter old password...' 
                    onChange= {(e) => {
                        setEmail(e.target.value);
                    }}
                    fullWidth required style= {stylField}/>
                <TextField 
                    label= 'New Password' 
                    placeholder= 'Enter new password...' 
                    onChange= {(e) => {
                        setPassword(e.target.value); 
                    }}
                    type= 'password' 
                    fullWidth required style= {stylField}/>
                    <TextField 
                    label= 'Confirm Password' 
                    placeholder= 'Enter confirm password...' 
                    onChange= {(e) => {
                        setPassword(e.target.value); 
                    }}
                    type= 'password' 
                    fullWidth required style= {stylField}/>
                <Button 
                    type='submit' 
                    color= "success"
                    variant="contained" 
                    onClick= {login}
                    halfWidth style={stylButn}>Change Password
                </Button>
                </Paper>  
            </Grid>
      
      </div>
      
    </div>
  );
}
export default UpdatePassword;