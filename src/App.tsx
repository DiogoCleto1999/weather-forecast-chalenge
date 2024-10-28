import React from "react";

import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";
import { WeatherForm } from "./components/WeatherForm";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { WeatherDisplay5Days } from "./components/WeatherDisplay5Days/WeatherDisplay5Days";
import { TemperatureChart } from "./components/TemperatureChart";

function App() {
  return (
    <WeatherProvider>
      <WeatherForm />
      <WeatherDisplay />
      <WeatherDisplay5Days />
      <TemperatureChart />
    </WeatherProvider>
  );
}

export default App;
