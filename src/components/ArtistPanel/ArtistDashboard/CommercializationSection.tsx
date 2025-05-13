import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Award, Circle, DollarSign, Package, ShoppingCart, BarChart } from "lucide-react";
import { useAppSelector } from "../../../store/typedReduxHooks";

// Types for better type safety
type MetricProps = {
  title: string;
  value: string | number;
  color?: string;
  darkMode?: boolean;
  icon?: React.ReactNode;
};

type TrendProps = {
  trend: "up" | "down" | "equal";
};

type ChartProps = {
  value: string | number;
} & TrendProps;

type ScoreProps = {
  score: number;
  categoryRank: string;
  platformRank: string;
  categoryPercentile: number;
  platformPercentile: number;
  darkMode?: boolean;
};

type PeriodSelectorProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode?: boolean;
};

// Theme colors generator
const getColors = (darkMode: boolean) => ({
  bg: darkMode ? "bg-gray-900" : "bg-gray-100",
  cardBg: darkMode ? "bg-gray-800" : "bg-white",
  primary: darkMode ? "bg-gray-700" : "bg-blue-500",
  secondary: darkMode ? "bg-gray-700" : "bg-blue-100",
  text: darkMode ? "text-gray-100" : "text-gray-800",
  textSecondary: darkMode ? "text-gray-300" : "text-gray-600",
  accent: darkMode ? "bg-indigo-600" : "bg-yellow-400",
  accentText: darkMode ? "text-indigo-200" : "text-gray-800",
  success: darkMode ? "text-green-400" : "text-green-600",
  danger: darkMode ? "text-red-400" : "text-red-600",
  border: darkMode ? "border-gray-700" : "border-gray-200",
  shadow: darkMode ? "shadow-lg shadow-gray-900/20" : "shadow-md",
  hover: darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50",
  highlight: darkMode ? "bg-indigo-900/30" : "bg-blue-50",
});

