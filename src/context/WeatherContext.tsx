import React, { createContext, useContext, useState } from "react";

interface WeatherContextProps {
  city: string | null;
  weatherCityData: any;
  unit: "metric" | "imperial";
  setCity: (city: string) => void;
  setWeatherCityData: (data: any) => void;
  setUnit: (unit: "metric" | "imperial") => void;
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

  return (
    <WeatherContext.Provider
      value={{
        city,
        weatherCityData,
        unit,
        setCity,
        setWeatherCityData,
        setUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
