import { BsDot } from "react-icons/bs";

import { NavLink } from "react-router-dom";
import AllCircle from "./AllCircle";
import { useState } from "react";
import { useGetCircle } from "./https/useGetCircle";
import Loader from "../ui/Loader";
import { useGetAllCircleList } from "./https/useGetAllCircleList";
import BannerSection from "../AllArtist/BannerSection";
import UserAllCircle from "./UserAllCircle";

const UserCircleList = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabCounts = {
    All: 80,
    Joined: 30,
    Requested: 10,
  };

  const { data, isLoading } = useGetAllCircleList();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="">
      <div>
        {/* Header Section */}
        <BannerSection title={"Circles"} secondTitle={"All Circles"} />

        {/* Search and Sort Section */}
        <div className="flex flex-col sm:flex-row justify-between  gap-2 mt-8 px-10">
          <div>
            <input
              className="p-2 border outline-none border-zinc-400 rounded-lg"
              placeholder="Search"
            />
          </div>
          <div>
            <span>Sort By: </span>
            <select className="p-2 border rounded-lg">
              <option>Featured</option>
              <option>Recent</option>
            </select>
          </div>
        </div>

        {/* Tab Filter Section */}
        <div className="tab-filter mt-8 px-10">
          {Object.keys(tabCounts).map((tab) => (
            <div
              key={tab}
              className={`tab-item f ${
                activeTab === tab ? "active" : ""
              } inline-block px-4 py-2 cursor-pointer  ${
                activeTab === tab
                  ? "border-2 rounded-md bg-black text-white border-black font-semibold text-md transition-none"
                  : " text-black"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              <span>{tab}</span>
              <span className="count ml-2 text-gray-500">
                ({tabCounts[tab]})
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "All" && <UserAllCircle data={data} />}
          {activeTab === "Joined" && "Joined"}
          {activeTab === "Requested" && "Requested"}
        </div>

        {/* <AllCircle /> */}
      </div>
    </div>
  );
};

export default UserCircleList;
