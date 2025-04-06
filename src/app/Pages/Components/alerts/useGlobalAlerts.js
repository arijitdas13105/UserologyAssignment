"use client";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";


const useGlobalAlerts = () => {
  const priceAlerts = useSelector((state) => state.crypto.alerts);
  const weatherAlerts = useSelector((state) => state.weather.alerts);

  useEffect(() => {
    let priceIndex = 0;
    let weatherIndex = 0;

    const showPriceAlert = () => {
      if (priceAlerts.length > 0) {
        const alert = priceAlerts[priceIndex];
        toast(alert.message, {
          duration: 1500,  
          position: "top-right",
          style: {
            background: "#4CAF50",  
            color: "#fff",
          },
        });
        priceIndex = (priceIndex + 1) % priceAlerts.length;  
      }
    };

    const showWeatherAlert = () => {
      if (weatherAlerts.length > 0) {
        const alert = weatherAlerts[weatherIndex];
        toast(alert.message, {
          duration: 1500,  
          position: "top-left",
          style: {
            background: "#2196F3", 
            color: "#fff",
          },
        });
        weatherIndex = (weatherIndex + 1) % weatherAlerts.length;  
      }
    };

    const priceInterval = setInterval(showPriceAlert, 2000);  
    const weatherInterval = setInterval(showWeatherAlert, 2500); 

    return () => {
      clearInterval(priceInterval);
      clearInterval(weatherInterval);
    };
  }, [priceAlerts, weatherAlerts]);
};

export default useGlobalAlerts;