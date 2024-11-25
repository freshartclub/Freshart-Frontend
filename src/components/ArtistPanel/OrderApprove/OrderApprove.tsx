import React from "react";
import arrow from "../assets/orderApprove1.png";
import print from "../assets/orderApprove2.png";
import OrderApproveDetails from "./OrderApproveDetails";
import { useSearchParams } from "react-router-dom";
import { useGetOrderDetails } from "./https/useGetOrderDetails";

const OrderApprove = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const orderType = searchParams.get("orderType");
  console.log(id);
  console.log(orderType);

  const { data, isLoading } = useGetOrderDetails(id, orderType);

  console.log(data);

  const order = {
    order_id: "Order #6079",
    order_time: "12 Aug 2022 10:00 PM",
  };
  return (
    <div className="px-5 py-7 ">
      {/*Header section*/}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex  gap-4 items-center mb-6">
          <div>
            <img src={arrow} />
          </div>
          <div className="">
            <div className="font-bold text-[#1C252E] text-lg mb-2">
              {order.order_id}
            </div>

            <p className="text-[#919EAB] text-xs">{order.order_time} </p>
          </div>
        </div>
        <div className="flex gap-4 text-center ">
          <div className="">
            <img
              className="bg-[#919EAB14] py-4 px-6 rounded-md cursor-pointer "
              src={print}
            />
          </div>
          <div className="space-x-3">
            <button
              className="bg-[#22C55E]
              py-2 px-2
             sm:py-3 sm:px-8 rounded-md text-white font-bold"
            >
              Accept
            </button>
          </div>
          <div>
            <button
              className="bg-[#FF5630]
          py-2 px-2
             sm:py-3 sm:px-8 rounded-md  text-white font-bold "
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      {/*details & History & customer info*/}

      <OrderApproveDetails data={data} />
    </div>
  );
};

export default OrderApprove;
