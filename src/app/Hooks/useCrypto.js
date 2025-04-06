"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrices,
  setCoinDetails,
  addPriceAlert,
  setLoading,
  setError,
} from "../redux/slices/cryptoSlice";

const useCrypto = () => {
  const dispatch = useDispatch();
  const [priceAlerts, setPriceAlerts] = useState([]);
  // const [cryptoPrices, setCryptoPrices] = useState({});
  const { prices, lastUpdated } = useSelector((state) => state.crypto);
  const fetchCryptoPrices = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_24hr_change=true"
      );
      // return response.data;
      dispatch(setPrices(response.data));

      const btcPrice = response.data.bitcoin?.usd?.toFixed(2) || "N/A";
      const ethPrice = response.data.ethereum?.usd?.toFixed(2) || "N/A";
      dispatch(
        addPriceAlert({
          type: "price_alert",
          message: `Price Update from useCrypto: BTC: $${btcPrice}, ETH: $${ethPrice}`,
        })
      );
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error fetching crypto prices:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCoinDetails = async (coinId) => {
    try {
      dispatch(setLoading(true));
      const [infoRes, historyRes] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`),
        fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
        ),
      ]);
      const info = await infoRes.json();
      const history = await historyRes.json();
      dispatch(setCoinDetails({ coinId, data: { info, history } }));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { fetchCryptoPrices, fetchCoinDetails };
};

export default useCrypto;
