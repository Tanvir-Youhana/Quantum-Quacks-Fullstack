import React, { useState, useEffect } from "react";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import instance from "../axios";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

function SearchStock() {

    const {ticker} = useParams(); 
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true); 

    useEffect(() => {
        async function getData() {
            await instance
                .get(`/chart/${ticker}`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data);
                    setLoadingData(false); 
                });
            }
            if(loadingData) {
                getData();
            }
        }, []);

    let groupingUnits = [
        [
          "week", // unit name
          [1] // allowed multiples
        ],
        ["month", [1, 2, 3, 4, 6]]
      ];
      
      let mockOptions = {
        rangeSelector: {
          selected: 1
        },
      
        title: {
          text: ticker + " Historical Chart",
          style: {
            fontSize: '30px',
            fontWeight: 'bold',
          }
        },
        chart: {
          height: 850,
          backgroundColor: "#FAEDC6",
        },
        colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
        '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],

        yAxis: [
          {
            labels: {
              align: "right",
              x: -3,
              style: {
                fontSize: 15,
              }
            },
            title: {
              text: "OHLC"
            },
            height: "60%",
            lineWidth: 2,
            resize: {
              enabled: true
            }
          },
          {
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "Volume"
            },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2
          }
        ],
      
        tooltip: {
          split: true
        },
      
        series: [
          {
            type: "candlestick",
            data: (function() {
              var ohlcData = [];
      
              for (var i = 0; i < data.length; i++) {
                ohlcData.push([
                  data[i][0], // the date
                  data[i][1], // open
                  data[i][2], // high
                  data[i][3], // low
                  data[i][4] // close
                ]);
              }
              //console.log("ohlcData: " + ohlcData)
              return ohlcData;
            })()
          },
          {
            type: "column",
            data: (function() {
              var columnData = [];
      
              for (var i = 0; i < data.length; i++) {
                columnData.push([
                    data[i][0], // the date
                    data[i][5] // the volume
                ]);
              }
              return columnData;
            })(),
            yAxis: 1
          }
        ]
      };
    return (
        <div>
            <div>
                <Navbar /> 
            </div> 
            <div>
                <HighchartsReact 
                    highcharts={HighStock}
                    constructorType={"stockChart"}
                    options={mockOptions}
                    />
            </div>

        </div>
    )
}

export default SearchStock; 