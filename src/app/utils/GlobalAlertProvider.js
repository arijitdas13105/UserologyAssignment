"use client";
import useGlobalAlerts from "../Pages/Components/alerts/useGlobalAlerts";

const GlobalAlertProvider = ({ children }) => {
  // Use the global alerts hook
  useGlobalAlerts();

  return <>{children}</>;
};

export default GlobalAlertProvider;