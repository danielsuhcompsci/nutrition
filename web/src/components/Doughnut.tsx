import { Chart, ChartProps } from "react-chartjs-2";
import "chart.js/auto";

export type DoughnutProps = {
  labels: string[];
  data: number[];
};

const Doughnut = ({ labels, data }: DoughnutProps) => {
  const config: ChartProps = {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Macronutrients",
          data: data,
        },
      ],
    },
    options: {
      responsive: true,
      color: "white",
    },
  };

  return (
    <Chart data={config.data} type={config.type} options={config.options} />
  );
};

export default Doughnut;
