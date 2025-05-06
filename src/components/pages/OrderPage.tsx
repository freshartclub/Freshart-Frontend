import dayjs from "dayjs";
import { useState } from "react";
import { FaRegSadTear } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage, MdOutlineFileDownload, MdOutlineSubscriptions, MdShoppingBag } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { lowImageUrl } from "../utils/baseUrls";
import { useGetOrder } from "./http/useGetOrder";

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState<"purchase" | "subscription">("purchase");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { data, isLoading } = useGetOrder();
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.theme.mode);

  const handleDetailPage = (item) => {
    navigate(`/order_tracking?id=${item?._id}&art=${item?.artwork?._id}`);
  };

  const filteredData = data?.filter((item) => (activeTab === "purchase" ? item.type === "purchase" : item.type === "subscription")) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"} pb-10 transition-colors duration-200`}>
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div>
          <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>All Orders</h1>
          <span className={dark ? "text-gray-400 text-sm" : "text-gray-400 text-sm"}>View/Manage your all orders</span>
        </div>

        <div className="flex justify-between min-[500px]:flex-row flex-col gap-4 my-4">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab("purchase");
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "purchase"
                  ? `bg-[#EE1D52] hover:bg-[#ee1d51db] text-white`
                  : `${dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
              }`}
            >
              <MdShoppingBag />
              Purchase
            </button>
            <button
              onClick={() => {
                setActiveTab("subscription");
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "subscription"
                  ? `bg-[#EE1D52] hover:bg-[#ee1d51db] text-white`
                  : `${dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`
              }`}
            >
              <MdOutlineSubscriptions />
              Subscription
            </button>
          </div>

          <span
            className={`flex min-[500px]:w-max items-center justify-center cursor-pointer gap-2 px-4 py-2 rounded-lg ${
              dark ? "text-gray-400 bg-gray-800" : "text-gray-600 bg-gray-100"
            }`}
          >
            <MdOutlineFileDownload className="text-lg" />
            Export
          </span>
        </div>

        {isLoading ? (
          <Loader theme={dark} />
        ) : (
          <div className="grid gap-6">
            {currentItems.length > 0 ? (
              <>
                {currentItems.map((item, index: number) => (
                  <div
                    key={index}
                    className={`${dark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} 
                    rounded-xl shadow-sm border ${dark ? "border-gray-700" : "border-gray-200"} 
                    transition-all hover:shadow-md overflow-hidden`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      <div className="flex-shrink-0 w-full sm:w-48 h-40 rounded-lg overflow-hidden">
                        <img src={`${lowImageUrl}/${item?.artwork?.media}`} alt={item?.artwork?.artworkName} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <Header
                              variant={{
                                size: "lg",
                                theme: dark ? "light" : "dark",
                                weight: "semiBold",
                              }}
                              className="flex items-center gap-2"
                            >
                              {item?.artwork?.artworkName}
                              <span className={`text-xs ${dark ? "bg-gray-700" : "bg-gray-100"} px-2 py-1 rounded-full`}>{item?.type}</span>
                            </Header>
                            <P
                              variant={{
                                size: "small",
                                theme: dark ? "light" : "dark",
                                weight: "medium",
                              }}
                              className="text-gray-500"
                            >
                              #{item?.orderId}
                            </P>
                          </div>

                          <P
                            variant={{
                              size: "small",
                              theme: dark ? "light" : "dark",
                              weight: "normal",
                            }}
                            className="mb-2"
                          >
                            Ordered on {dayjs(item?.createdAt).format("MMMM D, YYYY")}
                          </P>

                          <div className={`flex items-center gap-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                            <span className="text-lg font-semibold text-primary-500">€{item?.total}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <span
                            onClick={() => handleDetailPage(item)}
                            className="w-full text-center hover:underline sm:w-auto p-2 bg-[#EE1D52] hover:bg-[#ee1d51db] text-white rounded-full px-4 cursor-pointer"
                          >
                            View Order Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredData.length > itemsPerPage && (
                  <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 p-4 rounded-lg`}>
                    <P
                      variant={{
                        size: "sm",
                        theme: dark ? "light" : "dark",
                        weight: "normal",
                      }}
                    >
                      Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} orders
                    </P>

                    <div className={`flex gap-2 items-center ${dark ? "text-white" : "text-gray-700"}`}>
                      <button
                        onClick={firstPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"} ${
                          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <MdFirstPage className="text-xl" />
                      </button>
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"} ${
                          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <MdChevronLeft className="text-xl" />
                      </button>

                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              currentPage === number
                                ? `bg-[#EE1D52] hover:bg-[#ee1d51db] text-white`
                                : `${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md ${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"} ${
                          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <MdChevronRight className="text-xl" />
                      </button>
                      <button
                        onClick={lastPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md ${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"} ${
                          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <MdLastPage className="text-xl" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div
                className={`${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} 
              border rounded-xl p-8 text-center flex flex-col items-center`}
              >
                <FaRegSadTear className={`text-4xl mb-4 ${dark ? "text-gray-500" : "text-gray-400"}`} />
                <Header
                  variant={{
                    size: "xl",
                    theme: dark ? "light" : "dark",
                    weight: "bold",
                  }}
                  className="mb-2"
                >
                  No Orders Found
                </Header>
                <P
                  variant={{
                    size: "md",
                    theme: dark ? "light" : "dark",
                    weight: "normal",
                  }}
                  className="mb-6 max-w-md mx-auto"
                >
                  {`You haven't placed any ${activeTab === "purchase" ? "purchases" : "subscriptions"} yet.`}
                </P>
                <NavLink to={`/all-artworks?type=${activeTab}`}>
                  <span className="w-full hover:underline sm:w-auto p-2 bg-[#EE1D52] hover:bg-[#ee1d51db] text-white rounded-full px-4 cursor-pointer">
                    Browse Artworks
                  </span>
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
