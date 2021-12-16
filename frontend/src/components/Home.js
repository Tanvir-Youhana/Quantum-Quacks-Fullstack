import React from "react";
import Navbar from "./Navbar";
//import "./Home.css";
// import Logo from './qq.png'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { orange } from "@mui/material/colors";
import PredictionTable from "./PredictionTable";
// import testTable from "./testTable";
function Home() {
  const iconStyl = { fontSize: 35, color: "orange" };
  return (
    <div className="home">
      {/* <div className="home_wrapper">
        <div className="home__header">
          <div className="home__searchContainer">
            <input placeholder="Search" type="text" />
          </div>
        </div>
        <div className="home__account">
          <a href="./Update">
            <AccountCircleIcon style={iconStyl} />
          </a>
        </div>
      </div> */}

      <div>
        <Navbar />
      </div>
      <div>
        <PredictionTable />
      </div>
      {/* <div>
        <testTable />
      </div> */}
    </div>
  );
}

export default Home;
