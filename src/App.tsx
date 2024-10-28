import React from "react";

import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";
import { WeatherForm } from "./components/WeatherForm";
import { WeatherDisplay } from "./components/WeatherDisplay";

function App() {
  return (
    <WeatherProvider>
      <WeatherForm />
      <WeatherDisplay />
    </WeatherProvider>
  );
}

export default App;
