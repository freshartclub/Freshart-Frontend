import { BarChart3, Calendar, Star, TrendingUp, Users } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppSelector } from "../../../store/typedReduxHooks";

// Sample data - in production, this would be fetched from an API
const DASHBOARD_DATA = [
  { name: "Aug 2020", views: 14, users: 3, favorites: 0 },
  { name: "Sep 2020", views: 60, users: 12, favorites: 0 },
  { name: "Oct 2020", views: 69, users: 8, favorites: 0 },
  { name: "Nov 2020", views: 78, users: 9, favorites: 1 },
  { name: "Dec 2020", views: 58, users: 8, favorites: 0 },
  { name: "Jan 2021", views: 40, users: 13, favorites: 0 },
  { name: "Feb 2021", views: 67, users: 15, favorites: 1 },
  { name: "Mar 2021", views: 68, users: 14, favorites: 3 },
  { name: "Apr 2021", views: 60, users: 24, favorites: 4 },
  { name: "May 2021", views: 67, users: 31, favorites: 8 },
  { name: "Jun 2021", views: 67, users: 46, favorites: 2 },
  { name: "Jul 2021", views: 64, users: 35, favorites: 2 },
  { name: "Aug 2021", views: 66, users: 25, favorites: 7 },
  { name: "Sep 2021", views: 43, users: 14, favorites: 14 },
];

// Constants
const TIME_FRAME_OPTIONS = [
  { value: "24hours", label: "24 Hours" },
  { value: "7days", label: "7 Days" },
  { value: "30days", label: "30 Days" },
  { value: "quarter", label: "Last Quarter" },
  { value: "year", label: "Last Year" },
  { value: "all", label: "All Time" },
];

const TREND_METRIC_OPTIONS = [
  { value: "views", label: "Views", icon: <TrendingUp size={16} /> },
  { value: "users", label: "Users", icon: <Users size={16} /> },
  { value: "favorites", label: "Favorites", icon: <Star size={16} /> },
  { value: "totals", label: "All Metrics", icon: <BarChart3 size={16} /> },
];

const StatsCard = ({ title, value, icon, color, isDarkMode }) => {
  const bgColorClass = isDarkMode ? "bg-gray-800 text-gray-100" : "bg-blue-50 text-gray-800";
  const iconColorClass = isDarkMode ? `text-${color}-400` : `text-${color}-500`;

  return (
    <div className={`${bgColorClass} p-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg`}>
      <div>
        <h3 className="text-sm font-medium opacity-75">{title}</h3>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
      </div>
      <div className={iconColorClass}>{icon}</div>
    </div>
  );
};

