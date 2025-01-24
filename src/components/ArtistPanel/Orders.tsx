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
    <div className="py-7">
      <div>
        <h1 className="font-bold text-[20px] mdtext-[24px] text-black">
          {t("Order")}
        </h1>
        <div className="flex justify-between mt-3">
          <div className="flex gap-2 items-center ">
            <p
              className={`text-[18px] text-black`}
              onClick={() => Active("dashboard")}
            >
              <NavLink to={"/dashboard"}>{t("Dashboard")}</NavLink>
            </p>
            <span>
              <IoIosArrowBack />
            </span>
            <span className="text-[18px] hover:cursor-pointer">
              {t("Order List")}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="py-1 px-2 rounded-md flex gap-2 items-center bg-[#DEDEFA] text-black hover:cursor-pointer">
              <CiSaveDown2 /> {t("Export")}
            </button>
            <button className="py-1 px-2 rounded-md border-gray-100 bg-black text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <GoPlus /> {t("Add order")}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between mt-6 mb-5">
          <div className="flex gap-3 font-semibold bg-white border rounded-md w-fit py-1 px-2 items-center hover:cursor-pointer">
            {categorys.map((category) => (
              <div
                key={category}
                className={`${
                  activeTab === category
                    ? "bg-black text-white border rounded-md px-2 py-1"
                    : ""
                }`}
                onClick={() => handleTabs(category)}
              >
                <p>{t(category)}</p>
              </div>
            ))}
          </div>

          <button className="py-1 px-3 rounded-lg border-2 border-gray-50 bg-white   flex items-center gap-2 transition-all duration-200 hover:scale-95">
            <IoOptionsOutline /> {t("Filters")}
          </button>
        </div>
        <Allorders orderDetail={filterData} />
      </div>
    </div>
  );
};

export default Orders;
