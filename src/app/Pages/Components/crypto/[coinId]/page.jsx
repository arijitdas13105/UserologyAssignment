"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { use } from "react";
import useCrypto from "@/app/Hooks/useCrypto";
import dynamic from "next/dynamic";

 const PriceChart = dynamic(() => import("@/app/components/crypto/PriceChart"), {
  ssr: false,
});

export default function CryptoDetailPage({ params }) {
  const [liveCoinId, setLiveCoinId] = useState("");
  const router = useRouter();
  const { coinId } = use(params);  
  
  useEffect(() => {
    setLiveCoinId(coinId);
  }, [coinId]);
  
  const dispatch = useDispatch();
  const { fetchCoinDetails } = useCrypto();

   const coinData = useSelector((state) => state.crypto.details[coinId]);
  const loading = useSelector((state) => state.crypto.loading);
  const livePrices = useSelector((state) => state.crypto.socketPrice);
  const updatingValueOFCoin = livePrices[liveCoinId];

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCoinDetails(coinId);  
      } catch (error) {
        console.error("Failed to load crypto data:", error);
        router.push("/dashboard");  
      }
    };
    loadData();
  }, [coinId]);

  // Price change styling
  const getPriceChangeClass = (change) => {
    if (!change) return "text-gray-400";
    return change >= 0 ? "text-green-400" : "text-red-400";
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-xl">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!coinData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center justify-center">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-xl font-bold mb-2">Data Loading Error</h2>
          <p className="mb-4">Failed to load data for this cryptocurrency.</p>
          <button
            onClick={() => router.push("/Pages/dashboard")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <nav className="mb-8">
          <button
            onClick={() => router.push("/Pages/dashboard")}
            className="group flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Dashboard
          </button>
        </nav>

        <div className="space-y-6">
          {/* Header with live price */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              {coinData.info.image?.small && (
                <img
                  src={coinData.info.image.small}
                  alt={coinData.info.name}
                  className="w-12 h-12 rounded-full bg-white/10 p-1"
                />
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {coinData.info.name} 
                  <span className="text-gray-400 ml-2 text-lg">
                    {coinData.info.symbol.toUpperCase()}
                  </span>
                </h1>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded">RANK #{coinData.info.market_cap_rank || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <span className="text-2xl md:text-3xl font-bold">${updatingValueOFCoin || coinData.info.market_data?.current_price.usd.toLocaleString()}</span>
                <span className={`ml-2 px-2 py-1 rounded text-sm ${getPriceChangeClass(coinData.info.market_data?.price_change_percentage_24h)}`}>
                  {coinData.info.market_data?.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                  {Math.abs(coinData.info.market_data?.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
              <span className="text-sm text-gray-400">Updated live</span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Price Chart</h2>
              <span className="text-sm px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full">7 Day History</span>
            </div>
            <div className="h-[420px] bg-gray-900/50 rounded-lg p-4">
              <PriceChart data={coinData.history.prices} />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Market Data */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all hover:border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600/20 mr-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Market Data</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Market Cap</p>
                  <p className="text-lg font-medium">${coinData.info.market_data?.market_cap.usd.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">24h Trading Volume</p>
                  <p className="text-lg font-medium">${coinData.info.market_data?.total_volume.usd.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Price Changes */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all hover:border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600/20 mr-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Price Changes</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">24 Hours</p>
                  <p className={`text-lg font-medium ${getPriceChangeClass(coinData.info.market_data?.price_change_percentage_24h)}`}>
                    {coinData.info.market_data?.price_change_percentage_24h >= 0 ? '+' : ''}
                    {coinData.info.market_data?.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">7 Days</p>
                  <p className={`text-lg font-medium ${getPriceChangeClass(coinData.info.market_data?.price_change_percentage_7d)}`}>
                    {coinData.info.market_data?.price_change_percentage_7d >= 0 ? '+' : ''}
                    {coinData.info.market_data?.price_change_percentage_7d.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">30 Days</p>
                  <p className={`text-lg font-medium ${getPriceChangeClass(coinData.info.market_data?.price_change_percentage_30d)}`}>
                    {coinData.info.market_data?.price_change_percentage_30d >= 0 ? '+' : ''}
                    {(coinData.info.market_data?.price_change_percentage_30d || 0).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">1 Year</p>
                  <p className={`text-lg font-medium ${getPriceChangeClass(coinData.info.market_data?.price_change_percentage_1y)}`}>
                    {coinData.info.market_data?.price_change_percentage_1y >= 0 ? '+' : ''}
                    {(coinData.info.market_data?.price_change_percentage_1y || 0).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Supply */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all hover:border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600/20 mr-2">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Supply</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Circulating Supply</p>
                  <p className="text-lg font-medium">{coinData.info.market_data?.circulating_supply.toLocaleString()} {coinData.info.symbol.toUpperCase()}</p>
                  {coinData.info.market_data?.circulating_supply && coinData.info.market_data?.total_supply && (
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${(coinData.info.market_data.circulating_supply / coinData.info.market_data.total_supply * 100).toFixed(0)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Supply</p>
                  <p className="text-lg font-medium">
                    {coinData.info.market_data?.total_supply ? 
                      `${coinData.info.market_data.total_supply.toLocaleString()} ${coinData.info.symbol.toUpperCase()}` : 
                      "Unlimited"}
                  </p>
                </div>
                {coinData.info.market_data?.max_supply && (
                  <div>
                    <p className="text-sm text-gray-400">Max Supply</p>
                    <p className="text-lg font-medium">{coinData.info.market_data.max_supply.toLocaleString()} {coinData.info.symbol.toUpperCase()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description Section (if available) */}
          {coinData.info.description?.en && (
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">About {coinData.info.name}</h2>
              <div className="prose prose-sm prose-invert max-h-64 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: coinData.info.description.en }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

 