import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { GlobalContext } from "../../context/globalContext";

import { Text as TextSVG, Rect, Svg } from "react-native-svg";
import { View, Text, Dimensions, ScrollView } from "react-native";

const screenWidth = Dimensions.get("window").width;

function barChart(props) {
  const [dateRange, setDateRange] = useState(new Date(Date.now()));
  const { state, dispatch } = useContext(GlobalContext);

  const [dotData, setDotData] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const graphData = () => {
    const transactionsInRange = [];

    const dateForRange = new Date(dateRange);

    state.transactions.map((t) => {
      const month = new Date(t.date).getMonth();
      const year = new Date(t.date).getFullYear();

      const monthR = dateForRange.getMonth();
      const yearR = dateForRange.getFullYear();

      if (year === yearR) {
        if (month === monthR) {
          transactionsInRange.push(t);
        }
      }
    });

    let sections = [
      { title: "Week 1", data: [] },
      { title: "Week 2", data: [] },
      { title: "Week 3", data: [] },
      { title: "Week 4", data: [] },
    ];

    transactionsInRange.map((t) => {
      const date = new Date(t.date);
      if (date.getDate() <= 8) {
        sections[0].data.push(t);
      }
      if (date.getDate() > 8 && date.getDate() <= 16) {
        sections[1].data.push(t);
      }
      if (date.getDate() > 16 && date.getDate() <= 24) {
        sections[2].data.push(t);
      }
      if (date.getDate() > 24 && date.getDate() <= 32) {
        sections[3].data.push(t);
      }
    });

    let data = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [{ data: [0, 0, 0, 0] }],
      legend: [props.barTitle],
    };

    sections.map((section) => {
      let amount = section.data.map((t) => t.value);
      const totalOfWeek = amount
        .reduce(
          (acc, item) =>
            props.type === "Expense" && item <= 0
              ? (acc += item * -1)
              : props.type === "Income" && item > 0
              ? (acc += item * 1)
              : acc,
          0
        )
        .toFixed(2);
      if (section.title === "Week 1") {
        data.datasets[0].data[0] = totalOfWeek;
      }
      if (section.title === "Week 2") {
        data.datasets[0].data[1] = totalOfWeek;
      }
      if (section.title === "Week 3") {
        data.datasets[0].data[2] = totalOfWeek;
      }
      if (section.title === "Week 4") {
        data.datasets[0].data[3] = totalOfWeek;
      }
    });

    return data;
  };

  return (
    <View>
      <LineChart
        data={graphData()}
        bezier
        fromZero={false}
        width={screenWidth}
        height={230}
        yAxisLabel={props.type === "Expense" ? "$ -" : "$ "}
        xLabelsOffset={5}
        segments={4}
        yAxisSuffix=''
        yAxisInterval={1}
        decorator={() => {
          return (
            dotData.visible && (
              <View>
                <Svg>
                  <TextSVG
                    x={dotData.x}
                    y={dotData.y - 12}
                    fill='black'
                    textAnchor='middle'
                    fontSize='13'
                    fontWeight='normal'
                    fontFamily='Roboto-Thin'
                  >
                    {parseFloat(dotData.value).toFixed(2)}$
                  </TextSVG>
                </Svg>
              </View>
            )
          );
        }}
        onDataPointClick={(data) => {
          let isSamePoint = dotData.x === data.x && dotData.y === data.y;

          isSamePoint
            ? setDotData((prevState) => {
                return {
                  ...prevState,
                  value: data.value,
                  visible: !prevState.visible,
                };
              })
            : setDotData({
                x: data.x,
                value: data.value,
                y: data.y,
                visible: true,
              });
        }}
        chartConfig={{
          backgroundGradientFrom: "#fefefe",
          backgroundGradientTo: "white",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) =>
            `rgba(${props.type === "Expense" ? 255 : 0},${
              props.type === "Income" ? 150 : 0
            }, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "white",
          },
        }}
        style={{
          backgroundColor: "white",
          marginTop: 3,
          fontFamily: "Roboto-Light",
        }}
      />
    </View>
  );
}

export default barChart;
