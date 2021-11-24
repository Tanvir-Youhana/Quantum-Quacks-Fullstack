import React from 'react'
import { useState, useEffect } from 'react'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './registration.css';

function Registration() {
        const paperStyle={padding :20, height: '60vh', width: 280, margin:"150px auto"}
        const avatarStyle={backgroundColor: 'orange'}
        const stylButn ={margin:'8px 0'}
        const stylField ={margin:'8px 0'}
    return (
        <div>
            <Grid className='login__container' > 
                <Paper elevation={10} style={paperStyle}>
                   <Grid align = 'center'>
                       <Avatar style={avatarStyle}><LockOutlinedIcon />
                   </Avatar>
                  <h2>Create an Account </h2>
                  </Grid>
                <TextField label= 'First Name' placeholder= 'Enter First Name...' fullWidth required style={stylField}/>
                <TextField label= 'Last Name' placeholder= 'Enter Last Name...' fullWidth required style={stylField}/>
                <TextField label= 'Username' placeholder= 'Enter Username...' fullWidth required style={stylField}/>
                <TextField label= 'Password' placeholder= 'Enter password...' type= 'password' fullWidth required style={stylField}/>
                <Button type='submit' color= "success" variant="contained" halfWidth style={stylButn}>Sign Up</Button>
                </Paper> 
            </Grid>
        </div>
    )
}

export default Registration