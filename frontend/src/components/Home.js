import React from 'react'
import Navbar from './Navbar'
import './Home.css'
// import Logo from './qq.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { orange } from '@mui/material/colors';
function Home() {

    const iconStyl={fontSize: 35, color:'orange' }
    return (
        <div className="home">
            <div className="home_wrapper">
                <div className="home__header">
                    <div className="home__searchContainer">
                        <input placeholder="Search" type="text"/>
                    </div>
                </div>
                <div className="home__account">
                    <a href="#">
                    <AccountCircleIcon style={iconStyl}/>
                    </a>
                </div>
            </div>
            <div className="home_content">

                <div className="home_graph">
                    this is the graph

                </div>
                <div className="home_StockList">
                    this is the stock list
                </div>
                
            </div>
    
    
        </div>

    )
}

export default Home
