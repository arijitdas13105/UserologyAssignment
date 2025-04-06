
"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function CryptoCard({ coin }) {
  const livePrices = useSelector((state) => state.crypto.socketPrice);
  const currentPrice = livePrices[coin.symbol] || coin.current_price;

  const priceChangePercentage =
    !isNaN(parseFloat(coin.price_change_percentage_24h))
      ? parseFloat(coin.price_change_percentage_24h).toFixed(2)
      : "N/A";

  // Determine if price change is positive, negative, or neutral for styling
  const isPriceUp = parseFloat(priceChangePercentage) > 0;
  const isPriceDown = parseFloat(priceChangePercentage) < 0;
  const priceChangeColor = isPriceUp 
    ? "text-green-400" 
    : isPriceDown 
      ? "text-red-400" 
      : "text-gray-400";

  // Get coin icon based on symbol (you can replace this with actual icons)
  const getCoinIcon = (symbol) => {
    const icons = {
      btc: "₿",
      eth: "Ξ",
      usdt: "₮",
      bnb: "BNB",
      xrp: "XRP",
      ada: "ADA",
      sol: "SOL",
      doge: "Ð",
      dot: "DOT",
      // Add more as needed
    };
    return icons[symbol.toLowerCase()] || "💰";
  };

  return (
    <Link 
      href={`/Pages/Components/crypto/${coin.id}`}  
      className="block relative overflow-hidden rounded-xl border border-gray-700 transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:shadow-blue-900/20 hover:transform hover:-translate-y-1"
    >
      <div className="flex items-center p-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 mr-4 text-xl">
          {getCoinIcon(coin.symbol)}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{coin.symbol.toUpperCase()}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-700 bg-opacity-50">LIVE</span>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xl font-medium">${currentPrice}</span>
            <div className={`flex items-center ${priceChangeColor}`}>
              {isPriceUp ? (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              ) : isPriceDown ? (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path>
                </svg>
              )}
              <span>{priceChangePercentage}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-gray-900 bg-opacity-80 flex justify-between items-center">
        <span className="text-sm text-gray-400">24h Change</span>
        <div className="flex items-center text-blue-400 text-sm group">
          <span>View Details</span>
          <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
}


//----------------
// "use client";
// import Link from "next/link";
// import { useSelector } from "react-redux";

// export default function CryptoCard({ coin }) {
//   const livePrices = useSelector((state) => state.crypto.socketPrice);
//   const currentPrice = livePrices[coin.symbol] || coin.current_price;
//   console.log("coin", coin);

//   // const priceChangePercentage =
//   // typeof coin.price_change_percentage_24h === "number"
//   //   ? coin.price_change_percentage_24h.toFixed(2)
//   //   : "N/A";

//   const priceChangePercentage =
//   !isNaN(parseFloat(coin.price_change_percentage_24h)) // Check if it can be converted to a number
//     ? parseFloat(coin.price_change_percentage_24h).toFixed(2) // Convert to number and format to 2 decimal places
//     : "N/A"; // Fallback if it's not a valid number

//   return (
// <>
//      <Link 
//     href={`/Pages/Components/crypto/${coin.id}`}  
//       className="block bg-gray-800 p-4 rounded-lg mb-4 hover:bg-gray-700 transition"
//     >
//       <h3 className="text-lg font-semibold">{coin.symbol.toUpperCase()}</h3>
//       <p className="mt-2">
//         💰 ${currentPrice} | 📉 {priceChangePercentage}%
//       </p>
//       <p className="text-sm text-blue-400 mt-2">Click for detailed metrics →</p>
//     </Link>
//     </>
//   );
// }


//--------------Asli----------------



// "use client";
// import Link from "next/link";
// import { useSelector } from "react-redux";

// export default function CryptoCard({ coin }) {
//   const livePrices = useSelector((state) => state.crypto.socketPrice);
//   const currentPrice = livePrices[coin.symbol] || coin.current_price;
//   return (
// <>
//      <Link 
//       href={`/Pages/Components/crypto/${coin.id}`} 
//       className="block bg-gray-800 p-4 rounded-lg mb-4 hover:bg-gray-700 transition"
//     >
//       <h3 className="text-lg font-semibold">{coin.symbol.toUpperCase()}</h3>
//       <p className="mt-2">
//         💰 ${coin.current_price} | 📉 {coin.price_change_percentage_24h?.toFixed(2)}%
//       </p>
//       <p className="text-sm text-blue-400 mt-2">Click for detailed metrics →</p>
//     </Link>
//     </>
//   );
// }