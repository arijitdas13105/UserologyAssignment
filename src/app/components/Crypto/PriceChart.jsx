"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef, useEffect } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceChart({ data }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  // Format chart data
  const chartData = {
    labels: data.map(([timestamp]) => 
      new Date(timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price (USD)",
        data: data.map(([, price]) => price),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        pointRadius: 0, // Remove points for better performance
        tension: 0.1,
        fill: true,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      }
    },
    animation: {
      duration: 1000,
    },
    elements: {
      line: {
        cubicInterpolationMode: 'monotone',
      }
    }
  };

  // Clean up chart instance on unmount
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={chartContainerRef}
      className="relative w-full"
      style={{ height: '400px' }} // Fixed height container
    >
      <Line 
        data={chartData}
        options={chartOptions}
        ref={(ref) => {
          chartInstance.current = ref;
        }}
      />
    </div>
  );
}


// "use client";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function PriceChart({ data }) {
//   const chartData = {
//     labels: data.map(([timestamp]) => 
//       new Date(timestamp).toLocaleDateString()
//     ),
//     datasets: [
//       {
//         label: "Price (USD)",
//         data: data.map(([, price]) => price),
//         borderColor: "#3b82f6",
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <Line 
//       data={chartData}
//       options={{
//         responsive: true,
//         plugins: {
//           legend: { position: "top" },
//         },
//         scales: {
//           y: { beginAtZero: false },
//         },
//         maintainAspectRatio: false,
//       }}
//       height={300}
//     />
//   );
// }