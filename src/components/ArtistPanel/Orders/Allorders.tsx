import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";
import { useNavigate } from "react-router-dom";
import { useGetArtistOrder } from "./http/useGetArtistOrder";

const Allorders = ({ orderDelail }: any) => {
  const { data, isLoading } = useGetArtistOrder();
  console.log(data?.purchase);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = orderDelail?.slice(firstIndex, lastIndex);
  const nPages = orderDelail
    ? Math.ceil(orderDelail.length / recordPerPage)
    : 0;

  const numbers = [...Array(nPages + 1).keys()]?.slice(1);

  const columns = [
    { key: "orderId", label: "Order ID", colSpan: 1 },
    { key: "product", label: "Product", colSpan: 2 },
    { key: "date", label: "Date", colSpan: 1 },
    { key: "customer", label: "Customer", colSpan: 2 },
    { key: "orderType", label: "Order Type", colSpan: 1 },
    { key: "total", label: "Total", colSpan: 1 },
    { key: "payment", label: "Payment", colSpan: 1 },
    { key: "status", label: "Status", colSpan: 1 },
    { key: "action", label: "Action", colSpan: 1 },
  ];

  const navigate = useNavigate();

  const handelClickData = (order) => {
    navigate("/artist-panel/order/orderDetail", { state: { order } });
  };

  return (
    <>
      <div className="rounded-md border border-1 mt-3  ">
        <div className="grid grid-cols-11 bg-[#F9F9FC] items-center my-auto h-10 p-2 border-b  ">
          {columns.map((column) => (
            <div
              key={column.key}
              className={`col-span-${column.colSpan} text-left`}
            >
              <p className="font-semibold text-[16px] text-black">
                {column.label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-2 over-x-scroll">
          {records?.map((value: any, index: any) => (
            <div key={index}>
              <div
                className=" grid grid-cols-11 h-auto pb-3 pt-3 "
                onClick={() => {
                  handelClickData(value);
                }}
              >
                <div className="col-span-1">
                  <p className="text-[12px] md:text-[14px] font-bold">
                    {value.Orderid}
                  </p>
                </div>
                <div className="col-span-2 flex gap-2">
                  <div>
                    <img
                      src={value.image}
                      alt="product image"
                      className="w-[2em] h-[2.5em] rounded-xl"
                    />
                  </div>
                  <div>
                    <p className="text-black font-bold text-[12px] md:text-[14px]">
                      {value.artname}
                    </p>
                    <p className="text-[10px] md:text-[14px]">
                      {value.artsize}
                    </p>
                  </div>
                </div>
                <div className="col-span-1">
                  <p className="text-[12px] md:text-[14px] font-bold">
                    {value.date}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-black font-semibold text-[12px] md:text-[14px]">
                    {value.customername}
                  </p>

                  <p className="text-[10px] md:text-[12px]">
                    {value.customeremail}
                  </p>
                </div>

                <div className="col-span-1">
                  <p className="text-[12px] md:text-[14px] font-bold">
                    ${value.totle}
                  </p>
                </div>

                <div className="col-span-1">
                  <p className="text-[12px] md:text-[14px] font-bold">
                    ${value.totle}
                  </p>
                </div>

                <div className="col-span-1">
                  <p className="text-[12px] md:text-[14px] font-bold">
                    {value.paymenttype}
                  </p>
                </div>
                <div className="col-span-1">
                  <div
                    className={` w-fit rounded-lg py-0 px-2  ${
                      value.status === "processing"
                        ? "bg-[#FDF1E8] text-[#E46A11] "
                        : value.status === "Shiped"
                        ? "bg-[#E8F8FD] text-[#13B2E4]"
                        : value.status === "cancelled"
                        ? "bg-[#FEEDEC] text-[#F04438]"
                        : "bg-[#E7F4EE] text-[#0D894F]"
                    }`}
                  >
                    <p className="flex items-center pt-0 justify-center">
                      {value.status}
                    </p>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="flex gap-4">
                    <LuEye className="text-[20px] hover:cursor-pointer" />
                    <RiDeleteBin6Line className="text-[20px] hover:cursor-pointer" />
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
          <div>
            <PaginationTabs
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              nPages={nPages}
              numbers={numbers}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Allorders;
