import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useWeather } from "../context/WeatherContext";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const TemperatureChart = () => {
  const { weatherCityDataForecast, unit } = useWeather();
  if (!weatherCityDataForecast) return null;
  console.log("weatherCityDataForecast", weatherCityDataForecast);

  const labels = weatherCityDataForecast.list.map(
    (hour: { dt_txt: string }) => hour.dt_txt
  );
  const dataWeather = weatherCityDataForecast.list.map(
    (item: any) => item.main.temp
  );

  const firstSevenDataWeather = dataWeather.slice(0, 9);
  const firstSevenLabels = labels.slice(0, 9);

  console.log("firstSevenLabels", firstSevenLabels);

  const extractHours = (dateTimeArray: string[]) => {
    return dateTimeArray.map((dateTime) => {
      const hour = dateTime.split(" ")[1].split(":")[0];
      return hour;
    });
  };

  const hours = extractHours(firstSevenLabels);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Temperature Chart",
        padding: {
          bottom: 20,
        },
      },
      datalabels: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: (context: { dataIndex: string | number }[]) => {
            const dateTime = firstSevenLabels[context[0].dataIndex];
            return `${dateTime}`;
          },
          label: (context: { raw: any; dataIndex: string | number }) => {
            const unitLabel = unit === "metric" ? "°C" : "°F";
            return `Temperature: ${context.raw} ${unitLabel}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hours",
        },
      },
      y: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30,
      },
    },
  };

  const data = {
    labels: hours,
    datasets: [
      {
        label: "Temperature",
        data: firstSevenDataWeather,
        borderColor: "#284b63",
        borderWidth: 2,
        backgroundColor: "rgba(40, 75, 99, 0.2)",

        fill: "start",
        datalabels: {
          color: "#000",
          formatter: (value: any) =>
            `${value} °${unit === "metric" ? "C" : "F"}`,
          padding: 5,
          align: "top" as const,
          anchor: "end" as const,
        },
      },
    ],
  };
  return (
    <div className="chart-container">
      <Line options={options} data={data} />
    </div>
  );
};
export default TemperatureChart;