export default function ArtistDashboardSection() {
  // State
  const [timeFrame, setTimeFrame] = useState("all");
  const [trendMetric, setTrendMetric] = useState("views");
  const [isLoading, setIsLoading] = useState(false);

  // Redux state
  const isDarkMode = useAppSelector((state) => state.theme.mode === true);

  // Filter data based on timeFrame
  const filteredData = useMemo(() => {
    setIsLoading(true);

    try {
      const totalItems = DASHBOARD_DATA.length;

      switch (timeFrame) {
        case "24hours":
          return [DASHBOARD_DATA[totalItems - 1]];
        case "7days":
          return DASHBOARD_DATA.slice(-7);
        case "30days":
          return DASHBOARD_DATA.slice(-8);
        case "quarter":
          return DASHBOARD_DATA.slice(-4);
        case "year":
          return DASHBOARD_DATA.slice(-12);
        case "all":
        default:
          return DASHBOARD_DATA;
      }
    } catch (error) {
      console.error("Error filtering data:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [timeFrame]);

  // Calculate total metrics
  const totals = useMemo(() => {
    return {
      views: filteredData.reduce((sum, item) => sum + (item.views || 0), 0),
      users: filteredData.reduce((sum, item) => sum + (item.users || 0), 0),
      favorites: filteredData.reduce((sum, item) => sum + (item.favorites || 0), 0),
    };
  }, [filteredData]);

  // Handle time frame change
  const handleTimeFrameChange = useCallback((e) => {
    setTimeFrame(e.target.value);
  }, []);

  // Handle trend metric change
  const handleTrendMetricChange = useCallback((e) => {
    setTrendMetric(e.target.value);
  }, []);

  // Dynamic classes based on dark mode
  const containerClass = isDarkMode ? "bg-gray-900 p-6 rounded-lg shadow-md text-gray-100" : "bg-white p-6 rounded-lg shadow-md";

  const headerClass = isDarkMode
    ? "bg-gray-800 text-white p-3 rounded text-lg font-bold text-center"
    : "bg-gray-100 text-gray-800 p-3 rounded text-lg font-bold text-center";

  const selectionPanelClass = isDarkMode
    ? "bg-gray-800 border border-gray-700 p-3 rounded shadow-sm"
    : "bg-gray-50 border border-gray-200 p-3 rounded shadow-sm";

  const selectClass = isDarkMode
    ? "bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "bg-white border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  // Custom tooltip style
  const tooltipStyle = {
    backgroundColor: isDarkMode ? "#374151" : "#fff",
    border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
    color: isDarkMode ? "#f3f4f6" : "#111827",
    borderRadius: "4px",
    padding: "10px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="p-2 rounded shadow-md" style={tooltipStyle}>
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className={containerClass}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClass} transition-all duration-300`}>
      {/* Header Section */}
      <div className="flex justify-between mb-6 items-center">
        <div className={`${headerClass} px-6 shadow-md flex-grow`}>
          <div className="flex items-center justify-center space-x-2">
            <BarChart3 size={24} className={isDarkMode ? "text-blue-400" : "text-blue-600"} />
            <span className="text-xl">Artist Performance Dashboard</span>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Trend Selection */}
        <div>
          <div className={`${headerClass} mb-2`}>
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp size={20} />
              <span>Trend Selection</span>
            </div>
          </div>

          <div className={`${selectionPanelClass}  flex flex-col justify-between`}>
            <div>
              <label className="font-bold mb-2 block text-sm">Select Metric:</label>
              <select
                value={trendMetric}
                onChange={handleTrendMetricChange}
                className={`${selectClass} w-full mb-4`}
                aria-label="Select trend metric"
              >
                {TREND_METRIC_OPTIONS.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <div className={`${headerClass} mb-2`}>
            <div className="flex items-center justify-center space-x-2">
              <Calendar size={20} />
              <span>Time Period</span>
            </div>
          </div>

          <div className={`${selectionPanelClass}  flex flex-col justify-between`}>
            <div>
              <label className="font-bold mb-2 block text-sm">Select Time Frame:</label>
              <select value={timeFrame} onChange={handleTimeFrameChange} className={`${selectClass} w-full mb-4`} aria-label="Select time frame">
                {TIME_FRAME_OPTIONS.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-8">
        <StatsCard title="Total Views" value={totals.views} icon={<TrendingUp size={24} />} color="green" isDarkMode={isDarkMode} />
        <StatsCard title="Total Users" value={totals.users} icon={<Users size={24} />} color="amber" isDarkMode={isDarkMode} />
        <StatsCard title="Total Favorites" value={totals.favorites} icon={<Star size={24} />} color="blue" isDarkMode={isDarkMode} />
      </div>

      {/* Chart Section */}
      <div className={`${isDarkMode ? "bg-gray-800" : "bg-gray-50"} p-4 rounded-lg shadow-md mb-2`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Performance Trends</h3>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorFavorites" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} opacity={0.6} />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#9ca3af" : "#4b5563"}
                tick={{ fill: isDarkMode ? "#9ca3af" : "#4b5563" }}
                tickLine={{ stroke: isDarkMode ? "#6b7280" : "#9ca3af" }}
              />
              <YAxis
                stroke={isDarkMode ? "#9ca3af" : "#4b5563"}
                tick={{ fill: isDarkMode ? "#9ca3af" : "#4b5563" }}
                tickLine={{ stroke: isDarkMode ? "#6b7280" : "#9ca3af" }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                  color: isDarkMode ? "#f3f4f6" : "#111827",
                }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorViews)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2 }}
                name="Views"
                hide={trendMetric !== "views" && trendMetric !== "totals"}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#F59E0B"
                fillOpacity={1}
                fill="url(#colorUsers)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2 }}
                name="Users"
                hide={trendMetric !== "users" && trendMetric !== "totals"}
              />
              <Area
                type="monotone"
                dataKey="favorites"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorFavorites)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2 }}
                name="Favorites"
                hide={trendMetric !== "favorites" && trendMetric !== "totals"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-4 text-xs text-gray-500">
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}
