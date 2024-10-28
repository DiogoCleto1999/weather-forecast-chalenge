import React, { createContext, useContext, useState } from "react";

interface WeatherContextProps {
  city: string | null;
  weatherCityData: any;
  unit: "metric" | "imperial";
  setCity: (city: string) => void;
  setWeatherCityData: (data: any) => void;
  setUnit: (unit: "metric" | "imperial") => void;
  dailyForecast: { [date: string]: any };
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState<string | null>(null);
  const [weatherCityData, setWeatherCityData] = useState<any>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const dailyForecast: { [date: string]: any } = {};

  // Populate dailyForecast from weatherCityData
  if (weatherCityData && weatherCityData.list) {
    for (let forecast of weatherCityData.list) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = forecast;
      }
    }
  }

  return (
    <WeatherContext.Provider
      value={{
        city,
        weatherCityData,
        unit,
        setCity,
        setWeatherCityData,
        setUnit,
        dailyForecast,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
