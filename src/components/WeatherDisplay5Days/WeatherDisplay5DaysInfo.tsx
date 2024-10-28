// src/components/WeatherDisplay5Days/WeatherDisplay5DaysInfo.tsx
import React from "react";
import { useWeather } from "../../context/WeatherContext";

interface WeatherDisplay5DaysInfoProps {
  weatherData: any;
}

export const WeatherDisplay5DaysInfo: React.FC<
  WeatherDisplay5DaysInfoProps
> = ({ weatherData }) => {
  const { unit } = useWeather();

  const currentTemp = weatherData?.main?.temp;

  const getDayOfWeek = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()];
  };

  const dayOfWeek = getDayOfWeek(weatherData.dt_txt);

  return (
    <div>
      <h3>{dayOfWeek}</h3>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt={`Weather icon for ${weatherData.weather[0].description}`}
        />
        <h3>
          {weatherData.weather[0].description.charAt(0).toUpperCase() +
            weatherData.weather[0].description.slice(1)}
        </h3>
      </div>
      <h3>
        Temperature: {currentTemp}°{unit === "metric" ? "C" : "F"}
      </h3>
      <div>
        <div>Temp Min: {Math.round(weatherData.main.temp_min)}°C</div>
        <div>Temp Max: {Math.round(weatherData.main.temp_max)}°C</div>
      </div>
    </div>
  );
};
