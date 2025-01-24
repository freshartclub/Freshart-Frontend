import { IoOptionsOutline } from "react-icons/io5";
import Pagination from "./Pagination";
import { useTranslation } from "react-i18next";

const RecentOrders = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-5">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <p className="text-black text-[18px] font-semibold text-center sm:text-left">
            {t("Recent Orders")}
          </p>
          <button className="py-2 px-4 rounded-lg border-2 border-gray-200 text-black flex items-center gap-2 transition-transform duration-200 hover:scale-95 shadow-sm hover:shadow-md">
            <IoOptionsOutline className="text-lg" /> {t("Filters")}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <Pagination />
      </div>
    </div>
  );
};

export default RecentOrders;
