import React from "react";
import arrow from "../assets/orderApprove1.png";
import print from "../assets/orderApprove2.png";
import OrderApproveDetails from "./OrderApproveDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetOrderDetails } from "./https/useGetOrderDetails";
import usePostAcceptMutation from "./https/usePostAcceptMutation";
import Loader from "../../ui/Loader";
import dayjs from "dayjs";

const OrderApprove = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const orderType = searchParams.get("orderType");
  const naviagte = useNavigate();

  const { data, isLoading } = useGetOrderDetails(id, orderType);
  const { mutate, isPending } = usePostAcceptMutation();

  const handleAccept = () => {
    const newData = {
      id: id,
      orderType: orderType,
      status: "accept",
    };
    try {
      mutate(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const order = {
    order_id: "Order #6079",
    order_time: "12 Aug 2022 10:00 PM",
  };

  const handleNavigate = () => {
    naviagte("/artist-panel/order");
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="px-5 py-7 ">
      {/*Header section*/}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex  gap-4 items-center mb-6">
          <div onClick={() => handleNavigate()} className="cursor-pointer">
            <img src={arrow} />
          </div>
          <div className="">
            <div className="font-bold text-[#1C252E] text-lg mb-2">
              Order ID : {data?.data?.orderID}
            </div>

            <p className="text-[#919EAB] text-xs">
              {dayjs(data?.data?.createdAt).format("MMMM D, YYYY , HH:mm:ss")}
            </p>
          </div>
        </div>
        <div className="flex gap-4 text-center ">
          <div className="">
            <img
              className="bg-[#919EAB14] py-4 px-6 rounded-md cursor-pointer "
              src={print}
            />
          </div>
          {data?.data?.status === "accepted" ? null : (
            <div className="flex gap-2">
              <div className="space-x-3">
                <button
                  onClick={() => handleAccept()}
                  className="bg-[#22C55E]
              py-2 px-2
             sm:py-3 sm:px-8 rounded-md text-white font-bold"
                >
                  {isPending ? "Accepting.." : "Accept"}
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
          )}
        </div>
      </div>

      {/*details & History & customer info*/}

      <OrderApproveDetails data={data} />
    </div>
  );
};

export default OrderApprove;
