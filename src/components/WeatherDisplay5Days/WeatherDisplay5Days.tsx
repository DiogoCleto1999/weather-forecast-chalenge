import { useWeather } from "../../context/WeatherContext";
import { WeatherDisplay5DaysInfo } from "./WeatherDisplay5DaysInfo";

export const WeatherDisplay5Days = () => {
  const { weatherCityData, dailyForecast } = useWeather();

  if (!weatherCityData) return null;

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
