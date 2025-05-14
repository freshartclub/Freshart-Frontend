import React, { useState } from "react";
import { FaCheck, FaChevronDown, FaChevronUp, FaClock, FaExchangeAlt, FaHandshake, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import useAddToCartMutation from "../DiscoverMore/http/useAddToCartMutation";
import useMakeAnOfferMutation from "../DiscoverMore/http/useMakeAnOfferMutation";
import { useGetUserOfferList } from "./http/useGetUserOfferList";
import Loader from "../ui/Loader";
import { imageUrl, lowImageUrl } from "../utils/baseUrls";

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
  artist: {
    _id: string;
    artistName: string;
    mainImg: string;
    nickName: string;
  };
  offerprice: number;
  createdAt: string;
  maxOffer: number;
  counterOffer?: CounterOffer[];
}

const UserOfferRequest = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Upward" | "Downward" | "Fixed">("Upward");
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState({
    makeAnOffer: false,
    acceptOffer: false,
  });
  const [offerData, setOfferData] = useState({});
  const [counterAccept, setCounterAccept] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
  const [offerPrice, setOfferPrice] = useState("");
  const itemsPerPage = 10;

  const dark = useAppSelector((state) => state.theme.mode);
  const img = useAppSelector((state) => state.user.user.mainImage || "");

  const { data, isLoading } = useGetUserOfferList();
  const { mutate: addToCartMutation, isPending } = useAddToCartMutation();
  const { mutateAsync, isPending: isOfferPending } = useMakeAnOfferMutation();

  const handleAddToCart = (artworkId: string) => {
    addToCartMutation(artworkId);
  };

  const toggleExpandOffer = (offerId: string) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
  };

  const filteredData = data?.filter((offer: Offer) => offer?.type === `${activeTab} Offer`) || [];
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleMakeAnoffer = (data: Offer, counterAccept: boolean) => {
    setOfferData(data);
    setCounterAccept(counterAccept);
    if (counterAccept) {
      setIsOfferPopupOpen((prev) => ({ ...prev, acceptOffer: true }));
    } else {
      setIsOfferPopupOpen((prev) => ({ ...prev, makeAnOffer: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = {
      offer: offerPrice,
      offerType: offerData?.type,
      artistId: offerData?.artist?._id,
      id: offerData?.artwork?._id,
      counterAccept: counterAccept,
    };

    mutateAsync(values).then(() => {
      setIsOfferPopupOpen(() => ({ acceptOffer: false, makeAnOffer: false }));
      setOfferPrice("");
    });
  };

  const handleAcceptOffer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      offerType: offerData?.type,
      artistId: offerData?.artist?._id,
      id: offerData?.artwork?._id,
      counterAccept: counterAccept,
    };

    mutateAsync(values).then(() => {
      setIsOfferPopupOpen(() => ({ acceptOffer: false, makeAnOffer: false }));
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`p-4 ${dark ? "bg-gray-900 text-white min-h-[50vh]" : "bg-white min-h-[50vh]"}`}>
          <div className="mb-5">
            <h1 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-gray-800"}`}>Offer Request</h1>
            <div className={`flex items-center text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
              <span className="hover:underline cursor-pointer" onClick={() => navigate("/")}>
                Home
              </span>
              <span className="mx-2">•</span>
              <span>Offer Request</span>
            </div>
          </div>
          <div className="flex gap-4 mb-6 border-b border-gray-600">
            {["Upward", "Downward"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium transition-colors duration-200 ${
                  activeTab === tab ? "border-b-2 border-[#EE1D52] text-[#EE1D52] hover:text-[#ff648b]" : "hover:text-[#ff648b]"
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
            <div
              className={`text-center border rounded-lg capitalize py-10 ${dark ? "text-gray-400 border-gray-600" : "text-gray-500 border-gray-300"}`}
            >
              No {activeTab.toLowerCase()} offers found
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
                      <th
                        className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}
                      >
                        Max Offer/Offer Made
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                        Date Created
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
                    {paginatedData.map((offer: Offer) => (
                      <React.Fragment key={offer._id}>
                        <tr className="hover:bg-opacity-10 hover:bg-gray-500 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`flex gap-4 items-center text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>
                              <img
                                className="w-12 h-12 rounded object-cover"
                                src={`${lowImageUrl}/${offer.artwork.media.mainImage}` || ""}
                                alt={offer.artwork.artworkName}
                                // onError={(e) => {
                                //   (e.target as HTMLImageElement).src = "https://via.placeholder.com/50";
                                // }}
                              />
                              <div>
                                <p className="font-medium">{offer.artwork.artworkName}</p>
                                <p className="text-sm text-gray-500">
                                  by {offer.artist.artistName.length > 17 ? `${offer.artist.artistName.slice(0, 17)}...` : offer.artist.artistName}
                                </p>
                              </div>
                              {offer.counterOffer[offer.counterOffer.length - 1]?.userType == "artist" &&
                                offer.counterOffer[offer.counterOffer.length - 1]?.isAccepted == null && (
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                      dark ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    <FaClock className="mr-1" /> Action Required (New offer from Artist)
                                  </span>
                                )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>3 / {offer.maxOffer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>
                              {new Date(offer.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {offer.status == "complete" && offer.counterOffer[offer.counterOffer.length - 1].isAccepted == true ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <FaCheck className="mr-1" /> Accepted
                              </span>
                            ) : offer.status == "complete" && offer.counterOffer[offer.counterOffer.length - 1].isAccepted == false ? (
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
                              {offer.status == "complete" && offer.counterOffer[offer.counterOffer.length - 1].isAccepted == true && (
                                <button
                                  onClick={() => handleAddToCart(offer.artwork._id)}
                                  disabled={isPending}
                                  className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm ${
                                    dark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                                  } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                  <FaShoppingCart className="mr-1" />
                                  {isPending ? "Adding..." : "Add to Cart"}
                                </button>
                              )}
                              {offer.counterOffer && offer.counterOffer.length > 0 && (
                                <button
                                  onClick={() => toggleExpandOffer(offer._id)}
                                  className={`p-1.5 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                                  aria-label="View counter offers"
                                >
                                  {expandedOffer === offer._id ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                        {expandedOffer === offer._id && offer.counterOffer && (
                          <tr>
                            <td colSpan={6} className="px-6 py-4">
                              <div className={`rounded-lg ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
                                <h3 className="font-medium text-lg mb-3">Counter Offers</h3>
                                <div className="space-y-3">
                                  {offer.counterOffer.map((counterOffer, index) => {
                                    const isLatest = index === offer.counterOffer.length - 1;
                                    return (
                                      <div
                                        key={counterOffer._id}
                                        className={`flex flex-col hover:scale-[1.01] transition-all ease-in border md:flex-row md:items-center justify-between p-3 rounded gap-3 ${
                                          dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className={`rounded-full`}>
                                            {counterOffer.userType === "artist" ? (
                                              <img src={`${imageUrl}/users/${offer.artist.mainImg}`} alt="user" className="w-10 h-10 rounded-full" />
                                            ) : (
                                              <img src={`${imageUrl}/users/${img}`} alt="user" className="w-10 h-10 rounded-full" />
                                            )}
                                          </div>
                                          <div>
                                            <p className="font-medium">
                                              Offer Made - € {counterOffer.offerprice} ({counterOffer.userType === "artist" ? "Artist" : "You"})
                                            </p>
                                            <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                              {new Date(counterOffer.createdAt).toLocaleString()}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex sm:flex-row gap-2">
                                          {isLatest && counterOffer.userType === "user" && counterOffer.isAccepted && offer.status == "complete" ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <FaCheck className="mr-1" /> Offer Accepted By Artist
                                            </span>
                                          ) : isLatest &&
                                            counterOffer.userType === "artist" &&
                                            counterOffer.isAccepted &&
                                            offer.status == "complete" ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <FaCheck className="mr-1" /> Offer Accepted By You
                                            </span>
                                          ) : isLatest && counterOffer.isAccepted == false && offer.status == "complete" ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <FaCheck className="mr-1" /> Offer Reached it's max limit
                                            </span>
                                          ) : isLatest && counterOffer.userType === "artist" ? (
                                            <>
                                              <button
                                                onClick={() => handleMakeAnoffer(offer, true)}
                                                className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${
                                                  dark ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                                                }`}
                                              >
                                                <FaHandshake className="mr-1" /> Accept
                                              </button>
                                              {offer.maxOffer == 3 ? (
                                                <button
                                                  onClick={() => handleMakeAnoffer(offer, false)}
                                                  className={`p-2 text-sm font-medium text-white rounded-md flex bg-red-600 hover:bg-red-700 items-center`}
                                                >
                                                  <FaTimes className="mr-1" />
                                                  Reject Offer
                                                </button>
                                              ) : (
                                                <button
                                                  onClick={() => handleMakeAnoffer(offer, false)}
                                                  className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${
                                                    dark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                                                  }`}
                                                >
                                                  <FaExchangeAlt className="mr-1" /> Counter Offer
                                                </button>
                                              )}
                                            </>
                                          ) : isLatest && counterOffer.userType == "user" && counterOffer.isAccepted == false ? (
                                            <button
                                              onClick={() => handleMakeAnoffer(offer, false)}
                                              className={`flex items-center px-2 py-1.5 rounded-full text-sm font-medium bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white`}
                                            >
                                              <FaExchangeAlt className="mr-2" /> Counter Offer
                                            </button>
                                          ) : null}
                                          {counterOffer.isAccepted === true ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                              <FaCheck className="mr-1" /> Accepted
                                            </span>
                                          ) : counterOffer.isAccepted === false ? (
                                            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                              <FaTimes className="mr-1" /> Rejected
                                            </span>
                                          ) : (
                                            <>
                                              {counterOffer.userType === "user" && (
                                                <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                  <FaClock className="mr-1" /> Waiting for Artist Response
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
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded ${
                      dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    } ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded ${
                      dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    } ${currentPage * itemsPerPage >= filteredData.length ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={currentPage * itemsPerPage >= filteredData.length}
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
      {isOfferPopupOpen.makeAnOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-[90%] sm:w-1/2  ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <div className="flex relative justify-center items-center w-full mb-4">
              <div className="flex flex-col justify-center items-center space-x-2">
                <p className={`p-3 mb-2 rounded-full ${dark ? "bg-gray-600" : "bg-gray-200"}`}>
                  {offerData?.maxOffer != 3 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ff4170]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  ) : (
                    <FaTimes className="h-8 w-8 text-[#ff4170]" />
                  )}
                </p>

                {offerData?.maxOffer != 3 ? (
                  <h3 className="text-xl font-semibold">Make an offer</h3>
                ) : (
                  <h3 className="text-xl font-semibold">Reject Offer By Artist</h3>
                )}
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
              {offerData?.maxOffer != 3 ? (
                <p className={`text-sm ${dark ? "text-gray-300" : "text-blue-800"}`}>
                  By submitting this counter offer, the artist's latest offer will be automatically rejected.
                </p>
              ) : (
                <p className={`text-sm ${dark ? "text-gray-300" : "text-blue-800"}`}>
                  By rejecting this counter offer, the offer will be completely closed as you have reached the max number of counter offers.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              {offerData?.maxOffer != 3 && (
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
                      className={`block w-full pl-7 pr-12 py-2 border sm:text-sm rounded-md ${
                        dark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
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
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOfferPopupOpen((prev) => ({ ...prev, makeAnOffer: false }))}
                  disabled={isPending}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className={`p-2 text-sm font-medium text-white rounded-md flex bg-[#EE1D52] hover:bg-[#EE1D52]/80 items-center`}
                >
                  {isOfferPending ? (
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
                      {offerData?.maxOffer != 3 ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Submit Counter
                        </>
                      ) : (
                        <>
                          <FaTimes className="mr-1" /> <span>Reject Offer</span>
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isOfferPopupOpen.acceptOffer && (
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
                onClick={() => setIsOfferPopupOpen((prev) => ({ ...prev, acceptOffer: false }))}
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
                className="h-5 w-5 mt-0.5 mr-2 text-green-500 flex-shrink-0"
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
                By accepting this offer, you agree to the terms and the transaction will be finalized.
              </p>
            </div>

            <div className="mb-6">
              <p className={`text-sm mb-2 ${dark ? "text-gray-300" : "text-gray-600"}`}>You are accepting the following offer:</p>
              <div className={`p-4 rounded-md ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
                <p className="font-medium">
                  € {offerData?.counterOffer[offerData?.counterOffer.length - 1]?.offerprice} <span className="text-xs">(Offered By Artist)</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsOfferPopupOpen((prev) => ({ ...prev, acceptOffer: false }))}
                disabled={isPending}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => handleAcceptOffer(e)}
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
                    Confirm Accept Offer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOfferRequest;
