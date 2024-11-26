import React, { useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { CiSaveDown2 } from "react-icons/ci";
import { PiFilesFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import OrderInformation from "./OrderInformation";
import Address from "./OrderList";
import OrderStatus from "./OrderStatus";
import { tabsContext } from "../Context/Context";
import { NavLink } from "react-router-dom";
import OrderList from "./OrderList";

const OrderDetail = () => {
  const setActiveTab = useContext(tabsContext);
  return (
    <div className="px-5 py-7">
      <div>
        <h1 className="font-bold text-[20px] mdtext-[24px] text-black">
          Order Details
        </h1>
        <div className="flex flex-wrap justify-between mt-4">
          {/* <div className='flex gap-2 items-center '>
                    <p className={`text-[18px] text-black` } onClick={() => setActiveTab('dashboard')} ><NavLink to={"/dashboard"}>Dashboard</NavLink></p>
                    <span><IoIosArrowBack /></span>
                    <p className={`text-[18px] text-black` } onClick={() => setActiveTab('orders')} ><NavLink to={"/orders"}>Order List</NavLink></p>
                    <span><IoIosArrowBack /></span>
                   <span className='text-[18px] hover:cursor-pointer'>Order Details</span>
                 </div> */}
          <div className="flex gap-3">
            <button className="py-1 px-2 rounded-md flex gap-2 items-center bg-white text-black hover:cursor-pointer">
              {" "}
              Processing
            </button>
            <button className="py-1 px-2 rounded-md flex gap-2 items-center bg-[#DEDEFA] text-black hover:cursor-pointer">
              <CiSaveDown2 /> Export
            </button>
            <button className="py-1 px-2 rounded-md flex gap-2 items-center bg-black text-white hover:cursor-pointer">
              <PiFilesFill /> Invoice
            </button>
          </div>
        </div>
        <OrderInformation order={order} />

        <div className="grid md:grid-cols-3 gap-x-4 gap-y-4 mt-3">
          <div className="col-span-2 bg-white border rounded-md h-fit">
            <OrderList order={order} />
          </div>
          <div className="col-span-1">
            <div className="bg-white border rounded-md mb-4">
              <Address order={order} />
            </div>
            <div className="bg-white border rounded-md ">
              <OrderStatus order={order} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
