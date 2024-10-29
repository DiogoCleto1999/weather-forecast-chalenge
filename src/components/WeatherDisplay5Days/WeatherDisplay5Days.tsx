// src/components/WeatherDisplay5Days/WeatherDisplay5Days.tsx
import React from "react";
import styled from "styled-components";
import WeatherDisplay5DaysInfo from "./WeatherDisplay5DaysInfo";
import { useWeather } from "../../context/WeatherContext";

const WeatherDisplay5Days = () => {
  const { weatherCityDataForecast, dailyForecast } = useWeather();

  if (!weatherCityDataForecast) return null;

  const next5days = Object.values(dailyForecast).slice(1, 5);

  return (
    <StyledWeatherDisplayContainer>
      {next5days.map((item, index) => (
        <WeatherDisplayInfoWrapper key={index}>
          <WeatherDisplay5DaysInfo weatherData={item} />
        </WeatherDisplayInfoWrapper>
      ))}
    </StyledWeatherDisplayContainer>
  );
};

// Apply the background color to the entire container
const StyledWeatherDisplayContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  gap: 10px;
  border-radius: 8px;
  overflow-x: hidden;
  margin-top: 20px;

  @media (max-width: 768px) {
    overflow-x: auto;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    overflow-x: auto;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
  }
`;

const WeatherDisplayInfoWrapper = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 150px;

  @media (max-width: 768px) {
    min-width: 140px;
    margin: 5px;
  }

  @media (max-width: 480px) {
    min-width: 120px;
    margin: 5px;
  }
`;

export default WeatherDisplay5Days;
