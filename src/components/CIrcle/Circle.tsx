import { BsDot } from "react-icons/bs";

import { NavLink } from "react-router-dom";
import AllCircle from "./AllCircle";
import { useState } from "react";
import { useGetCircle } from "./https/useGetCircle";
import Loader from "../ui/Loader";

const Circle = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabCounts = {
    All: 80,
    Published: 18,
    Draft: 32,
  };

  const {data , isLoading} = useGetCircle()


  


  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // You can add your filtering logic here
    console.log(`Selected Tab: ${tab}`);
  };


  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="py-7 px-2">
      <div>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="space-y-2">
            <h1 className="font-bold text-[20px] md:text-[24px] text-black">
              Circle
            </h1>
            <div className="flex gap-2 items-center">
              <p className="text-base text-black font-semibold">
                <NavLink to={"/dashboard"}>Dashboard</NavLink>
              </p>
              <BsDot />
              <span className="text-base text-black font-semibold hover:cursor-pointer">
                Circle
              </span>
              <BsDot />
              <span className="text-sm text-gray-400 font-semibold hover:cursor-pointer">
                List
              </span>
            </div>
          </div>
          <div>
            {/* <button className="py-2 px-3 rounded-md border-gray-100 bg-black text-white flex gap-1 items-center hover:cursor-pointer font-semibold">
              <GoPlus className="text-xl font-semibold" /> New Circle
            </button> */}
          </div>
        </div>

        {/* Search and Sort Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-8">
          <div>
            <input
              className="p-2 border rounded-lg"
              placeholder="Search"
            ></input>
          </div>
          {/* <div>
            <span>Sort By: </span>
            <select className="p-2 border rounded-lg">
              <option>Featured</option>
              <option>Recent</option>
            </select>
          </div> */}
        </div>

        {/* Tab Filter Section */}
        <div className="tab-filter mt-8">
          {Object.keys(tabCounts).map((tab) => (
            <div
              key={tab}
              className={`tab-item f ${
                activeTab === tab ? "active" : ""
              } inline-block px-4 py-2 cursor-pointer  ${
                activeTab === tab ? "border-b-2 border-black " : " text-black"
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
  {activeTab === 'All' && <AllCircle data={data} />}
  {activeTab === 'Published' && 'published'}
  {activeTab === 'Draft' && 'draft'}
  
</div>

        {/* <AllCircle /> */}
      </div>
    </div>
  );
};

export default Circle;
