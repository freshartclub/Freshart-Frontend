import { useState } from "react";
import { PaginationData } from "../Data/PaginationData";
import { LuEye } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import PaginationTabs from "./PaginationTabs";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = PaginationData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(PaginationData.length / recordPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const headerData = [
    { title: "Products", span: 2 },
    { title: "Customer", span: 2 },
    { title: "Total", span: 1 },
    { title: "Payment", span: 1 },
    { title: "Date", span: 1 },
    { title: "Status", span: 2 },
    { title: "Action", span: 1 },
  ];

  return (
    <>
      <>
        <div className="grid grid-cols-10 bg-gray-50 items-center my-auto h-10 p-2 overflow-x-auto">
          {headerData.map((header, index) => (
            <div key={index} className={`col-span-${header.span} text-left`}>
              <p className="font-semibold text-[16px] text-black">
                {header.title}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-2 overflow-x-scroll">
          {records.map((value, index) => (
            <div key={index}>
              <div className="grid grid-cols-10 h-auto pb-3 pt-3 bg-white ">
                <div className="col-span-2 flex gap-2">
                  <div>
                    <img
                      src={value.image}
                      alt="product image"
                      className="w-[2em] h-[2.5em] rounded-md"
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
                    {value.totle}
                  </p>
                </div>

                <div className="col-span-1">
                  <p className="text-[12px] md:text-[14px] font-bold">
                    {value.paymenttype}
                  </p>
                </div>

                <div className="col-span-1">
                  <p className="text-[12px] md:text-[14px] font-bold">
                    {value.date}
                  </p>
                  <p className="text-[10px] md:text-[14px]">{value.time}</p>
                </div>

                <div className="col-span-2">
                  <div
                    className={`w-fit rounded-lg py-0 px-2 ${
                      value.status === "processing"
                        ? "bg-[#FDF1E8] text-[#E46A11]"
                        : value.status === "Shiped"
                        ? "bg-[#E8F8FD] text-[#13B2E4]"
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
        </div>
      </>

      <div className="bg-white">
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
