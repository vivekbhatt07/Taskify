import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import { useMediaQuery } from "react-responsive";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutProvider({
  doughnutTitle,
  doughnutLabel,
  doughnutData,
  style,
}) {
  // const [toggle, setToggle] = useState(false);
  // const isDesktop = useMediaQuery({ minWidth: "780px" });

  const data = {
    labels: doughnutLabel,
    datasets: [
      {
        label: `Number of ${doughnutTitle}`,
        data: doughnutData,
        backgroundColor: [
          "#ff823c",
          "#0096ff",
          "#323c46",
          "#fb923c",
          "#84cc16",
          "#10b981",
          "#6366f1",
          "#db2777",
          "#c026d3",
          "#4a044e",
          "#44403c",
        ],
        // borderColor: ["#ff823c", "#0096ff", "#323c46"],
        hoverOffset: 4,
        // borderWidth: 7,
      },
    ],
  };

  const options = {
    // responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Doughnut Chart",
    },
    plugins: {
      legend: {
        display: true, // Show the legend
        position: "right", // Position the legend at the top
        labels: {
          boxWidth: 50,
          boxHeight: 20,
          useBorderRadius: true,
          borderRadius: 16,
          color: "#fff",
          padding: 20,
        },
        title: {
          // color: "#282828",
          // color: "#fff",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        borderWidth: 0,
        callbacks: {
          labelColor: function (context) {
            return {
              borderWidth: 2,
              borderRadius: 2,
            };
          },
        },
      },
    },
    layout: {
      padding: {},
    },
  };

  return (
    <div style={{ width: "100%", minHeight: "300px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutProvider;
