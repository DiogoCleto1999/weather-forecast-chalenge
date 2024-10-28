import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useWeather } from "../context/WeatherContext";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TemperatureChart = () => {
  const { weatherCityData, dailyForecast } = useWeather();
  if (!weatherCityData) return null;

  const Days5 = Object.values(dailyForecast).slice(0, 5);

  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Temperature",
        fill: true,
        data: Days5.map((item: any) => item.main.temp),
        borderColor: "#284b63",
        borderWidth: 2,
      },
    ],
  };
  return <Line data={data} />;
};
