import React from "react";
import styled from "styled-components";
import { useWeather } from "../../context/WeatherContext";

interface WeatherDisplay5DaysInfoProps {
  weatherData: any;
}

const WeatherDisplay5DaysInfo: React.FC<WeatherDisplay5DaysInfoProps> = ({
  weatherData,
}) => {
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
    <StyledDivDisplayContainer>
      <h3 style={{ marginTop: "10px" }}>{dayOfWeek}</h3>
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
      <StyledDivTempMinMax>
        <StyledPTempMinMax>
          Temp Min: {Math.round(weatherData.main.temp_min)}°
          {unit === "metric" ? "C" : "F"}
        </StyledPTempMinMax>
        <StyledPTempMinMax>
          Temp Max: {Math.round(weatherData.main.temp_max)}°
          {unit === "metric" ? "C" : "F"}
        </StyledPTempMinMax>
      </StyledDivTempMinMax>
    </StyledDivDisplayContainer>
  );
};

const StyledDivDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
  text-align: center;
  border-radius: 8px;
`;

const StyledDivTempMinMax = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledPTempMinMax = styled.p`
  margin: 0;
  padding: 10px;
`;

export default WeatherDisplay5DaysInfo;
