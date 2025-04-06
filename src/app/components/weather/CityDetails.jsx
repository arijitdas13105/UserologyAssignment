export default function CityDetail({ data }) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">
          {data.name} Weather Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Weather */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
            <p>🌡️ Temp: {data.main.temp}°C</p>
            <p>💧 Humidity: {data.main.humidity}%</p>
            <p>🌬️ Wind: {data.wind.speed} m/s</p>
            <p>☁️ {data.weather[0].description}</p>
          </div>
  
          {/* Historical Data (Mock) */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Last 5 Days</h2>
            {/* You would replace this with real historical API data */}
            {[22, 21, 20, 19, 18].map((temp, i) => (
              <p key={i}>{new Date(Date.now() - (i * 86400000)).toLocaleDateString()}: {temp}°C</p>
            ))}
          </div>
        </div>
      </div>
    );
  }