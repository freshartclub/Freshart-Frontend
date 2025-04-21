import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiDownload, FiFilter, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Loader from "../ui/Loader";
import AllOrders from "./Orders/Allorders";
import { useGetArtistOrder } from "./Orders/http/useGetArtistOrder";

dayjs.extend(duration);

const Orders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.theme.mode);

  const timeFilters = ["All Time", "12 Months", "30 Days", "7 Days", "24 Hours"];
  const [activeTab, setActiveTab] = useState(timeFilters[0]);
  const { data, isLoading } = useGetArtistOrder();

  const filterData = !data
    ? []
    : activeTab === "All Time"
    ? data
    : data.filter((item) => {
        const createdAt = dayjs(item.createdAt);
        const durations = {
          "12 Months": dayjs().subtract(12, "month"),
          "30 Days": dayjs().subtract(30, "days"),
          "7 Days": dayjs().subtract(7, "days"),
          "24 Hours": dayjs().subtract(1, "day"),
        };
        return createdAt.isAfter(durations[activeTab as keyof typeof durations]);
      });

  if (isLoading) return <Loader />;

  return (
    <div className={`px-4 py-6 ${dark ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("All Orders")}</h1>
            <span className={dark ? "text-gray-400 text-sm" : "text-gray-400 text-sm"}>{t("View/Manage your all orders")}</span>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              <FiDownload />
              {t("Export")}
            </button>
            <button
              onClick={() => navigate("/artist-panel/order/add-order")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-[#EE1D52] hover:bg-[#EE1D52]/80`}
            >
              <FiPlus />
              {t("Add Order")}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div
            className={`flex overflow-x-auto gap-2 scrollbar-hide p-1 border rounded-lg ${
              dark ? "bg-gray-800 border-gray-600" : "bg-gray-200 border-zinc-300"
            }`}
          >
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTab(filter)}
                className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                  activeTab === filter
                    ? dark
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                    : dark
                    ? "text-gray-400 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t(filter)}
              </button>
            ))}
          </div>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              dark ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-50"
            } border`}
          >
            <FiFilter />
            {t("Filters")}
          </button>
        </div>

        <AllOrders allOrders={filterData} dark={dark} />
      </motion.div>
    </div>
  );
};

export default Orders;
