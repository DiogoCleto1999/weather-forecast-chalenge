import { useWeather } from "../../context/WeatherContext";
import { WeatherDisplay5DaysInfo } from "./WeatherDisplay5DaysInfo";

export const WeatherDisplay5Days = () => {
  const { weatherCityData } = useWeather();

  if (!weatherCityData) return null;

  let dailyForecast: { [date: string]: any } = {};
  //stores only the first forecast for each day in the dailyForecast object.
  for (let forecast of weatherCityData.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const next5days = Object.values(dailyForecast).slice(1, 6);

  return (
    <div>
      {next5days.map((item, index) => (
        <div key={index}>
          <WeatherDisplay5DaysInfo weatherData={item} />
        </div>
      ))}
    </div>
  );
};
