import { useState } from "react";
import { PaginationData } from "../Data/PaginationData";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import PaginationTabs from "./PaginationTabs";
import { useGetArtistOrder } from "../Orders/http/useGetArtistOrder";
import dayjs from "dayjs";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import { formateCurrency } from "../../utils/FormatCurrency";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = PaginationData.slice(firstIndex, lastIndex);

  const navigate = useNavigate();
  const url = "https://dev.freshartclub.com/images";

  const { data, isLoading } = useGetArtistOrder();

  const headerData = [
    { title: "Products" },
    { title: "Customer" },
    { title: "Order Type" },
    { title: "Total" },
    { title: "Payment" },
    { title: "Date" },
    { title: "Status" },
    { title: "Action" },
  ];

  const handelClickData = (value) => {
    navigate(
      `/artist-panel/order/approve-order?id=${value?._id}&orderType=${value?.orderType}`
    );
  };

  console.log(data);

  const nPages = Math.ceil((data?.length || 0) / recordPerPage);
  const numbers = [...Array(nPages).keys()].map((num) => num + 1);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {data && data.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px] table-auto border-collapse text-sm">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50">
                  {headerData.map((header, index) => (
                    <th
                      key={index}
                      className="text-left px-4 py-2 font-semibold text-black whitespace-nowrap"
                    >
                      {header.title}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.map((value, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    {/* Product Column */}
                    <td
                      className="px-4 py-3 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                      onClick={() => handelClickData(value)}
                    >
                      <img
                        src={`${url}/users/${value?.image}`}
                        alt="product image"
                        className="w-10 h-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-black font-bold text-[12px] lg:text-[14px]">
                          {value?.artWorkName}
                        </p>
                        <p className="text-[10px] lg:text-[12px]">
                          {`${value?.length} x ${value?.width} x ${value?.height} cm`}
                        </p>
                      </div>
                    </td>

                    {/* Customer Column */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-black font-semibold text-[12px] lg:text-[14px]">
                        {value?.artistName
                          ? `${value?.artistName} ${value?.artistSurname1} ${value?.artistSurname2}`
                          : null}
                      </p>
                      <p className="text-[10px] lg:text-[12px]">
                        {value?.email}
                      </p>
                    </td>

                    {/* Order Type */}
                    <td className="px-4 py-3 text-[12px] lg:text-[14px] font-bold capitalize whitespace-nowrap">
                      {value?.orderType}
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3 text-[12px] lg:text-[14px] font-bold whitespace-nowrap">
                      {formateCurrency(value?.subTotal, "$")}
                    </td>

                    {/* Payment Type */}
                    <td className="px-4 py-3 text-[12px] lg:text-[14px] font-bold whitespace-nowrap">
                      {value?.paymenttype}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-[12px] lg:text-[14px] font-bold whitespace-nowrap">
                      {dayjs(value?.createdAt).format("MMM D, YYYY")}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div
                        className={`w-fit rounded-lg py-1 px-2 text-center capitalize ${
                          value.status === "processing"
                            ? "bg-[#FDF1E8] text-[#E46A11]"
                            : value.status === "Shiped"
                            ? "bg-[#E8F8FD] text-[#13B2E4]"
                            : "bg-[#E7F4EE] text-[#0D894F]"
                        }`}
                      >
                        {value.status}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-4">
                        <LuEye
                          onClick={() => handelClickData(value)}
                          className="text-[20px] hover:cursor-pointer"
                        />
                        <RiDeleteBin6Line className="text-[20px] hover:cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white h-[300px] border border-zinc-300">
            <p className="text-lg text-center font-medium mb-4">
              You don't have any Order yet.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white mt-4 rounded-xl">
        <PaginationTabs
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numbers={numbers}
          nPages={nPages}
        />
      </div>
    </>
  );
};

export default Pagination;
