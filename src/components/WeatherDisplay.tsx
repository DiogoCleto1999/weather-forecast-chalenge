import React from "react";
import styled from "styled-components";
import { useWeather } from "../context/WeatherContext";

const WeatherDisplay = () => {
  const { weatherCityData, unit } = useWeather();

  if (!weatherCityData) return null;

  console.log("weatherdata", weatherCityData);
  const currentTemp = weatherCityData?.main?.temp;

  //get weather description and icon, handling the possibility of missing weather data
  const weatherDescription =
    weatherCityData.weather[0]?.description ?? "No description available";
  const weatherIcon = weatherCityData.weather?.[0]?.icon;

  return (
    <div className="temp-display-container">
      <h2>Weather in {weatherCityData.name} Today</h2>
      <div>
        {weatherIcon && (
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
            alt={`Weather icon for ${weatherDescription}`}
            style={{ width: "100px", height: "100px" }}
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
      <StyledDivTempMinMax>
        <StyledPTempMinMax>
          Temp Min: {Math.round(weatherCityData?.main?.temp_min)}°
          {unit === "metric" ? "C" : "F"}
        </StyledPTempMinMax>
        <StyledPTempMinMax>
          Temp Max: {Math.round(weatherCityData?.main?.temp_max)}°
          {unit === "metric" ? "C" : "F"}
        </StyledPTempMinMax>
      </StyledDivTempMinMax>
    </div>
  );
};

const StyledDivTempMinMax = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 250px; /* Horizontal padding */
  padding-right: 250px; /* Horizontal padding */

  @media (max-width: 600px) {
    padding: 10px 10px;
    flex-direction: column;
  }
`;

const StyledPTempMinMax = styled.p`
  display: flex;
  text-align: center;
`;

export default WeatherDisplay;
