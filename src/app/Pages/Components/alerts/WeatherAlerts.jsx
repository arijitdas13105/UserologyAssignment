"use client";

export default function WeatherAlerts({ alerts }) {
  console.log("weatheralerts",alerts)
  return (
    <div className="fixed top-4 left-4 z-50 w-80 max-h-[50vh] overflow-y-auto">
      <div className="bg-blue-800 border-l-4 border-blue-400 rounded-lg shadow-lg p-4 mb-4">
        <h3 className="font-bold text-lg mb-2">🌦️ Weather Alerts</h3>
        {alerts.length > 0 ? (
          <ul className="space-y-2">
            {alerts.map((alert, index) => (
              <li key={`weather-${index}`} className="text-sm">
                {alert.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-300">No weather alerts</p>
        )}
      </div>
    </div>
  );
}