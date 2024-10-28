import React from "react";

import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <div>
        <h1>Hello World</h1>
      </div>
    </WeatherProvider>
  );
}

export default App;
