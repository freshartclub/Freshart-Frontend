import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";
import { useNavigate } from "react-router-dom";
import { useGetArtistOrder } from "./http/useGetArtistOrder";
import dayjs from "dayjs";
import Loader from "../../ui/Loader";
import { formateCurrency } from "../../utils/FormatCurrency";

const Allorders = ({ orderDelail }: any) => {
  const { data, isLoading } = useGetArtistOrder();

  console.log("this is from orders", data);

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
  const url = "https://dev.freshartclub.com/images";

  const handelClickData = (value) => {
    navigate(
      `/artist-panel/order/approve-order?id=${value?._id}&orderType=${value?.orderType}`
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="rounded-md border border-1 mt-3 w-full ">
        <div className="grid grid-cols-11  bg-[#F9F9FC] items-center my-auto h-10 p-2 border-b  ">
          {columns.map((column) => (
            <div key={column.key} className={`col-span-${column.colSpan} `}>
              <p className="font-semibold text-[16px] text-black">
                {column.label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-2 over-x-scroll">
          {data &&
            data?.length > 0 &&
            data?.map((value: any, index: any) => (
              <div key={index}>
                <div className="grid grid-cols-11 h-auto pb-3 pt-3 ">
                  <div className="col-span-1">
                    <p className="text-[12px] md:text-[14px] font-bold">
                      {value.orderID}
                    </p>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <div>
                      <img
                        src={`${url}/users/${value?.image}`}
                        alt="product image"
                        className="w-[2em] h-[2.5em] rounded-xl"
                      />
                    </div>
                    <div>
                      <p className="text-black font-bold text-[12px] md:text-[14px]">
                        {value?.artWorkName}
                      </p>
                      <p className="text-[10px] md:text-[14px]">
                        {`${value?.length} x ${value?.width} x ${value?.height} cm`}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <p className="text-[12px] md:text-[14px] font-bold">
                      {dayjs(value?.createdAt).format("MMM D, YYYY")}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-black font-semibold text-[12px] md:text-[14px]">
                      {`${value?.artistName}${value?.artistSurname1}${value?.artistSurname2}`}
                    </p>

                    <p className="text-[10px] md:text-[12px]">{value?.email}</p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-[12px] md:text-[14px] font-bold capitalize">
                      {value?.orderType}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-[12px] md:text-[14px] font-bold">
                      {formateCurrency(value?.subTotal, "$")}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-[12px] md:text-[14px] font-bold">
                      {value.paymenttype}
                    </p>
                  </div>
                  <div className="col-span-1 ">
                    <div
                      className={` w-fit rounded-lg py-0 px-2  capitalize  ${
                        value?.status === "processing"
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
                      <span
                        onClick={() => {
                          handelClickData(value);
                        }}
                      >
                        <LuEye className="text-[20px] hover:cursor-pointer" />
                      </span>

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
