import { useTranslation } from "react-i18next";
import Pagination from "./Pagination";

const RecentOrders = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-5 border bg-white rounded-lg shadow-sm">
      <p className="text-black text-[18px] font-semibold border-b bg-gray-200 border-gray-300 p-2 px-3 text-center sm:text-left">
        {t("Recent Orders")}
      </p>
      <Pagination />
    </div>
  );
};

export default RecentOrders;
