import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { getChartData } from "../../actions/Data";

const PieChart = () => {
  const [chart, setChart] = useState({
    title: [],
    budget: [],
  });
  const getData = () => {
    getChartData().then((res) => {
      setChart({
        ...chart,
        title: res.data.myBudget.map((data) => {
          return data.title;
        }),
        budget: res.data.myBudget.map((data) => {
          return data.budget;
        }),
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const { title, budget } = chart;

  const data = {
    labels: title,
    datasets: [
      {
        data: budget,
        backgroundColor: [
          "rgb(255, 205, 86)",
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(253, 107, 25)",
          "rgb(88, 80, 141)",
          "rgb(188, 80, 144)",
          "rgb(255, 99, 97)",
          "rgb(0, 63, 92)",
          "rgb(180, 198, 240)",
        ],
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
  );
};

export default PieChart;
