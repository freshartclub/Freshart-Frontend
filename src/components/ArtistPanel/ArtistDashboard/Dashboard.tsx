import { motion } from "framer-motion";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/typedReduxHooks";
import { imageUrl } from "../../utils/baseUrls";
import { useGetArtistDashboard } from "./https/useGetArtistDashboard";

const ArtistDashboard = () => {
  const darkMode = useAppSelector((state) => state.theme.mode);

  const { data, isLoading } = useGetArtistDashboard();

  const platformDays = data?.createdDate ? new Date(data.createdDate) : null;

  let daysSinceCreation = null;
  if (platformDays) {
    const today = new Date();
    const diffTime = today.getTime() - platformDays.getTime();
    daysSinceCreation = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  const daysPlusOne = daysSinceCreation !== null ? daysSinceCreation + 1 : null;

  const calculateRemainingDays = () => {
    if (!data?.revaliadtion?.nextRevalidationDate) {
      return "No revalidation date available";
    }

    const nextRevalidationDate = new Date(data.revaliadtion.nextRevalidationDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate difference in milliseconds
    const diffTime = nextRevalidationDate.getTime() - today.getTime();

    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return remainingDays;
  };

  const remainingDays = calculateRemainingDays();

  const formatRevalidationStatus = (days) => {
    if (typeof days === "string") return days;

    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""}`;
    } else if (days === 0) {
      return "Revalidation is due today";
    } else {
      return `overdue ${Math.abs(days)}`;
    }
  };

  const revalidationStatus = formatRevalidationStatus(remainingDays);

  const dashboardData = {
    metrics: {
      artworks: {
        count: data?.publish,
        contractual: data?.numArtwork,
        trendData: [data?.draft, data?.numArtwork, data?.publish],
      },
      incomings: {
        lastMonth: 2535,
        currentMonthForecast: 2595,
        total: 10345,
      },
      platformDays: daysPlusOne,
      revalidationDays: revalidationStatus,
    },
    stats: {
      views: { value: data?.views?.comingSoon + data?.views?.new + data?.views?.search, trend: "up" },
      users: { value: data?.circleUser, trend: "up" },
      likes: { value: 4500, trend: "up" },
      favorites: { value: 1230, trend: "down" },
    },
    topArtworks: data?.top4,
    artistScore: {
      value: 345,
      trend: "up",
    },
    insignias: data?.insignia,
  };

  const colors = {
    bg: darkMode ? "bg-gray-900" : "bg-gray-100",
    cardBg: darkMode ? "bg-gray-800" : "bg-white",
    primary: darkMode ? "bg-[#1F2937]" : "bg-[#FFFFFF]",
    secondary: darkMode ? "bg-[#1F2937]" : "bg-[#FFFFFF]",
    text: darkMode ? "text-gray-100" : "text-gray-800",
    textSecondary: darkMode ? "text-gray-300" : "text-gray-600",
    accent: "bg-yellow-400",
    success: darkMode ? "text-green-400" : "text-green-600",
    danger: darkMode ? "text-red-400" : "text-red-600",
  };

  const TrendIndicator = ({ trend }) => (
    <motion.span initial={{ scale: 1 }} whileHover={{ scale: 1.2 }} className={trend === "up" ? colors.success : colors.danger}>
      {trend === "up" ? <FiArrowUp /> : <FiArrowDown />}
    </motion.span>
  );

  const getRevalidationColors = (days) => {
    const input = days;
    const cleaned = input.replace(/days/i, "").trim();

    if (cleaned >= 30) {
      return ["bg-green-500", "bg-gray-400", "bg-gray-400"];
    } else if (days > 0) {
      return ["bg-gray-400", "bg-yellow-400", "bg-gray-400"];
    } else {
      return ["bg-gray-400", "bg-gray-400", "bg-red-500"];
    }
  };

  const lightColors = getRevalidationColors(dashboardData.metrics.revalidationDays);

  const getTextColorClass = (days) => {
    const input = days;
    const cleaned = input.replace(/days/i, "").trim();

    if (cleaned >= 30) return "text-green-500";
    if (cleaned > 0) return "text-yellow-500";
    return "text-red-500";
  };

  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const MetricCard = ({ title, value, subValue, children, className = "", url }) => (
    <motion.div
      onClick={() => handleNavigate(url)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-br ${colors.primary} ${colors.text} p-4 rounded-lg shadow-lg flex flex-col cursor-pointer ${className}`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="text-center my-2">
        <span className="text-6xl font-bold">{value}</span>
        {subValue && <span className={`text-sm ml-2 ${colors.textSecondary}`}>{subValue}</span>}
      </div>
      {children}
    </motion.div>
  );

  const StatCard = ({ title, value, trend }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className={`p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-[#FFFFFF]"} border border-zinc-300 flex items-center justify-between`}
    >
      <div className="flex items-center">
        <TrendIndicator trend={trend} />
        <span className="ml-2 capitalize">{title}</span>
      </div>
      <span className="text-xl font-bold">{value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value?.toLocaleString()}</span>
    </motion.div>
  );

  const BarChart = ({ data }) => (
    <div className="h-16 flex items-end justify-center mt-4">
      {data.map((height, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${height * 4}px` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`w-4 mx-1 relative ${
            index >= 2 ? (darkMode ? "bg-green-500" : "bg-green-400") : darkMode ? "bg-red-500" : "bg-red-400"
          } rounded-t-sm`}
        >
          <div
            className={`absolute top-0 w-4 h-1 ${index >= 2 ? (darkMode ? "bg-green-600" : "bg-green-600") : darkMode ? "bg-red-600" : "bg-red-600"}`}
          ></div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={`${colors.bg} p-4 w-full min-h-screen font-sans transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`bg-gradient-to-r ${colors.primary} ${colors.text} p-4 mb-6 text-center rounded-lg shadow-lg`}
        >
          <h1 className="text-2xl font-bold">Artist Dashboard</h1>
          <p className={darkMode ? "text-blue-200" : "text-gray-600"}>Coming Soon</p>
        </motion.header>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard
            url="arwork-mangement"
            title="Number of Artworks"
            value={dashboardData.metrics.artworks.count}
            subValue={dashboardData.metrics.artworks.contractual}
            className="relative"
          >
            <BarChart data={dashboardData.metrics.artworks.trendData} />
          </MetricCard>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={() => handleNavigate("commercilization")}
            className={`relative bg-gradient-to-b ${colors.primary} ${colors.text} p-4 rounded-lg shadow-lg`}
          >
            <h2 className="text-xl font-semibold mb-6 text-center">Incomings</h2>

            <div className="space-y-4">
              <StatCard title="Last month" value={dashboardData.metrics.incomings.lastMonth} trend="up" suffix="€" />

              <StatCard title="Current month forecast" value={dashboardData.metrics.incomings.currentMonthForecast} trend="up" suffix="€" />

              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`flex items-center justify-between ${darkMode ? "bg-gray-700" : "bg-[#FFFFFF]"} border border-zinc-300 p-3 rounded-md`}
              >
                <span>Total</span>
                <span className="text-2xl font-bold">{dashboardData.metrics.incomings.total.toLocaleString()}€</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-[#FFFFFF]"} border border-zinc-300 p-3 rounded-md`}
              >
                <span>View All</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-rows-2 gap-4">
            <MetricCard title="Days in Platform" value={dashboardData.metrics.platformDays} />

            <motion.div whileHover={{ y: -2 }} className={`relative bg-gradient-to-b ${colors.primary} ${colors.text} p-4 rounded-lg shadow-lg`}>
              <h2 className="text-lg font-semibold mb-2">Re-validation</h2>
              <div className="flex items-center justify-center">
                <span className={`text-xl capitalize font-bold ${getTextColorClass(dashboardData.metrics.revalidationDays)}`}>
                  {dashboardData.metrics.revalidationDays}
                </span>
                <span className="text-sm ml-2">
                  {Math.abs(dashboardData?.metrics?.revalidationDays) === 1 ? "day" : "days"}
                  {dashboardData?.metrics?.revalidationDays < 0 ? " overdue" : " remaining"}
                </span>
                <div className="ml-4 flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: dashboardData?.metrics?.revalidationDays <= 0 ? [0, 10, -10, 0] : 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-8 h-8 ${lightColors[0]} rounded-full shadow-inner`}
                  />
                  <motion.div
                    animate={{
                      rotate: dashboardData?.metrics?.revalidationDays > 0 && dashboardData?.metrics?.revalidationDays <= 30 ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-8 h-8 ${lightColors[1]} rounded-full mt-1 shadow-inner`}
                  />
                  <motion.div
                    animate={{ rotate: dashboardData?.metrics?.revalidationDays > 30 ? [0, 10, -10, 0] : 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-8 h-8 ${lightColors[2]} rounded-full mt-1 shadow-inner`}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div> */}

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          {/* <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className={`relative bg-gradient-to-b ${colors.primary} ${colors.text} p-6 rounded-lg shadow-lg`}
          >
            <div onClick={() => handleNavigate("artist-views")} className="space-y-4">
              {Object.entries(dashboardData.stats).map(([key, { value, trend }]) => (
                <StatCard key={key} title={key} value={value} trend={trend} />
              ))}
            </div>
          </motion.div> */}

    
          {/* <div className="md:col-span-2">
            <motion.div whileHover={{ scale: 1.005 }} className={`bg-gradient-to-b ${colors.primary} ${colors.text} p-4 rounded-lg shadow-lg`}>
              <h2 className="text-xl font-semibold text-center mb-4">Top Artworks</h2>

              <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} p-4 rounded-md`}>
                {dashboardData?.topArtworks?.map((artwork, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className={`flex items-center justify-between mb-3 last:mb-0 ${darkMode ? "bg-gray-800" : "bg-[#FFFFFF] "} p-3 rounded-md hover:${
                      darkMode ? "bg-gray-900" : "bg-zinc-200"
                    } transition-colors`}
                  >
                    <div className="flex items-center">
                      <motion.img
                        src={`${imageUrl}/users/${artwork?.mainImage}`}
                        alt={artwork.artworkName}
                        whileHover={{ rotate: 5 }}
                        className="w-10 h-10 mr-3 rounded-full object-cover border-2 border-yellow-400"
                      />
                      <span className="text-lg font-medium">{artwork.artworkName}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendIndicator trend={artwork.trend} />
                      <span className="text-lg font-medium ml-1">{(artwork.totalViews / 1000).toFixed(1)}K</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div> */}
        </div>

       
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <motion.div whileHover={{ scale: 1.02 }} className={`relative bg-gradient-to-b ${colors.primary} ${colors.text} p-4 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-semibold mb-2">Artist Score</h2>
            <div className="flex items-center">
              <TrendIndicator trend={dashboardData.artistScore.trend} />
              <span className="text-6xl font-bold">{dashboardData.artistScore.value}</span>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="ml-4 w-12 h-12 bg-white rounded-full shadow-inner"
              />
            </div>
          </motion.div>

         
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`relative bg-gradient-to-b ${colors.primary} ${colors.text} p-4 rounded-lg shadow-lg`}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">Insignias and Credentials</h2>

              <div className={`${colors.cardBg} p-4 rounded-md flex flex-wrap justify-center gap-4`}>
                {dashboardData?.insignias?.map((insignia, i) => (
                  <motion.div key={i} className="group relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <motion.img
                      src={`${imageUrl}/users/${insignia?.insigniaImage}`}
                      alt={insignia.credentialName}
                      className="w-16 h-16 object-contain"
                      // animate={{
                      //   rotate: [0, 5, -5, 0],
                      //   y: [0, -5, 0]
                      // }}
                      // transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded"
                    >
                      {insignia.credentialName}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ArtistDashboard;
