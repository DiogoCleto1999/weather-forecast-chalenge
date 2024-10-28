import React from "react";

import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";
import { WeatherForm } from "./components/WeatherForm";

function App() {
  return (
    <WeatherProvider>
      <WeatherForm />
    </WeatherProvider>
  );
}

export default App;
