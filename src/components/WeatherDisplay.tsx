import { useWeather } from "../context/WeatherContext";

export const WeatherDisplay = () => {
  const { city, weatherCityData, unit } = useWeather();

  if (!weatherCityData) return null;

  console.log("weatherdata", weatherCityData);
  const currentTemp = weatherCityData?.list[0]?.main?.temp;

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

  //get the day of the week
  const dayOfWeek = weatherCityData.list[0].dt_txt
    ? getDayOfWeek(weatherCityData.list[0].dt_txt)
    : "Unknown Day";

  //get weather description and icon
  const weatherDescription =
    weatherCityData.list[0].weather[0].description ??
    "No description available";
  const weatherIcon = weatherCityData.list[0].weather[0].icon;
  return (
    <div className="temp-display-container">
      <h2>Weather in {city}</h2>
      <h3>{dayOfWeek}</h3>
      <div>
        {weatherIcon && (
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
            alt={`Weather icon for ${weatherDescription}`}
          />
        )}
        <h3>
          {weatherDescription.charAt(0).toUpperCase() +
            weatherDescription.slice(1)}
        </h3>
      </div>
      <h3>
        Current Temperature: {currentTemp}°{unit === "metric" ? "C" : "F"}
      </h3>
      <div>
        <div>
          Temp Min: {Math.round(weatherCityData?.list[0]?.main?.temp_min)}°C
        </div>
        <div>
          Temp Max: {Math.round(weatherCityData?.list[0]?.main?.temp_max)}°C
        </div>
      </div>
    </div>
  );
};
