import { useEffect } from "react";
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
    weatherCityData,
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
    } catch (error) {}
  };

  useEffect(() => {
    if (formik.values.city) {
      fetchWeatherData(formik.values.city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  return (
    <div className="form-container">
      <form className="search" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
        </div>
        <div>
          <button type="submit">Get Forecast</button>
        </div>
      </form>
      {formik.errors.city && <div>{formik.errors.city}</div>}

      {weatherCityData && (
        <div className="units">
          <button className="unit-button" onClick={() => setUnit("metric")}>
            Celsius
          </button>
          <button className="unit-button" onClick={() => setUnit("imperial")}>
            Fahrenheit
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherForm;
