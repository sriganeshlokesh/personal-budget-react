import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { getChartData } from "../../actions/Data";

const DonutChart = () => {
  const [data, setData] = useState({
    title: [],
    budget: [],
  });

  const width = 650;
  const height = 550;
  const black = "#333333";
  const margin = 40;
  const radius = Math.min(width, height) / 2 - margin;

  const getData = () => {
    getChartData().then((res) => {
      createChart(res.data.myBudget);
      setData({
        title: res.data.myBudget.map((res) => {
          return res.title;
        }),
        budget: res.data.myBudget.map((res) => {
          return res.budget;
        }),
      });
    });
  };

  const { title } = data;
  const getMidAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

  const createChart = (data) => {
    let colors = d3
      .scaleOrdinal()
      .domain(title)
      .range([
        "#ffcd56",
        "#ff6384",
        "#36a2eb",
        "#fd6b19",
        "#58508d",
        "#bc5090",
        "#ff6361",
        "#003f5c",
      ]);
    let pie = d3.pie().value((d) => d.budget)(data);

    var arc = d3
      .arc()
      .outerRadius(radius * 0.7)
      .innerRadius(radius * 0.4);

    var outerArc = d3
      .arc()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.9);
    var svg = d3
      .select("figure#pie")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    svg
      .selectAll("allSlices")
      .data(pie)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colors(d.data.title))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg
      .selectAll("allPolylines")
      .data(pie)
      .enter()
      .append("polyline")
      .attr("stroke", black)
      .attr("stroke-width", 1)
      .style("fill", "none")
      .attr("points", (d) => {
        var posA = arc.centroid(d);
        var posB = outerArc.centroid(d);
        var posC = outerArc.centroid(d);
        var midAngle = getMidAngle(d);
        posC[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });
    svg
      .selectAll("allLabels")
      .data(pie)
      .enter()
      .append("text")
      .text((d) => d.data.title)
      .attr("transform", (d) => {
        var pos = outerArc.centroid(d);
        var midAngle = getMidAngle(d);
        pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", (d) => {
        var midAngle = getMidAngle(d);
        return midAngle < Math.PI ? "start" : "end";
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return <figure id="pie"></figure>;
};

export default DonutChart;
