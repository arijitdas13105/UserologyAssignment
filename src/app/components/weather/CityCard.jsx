"use client";
import Link from "next/link";

export default function CityCard({ city }) {
  // Weather condition to icon mapping
  const getWeatherIcon = (condition) => {
    const weatherIcons = {
      clear: "☀️",
      clouds: "☁️",
      rain: "🌧️",
      drizzle: "🌦️",
      thunderstorm: "⛈️",
      snow: "❄️",
      mist: "🌫️",
      fog: "🌫️",
      haze: "🌫️",
    };
    
    if (!condition) return "🌡️";
    
    // Find matching weather icon based on description keywords
    const lowerCondition = condition.toLowerCase();
    for (const [key, icon] of Object.entries(weatherIcons)) {
      if (lowerCondition.includes(key)) {
        return icon;
      }
    }
    
    return "🌡️"; // Default icon
  };

  // Format temperature
  const formatTemp = (temp) => {
    return temp ? `${Math.round(temp)}°C` : "N/A";
  };

  // Weather icon based on condition
  const weatherIcon = getWeatherIcon(city.weather?.[0]?.description);
  
  // Temperature and wind classes based on values
  const getTempClass = (temp) => {
    if (!temp) return "text-gray-400";
    if (temp < 0) return "text-blue-300";
    if (temp < 10) return "text-blue-100";
    if (temp < 20) return "text-green-300";
    if (temp < 30) return "text-yellow-300";
    return "text-red-400";
  };
  
  const tempClass = getTempClass(city.main?.temp);

  return (
    <Link 
      href={`/Pages/Components/city/${encodeURIComponent(city.name)}`}
      className="block relative overflow-hidden rounded-xl border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20 hover:transform hover:-translate-y-1"
    >
      {/* Weather condition icon background */}
      <div className="absolute top-0 right-0 text-6xl opacity-10 p-4">
        {weatherIcon}
      </div>
      
      <div className="flex items-start p-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{city.name}</h3>
            <span className="text-3xl">{weatherIcon}</span>
          </div>
          
          <div className="mt-2">
            <span className={`text-2xl font-medium ${tempClass}`}>
              {formatTemp(city.main?.temp)}
            </span>
            <span className="text-sm text-gray-400 ml-1">
              ({city.weather?.[0]?.description || "N/A"})
            </span>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <span className="mr-1">💧</span>
              <span className="text-sm">
                Humidity: {city.main?.humidity || "N/A"}%
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="mr-1">💨</span>
              <span className="text-sm">
                Wind: {city.wind?.speed || "N/A"} m/s
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-gray-900 bg-opacity-80 flex justify-between items-center">
        <span className="text-sm text-gray-400">Local Time</span>
        <div className="flex items-center text-blue-400 text-sm group">
          <span>Detailed Forecast</span>
          <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
}


// "use client";
// import Link from "next/link";

// export default function CityCard({ city }) {
//   return (
//     <Link 
//       href={`/Pages/Components/city/${encodeURIComponent(city.name)}`}
//       className="block bg-gray-800 p-4 rounded-lg mb-4 hover:bg-gray-700 transition"
//     >
//       <h3 className="text-lg font-semibold">{city.name}</h3>
//       <p className="mt-2">
//         🌡️ {city.main?.temp}°C | 💧 {city.main?.humidity}% | {city.weather?.[0].description}
//       </p>
//       <p className="text-sm text-blue-400 mt-2">Click for detailed forecast →</p>
//     </Link>
//   );
// }