//src/app/Pages/dashboard/page.jsx

"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useWeather from "@/app/Hooks/useWeather";
import useCrypto from "@/app/Hooks/useCrypto";
import useNews from "@/app/Hooks/useNews";
import CityCard from "@/app/components/weather/CityCard";
import CryptoCard from "@/app/components/crypto/CryptoCard";
import WeatherAlerts from "../Components/alerts/WeatherAlerts";
import CryptoAlerts from "../Components/alerts/CryptoAlerts";
import { Toaster, toast } from "react-hot-toast";

// import useCryptoWebSocket from "@/app/Hooks/useCryptoWebSocket";
 
function Dashboard() {
  // useCryptoWebSocket()

  const weather = useSelector((state) => state.weather.cities);
  // const cryptoList = useSelector((state) => state.crypto.prices);

  const news = useSelector((state) => state.news.articles);
  console.log("News from Redux:", news);
  const priceAlerts = useSelector((state) => state.crypto.alerts);
  const weatherAlerts = useSelector((state) => state.weather.alerts);
  const cryptoPrices = useSelector((state) => state.crypto.prices);
  console.log("crypto prices from redux", cryptoPrices);
  console.log("crypto alerts from redux", priceAlerts);
  console.log("weatherAlerts from redux", weatherAlerts);
  // const socketPrices=useSelector((state)=>state.crypto.socketPrice)
  const cryptoList=useSelector((state)=>state.crypto.socketPrice)
  console.log("cryptoList -socketprice",cryptoList)
  const { fetchMultipleCities } = useWeather();
  const { fetchCryptoPrices } = useCrypto();
  const { fetchNews } = useNews();
  useEffect(() => {
    fetchMultipleCities(["New York", "London", "Tokyo"]);
    fetchCryptoPrices();
    // fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2">
            CryptoWeather Nexus
          </h1>
          <p className="text-gray-400">Your personal dashboard for weather, crypto, and news</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weather Section */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full mr-2">
                <span className="text-xl">🌦️</span>
              </div>
              <h2 className="text-xl font-semibold">Weather Updates</h2>
            </div>
            <div className="space-y-4">
              {weather.map((city, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-lg transform transition-all duration-300 hover:scale-102 hover:shadow-xl border border-gray-700">
                  <CityCard city={city} />
                </div>
              ))}
            </div>
          </div>

          {/* Crypto Section */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-full mr-2">
                <span className="text-xl">💰</span>
              </div>
              <h2 className="text-xl font-semibold">Cryptocurrency Prices</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(cryptoList).map(([key, value]) => {
                const HourValue = cryptoPrices[key] || {};
                return (
                  <div key={key} className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-lg transform transition-all duration-300 hover:scale-102 hover:shadow-xl border border-gray-700">
                    <CryptoCard
                      coin={{
                        id: key,
                        symbol: key,
                        current_price: value.toFixed(2),
                        price_change_percentage_24h: HourValue.usd_24h_change?.toFixed(2) || "N/A",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* News Section */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-full mr-2">
                <span className="text-xl">📰</span>
              </div>
              <h2 className="text-xl font-semibold">Latest Crypto News</h2>
            </div>
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-gray-700">
              {news.length > 0 ? (
                <ul className="space-y-3">
                  {news.map((article, index) => (
                    <li key={index} className="border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start"
                      >
                        <span className="text-blue-400 mr-2 mt-1 flex-shrink-0">🔗</span>
                        <span className="text-gray-300 group-hover:text-blue-400 transition-colors duration-200">
                          {article.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-4">No news articles available</p>
              )}
            </div>
            
            {/* Alerts Section */}
            {/* <div className="mt-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full mr-2">
                  <span className="text-xl">⚠️</span>
                </div>
                <h2 className="text-xl font-semibold">Active Alerts</h2>
              </div>
              <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-gray-700">
                {weatherAlerts && weatherAlerts.length > 0 ? (
                  <div className="mb-4">
                    <h3 className="text-sm uppercase text-gray-400 mb-2">Weather Alerts</h3>
                    <WeatherAlerts alerts={weatherAlerts} />
                  </div>
                ) : null}
                
                {priceAlerts && priceAlerts.length > 0 ? (
                  <div>
                    <h3 className="text-sm uppercase text-gray-400 mb-2">Crypto Alerts</h3>
                    <CryptoAlerts alerts={priceAlerts} />
                  </div>
                ) : null}
                
                {(!weatherAlerts || weatherAlerts.length === 0) && (!priceAlerts || priceAlerts.length === 0) && (
                  <p className="text-gray-400 text-center py-2">No active alerts</p>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
