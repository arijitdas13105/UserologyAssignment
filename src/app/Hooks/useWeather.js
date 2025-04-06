"use client";
import React,{ useEffect, useState }  from "react"; 

import axios from "axios";
import { useDispatch } from "react-redux";
import {  setCities, setCurrentWeather, setHistoricalData, addWeatherAlert, setLoading, setError  } from "../redux/slices/weatherSlice";

const useWeather = () => {
  const dispatch = useDispatch();
  const [weatherAlerts, setWeatherAlerts] = useState([]);

  const fetchWeather = async (city) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`
      );
      dispatch(setCurrentWeather({ city, data: response.data }));

       return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      console.error(`Error fetching weather for ${city}:`, error);
      
    }finally {
      dispatch(setLoading(false));
    }
  };

  const fetchMultipleCities = async (cities) => {
    const results = [];
    for (const city of cities) {
      const data = await fetchWeather(city);
      if (data) results.push(data);
    }
    // return results;
    dispatch(setCities(results));
  };
  const fetchHistoricalWeather = async (city) => {
    try {
      // Note: OpenWeather's historical API requires paid plan
      // This is a mock implementation
      const response = await axios.get(
        // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric&cnt=5`
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`
      );
      console.log("response from the fetch user historical weather ",response.data.list)

      const dailtForeCast=getDailyForeCast(response.data.list);
      console.log("response from the fetch user historical weather dailtForeCast ",dailtForeCast)
      // return response.data.list;
      // dispatch(setHistoricalData({ city, data: response.data.list }));
      dispatch(setHistoricalData({ city, data: dailtForeCast }));
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error fetching historical data:", error);
      // return null;
    }
  };
  const getDailyForeCast=(forecastList)=>{
    const uniqueDays = new Set();
    const dailyForeCast = [];
    for (const forecast of forecastList) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!uniqueDays.has(date)) {
        uniqueDays.add(date);
        dailyForeCast.push(forecast);
      }
    }
    return dailyForeCast;
  }
  useEffect(() => {
    const generateWeatherAlert = () => {
      const conditions = ["Thunderstorm", "Heavy Rain", "Extreme Heat", "Snowstorm"];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      // setWeatherAlerts((prev) => [
      //   ...prev,
      //   { type: "weather_alert", message: `⚠️ Weather Alert: ${randomCondition} expected!` },
      // ]);
      dispatch(addWeatherAlert({ type: "weather_alert", message: `⚠️ ${randomCondition} expected!` }));
    
    };

    // Simulate a weather alert every 30 seconds
    const weatherAlertInterval = setInterval(generateWeatherAlert, 30000);

    return () => clearInterval(weatherAlertInterval);
  }, [dispatch]);

 
//weatherAlerts KUCH KAAM KA NAHI HAI
  return { fetchWeather, fetchMultipleCities,fetchHistoricalWeather,weatherAlerts };
};

export default useWeather;

 