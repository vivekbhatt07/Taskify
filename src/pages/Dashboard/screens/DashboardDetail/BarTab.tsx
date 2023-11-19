import { BarProvider } from "../../../../components";
import { useMode, useTask } from "../../../../context";

const BarTab = () => {
  const { state } = useTask();
  const { isDarkTheme } = useMode();
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          beganAtZero: true,
        },
        grid: {
          color: isDarkTheme ? "#282828" : "#ddd",
        },
      },
      x: {
        grid: {
          color: isDarkTheme ? "#282828" : "#ddd",
        },
      },
    },
    responsive: true,
    datasets: {
      bar: {
        barThickness: 30,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          color: isDarkTheme ? "#fff" : "#282828",
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
  };

  const labels = ["To Do", "In Progress", "Done"];

  const data = {
    labels,
    datasets: [
      {
        label: "Low",
        data: [
          state.toDoList.reduce((lowCount, item) => {
            return item.priority === "Low" ? lowCount + 1 : lowCount;
          }, 0),
          state.inProgressList.reduce((lowCount, item) => {
            return item.priority === "Low" ? lowCount + 1 : lowCount;
          }, 0),
          state.doneList.reduce((lowCount, item) => {
            return item.priority === "Low" ? lowCount + 1 : lowCount;
          }, 0),
        ],
        backgroundColor: "#4ade80",
      },
      {
        label: "Medium",
        data: [
          state.toDoList.reduce((mediumCount, item) => {
            return item.priority === "Medium" ? mediumCount + 1 : mediumCount;
          }, 0),
          state.inProgressList.reduce((mediumCount, item) => {
            return item.priority === "Medium" ? mediumCount + 1 : mediumCount;
          }, 0),
          state.doneList.reduce((mediumCount, item) => {
            return item.priority === "Medium" ? mediumCount + 1 : mediumCount;
          }, 0),
        ],
        backgroundColor: "#fb923c",
      },
      {
        label: "High",
        data: [
          state.toDoList.reduce((highCount, item) => {
            return item.priority === "High" ? highCount + 1 : highCount;
          }, 0),
          state.inProgressList.reduce((highCount, item) => {
            return item.priority === "High" ? highCount + 1 : highCount;
          }, 0),
          state.doneList.reduce((highCount, item) => {
            return item.priority === "High" ? highCount + 1 : highCount;
          }, 0),
        ],
        backgroundColor: "#f87171",
      },
    ],
  };
  return (
    <div className="w-[full] h-[400px]">
      <BarProvider options={options} data={data} />
    </div>
  );
};

export default BarTab;
