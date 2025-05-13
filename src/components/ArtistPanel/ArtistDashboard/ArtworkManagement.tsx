import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAppSelector } from "../../../store/typedReduxHooks";

const ArtworkManagement = () => {
  const dark = useAppSelector((state) => state.theme.mode);

  const data = [
    { name: "Aug 2020", views: 14, likes: 3, favorites: 0 },
    { name: "Sep 2020", views: 60, likes: 12, favorites: 0 },
    { name: "Oct 2020", views: 69, likes: 8, favorites: 0 },
    { name: "Nov 2020", views: 78, likes: 9, favorites: 0 },
    { name: "Dec 2020", views: 58, likes: 8, favorites: 0 },
    { name: "Jan 2021", views: 40, likes: 13, favorites: 1 },
    { name: "Feb 2021", views: 67, likes: 15, favorites: 1 },
    { name: "Mar 2021", views: 68, likes: 14, favorites: 3 },
    { name: "Apr 2021", views: 60, likes: 22, favorites: 5 },
    { name: "May 2021", views: 67, likes: 24, favorites: 8 },
    { name: "Jun 2021", views: 67, likes: 31, favorites: 2 },
    { name: "Jul 2021", views: 64, likes: 46, favorites: 2 },
    { name: "Aug 2021", views: 66, likes: 35, favorites: 7 },
    { name: "Sep 2021", views: 43, likes: 25, favorites: 14 },
  ];

  const [selectedArtworks, setSelectedArtworks] = useState("all");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1year");
  const [selectedTrend, setSelectedTrend] = useState("views");

  const topArtworks = [
    { id: 1, title: "Sunset Mountains", views: 256, likes: 45, favorites: 12 },
    { id: 2, title: "Ocean Waves", views: 189, likes: 37, favorites: 9 },
    { id: 3, title: "City Skyline", views: 174, likes: 29, favorites: 8 },
    { id: 4, title: "Forest Path", views: 152, likes: 26, favorites: 7 },
    { id: 5, title: "Desert Dunes", views: 143, likes: 23, favorites: 6 },
  ];

  const bgColor = dark ? "bg-gray-900" : "bg-gray-100";
  const cardBgColor = dark ? "bg-gray-800" : "bg-white";
  const textColor = dark ? "text-gray-100" : "text-gray-800";
  const borderColor = dark ? "border-gray-700" : "border-gray-200";
  const headerBgColor = dark ? "bg-blue-600" : "bg-blue-500";
  const panelBgColor = dark ? "bg-gray-700" : "bg-yellow-100";
  const panelBorderColor = dark ? "border-gray-600" : "border-yellow-200";
  const tableHeaderBgColor = dark ? "bg-gray-700" : "bg-gray-100";
  const tableRowHoverColor = dark ? "hover:bg-gray-700" : "hover:bg-gray-50";
  const inputBgColor = dark ? "bg-gray-600 text-white" : "bg-white";
  const chartTextColor = dark ? "#fff" : "#000";
  const chartGridColor = dark ? "#4B5563" : "#E5E7EB";

  return (
    <div className={`min-h-screen p-4 ${bgColor} ${textColor}`}>
      <div className={`rounded-lg shadow p-4 mb-6 ${cardBgColor} ${borderColor} border`}>
        <div className={`${headerBgColor} text-white p-3 rounded-t-lg text-xl font-bold text-center`}>Artist Dashboard: Artworks</div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4 mb-6">
          <div className="flex-1">
            <div className={`${headerBgColor} text-white p-2 text-center rounded-t-lg`}>Artwork Selection dropdown</div>
            <div className={`border ${panelBorderColor} ${panelBgColor} p-3 rounded-b-lg text-center`}>
              <select
                className={`w-full p-2 border rounded ${inputBgColor} ${borderColor}`}
                value={selectedArtworks}
                onChange={(e) => setSelectedArtworks(e.target.value)}
              >
                <option value="all">All Artworks</option>
                <option value="series1">Landscape Series</option>
                <option value="series2">Portrait Series</option>
                <option value="series3">Abstract Series</option>
              </select>
              <div className="text-sm mt-2">
                artwork (multi)selection
                <br />
                or group by series
              </div>
            </div>
          </div>

          {/* Top 5 Artworks */}
          <div className="flex-1">
            <div className={`${headerBgColor} text-white p-2 text-center rounded-t-lg`}>Top 5 Artworks</div>
            <div className={`border ${panelBorderColor} ${panelBgColor} p-3 rounded-b-lg text-center`}>
              <div className="text-sm">
                Default view top 5 artworks
                <br />
                by totals from current year
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div className="flex-1">
            <div className={`${headerBgColor} text-white p-2 text-center rounded-t-lg`}>Time selection</div>
            <div className={`border ${panelBorderColor} ${panelBgColor} p-3 rounded-b-lg text-center`}>
              <select
                className={`w-full p-2 border rounded ${inputBgColor} ${borderColor}`}
                value={selectedTimeFrame}
                onChange={(e) => setSelectedTimeFrame(e.target.value)}
              >
                <option value="24h">24 hours</option>
                <option value="7days">7 days</option>
                <option value="30days">30 days</option>
                <option value="quarter">Last quarter</option>
                <option value="1year">Last year</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </div>

        {/* Left Side Panel and Chart */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Trend Selection */}
          <div className="md:w-48">
            <div className={`${headerBgColor} text-white p-2 text-center rounded-t-lg`}>Trend Selection</div>
            <div className={`border ${panelBorderColor} ${panelBgColor} p-3 rounded-b-lg`}>
              <div className="space-y-2">
                {["Views", "Users", "Likes", "Favorites", "Totals"].map((trend, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      type="radio"
                      id={trend.toLowerCase()}
                      name="trend"
                      value={trend.toLowerCase()}
                      checked={selectedTrend === trend.toLowerCase()}
                      onChange={(e) => setSelectedTrend(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor={trend.toLowerCase()}>{trend}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="name" tick={{ fill: chartTextColor }} axisLine={{ stroke: chartGridColor }} />
                <YAxis tick={{ fill: chartTextColor }} axisLine={{ stroke: chartGridColor }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: dark ? "#1F2937" : "#FFFFFF",
                    borderColor: dark ? "#4B5563" : "#E5E7EB",
                    color: chartTextColor,
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: chartTextColor,
                  }}
                />
                <Line type="monotone" dataKey="views" stroke="#2DD4BF" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="likes" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="favorites" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Artworks Table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Your Top 5 Artworks</h3>
          <div className="overflow-x-auto">
            <table className={`min-w-full ${cardBgColor} border ${borderColor}`}>
              <thead>
                <tr className={`${tableHeaderBgColor}`}>
                  <th className={`py-2 px-4 border ${borderColor} text-left`}>Title</th>
                  <th className={`py-2 px-4 border ${borderColor} text-left`}>Views</th>
                  <th className={`py-2 px-4 border ${borderColor} text-left`}>Likes</th>
                  <th className={`py-2 px-4 border ${borderColor} text-left`}>Favorites</th>
                </tr>
              </thead>
              <tbody>
                {topArtworks.map((artwork, i) => (
                  <tr key={i} className={`${tableRowHoverColor}`}>
                    <td className={`py-2 px-4 border ${borderColor}`}>{artwork.title}</td>
                    <td className={`py-2 px-4 border ${borderColor}`}>{artwork.views}</td>
                    <td className={`py-2 px-4 border ${borderColor}`}>{artwork.likes}</td>
                    <td className={`py-2 px-4 border ${borderColor}`}>{artwork.favorites}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkManagement;
