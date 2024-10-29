// WeatherMap.tsx

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L, { Map as LeafletMap } from "leaflet"; // Import Leaflet types
import "leaflet/dist/leaflet.css";
import { useWeather } from "../context/WeatherContext";

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
    console.log("position", position);

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
  const { weatherCityData, position } = useWeather();
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current && position) {
      mapRef.current.setView(position, 10);
    }
  }, [position]);
  console.log("posicaooooooo", position);
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
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <TemperatureLayer apiKey={API_KEY} position={position} />{" "}
          {/* Use the TemperatureLayer component */}
        </MapContainer>
      )}
    </div>
  );
};

export default WeatherMap;
