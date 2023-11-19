import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMode } from "../../context";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutProviderType = {
  doughnutTitle: string;
  doughnutLabel: string[];
  doughnutData: number[];
};

const DoughnutProvider: FC<DoughnutProviderType> = ({
  doughnutTitle,
  doughnutLabel,
  doughnutData,
}) => {
  const { isDarkTheme } = useMode();

  const data: any = {
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

  const options: any = {
    // responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Doughnut Chart",
    },
    plugins: {
      title: {
        display: true,
        text: "Pie Chart",
      },
      legend: {
        display: true, // Show the legend
        position: "top", // Position the legend at the top
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 100,
          boxHeight: 20,
          useBorderRadius: true,
          borderRadius: 30,
          color: isDarkTheme ? "#fff" : "#282828",
          padding: 20,
        },
        title: {},
      },
      tooltip: {
        mode: "index",
        intersect: false,
        borderWidth: 0,
        callbacks: {
          // @ts-ignore
          labelColor: function () {
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
    <div style={{ width: "100%", minHeight: "400px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutProvider;
