import React, { useState } from "react";

import { Loader } from "lucide-react";
import { FaCheck, FaChevronDown, FaChevronUp, FaClock, FaExchangeAlt, FaHandshake, FaPalette, FaTimes, FaUser } from "react-icons/fa";
import { useAppSelector } from "../../../store/typedReduxHooks";
import { imageUrl } from "../../utils/baseUrls";
import { useGetOffersList } from "./https/useGetOffersList";
import useAcceptOffer from "./https/useAcceptOffer";
import { useNavigate } from "react-router-dom";

interface CounterOffer {
  _id: string;
  offerprice: number;
  isAccepted: boolean | null;
  userType: "artist" | "user";
  createdAt: string;
}

interface Offer {
  _id: string;
  type: string;
  status: string;
  artwork: {
    _id: string;
    artworkName: string;
    media: Record<string, unknown>;
  };
  user: {
    _id: string;
    artistName: string;
    nickName: string;
  };
  offerprice: number;
  createdAt: string;
  maxOffer: number;
  counterOffer?: CounterOffer[];
}

const Offers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Upward" | "Downward" | "Fixed">("Upward");
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState({
    makeAnOffer: false,
    acceptRejectOffer: false,
  });
  const [offerData, setOfferData] = useState({});
  const [counterAccept, setCounterAccept] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
  const [offerPrice, setOfferPrice] = useState("");
  const [isType, setIsType] = useState("")
  const itemsPerPage = 10;

  const dark = useAppSelector((state) => state.theme.mode);
  const { data, isLoading } = useGetOffersList();
  const { mutateAsync, isPending } = useAcceptOffer();

  const toggleExpandOffer = (offerId: string) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
  };

  const filteredData = data?.filter((offer: Offer) => offer?.type === `${activeTab} Offer`) || [];
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleMakeAnoffer = (data: Offer, counterAccept: boolean, type: string) => {
    setOfferData(data);

    setIsType(type)
    setCounterAccept(counterAccept);
    if (counterAccept) {
      setIsOfferPopupOpen((prev) => ({ ...prev, acceptRejectOffer: true }));
    } else {
      setIsOfferPopupOpen((prev) => ({ ...prev, makeAnOffer: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = {
      offer: offerPrice,
      id: offerData?._id, // offer ki id jaygi isma
      counterAccept: counterAccept,
    };

    mutateAsync(values).then(() => {
      setIsOfferPopupOpen(() => ({ acceptRejectOffer: false, makeAnOffer: false }));
      setOfferPrice("");
    });
  };

  const handleAcceptOffer = (e: React.FormEvent<HTMLFormElement>, isAccepted: boolean) => {
    e.preventDefault();

    const values = {
      id: offerData?._id,
      counterAccept: counterAccept,
      isAccepted: isAccepted,
    };

    mutateAsync(values).then(() => {
      setIsOfferPopupOpen(() => ({ acceptRejectOffer: false, makeAnOffer: false }));
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`p-4 min-h-screen overflow-y-auto ${dark ? "bg-gray-900 text-white" : "bg-white"}`}>
          <div className="mb-5">
            <h1 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-gray-800"}`}>Offer Request</h1>
            <span className={`flex items-center text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>View/Manage all the offers requests</span>
          </div>
          <div className="flex gap-4 mb-6 border-b border-gray-600">
            {["Upward", "Downward"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium transition-colors duration-200 ${activeTab === tab ? "border-b-2 border-[#EE1D52] text-[#EE1D52] hover:text-[#ff648b]" : "hover:text-[#ff648b]"
                  }`}
                onClick={() => {
                  setActiveTab(tab as "Upward" | "Downward" | "Fixed");
                  setCurrentPage(1);
                }}
              >
                {tab} Offers
              </button>
            ))}
          </div>

          {filteredData.length === 0 ? (
            <div className={`text-center border border-gray-600 rounded-lg px-4 py-10 ${dark ? "text-gray-400" : "text-gray-500"}`}>
              No {activeTab.toLowerCase()} offer request found
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-600 shadow-sm">
                <table className={`min-w-full divide-y ${dark ? "divide-gray-700" : "divide-gray-200"}`}>
                  <thead className={dark ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                        Artwork
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                        Request By
                      </th>
                      <th
                        className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}
                      >
                        Max Offer/Offer Made
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                        Requested Date
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                        Status
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className={dark ? "bg-gray-900 divide-gray-700" : "bg-white divide-gray-200"}>
                    {paginatedData?.map((offer: Offer) => (
                      <React.Fragment key={offer?._id}>
                        <tr className="hover:bg-opacity-10 hover:bg-gray-500 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`flex gap-4 items-center text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>
                              <img
                                className="w-12 h-12 rounded object-cover"
                                src={`${imageUrl}/users/${offer?.artwork?.media?.mainImage}` || ""}
                                alt={offer?.artwork?.artworkName}

                              />

                              <div>
                                <p className="font-medium">{offer?.artwork?.artworkName}</p>

                                {offer?.counterOffer[offer.counterOffer?.length - 1]?.userType == "user" &&
                                  offer?.counterOffer[offer.counterOffer?.length - 1]?.isAccepted == null && (
                                    <span
                                      className={`inline-flex mt-1 items-center px-2 py-0.5 rounded-full text-xs font-medium ${dark ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                      <FaClock className="mr-1" /> Action Required (New Request from User)
                                    </span>
                                  )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className={`overflow-x-auto w-full text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>
                              {offer?.user?.artistName}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>3 / {offer?.maxOffer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>
                              {new Date(offer?.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {offer?.status == "complete" && offer?.counterOffer[offer?.counterOffer?.length - 1].isAccepted == true ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <FaCheck className="mr-1" /> Accepted
                              </span>
                            ) : offer?.status == "complete" && offer?.counterOffer[offer?.counterOffer?.length - 1].isAccepted == false ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <FaTimes className="mr-1" /> Rejected
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <FaClock className="mr-1" /> Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {offer?.counterOffer && offer?.counterOffer?.length > 0 && (
                                <button
                                  onClick={() => toggleExpandOffer(offer._id)}
                                  className={`p-1.5 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                                  aria-label="View counter offers"
                                >
                                  {expandedOffer === offer?._id ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                        {expandedOffer === offer?._id && offer?.counterOffer && (
                          <tr>
                            <td colSpan={6} className="px-6 py-4">
                              <div className={`rounded-lg p-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                                <h4 className="font-medium mb-3">Offer Details</h4>
                                <div className="space-y-3">
                                  {offer?.counterOffer?.map((counterOffer, index) => {
                                    const isLatest = index === offer?.counterOffer?.length - 1;
                                    return (
                                      <div
                                        key={counterOffer?._id}
                                        className={`flex flex-col md:flex-row md:items-center justify-between p-3 rounded gap-3 ${dark ? "bg-gray-700" : "bg-white"
                                          }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div
                                            className={`p-2 rounded-full ${counterOffer?.userType === "artist" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                                              }`}
                                          >
                                            {counterOffer?.userType === "artist" ? <FaPalette className="text-lg" /> : <FaUser className="text-lg" />}
                                          </div>
                                          <div>
                                            <p className="font-medium">
                                              Offer Made - €{counterOffer?.offerprice} ({counterOffer?.userType === "artist" ? "You" : "User"})
                                            </p>
                                            <p className="text-xs text-gray-500">{new Date(counterOffer?.createdAt).toLocaleString()}</p>
                                          </div>
                                        </div>

                                        <div className="flex sm:flex-row gap-2">
                                          {isLatest && counterOffer?.userType === "user" && counterOffer?.isAccepted && offer?.status == "complete" ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <FaCheck className="mr-1" /> Offer Accepted By You
                                            </span>
                                          ) : isLatest &&
                                            counterOffer?.userType === "artist" &&
                                            counterOffer?.isAccepted &&
                                            offer.status == "complete" ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <FaCheck className="mr-1" /> Offer Accepted By User
                                            </span>
                                          ) : isLatest && counterOffer?.isAccepted == false && offer?.status == "complete" ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <FaCheck className="mr-1" /> Offer Reached it's max limit
                                            </span>
                                          ) : isLatest && counterOffer?.userType === "user" && counterOffer?.isAccepted == null ? (
                                            <>
                                              <button
                                                onClick={() => handleMakeAnoffer(offer, true, "accept")}
                                                className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${dark ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                                                  }`}
                                              >
                                                <FaHandshake className="mr-1" /> Accept Offer
                                              </button>
                                              <button
                                                onClick={() => handleMakeAnoffer(offer, true, "reject")}
                                                className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${dark ? "bg-[#EE1D52] text-white" : "bg-[#EE1D52] text-white"
                                                  }`}
                                              >
                                                <FaHandshake className="mr-1" /> Reject Offer
                                              </button>
                                              <button
                                                onClick={() => handleMakeAnoffer(offer, false, "counter")}
                                                className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium  bg-teal-400"
                                              >
                                                <FaExchangeAlt className="mr-1" /> Counter Offer
                                              </button>

                                            </>
                                          ) : null}
                                          {counterOffer?.isAccepted === true ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <FaCheck className="mr-1" /> Accepted
                                            </span>
                                          ) : counterOffer?.isAccepted === false ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                              <FaTimes className="mr-1" /> Rejected
                                            </span>
                                          ) : (
                                            <>
                                              {counterOffer?.userType === "artist" && (
                                                <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                  <FaClock className="mr-1" /> Waiting for User Response
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                <div className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                  {filteredData.length} results
                </div>
                <div className="flex gap-2">
                  <button
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded ${dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      } ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded ${dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      } ${currentPage * itemsPerPage >= filteredData?.length ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage * itemsPerPage >= filteredData?.length}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {isOfferPopupOpen?.makeAnOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-[90%] sm:w-1/2  ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <div className="flex relative justify-center items-center w-full mb-4">
              <div className="flex flex-col justify-center items-center space-x-2">
                <p className={`p-3 mb-2 rounded-full ${dark ? "bg-gray-600" : "bg-gray-200"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ff4170]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </p>

                <h3 className="text-xl font-semibold">Make an {offerData?.type}</h3>
              </div>
              <button
                onClick={() => setIsOfferPopupOpen((prev) => ({ ...prev, makeAnOffer: false }))}
                className={`${dark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"} absolute right-0 top-0 p-2`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={`mb-4 p-3 rounded-md flex items-start border ${dark ? "bg-gray-700 border-gray-600" : "bg-blue-50 border-blue-900"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-0.5 mr-2 text-yellow-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className={`text-sm ${dark ? "text-gray-300" : "text-blue-800"}`}>
                By submitting this counter offer, the artist's latest offer will be automatically rejected.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="offer-price" className={`block text-sm font-medium mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                  Your Offer Price
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className={`${dark ? "text-gray-400" : "text-gray-500"} sm:text-sm`}>€</span>
                  </div>
                  <input
                    type="number"
                    id="offer-price"
                    required
                    className={`block w-full pl-7 pr-12 py-2 border sm:text-sm rounded-md ${dark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
                      }`}
                    placeholder="0.00"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className={`${dark ? "text-gray-400" : "text-gray-500"} sm:text-sm`}>EUR</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOfferPopupOpen((prev) => ({ ...prev, makeAnOffer: false }))}
                  disabled={isPending}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className={`p-2 text-sm font-medium text-white rounded-md flex bg-[#EE1D52] hover:bg-[#EE1D52]/80 items-center`}
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Submit Counter
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isOfferPopupOpen?.acceptRejectOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-[90%] sm:w-1/2 ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <div className="flex relative justify-center items-center w-full mb-4">
              <div className="flex flex-col justify-center items-center space-x-2">
                <p className={`p-3 mb-2 rounded-full ${dark ? "bg-gray-600" : "bg-gray-200"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </p>
                <h3 className="text-xl font-semibold">Accept Offer</h3>
              </div>
              <button
                onClick={() => setIsOfferPopupOpen((prev) => ({ ...prev, acceptRejectOffer: false }))}
                className={`${dark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"} absolute right-0 top-0 p-2`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={`mb-4 p-3 rounded-md flex items-start border ${dark ? "bg-gray-700 border-gray-600" : "bg-green-50 border-green-200"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-0.5 mr-2 text-yellow-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className={`text-sm ${dark ? "text-gray-300" : "text-green-800"}`}>
                This action cannot be undone. Once Accepted/Rejected, your action can't be undone.
              </p>
            </div>

            <div className="mb-6">
              <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}>You are accepting the following offer of User:</p>
              <div className={`p-4 rounded-md ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
                <p className="font-medium">
                  € {offerData?.counterOffer[offerData?.counterOffer.length - 1]?.offerprice} <span className="text-xs">(Offered By User)</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsOfferPopupOpen((prev) => ({ ...prev, acceptRejectOffer: false }))}
                disabled={isPending}
                className={`px-4 py-2 text-sm font-medium rounded-md ${dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Cancel
              </button>

              {isType === "accept" ? <button
                type="button"
                onClick={(e) => handleAcceptOffer(e, true)}
                disabled={isPending}
                className={`p-2 text-sm font-medium text-white rounded-md flex bg-green-600 hover:bg-green-700 items-center`}
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accept Offer
                  </>
                )}
              </button> : <button
                type="button"
                onClick={(e) => handleAcceptOffer(e, false)}
                disabled={isPending}
                className={`p-2 text-sm font-medium text-white rounded-md flex bg-red-600 hover:bg-red-700 items-center`}
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaTimes className="mr-1" />
                    Reject Offer
                  </>
                )}
              </button>}



            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Offers;
