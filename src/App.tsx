import React from "react";

import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherDisplay5Days from "./components/WeatherDisplay5Days/WeatherDisplay5Days";
import TemperatureChart from "./components/TemperatureChart";
import { GlobalStyle } from "./styles/GlobalStyles";
import WeatherMap from "./components/WeatherMap";

function App() {
  return (
    <WeatherProvider>
      <GlobalStyle />
      <div className="app-container">
        <h1>Weather Forecast</h1>
        <WeatherForm />
        <WeatherDisplay />
        <WeatherDisplay5Days />
        <TemperatureChart />
        <WeatherMap />
      </div>
    </WeatherProvider>
  );
}

export default App;
