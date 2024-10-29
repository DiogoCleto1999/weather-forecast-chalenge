import React, { createContext, useContext, useState, useEffect } from "react";

interface WeatherContextProps {
  city: string | null;
  weatherCityData: any;
  weatherCityDataForecast: any;
  unit: "metric" | "imperial";
  setCity: (city: string) => void;
  setWeatherCityData: (data: any) => void;
  setWeatherCityDataForecast: (data: any) => void;
  setUnit: (unit: "metric" | "imperial") => void;
  dailyForecast: { [date: string]: any };
  position: [number, number] | null;
  setPosition: (position: [number, number]) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather must be used within WeatherProvider");
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState<string | null>(null);
  const [weatherCityData, setWeatherCityData] = useState<any>(null);
  const [weatherCityDataForecast, setWeatherCityDataForecast] =
    useState<any>(null);

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const dailyForecast: { [date: string]: any } = {};
  const [position, setPosition] = useState<[number, number] | null>(null); // Ensure correct type

  // Populate dailyForecast from weatherCityData
  if (weatherCityData && weatherCityDataForecast.list) {
    for (let forecast of weatherCityDataForecast.list) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = forecast;
      }
    }
  }

  // Update position whenever weatherCityData changes
  useEffect(() => {
    if (weatherCityData?.coord) {
      const { lat, lon } = weatherCityData?.coord;
      setPosition([lat, lon]);
    }
  }, [weatherCityData]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        weatherCityData,
        weatherCityDataForecast,
        unit,
        setCity,
        setWeatherCityData,
        setWeatherCityDataForecast,
        setUnit,
        dailyForecast,
        position,
        setPosition,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
