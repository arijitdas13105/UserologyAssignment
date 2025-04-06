"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSocketPrice, addPriceAlert, setError } from "../redux/slices/cryptoSlice";
  
export default function WebSocketProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let socket;
    let isMounted = true;

    const setupWebSocket = () => {
      try {
        console.log("Setting up WebSocket...");
        socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,dogecoin");

        socket.onopen = () => {
          if (isMounted) {
            console.log("WebSocket connection established.");
          }
        };

        socket.onmessage = (event) => {
          if (!isMounted) return;

          const data = JSON.parse(event.data);

          // Convert string prices to numbers
          const parsedData = {};
          for (const [key, value] of Object.entries(data)) {
            parsedData[key] = parseFloat(value);
          }

           dispatch(setSocketPrice(parsedData));

           const btcPrice = parsedData.bitcoin?.toFixed(2) || "N/A";
          const ethPrice = parsedData.ethereum?.toFixed(2) || "N/A";
          dispatch(
            addPriceAlert({
              type: "price_alert",
              message: `Price Update from WebSocketProvider: BTC: $${btcPrice}, ETH: $${ethPrice}`,
            })
          );
        };

        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          if (isMounted) {
            dispatch(setError("WebSocket connection failed."));
          }
        };

        socket.onclose = () => {
          console.log("WebSocket connection closed.");
          if (isMounted) {
            setTimeout(setupWebSocket, 5000);  
          }
        };
      } catch (error) {
        console.error("Error setting up WebSocket:", error);
        if (isMounted) {
          dispatch(setError(error.message));
        }
      }
    };

    setupWebSocket();

    return () => {
      isMounted = false;
      if (socket) {
        socket.close();
      }
    };
  }, [dispatch]);

  return <>{children}</>;
}