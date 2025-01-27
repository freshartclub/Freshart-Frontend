import { useTranslation } from "react-i18next";
import Pagination from "./Pagination";

const RecentOrders = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-5 border bg-white p-4 rounded-lg shadow-sm">
      <p className="text-black text-[18px] font-semibold text-center sm:text-left">
        {t("Recent Orders")}
      </p>
      <Pagination />
    </div>
  );
};

export default RecentOrders;
