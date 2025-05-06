import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiDownload, FiFilter } from "react-icons/fi";
import { useAppSelector } from "../../store/typedReduxHooks";
import Loader from "../ui/Loader";
import AllOrders from "./Orders/Allorders";
import { useGetArtistOrder } from "./Orders/http/useGetArtistOrder";

dayjs.extend(duration);

const Orders = () => {
  const { t } = useTranslation();
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

  if (isLoading) return <Loader theme={dark} />;

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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                dark ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-50"
              } border`}
            >
              <FiFilter />
              {t("Filters")}
            </button>
          </div>
        </div>

        <AllOrders allOrders={filterData} dark={dark} />
      </motion.div>
    </div>
  );
};

export default Orders;
