"use client";
import React, { useEffect, useState } from "react";
const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  const addWeatherAlert = (message) => {
    setAlerts((prev) => [...prev, { type: "weather_alert", message }]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      addWeatherAlert("⛈️ Storm warning in New York!");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return { alerts, addWeatherAlert };
};

export default useAlerts;
