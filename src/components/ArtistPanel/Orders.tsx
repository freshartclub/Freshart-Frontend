import React, { useState, useContext } from "react";
import { GoPlus } from "react-icons/go";
import { CiSaveDown2 } from "react-icons/ci";
import Allorders from "./Orders/Allorders";
import { orderDelail } from "./Data/Orders";
import SelectDateBtn from "./ArtistDashboard/SelectDateBtn";
import FilterBtn from "./Artwork/FilterBtn";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { tabsContext } from "./Context/Context";
import { useGetArtistOrder } from "./Orders/http/useGetArtistOrder";

const Orders = () => {
  const categorys = ["All Time", "12 Months", "30 Days", "7 Days", "24 Hour"];
  const [activeTab, setActiveTab] = useState("All Time");
  const { data, isLoading } = useGetArtistOrder();

  const filterData =
    activeTab === "All Time"
      ? orderDelail
      : orderDelail.filter((data) => data.days === activeTab);

  const handleTabs = (value: string) => {
    setActiveTab(value);
  };
  const Active = useContext(tabsContext);

  return (
    <div className="py-7">
      <div>
        <h1 className="font-bold text-[20px] mdtext-[24px] text-black">
          Order
        </h1>
        <div className="flex justify-between mt-3">
          <div className="flex gap-2 items-center ">
            <p
              className={`text-[18px] text-black`}
              onClick={() => Active("dashboard")}
            >
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </p>
            <span>
              <IoIosArrowBack />
            </span>
            <span className="text-[18px] hover:cursor-pointer">Order List</span>
          </div>
          <div className="flex gap-2">
            <button className="py-1 px-2 rounded-md flex gap-2 items-center bg-[#DEDEFA] text-black hover:cursor-pointer">
              <CiSaveDown2 /> Export
            </button>
            <button className="py-1 px-2 rounded-md border-gray-100 bg-black text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <GoPlus /> Add order
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
                <p>{category}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <SelectDateBtn />
            <FilterBtn />
          </div>
        </div>
        <Allorders orderDelail={filterData} />
      </div>
    </div>
  );
};

export default Orders;
