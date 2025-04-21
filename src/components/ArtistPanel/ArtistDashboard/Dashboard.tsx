import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/typedReduxHooks";
import LineChart from "./LineChart";
import Progress from "./Progress";
import ArtCardPagination from "../Artwork/ArtCardPagination";

const Dashboard = () => {
  const dark = useAppSelector((state) => state.theme.mode);
  const [timeFilter, setTimeFilter] = useState<"all" | "24h" | "7d" | "30d">("all");
  const [filteredStats, setFilteredStats] = useState([]);

  const timeFilters = [
    { value: "all", label: "All Time" },
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "1 Week" },
    { value: "30d", label: "1 Month" },
  ];

  const statsByTime = {
    all: [
      { name: "Total Artworks", value: "124", change: "+12%", trend: "up" },
      { name: "Total Orders", value: "220", change: "+10%", trend: "up" },
      { name: "Revenue", value: "$16,820", change: "+6.2%", trend: "up" },
      { name: "Pending Orders", value: "14", change: "-2", trend: "down" },
    ],
    "24h": [
      { name: "New Artworks", value: "3", change: "+1", trend: "up" },
      { name: "New Orders", value: "5", change: "+1", trend: "up" },
      { name: "Revenue", value: "$820", change: "+2%", trend: "up" },
      { name: "Pending Orders", value: "1", change: "-1", trend: "down" },
    ],
    "7d": [
      { name: "Artworks", value: "18", change: "+4", trend: "up" },
      { name: "Orders", value: "42", change: "+5", trend: "up" },
      { name: "Revenue", value: "$3,110", change: "+3%", trend: "up" },
      { name: "Pending Orders", value: "5", change: "0", trend: "down" },
    ],
    "30d": [
      { name: "Uploads", value: "40", change: "+8", trend: "up" },
      { name: "Orders", value: "160", change: "+7%", trend: "up" },
      { name: "Revenue", value: "$12,620", change: "+4%", trend: "up" },
      { name: "Pending Orders", value: "10", change: "-3", trend: "down" },
    ],
  };

  useEffect(() => {
    setFilteredStats(statsByTime[timeFilter]);
  }, [timeFilter]);

  return (
    <div className={`w-full p-4 transition-colors duration-200 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-gray-800"}`}>Artist Dashboard</h1>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>Overview of your activity</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {timeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTimeFilter(filter.value as any)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors border ${
                timeFilter === filter.value
                  ? "bg-[#EE1D52] text-white border-transparent"
                  : dark
                  ? "text-gray-300 border-gray-600 hover:bg-gray-700"
                  : "text-gray-600 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {filteredStats.map((stat) => (
          <div
            key={stat.name}
            className={`rounded-lg p-4 shadow-sm transition-all border ${
              dark ? "bg-gray-800 hover:bg-gray-700 border-gray-600" : "bg-white hover:bg-gray-100"
            }`}
          >
            <p className={`text-xs font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>{stat.name}</p>
            <div className="mt-1 flex items-baseline justify-between">
              <p className={`text-xl font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
              <span className={`inline-flex items-center text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
                {stat.trend === "up" ? (
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ArtCardPagination dark={dark} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`rounded-lg p-4 ${dark ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h3 className={`text-sm font-medium mb-3 ${dark ? "text-white" : "text-gray-800"}`}>Your Progress</h3>
          <Progress dark={dark} />
        </div>

        <div className={`rounded-lg p-4 lg:col-span-2 ${dark ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h3 className={`text-sm font-medium mb-3 ${dark ? "text-white" : "text-gray-800"}`}>Sales Analytics</h3>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
