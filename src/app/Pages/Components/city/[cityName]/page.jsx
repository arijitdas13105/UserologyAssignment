"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { use } from "react";
import useWeather from "@/app/Hooks/useWeather";
import {
  setCurrentWeather,
  setHistoricalData,
  setLoading,
} from "../../../../redux/slices/weatherSlice";

export default function CityDetailPage({ params }) {
  const router = useRouter();
  const { cityName } = use(params);
  const dispatch = useDispatch();

  const { fetchWeather, fetchHistoricalWeather } = useWeather();

  const currentWeather = useSelector((state) =>
    state.weather.cities.find(
      (city) => city.name === decodeURIComponent(cityName)
    )
  );
  const historicalData = useSelector(
    (state) => state.weather.historicalData[decodeURIComponent(cityName)]
  );
  console.log("Historical Data:", historicalData);
  const loading = useSelector((state) => state.weather.loading);

  useEffect(() => {
    const loadData = async () => {
      try {
        const decodedCityName = decodeURIComponent(cityName);
        await fetchWeather(decodedCityName);
        await fetchHistoricalWeather(decodedCityName);
      } catch (error) {
        console.error("Failed to load city data:", error);
        router.push("/");
      }
    };
    loadData();
  }, [cityName]);

  // Weather icon mapper
  const getWeatherIcon = (description) => {
    const desc = description?.toLowerCase() || "";
    if (desc.includes("clear")) return "☀️";
    if (desc.includes("cloud")) return "⛅";
    if (desc.includes("rain")) return "🌧️";
    if (desc.includes("snow")) return "❄️";
    if (desc.includes("thunder")) return "⚡";
    if (desc.includes("fog") || desc.includes("mist")) return "🌫️";
    return "🌡️";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center p-8 rounded-xl border border-gray-700 bg-gray-800 shadow-lg animate-pulse">
          <div className="text-2xl font-semibold text-blue-400">
            Loading weather data...
          </div>
          <div className="mt-4 text-gray-400">
            ⛅ Fetching the latest forecast
          </div>
        </div>
      </div>
    );
  }

  if (!currentWeather || !historicalData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center p-8 rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
          <div className="text-2xl font-semibold text-red-400">
            Failed to load city data
          </div>
          <div className="mt-4 text-gray-400">
            Please try again or check the city name
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8 md:px-8 text-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium group"
        >
          <span className="mr-2 transform transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>{" "}
          Back to Dashboard
        </button>

        {/* City Name */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {currentWeather.name}
          </h1>
          <p className="text-lg text-gray-400">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Current Weather Card */}
        <div className="relative overflow-hidden rounded-xl border border-gray-700 transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:shadow-blue-900/20 mb-8">
          <div className="flex items-center p-6 bg-gradient-to-r from-gray-800 to-gray-900">
            <h2 className="text-2xl font-semibold mb-1 text-white">
              Current Conditions
            </h2>
            <span className="ml-auto text-xs px-2 py-1 rounded-full bg-gray-700 bg-opacity-50">
              LIVE
            </span>
          </div>

          <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Temperature and Weather */}
              <div className="flex items-center mb-6 md:mb-0">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mr-6 text-3xl">
                  {getWeatherIcon(
                    currentWeather.currentWeather?.weather?.[0].description
                  )}
                </div>
                <div className="text-center md:text-left">
                  <div className="text-5xl font-bold text-white">
                    {Math.round(currentWeather.currentWeather?.main?.temp)}°C
                  </div>
                  <div className="text-lg text-gray-400 capitalize mt-1">
                    {currentWeather.currentWeather?.weather?.[0].description}
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl w-full md:w-auto border border-gray-700">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">💧</span>
                    <span className="text-gray-300">
                      Humidity:{" "}
                      <span className="font-semibold text-white">
                        {currentWeather.currentWeather?.main?.humidity}%
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl mr-2">🌬️</span>
                    <span className="text-gray-300">
                      Wind:{" "}
                      <span className="font-semibold text-white">
                        {currentWeather.currentWeather?.wind?.speed} m/s
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl mr-2">☁️</span>
                    <span className="text-gray-300">
                      Pressure:{" "}
                      <span className="font-semibold text-white">
                        {currentWeather.currentWeather?.main?.pressure} hPa
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-3 bg-gray-900 bg-opacity-80 flex justify-between items-center">
            <span className="text-sm text-gray-400">Current Weather</span>
            <div className="flex items-center text-blue-400 text-sm">
              <span>Updated now</span>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="relative overflow-hidden rounded-xl border border-gray-700 transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:shadow-blue-900/20">
          <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">
              5-Day Forecast
            </h2>
          </div>

          <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {historicalData.slice(0, 5).map((day, index) => (
                <div
                  key={index}
                  className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-4 text-center hover:border-gray-500 transition-all duration-300 hover:shadow-md hover:shadow-blue-900/20 hover:transform hover:-translate-y-1"
                >
                  <div className="font-semibold text-gray-300 mb-2">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 mx-auto my-2 text-2xl">
                    {getWeatherIcon(day.weather?.[0].description)}
                  </div>
                  <div className="text-2xl font-bold text-white mt-2">
                    {Math.round(day.main?.temp)}°C
                  </div>
                  <div className="text-sm text-gray-400 mt-2 capitalize">
                    {day.weather?.[0].description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-3 bg-gray-900 bg-opacity-80 flex justify-between items-center">
            <span className="text-sm text-gray-400">24h Change</span>
            <div className="flex items-center text-blue-400 text-sm group">
              <span>Forecast Details</span>
              <svg
                className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
