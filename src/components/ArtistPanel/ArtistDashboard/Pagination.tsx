import dayjs from "dayjs";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import { formateCurrency } from "../../utils/FormatCurrency";
import { imageUrl, lowImageUrl } from "../../utils/baseUrls";
import { useGetArtistOrder } from "../Orders/http/useGetArtistOrder";
import PaginationTabs from "./PaginationTabs";
import { useTranslation } from "react-i18next";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;

  const navigate = useNavigate();
  const { data, isLoading } = useGetArtistOrder();

  console.log(data);

  const headerData = [
    { title: "Artwork" },
    { title: "Customer" },
    { title: "Type" },
    { title: "Total" },
    { title: "Date" },
    { title: "Status" },
    { title: "Action" },
  ];

  const handelClickData = (value) => {
    navigate(`/artist-panel/order/approve-order?id=${value?._id}`);
  };

  const nPages = Math.ceil((data?.length || 0) / recordPerPage);
  const numbers = [...Array(nPages).keys()].map((num) => num + 1);

  const { t } = useTranslation();

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="mt-4 px-4">
        {data && data.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px] table-auto border-collapse text-sm">
              <thead className="bg-gray-200">
                <tr className="[&>*:nth-child(1)]:pl-4">
                  {headerData.map((header, index) => (
                    <th
                      key={index}
                      className="text-left py-2 font-semibold text-black whitespace-nowrap"
                    >
                      {t(header.title)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((value, index: number) => (
                  <tr
                    key={index}
                    className="[&>*:nth-child(1)]:pl-4 border-b hover:bg-gray-100 bg-slate-50"
                  >
                    <td
                      className="py-3 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                      onClick={() => handelClickData(value)}
                    >
                      <img
                        src={`${lowImageUrl}/${value?.image}`}
                        alt="product image"
                        className="w-10 h-9 rounded object-cover"
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

                    <td className="py-3 whitespace-nowrap">
                      <p className="text-black font-semibold text-[12px] lg:text-[14px]">
                        {value?.artistName
                          ? `${value?.artistName} ${value?.artistSurname1} ${value?.artistSurname2}`
                          : null}
                      </p>
                      <p className="text-[10px] lg:text-[12px]">
                        {value?.email}
                      </p>
                    </td>

                    <td className="py-3 text-[12px] lg:text-[14px] font-bold capitalize whitespace-nowrap">
                      {value?.type || "N/A"}
                    </td>

                    <td className="py-3 text-[12px] lg:text-[14px] font-bold whitespace-nowrap">
                      {formateCurrency(value?.total, "$")}
                    </td>

                    <td className="py-3 text-[12px] lg:text-[14px] font-bold whitespace-nowrap">
                      {dayjs(value?.createdAt).format("MMM D, YYYY")}
                    </td>

                    <td className="py-3 whitespace-nowrap">
                      <div
                        className={`w-fit rounded-lg py-1 px-2 text-center capitalize ${
                          value.status === "processing"
                            ? "bg-[#FDF1E8] text-[#E46A11]"
                            : value.status === "Shiped"
                            ? "bg-[#E8F8FD] text-[#13B2E4]"
                            : "bg-[#E7F4EE] text-[#0D894F]"
                        }`}
                      >
                        {t(value.status)}
                      </div>
                    </td>

                    <td className="py-3 whitespace-nowrap">
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
          <div className="flex flex-col mb-4 items-center justify-center bg-white h-[50px] border border-zinc-300">
            <p className="text-center font-medium">
              {t("You don't have any Order yet.")}
            </p>
          </div>
        )}
      </div>
      {data && data.length > 0 ? (
        <PaginationTabs
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numbers={numbers}
          nPages={nPages}
        />
      ) : null}
    </>
  );
};

export default Pagination;
