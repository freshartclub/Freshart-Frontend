import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSaveDown2 } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { IoOptionsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Loader from "../ui/Loader";
import { tabsContext } from "./Context/Context";
import Allorders from "./Orders/Allorders";
import { useGetArtistOrder } from "./Orders/http/useGetArtistOrder";
dayjs.extend(duration);

const Orders = () => {
  const categorys = ["All Time", "12 Months", "30 Days", "7 Days", "24 Hour"];
  const [activeTab, setActiveTab] = useState("All Time");
  const { data, isLoading } = useGetArtistOrder();

  const { t } = useTranslation();

  const filterData =
    activeTab === "All Time"
      ? data
      : data.filter((item) => {
          const createdAt = dayjs(item.createdAt);
          switch (activeTab) {
            case "12 Months":
              return createdAt.isAfter(dayjs().subtract(12, "month"));
            case "30 Days":
              return createdAt.isAfter(dayjs().subtract(30, "days"));
            case "7 Days":
              return createdAt.isAfter(dayjs().subtract(7, "days"));
            case "24 Hour":
              return createdAt.isAfter(dayjs().subtract(1, "day"));
            default:
              return true;
          }
        });

  const handleTabs = (value: string) => {
    setActiveTab(value);
  };

  const Active = useContext(tabsContext);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-3 mt-7">
      <h1 className="font-bold text-[20px] mdtext-[24px] text-black">
        {t("All Orders")}
      </h1>
      <div className="flex justify-between w-full sm:flex-row flex-col sm:gap-0 gap-2 mt-3">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[16px] text-black`}
            onClick={() => Active("dashboard")}
          >
            <NavLink to={"/dashboard"}>{t("Dashboard")}</NavLink>
          </p>
          <span>
            <IoIosArrowBack />
          </span>
          <span className="text-[16px] hover:cursor-pointer">
            {t("Order List")}
          </span>
        </div>
        <div className="flex max-[350px]:flex-col sm:mt-0 mt-2 gap-2">
          <button className="py-1 px-2 rounded-md sm:w-fit w-full flex gap-2 items-center justify-center bg-[#DEDEFA] text-black hover:cursor-pointer">
            <CiSaveDown2 /> {t("Export")}
          </button>
          <button className="py-1 px-2 rounded-md sm:wfit w-full border-gray-100 justify-center bg-black text-white flex gap-1 items-center hover:cursor-pointer">
            <GoPlus /> {t("Add Order")}
          </button>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap justify-between sm:mt-6 mt-2 mb-5">
        <div className="flex gap-3 font-semibold bg-white border rounded-md w-full scrollbar max-w-[480px] py-1 px-2 items-center overflow-auto hover:cursor-pointer">
          {categorys.map((category) => (
            <div
              key={category}
              className={`flex-shrink-0 ${
                activeTab === category
                  ? "bg-black text-white border rounded-md px-2 py-1"
                  : "px-2 py-1"
              }`}
              onClick={() => handleTabs(category)}
            >
              <p className="whitespace-nowrap">{t(category)}</p>
            </div>
          ))}
        </div>

        <button className="py-1 px-3 border rounded-lg bg-white flex items-center gap-2 transition-all duration-200 hover:scale-95">
          <IoOptionsOutline /> {t("Filters")}
        </button>
      </div>
      <Allorders orderDetail={filterData} />
    </div>
  );
};

export default Orders;
