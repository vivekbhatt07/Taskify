import { BarProvider } from "../../../../components";
import { useTask } from "../../../../context";

const BarTab = () => {
  const { state } = useTask();

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          beganAtZero: true,
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
    <div className="w-[full] h-[full]">
      <BarProvider options={options} data={data} />
    </div>
  );
};

export default BarTab;