// Component to display circular chart with central number
const CircleMetric = ({ title, value, darkMode = false, icon }: MetricProps) => {
  const colors = getColors(darkMode);

  return (
    <div
      className={`flex flex-col items-center ${colors.cardBg} rounded-lg p-4 h-full ${colors.shadow} transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className={`${colors.text} text-lg font-bold`}>{title}</h3>
        <div className={`${colors.primary} p-2 rounded-full`}>
          {icon || <Package size={18} className={darkMode ? "text-gray-200" : "text-white"} />}
        </div>
      </div>

      <div className="relative flex items-center justify-center w-32 h-32 my-4">
        {/* Background circle segments */}
        <div className="absolute inset-0 rounded-full border-8 border-green-500 opacity-70"></div>
        <div
          className="absolute inset-0 rounded-full border-8 border-orange-500 opacity-70"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
        ></div>
        <div
          className="absolute inset-0 rounded-full border-8 border-blue-500 opacity-70"
          style={{ clipPath: "polygon(50% 0, 100% 0, 100% 25%, 50% 25%)" }}
        ></div>

        {/* Center circle with value */}
        <div className={`${darkMode ? "bg-gray-700" : "bg-blue-50"} rounded-full w-24 h-24 flex items-center justify-center z-10 ${colors.shadow}`}>
          <span className={`${colors.text} text-4xl font-bold`}>{value}</span>
        </div>

        {/* Edit button indicator */}
        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 cursor-pointer transition-transform duration-200 hover:scale-110">
          <Circle size={16} className="text-white" />
        </div>
      </div>

      <div className={`${colors.highlight} mt-2 p-2 rounded-md text-xs text-center w-full ${colors.text} border ${colors.border}`}>
        Current Value in selected period of time
      </div>
      <div className={`${colors.highlight} mt-2 p-2 rounded-md text-xs text-center w-full ${colors.text} border ${colors.border}`}>
        Split by Catalog
      </div>
    </div>
  );
};

// Component to display bar chart with income values
const IncomeChart = ({ value, trend, darkMode = false }: ChartProps & { darkMode?: boolean }) => {
  const colors = getColors(darkMode);

  // Generate more realistic data with some variation
  const generateBarData = (trend: "up" | "down" | "equal") => {
    const baseValues = [20, 35, 30, 45, 50, 70];

    if (trend === "up") {
      return baseValues.map((v, i) => Math.floor(v * (1 + i * 0.15)));
    } else if (trend === "down") {
      return [...baseValues].reverse();
    }
    return baseValues;
  };

  const barData = generateBarData(trend);

  return (
    <div className={`flex flex-col ${colors.cardBg} rounded-lg p-4 h-full ${colors.shadow} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <div className={`${colors.primary} p-2 rounded-full mr-3`}>
            <DollarSign size={18} className={darkMode ? "text-gray-200" : "text-white"} />
          </div>
          <h3 className={`${colors.text} text-lg font-bold`}>Incomings</h3>
        </div>
        <div className={`${colors.highlight} py-1 px-3 rounded-full text-xs ${colors.text} flex items-center`}>
          {trend === "up" && <TrendingUp size={14} className={`mr-1 ${colors.success}`} />}
          {trend === "down" && <TrendingDown size={14} className={`mr-1 ${colors.danger}`} />}
          {trend === "equal" && <Minus size={14} className="mr-1 text-yellow-400" />}
          <span>vs last period</span>
        </div>
      </div>

      <div className={`${colors.text} text-4xl font-bold my-6 flex items-center justify-center`}>
        {value}€ {trend === "up" && <TrendingUp className={`ml-2 ${colors.success}`} />}
        {trend === "down" && <TrendingDown className={`ml-2 ${colors.danger}`} />}
        {trend === "equal" && <Minus className="ml-2 text-yellow-400" />}
      </div>

      <div className="w-full h-32 flex items-end justify-around mt-4">
        {barData.map((height, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <div
              className={`${trend === "up" ? "bg-green-500" : trend === "down" ? "bg-red-500" : colors.accent} 
                w-8 rounded-t-md transition-all duration-500 group-hover:opacity-90`}
              style={{ height: `${height}px` }}
            ></div>
            <div className={`${darkMode ? "bg-gray-600" : "bg-gray-300"} p-1 rounded-full mt-1 w-2`}></div>
            <span className={`${colors.textSecondary} text-xs mt-1`}>{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][idx]}</span>
          </div>
        ))}
      </div>

      <div className={`${colors.highlight} mt-6 p-2 rounded-md text-xs text-center w-full ${colors.text} border ${colors.border}`}>
        Group by selected period of time and stacked by catalog
      </div>
    </div>
  );
};

