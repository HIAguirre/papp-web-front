import React from "react";
import { Chart } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { monthColors, months } from "@/app/_gen/general";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type BarChartProps = {
  data: number[][];
  labels: string[];
};

export const BarChart: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: data.map((groupData, index) => ({
      label: ``,
      data: groupData,
      backgroundColor: monthColors,
      borderRadius: 10,
    })),
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        border: {
          dash: [5, 5],
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        border: {
          dash: [5, 5],
        },
      },
    },
  };

  return (
    <div className="justify-center min-h-[40vh] ">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};
