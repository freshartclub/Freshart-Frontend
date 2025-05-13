import React, { useState } from "react";
import { useGetOffersList } from "./https/useGetOffersList";
import useAcceptRejectMutationOffer from "./https/useAcceptRejectMutationOffer";
import { useAppSelector } from "../../../store/typedReduxHooks";
import { imageUrl } from "../../utils/baseUrls";
import { useTranslation } from "react-i18next";
import { validateYupSchema } from "formik";

interface CounterOffer {
  _id: string;
  offerprice: number;
  comment: string;
  isAccepted: boolean | null;
}

interface Offer {
  _id: string;
  type: string;
  artwork: {
    _id: string;
    artworkName: string;
    media: {
      url?: string;
      [key: string]: any;
    };
  };
  user: {
    _id: string;
    artistName: string;
    nickName: string;
  };
  offerprice: number;
  createdAt: string;
  maxOffer: number;
  counterOffer: CounterOffer[];
}

const Offers = () => {
  const [activeTab, setActiveTab] = useState<"Upward" | "Downward" | "Fixed">("Upward");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const { t } = useTranslation();

  const [actionInProgressReject, setActionInProgressReject] = useState<string | null>(null);
  const [expandedOffers, setExpandedOffers] = useState<string[]>([]);
  const itemsPerPage = 10;

  const dark = useAppSelector((state) => state.theme.mode);

  const { data, isLoading } = useGetOffersList();
  const { mutate } = useAcceptRejectMutationOffer();

  const handleAccept = (offer: string) => {

    console.log(offer)
    setActionInProgress(offer?._id);
    const value = {
      id : offer?._id,
      isAccepted: true,
      offer : offer?.counterOffer[0]?.offerprice,
      counterAccept:true,

    };

    
  
    mutate(value, {
      onSuccess: () => {
        setActionInProgress(null);
      },
      onError: () => {
        setActionInProgress(null);
      },
    });
  };

  const handleReject = (offer: string) => {
    setActionInProgressReject(offer?._id);
    const value = {
      id : offer?._id,
      isAccepted: false,
     
      offer: offer?.counterOffer[0]?.offerprice,
      counterAccept:true,
    };
    mutate(value, {
      onSuccess: () => {
        setActionInProgressReject(null);
      },
      onError: () => {
        setActionInProgressReject(null);
      },
    });
  };

  const toggleOfferDetails = (offerId: string) => {
    setExpandedOffers((prev) => (prev.includes(offerId) ? prev.filter((id) => id !== offerId) : [...prev, offerId]));
  };

  const filteredData = data?.data?.filter((offer: Offer) => offer?.type === `${activeTab} Offer`) || [];
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (isAccepted: boolean | null) => {
    if (isAccepted === true) {
      return <span className="px-2 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">Accepted</span>;
    } else if (isAccepted === false) {
      return <span className="px-2 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">Rejected</span>;
    } else {
      return <span className="px-2 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full">Pending</span>;
    }
  };

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-64 ${dark ? "bg-gray-900 text-white" : ""}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`p-4 min-h-full ${dark ? "bg-gray-900 text-white" : "bg-white"}`}>
      <div className="mb-4">
        <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("All Offer's")}</h1>
        <span className={dark ? "text-gray-400 text-sm" : "text-gray-400 text-sm"}>{t("View/Manage your offers requests")}</span>
      </div>
      <div className="flex gap-4 mb-6 border-b">
        {["Upward", "Downward"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-[#EE1D52] text-[#EE1D52]"
                : `${dark ? "text-gray-300 hover:text-[#EE1D52]" : "text-gray-500 hover:text-[#EE1D52]"}`
            }`}
            onClick={() => setActiveTab(tab as "Upward" | "Downward" | "Fixed")}
          >
            {tab} Offers
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className={`min-w-full border divide-y ${dark ? "divide-gray-700 border-gray-600" : "divide-gray-200 border-zinc-300"}`}>
          <thead className={dark ? "bg-gray-800" : "bg-gray-50"}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                Artwork
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>User</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                Initial Offer
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>Type</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>Date</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                Status
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                Actions
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${dark ? "text-gray-300" : "text-gray-500"}`}>
                Details
              </th>
            </tr>
          </thead>
          <tbody className={dark ? "bg-gray-900 divide-gray-700" : "bg-white divide-gray-200"}>
            {paginatedData && paginatedData.length > 0 ? (
              paginatedData.map((offer: Offer) => {
                const latestCounterOffer =
                  offer?.counterOffer && offer?.counterOffer.length > 0 ? offer?.counterOffer[offer?.counterOffer?.length - 1] : null;
                const isExpanded = expandedOffers.includes(offer._id);

                return (
                  <React.Fragment key={offer._id}>
                    <tr className={isExpanded ? `${dark ? "bg-gray-800" : "bg-gray-50"}` : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {offer.artwork.media?.mainImage ? (
                            <img
                              src={`${imageUrl}/users/${offer.artwork.media.mainImage}`}
                              alt={offer.artwork.artworkName}
                              className="w-10 h-10 mr-2 object-cover rounded"
                            />
                          ) : (
                            <div className={`w-10 h-10 mr-2 rounded flex items-center justify-center ${dark ? "bg-gray-700" : "bg-gray-200"}`}>
                              <span className="text-sm">No img</span>
                            </div>
                          )}
                          <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>{offer.artwork.artworkName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>{offer.user.artistName || offer.user.nickName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>€{latestCounterOffer?.offerprice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>{offer.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${dark ? "text-gray-100" : "text-gray-900"}`}>{new Date(offer.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {latestCounterOffer ? getStatusBadge(latestCounterOffer.isAccepted) : getStatusBadge(null)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(!latestCounterOffer || latestCounterOffer.isAccepted === null) && (
                          <div className="flex gap-2">
                            <button
                              className={`px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors ${
                                actionInProgress === offer._id ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              onClick={() => handleAccept(offer)}
                              disabled={actionInProgress === offer._id}
                            >
                              {actionInProgress === offer._id ? "Processing..." : "Accept"}
                            </button>
                            <button
                              className={`px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors ${
                                actionInProgress === offer._id ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              onClick={() => handleReject(offer)}
                              disabled={actionInProgressReject === offer._id}
                            >
                              {actionInProgressReject === offer._id ? "Processing..." : "Reject"}
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className={`px-3 py-1 text-sm font-medium ${
                            dark ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-700"
                          } rounded-md hover:bg-[#102030] hover:text-white transition-colors`}
                          onClick={() => toggleOfferDetails(offer._id)}
                        >
                          {isExpanded ? "Hide Details" : "Show Details"}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={8} className={`px-6 py-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                          <div className="overflow-hidden rounded-lg shadow">
                            <div className={`px-4 py-5 ${dark ? "bg-gray-800" : "bg-white"} sm:p-6`}>
                              <h3 className={`text-lg font-medium leading-6 ${dark ? "text-gray-100" : "text-gray-900"}`}>Counter Offers History</h3>
                              <div className="mt-4 border-t border-b py-4">
                                <div className={`text-sm ${dark ? "text-gray-300" : "text-gray-500"} mb-2`}>
                                  Date : {new Date(offer.createdAt).toLocaleDateString()}
                                </div>
                                {offer.counterOffer && offer.counterOffer.length > 0 ? (
                                  <div className="space-y-4">
                                    {offer.counterOffer.map((counter, index) => (
                                      <div key={counter._id} className={`p-3 rounded ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
                                        <div className="flex justify-between items-center">
                                          <div className={`text-sm font-medium ${dark ? "text-gray-100" : "text-gray-900"}`}>
                                            Counter Offer #{index + 1}: €{counter.offerprice}
                                          </div>
                                          <div>{getStatusBadge(counter.isAccepted)}</div>
                                        </div>
                                        {counter.comment && (
                                          <div className={`mt-2 text-sm ${dark ? "text-gray-300" : "text-gray-500"}`}>Comment: {counter.comment}</div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className={`text-sm italic ${dark ? "text-gray-400" : "text-gray-500"}`}>No counter offers yet</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className={`px-6 py-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                  <div className={`text-center py-12 ${dark ? "text-gray-300" : "text-gray-500"}`}>No {activeTab} offers found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
          Showing {paginatedData.length} of {filteredData.length} results
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded hover:bg-gray-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""} ${
              dark ? "bg-gray-700 text-gray-100" : "bg-gray-200"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className={`px-3 py-1 rounded hover:bg-gray-300 ${
              currentPage * itemsPerPage >= filteredData.length ? "opacity-50 cursor-not-allowed" : ""
            } ${dark ? "bg-gray-700 text-gray-100" : "bg-gray-200"}`}
            disabled={currentPage * itemsPerPage >= filteredData.length}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;
