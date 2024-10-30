import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast`;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;

// Function to get weather forecast data
export const getWeatherData = async (
  city: string,
  units: "metric" | "imperial"
) => {
  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        q: city,
        units, //'metric' for Celsius or 'imperial' for Fahrenheit
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error: unknown) {
    handleAxiosError(error);
    return null;
  }
};

// Function to get current weather data
export const getCurrentWeatherData = async (
  city: string,
  units: "metric" | "imperial"
) => {
  try {
    const response = await axios.get(WEATHER_URL, {
      params: {
        q: city,
        units,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error: unknown) {
    handleAxiosError(error);
    return null;
  }
};

const shownErrors = new Set<string>();

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      let message: string;

      switch (error.response.status) {
        case 404:
          message = "City not found. Please check the city name and try again.";
          break;
        case 400:
          message = "Bad request. Please check your input and try again.";
          break;
        case 403:
          message =
            "Access forbidden. You do not have permission to access this resource.";
          break;
        case 500:
          message = "Internal server error. Please try again later.";
          break;
        case 503:
          message = "Service is currently unavailable. Please try again later.";
          break;
        default:
          message = `An error occurred: ${error.response.data.message}`;
      }

      if (!shownErrors.has(message)) {
        console.error(`Error ${error.response.status}:`, message);
        alert(message);
        shownErrors.add(message);
      } else {
        shownErrors.delete(message);
      }
    } else if (error.request) {
      const message = "Please check your internet connection and try again.";
      if (!shownErrors.has(message)) {
        console.error("Internet connection issue or server is unreachable.");
        alert(message);
        shownErrors.add(message);
      } else {
        shownErrors.delete(message);
      }
    } else {
      const message = "An unexpected error occurred. Please try again later.";
      if (!shownErrors.has(message)) {
        console.error("Error:", error.message);
        alert(message);
        shownErrors.add(message);
      } else {
        shownErrors.delete(message);
      }
    }
  } else {
    const message = "An unexpected error occurred. Please try again later.";
    if (!shownErrors.has(message)) {
      console.error("An unexpected error occurred:", error);
      alert(message);
      shownErrors.add(message);
    } else {
      shownErrors.delete(message);
    }
  }
};