// Component to display forecast value
const Forecast = ({ value, trend, darkMode = false }: ChartProps & { darkMode?: boolean }) => {
  const colors = getColors(darkMode);

  return (
    <div className={`flex flex-col ${colors.cardBg} rounded-lg p-4 h-full ${colors.shadow} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center mb-4">
        <div className={`${colors.primary} p-2 rounded-full mr-3`}>
          <BarChart size={18} className={darkMode ? "text-gray-200" : "text-white"} />
        </div>
        <h3 className={`${colors.text} text-lg font-bold`}>Forecast</h3>
      </div>

      <div className={`${colors.text} text-4xl font-bold flex items-center justify-center my-6`}>
        {value}€ {trend === "up" && <TrendingUp className={`ml-2 ${colors.success}`} />}
        {trend === "down" && <TrendingDown className={`ml-2 ${colors.danger}`} />}
        {trend === "equal" && <Minus className="ml-2 text-yellow-400" />}
      </div>

      <div className={`${colors.highlight} mt-2 p-2 rounded-md text-xs w-full ${colors.text} border ${colors.border}`}>
        Calculated according to the selected period of time
      </div>

      <div className={`${colors.highlight} mt-4 p-2 rounded-md text-xs w-full ${colors.text} border ${colors.border}`}>
        <p>Formula to be decided. Insignia is based on the score.</p>
        <p className="mt-1">Rank will provide context of this score versus other artists in same category and platform.</p>
      </div>
    </div>
  );
};

// Component to display artist score
const ArtistScore = ({ score, categoryRank, platformRank, categoryPercentile, platformPercentile, darkMode = false }: ScoreProps) => {
  const colors = getColors(darkMode);

  return (
    <div className={`flex flex-col ${colors.cardBg} rounded-lg p-4 h-full ${colors.shadow} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center mb-4">
        <div className={`${colors.primary} p-2 rounded-full mr-3`}>
          <Award size={18} className={darkMode ? "text-gray-200" : "text-white"} />
        </div>
        <h3 className={`${colors.text} text-lg font-bold`}>Artist Score</h3>
      </div>

      <div className="flex items-center justify-center my-4">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full ${darkMode ? "bg-gray-700" : "bg-blue-50"} ${colors.shadow}`}></div>
          <Award className="text-yellow-400 absolute" size={32} />
          <span className={`${colors.text} text-5xl font-bold z-10`}>{score}</span>
        </div>
      </div>

      <div className={`${colors.text} text-center mb-4 grid grid-cols-2 gap-2`}>
        <div className={`${colors.highlight} p-2 rounded-md border ${colors.border}`}>
          <div className="text-xs text-gray-500">Category Rank</div>
          <div className="font-bold">{categoryRank}</div>
        </div>
        <div className={`${colors.highlight} p-2 rounded-md border ${colors.border}`}>
          <div className="text-xs text-gray-500">Platform Rank</div>
          <div className="font-bold">{platformRank}</div>
        </div>
      </div>

      <div className="space-y-4 mt-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className={colors.text}>Category Percentile</span>
            <span className={colors.text}>{categoryPercentile}%</span>
          </div>
          <div className="relative h-4 rounded-full bg-gray-700">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
              style={{ width: `${categoryPercentile}%` }}
            ></div>
            <div className="h-6 w-1 bg-white rounded-full absolute -top-1" style={{ left: `${categoryPercentile}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className={colors.text}>Platform Percentile</span>
            <span className={colors.text}>{platformPercentile}%</span>
          </div>
          <div className="relative h-4 rounded-full bg-gray-700">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
              style={{ width: `${platformPercentile}%` }}
            ></div>
            <div className="h-6 w-1 bg-white rounded-full absolute -top-1" style={{ left: `${platformPercentile}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Time period selector components
const PeriodSelector = ({ activeTab, setActiveTab, darkMode = false }: PeriodSelectorProps) => {
  const tabs = ["Last Month", "Last Quarter", "Last Year", "All"];
  const colors = getColors(darkMode);

  return (
    <div className={`${colors.cardBg} rounded-lg p-1 mb-4 ${colors.text} flex border ${colors.border} ${colors.shadow}`}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`py-2 px-4 text-sm rounded-md mx-1 transition-all duration-200 ${
            activeTab === tab ? `${colors.primary} ${darkMode ? "text-white" : "text-white"} font-medium` : `${colors.textSecondary} ${colors.hover}`
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Tab selector component
const TabSelector = ({
  activeTab,
  setActiveTab,
  darkMode = false,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode?: boolean;
}) => {
  const tabs = ["Subscription", "Sale"];
  const colors = getColors(darkMode);

  return (
    <div className="flex mb-6">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`${
            activeTab === tab
              ? `${colors.cardBg} ${colors.text} border-b-2 border-${darkMode ? "indigo-500" : "yellow-400"}`
              : `${colors.cardBg} ${colors.textSecondary} opacity-70`
          } font-bold p-3 px-6 mr-2 rounded-t-lg transition-all duration-200 ${colors.shadow}`}
          onClick={() => setActiveTab(tab)}
        >
          <div className="flex items-center">
            {tab === "Subscription" ? <Package size={18} className="mr-2" /> : <ShoppingCart size={18} className="mr-2" />}
            {tab}
          </div>
        </button>
      ))}
    </div>
  );
};

// Main component that combines all sections
const CommercializationSection = () => {
  const [activeTab, setActiveTab] = useState("Subscription");
  const [timePeriod, setTimePeriod] = useState("Last Month");

  const isDarkMode = useAppSelector((state) => state.theme.mode === true);
  const darkMode = isDarkMode;

  const colors = getColors(darkMode);

  return (
    <div className={`w-full px-4 mx-auto pt-6 ${colors.bg} min-h-screen`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div
          className={`${colors?.primary} ${
            darkMode ? "text-gray-100" : "text-white"
          } text-xl font-bold p-4 rounded-lg w-full shadow-md flex items-center justify-center`}
        >
          <DollarSign className="mr-2" size={24} />
          <span>Commercialization & Financials</span>
        </div>
      </div>

      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />

      {/* Subscription Section */}
      {activeTab === "Subscription" && (
        <div className="mb-6">
          <PeriodSelector activeTab={timePeriod} setActiveTab={setTimePeriod} darkMode={darkMode} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CircleMetric
              title="Published Artworks"
              value="15"
              darkMode={darkMode}
              icon={<Package size={18} className={darkMode ? "text-gray-200" : "text-white"} />}
            />
            <CircleMetric title="Subscribed Artworks" value="5" darkMode={darkMode} />
            <IncomeChart value="3,254" trend="up" darkMode={darkMode} />
            <Forecast value="2,250" trend="down" darkMode={darkMode} />
          </div>
        </div>
      )}

      {/* Sale Section */}
      {activeTab === "Sale" && (
        <div className="mb-6">
          <PeriodSelector activeTab={timePeriod} setActiveTab={setTimePeriod} darkMode={darkMode} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CircleMetric
              title="Published Artworks"
              value="15"
              darkMode={darkMode}
              icon={<Package size={18} className={darkMode ? "text-gray-200" : "text-white"} />}
            />
            <CircleMetric
              title="Sold Artworks"
              value="5"
              darkMode={darkMode}
              icon={<ShoppingCart size={18} className={darkMode ? "text-gray-200" : "text-white"} />}
            />
            <IncomeChart value="3,254" trend="up" darkMode={darkMode} />
            <ArtistScore
              score={345}
              categoryRank="TOP 5%"
              platformRank="TOP 25%"
              categoryPercentile={95}
              platformPercentile={75}
              darkMode={darkMode}
            />
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className={`mt-8 mb-4 ${colors.cardBg} rounded-lg p-4 ${colors.shadow}`}>
        <h3 className={`${colors.text} text-lg font-bold mb-4`}>Financial Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${colors.highlight} border ${colors.border} flex items-center justify-between`}>
            <div>
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className={`${colors.text} text-xl font-bold`}>€5,504</div>
            </div>
            <DollarSign size={24} className={darkMode ? "text-indigo-400" : "text-blue-500"} />
          </div>
          <div className={`p-4 rounded-lg ${colors.highlight} border ${colors.border} flex items-center justify-between`}>
            <div>
              <div className="text-sm text-gray-500">Avg. Per Artwork</div>
              <div className={`${colors.text} text-xl font-bold`}>€367</div>
            </div>
            <BarChart size={24} className={darkMode ? "text-indigo-400" : "text-blue-500"} />
          </div>
          <div className={`p-4 rounded-lg ${colors.highlight} border ${colors.border} flex items-center justify-between`}>
            <div>
              <div className="text-sm text-gray-500">Growth</div>
              <div className={`${colors.text} text-xl font-bold flex items-center`}>
                +12.5% <TrendingUp className="ml-2 text-green-500" size={18} />
              </div>
            </div>
            <TrendingUp size={24} className="text-green-500" />
          </div>
        </div>
      </div>

      {/* Footer with version info */}
      <div className="flex justify-end py-4">
        <div className={`${colors.textSecondary} text-xs`}>Dashboard v1.2.4 • Theme: {darkMode ? "Dark" : "Light"}</div>
      </div>
    </div>
  );
};

export default CommercializationSection;
