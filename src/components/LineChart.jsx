import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData } from "../data/mockData";

import dataProducts from "../data/products";
import { useState, useEffect } from "react";
import { set } from "date-fns";
import axios from "axios";
import { proResponseProductsUrl } from "./values/Strings/Url";

const LineChart = ({ isDashboard = false, newRender }) => {
  //console.log("valor en lineChar ",newRender)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dataTest1, setDataTest1] = useState([
    {
      id: "price_list",
      color: 'red',
      data: []
    }
  ]);

  const dataTest = [
    {
      id: "price_list",
      color: 'red',
      data: [
        {
          x: "64.75",
          y: 1,
        },
        {
          x: "58.28",
          y: 2,
        },
        {
          x: "48.56",
          y: 3,
        },
        {
          x: "45.33",
          y: 4,
        },
        {
          x: "15.0",
          y: 5,
        },

      ],
    },

  ]

  const dataExcel = [
    {
      id: "price_list",
      color: 'red',
      data: [

        { x: 1, y: 40 },
        { x: 1, y: 20 },
        { x: 2, y: 30 },
        { x: 3, y: 40 },
        { x: 4, y: 60 },
        { x: 5, y: 45 },



      ],
    },

  ]

  useEffect(() => {

    // getProducts();
    getCoordinates();

  }, []);

  useEffect(() => {
    if (newRender == true) {
      setDataTest1(mockLineData)
    }
    if (newRender == false) {

      //getCoordinates();
      getProducts();
      //updateDate()

    }

  }, [newRender]);

  const getCoordinates = () => {

    const arrP = [];
    for (var i = 0; i < dataProducts.length; i++) {
      var par = {
        x: dataProducts[i].net_size_x,
        y: dataProducts[i].net_size_y
      }
      arrP.push(par)
    }
    //Sorting Pairs
    arrP.sort(function (a, b) {
      return (a.x - b.x)
    })

    const object_data = [{
      id: `data`,
      color: '#C800C8',
      data: arrP
    }
    ]

    console.log("object data ", object_data)

    setDataTest1(object_data)
  }
  const updateDate = () => {
    const objFin = [];

    //for (var i = 0; i < dataProducts.length; i++) {
    for (var i = 0; i < 2; i++) {

      const arrP = [];
      for (var j = 0; j < dataProducts[i].price_list.length - 1; j++) {

        var par = {

          y: dataProducts[i]?.price_list[j].pre,
          x: Number(dataProducts[i]?.price_list[j].cod)
        }

        arrP.push(par)
      }

      const object_data = {
        id: `price_list ${i}`,
        color: 'red',
        data: arrP
      }
      objFin.push(object_data)


      setDataTest1(objFin)
    }
  }


  const getProducts = async () => {
    try {
      //local 
      const result = await axios.get(`http://localhost:4000/api/get-product`)

      var arrayProducts = result.data.products;
      //console.log("array Productos ",arrayProducts)

      const arrP = [];
      for (var i = 0; i < arrayProducts?.length; i++) {
        var par = {
          x: arrayProducts[i].net_size_x,
          y: arrayProducts[i].net_size_y
        }


        arrP.push(par)
      }
      //Sorting Pairs
      arrP.sort(function (a, b) {
        return (a.x - b.x)
      })

      const object_data = [{
        id: `data`,
        color: '#259000',
        data: arrP
      }
      ]

      console.log("object data api express", object_data)
      setDataTest1(object_data)

    } catch (error) {

      console.log(error)
    }

  }


  return (
    <>

      {dataTest1?.length > 0 ?
        <ResponsiveLine
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
              container: {
                background: colors.primary[400],
                color: colors.grey[100],
              },
            },
          }}
          curve="catmullRom"
          //  data={dataExcel}
          data={dataTest1}
          // data={mockLineData}
          colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,//No activar solpamiento
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickValues: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={!isDashboard}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
        : <></>}
    </>
  );
};

export default LineChart;
