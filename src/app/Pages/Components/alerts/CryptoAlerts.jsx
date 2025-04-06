"use client";

export default function CryptoAlerts({ alerts }) {
    // console.log("alerts",alerts)
    const recentAlerts = [...alerts]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 6)
  return (
    <div className="fixed top-4 right-4 z-50 w-80 max-h-[50vh] overflow-y-auto">
      <div className="bg-green-800 border-l-4 border-green-400 rounded-lg shadow-lg p-4 mb-4">
        <h3 className="font-bold text-lg mb-2">💰 Crypto Alerts</h3>
        {recentAlerts.length > 0 ? (
          <ul className="space-y-2">
            {recentAlerts.map((alert, index) => (
              <li key={`crypto-${index}`} className="text-sm">
                {alert.message}
              </li>
            ))}
            {/* {alerts.slice(0, 5).map((alert, index) => (  // Show only last 5 alerts
  <li key={`${alert.type}-${index}`} className="text-sm">
    {alert.message}
  </li>
))} */}
            
          </ul>
        ) : (
          <p className="text-sm text-gray-300">No crypto alerts</p>
        )}
      </div>
    </div>
  );
}