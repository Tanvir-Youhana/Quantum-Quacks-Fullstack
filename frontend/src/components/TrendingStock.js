import React from "react";
import Navbar from "./Navbar";
import { Paper } from "@mui/material";
import "./TrendingStock.css";

function TrendingStock() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="title">TRENDING STOCK</div>
      <div className="table">
        <Paper>
          <form>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Tanvir</td>
                  <td>Bronx</td>
                  <td>911939494</td>
                  <td>mdislam@islam.com</td>
                  <td>santaslittlehelper</td>
                </tr>
              </tbody>
            </table>
          </form>
        </Paper>
      </div>
    </div>
  );
}

export default TrendingStock;
