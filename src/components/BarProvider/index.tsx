import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarProviderType = {
  options: ChartOptions;
  data: any;
};

const BarProvider: FC<BarProviderType> = ({ options, data }) => {
  return <Bar options={options} data={data} />;
};

export default BarProvider;
