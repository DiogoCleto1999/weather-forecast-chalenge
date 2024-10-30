import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L, { Map as LeafletMap } from "leaflet";
import { useWeather } from "../context/WeatherContext";

const defaultIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const TemperatureLayer = ({
  apiKey,
  position,
}: {
  apiKey: string;
  position: any;
}) => {
  const map = useMap(); //hook to access the map instance
  const temperatureLayerRef = React.useRef<L.TileLayer | null>(null); // Store the layer reference

  useEffect(() => {
    // If there's an existing layer, remove it
    if (temperatureLayerRef.current) {
      map.removeLayer(temperatureLayerRef.current);
    }

    // Create a new temperature layer with the updated position
    const temperatureLayer = L.tileLayer(
      `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 1,
      }
    );

    temperatureLayer.addTo(map);
    temperatureLayerRef.current = temperatureLayer;

    return () => {
      map.removeLayer(temperatureLayer);
    };
  }, [apiKey, map, position]);

  return null;
};

const WeatherMap = () => {
  const API_KEY = String(process.env.REACT_APP_API_KEY || "");
  const { weatherCityData, position, unit } = useWeather();
  const mapRef = useRef<LeafletMap | null>(null);
  const currentTemp = weatherCityData?.main?.temp;

  useEffect(() => {
    if (mapRef.current && position) {
      mapRef.current.setView(position, 10);
    }
  }, [position]);
  if (!weatherCityData) return null;

  return (
    <div>
      {position && (
        <MapContainer
          center={position}
          zoom={10}
          className="map-container"
          ref={(ref) => {
            if (ref) mapRef.current = ref as LeafletMap;
          }}
        >
          <Marker position={position} icon={defaultIcon}>
            <Popup>
              {weatherCityData.name} <br />
              Temperature: {currentTemp}°{unit === "metric" ? "C" : "F"}
            </Popup>
          </Marker>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <TemperatureLayer apiKey={API_KEY} position={position} />{" "}
        </MapContainer>
      )}
    </div>
  );
};

export default WeatherMap;
