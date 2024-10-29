// src/components/WeatherForm.tsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getWeatherData, getCurrentWeatherData } from "../api/weatherAPI";
import { useWeather } from "../context/WeatherContext";

const WeatherForm = () => {
  const {
    setWeatherCityData,
    unit,
    setUnit,
    city,
    setCity,
    setWeatherCityDataForecast,
  } = useWeather();

  const formik = useFormik({
    initialValues: {
      city: city || "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("City name is required"),
    }),
    onSubmit: async (values: { city: string }) => {
      await fetchWeatherData(values.city);
    },
  });

  const fetchWeatherData = async (city: string) => {
    try {
      setCity(city);
      const data = await getCurrentWeatherData(city, unit);
      const dataForecast = await getWeatherData(city, unit);

      setWeatherCityData(data);
      setWeatherCityDataForecast(dataForecast);
    } catch (error) {
      alert("Unable to fetch weather data. Please check the city name.");
    }
  };

  useEffect(() => {
    if (formik.values.city) {
      fetchWeatherData(formik.values.city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          onChange={formik.handleChange}
          value={formik.values.city}
        />
        {formik.errors.city && <div>{formik.errors.city}</div>}
        <button type="submit">Get Forecast</button>
      </form>
      <div>
        <button onClick={() => setUnit("metric")}>Celsius</button>
        <button onClick={() => setUnit("imperial")}>Fahrenheit</button>
      </div>
    </div>
  );
};

export default WeatherForm;
