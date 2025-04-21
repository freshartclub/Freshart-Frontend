import dayjs from "dayjs";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiPackage,
  FiHash,
  FiType,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formateCurrency } from "../../utils/FormatCurrency";
import { imageUrl, lowImageUrl } from "../../utils/baseUrls";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";

const AllOrders = ({ allOrders, dark }: { allOrders: any[]; dark: boolean }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expandedOrderID, setExpandedOrderID] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const columns = [
    { key: "orderId", label: "Order ID", icon: <FiHash />, colSpan: 2, minWidth: 200 },
    { key: "product", label: "Artwork", icon: <FiPackage />, colSpan: 2, minWidth: 240 },
    { key: "customer", label: "Customer", icon: <FiUser />, colSpan: 2, minWidth: 240 },
    { key: "date", label: "Date", icon: <FiCalendar />, colSpan: 2, minWidth: 160 },
    { key: "total", label: "Total", icon: <FiDollarSign />, colSpan: 1, minWidth: 140 },
    { key: "type", label: "Type", icon: <FiType />, colSpan: 1, minWidth: 120 },
    { key: "status", label: "Status", icon: <FiAlertCircle />, colSpan: 1, minWidth: 140 },
    { key: "action", label: "Action", icon: <FiEye />, colSpan: 1, minWidth: 120 },
  ];

  // ... (keep previous logic for pagination, navigation, etc.)
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allOrders.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(allOrders.length / recordsPerPage);

  const handleViewOrder = (orderID: string) => {
    navigate(`/artist-panel/order/approve-order?id=${orderID}`);
  };

  const toggleOrderExpansion = (orderID: string) => {
    setExpandedOrderID(expandedOrderID === orderID ? null : orderID);
  };

  const iconMap = {
    pending: <FiClock className="text-amber-500" />,
    successfull: <FiCheckCircle className="text-emerald-500" />,
    cancelled: <FiXCircle className="text-rose-500" />,
    failed: <FiXCircle className="text-red-500" />,
  };

  const getStatusStyles = (status: string) => {
    const base = "rounded-full py-1.5 px-4 text-xs font-semibold flex items-center gap-2 w-fit";

    const styles = {
      pending: `bg-amber-100/50 text-amber-800 ${dark ? "dark:bg-amber-900/30 dark:text-amber-200" : ""}`,
      successful: `bg-emerald-100/50 text-emerald-800 ${dark ? "dark:bg-emerald-900/30 dark:text-emerald-200" : ""}`,
      cancelled: `bg-rose-100/50 text-rose-800 ${dark ? "dark:bg-rose-900/30 dark:text-rose-200" : ""}`,
      failed: `bg-red-100/50 text-red-800 ${dark ? "dark:bg-red-900/30 dark:text-red-200" : ""}`,
    };

    return `${base} ${styles[status.toLowerCase()] || "bg-gray-100 text-gray-600"}`;
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border shadow-lg ${dark ? "bg-gray-900 border-gray-600" : "bg-white border-zinc-300"} transition-colors`}
    >
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[1400px]">
          <thead className={`border-b ${dark ? "border-gray-700 bg-gray-700" : "border-gray-200 bg-gray-200"}`}>
            <tr className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"} font-medium`}>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-5 text-left" style={{ minWidth: column.minWidth }}>
                  <div className="flex items-center gap-2">
                    {column.icon}
                    {t(column.label)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <AnimatePresence>
              {allOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`group hover:${dark ? "bg-gray-800/50" : "bg-gray-50/50"} transition-colors`}
                  >
                    <td onClick={() => handleViewOrder(order._id)} className="px-6 cursor-pointer py-4 font-medium">
                      <span className={`inline-flex items-center gap-2 ${dark ? "text-gray-200" : "text-gray-800"}`}>
                        <FiHash className="text-gray-400" />
                        <span className="font-mono hover:underline">{order.orderId.slice(0, 10) + "..."}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 cursor-pointer">
                        <div className="relative">
                          <img
                            src={`${lowImageUrl}/${order.items[0]?.artworkDetails.media}`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                            alt={order.items[0]?.artworkDetails.artworkName}
                          />
                          {order.items.length > 1 && (
                            <div
                              className={`absolute -bottom-1 -right-1 rounded-full px-2 py-1 text-xs 
                          ${dark ? "bg-gray-800 text-gray-300 border border-gray-700" : "bg-white text-gray-700 shadow-md"}`}
                            >
                              +{order.items.length - 1}
                            </div>
                          )}
                        </div>
                        <span className={`font-medium truncate max-w-[160px] ${dark ? "text-gray-200" : "text-gray-800"}`}>
                          {order.items[0]?.artworkDetails.artworkName}
                        </span>
                        {order.items.length > 1 && (
                          <button
                            onClick={() => toggleOrderExpansion(order._id)}
                            className={`p-1.5 rounded-lg transition-all ${
                              dark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"
                            }`}
                          >
                            {expandedOrderID === order._id ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`font-medium ${dark ? "text-gray-200" : "text-gray-800"}`}>{order.user?.artistName}</span>
                        <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>{order.user?.email}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center whitespace-nowrap gap-2">
                        <FiCalendar className={`${dark ? "text-gray-400" : "text-gray-600"}`} />
                        <span className={`${dark ? "text-gray-300" : "text-gray-700"}`}>{dayjs(order.createdAt).format("DD MMM YYYY")}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium">
                      <span className={`${dark ? "text-emerald-400" : "text-emerald-700"}`}>
                        {formateCurrency(order.items[0].other.subTotal - order.items[0].other.totalDiscount, "$")}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                    ${dark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-800"}`}
                      >
                        {order.type}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className={getStatusStyles(order.status)}>
                        {iconMap[order.status]}
                        {order.status}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewOrder(order._id)}
                        className={`p-2 rounded-lg transition-all hover:scale-110
                      ${dark ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-200"}`}
                      >
                        <FiEye size={20} />
                      </button>
                    </td>
                  </motion.tr>
                  {expandedOrderID === order._id && order.items.length > 1 && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={dark ? "bg-gray-800/30" : "bg-gray-50"}
                    >
                      <td colSpan={columns.length} className="px-6 py-4">
                        <div className="ml-14 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">Additional Items ({order.items.length - 1})</h4>
                          <div className="space-y-4">
                            {order.items.slice(1).map((item: any, index: number) => (
                              <div key={index} className="flex items-center gap-6">
                                <img
                                  src={`${lowImageUrl}/${item.artworkDetails.media}`}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                  alt={item.artworkDetails.artworkName}
                                />
                                <div className="flex-1">
                                  <h3 className={`font-medium ${dark ? "text-gray-200" : "text-gray-800"}`}>{item.artworkDetails.artworkName}</h3>
                                  <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                    {formateCurrency(item.other.subTotal - item.other.totalDiscount, "$")}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {allOrders.length === 0 && (
          <div
            className={`py-16 text-center flex flex-col items-center justify-center 
            ${dark ? "text-gray-500" : "text-gray-400"}`}
          >
            <FiPackage size={56} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">{t("No orders found")}</p>
            <p className="text-sm mt-2">{t("Try adjusting your filters or check back later")}</p>
          </div>
        )}
      </div>

      {allOrders.length > 0 && (
        <div className={`p-4 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}>
          <PaginationTabs currentPage={currentPage} setCurrentPage={setCurrentPage} nPages={nPages} dark={dark} />
        </div>
      )}
    </div>
  );
};

export default AllOrders;
