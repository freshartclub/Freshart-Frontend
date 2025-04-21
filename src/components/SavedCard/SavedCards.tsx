import { useState } from "react";
import { FaCreditCard, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetCardDetails } from "./http/getSavedCard";
import useDeleteCard from "./http/useDeleteCard";
import { useCheckUserRef } from "../PriceAndPlans/http/useCheckUserRef";
import { FiExternalLink } from "react-icons/fi";
import CreditCardForm from "../PriceAndPlans/CreditCardForm";
import useAddNewCard from "./http/useAddNewCard";
import toast from "react-hot-toast";

type Card = {
  _id: string;
  card: {
    card_stored: boolean;
    card_details: {
      cardType: "visa" | "mastercard" | "amex" | "discover";
      cardNumber: string;
      cardExpiry: string;
      isDefault: boolean;
      cardHolder: string;
    };
  };
};

const SavedCards = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const dark = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetCardDetails() as { data: Card; isLoading: boolean; refetch: () => void };
  const { mutateAsync: deleteCard, isPending: isDeleting } = useDeleteCard();
  const { data: checkRef, isLoading: checkRefLoading } = useCheckUserRef();
  const { mutateAsync, isPending: isAdding } = useAddNewCard();

  const getCardColor = (cardType: string) => {
    switch (cardType) {
      case "visa":
        return "bg-gradient-to-r from-blue-600 to-blue-800";
      case "mastercard":
        return "bg-gradient-to-r from-red-600 to-yellow-500";
      case "amex":
        return "bg-gradient-to-r from-blue-400 to-blue-600";
      case "discover":
        return "bg-gradient-to-r from-purple-600 to-indigo-800";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-400";
    }
  };

  const getCardLogo = (cardType: string) => {
    switch (cardType) {
      case "visa":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/345px-Visa_2021.svg.png";
      case "mastercard":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1280px-Mastercard_2019_logo.svg.png";
      case "amex":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/800px-American_Express_logo_%282018%29.svg.png";
      case "discover":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/1920px-Discover_Card_logo.svg.png";
      default:
        return <FaCreditCard size={20} color="black" />;
    }
  };

  const formatExpiryDate = (month: string, year: string) => {
    return `${month}/${year}`;
  };

  const handleDeleteCard = async () => {
    setIsConfirming(true);
  };

  const confirmDelete = async () => {
    if (confirmationText.toLowerCase() !== "delete") {
      toast.error("Please type 'delete' to confirm");
      return;
    }

    await deleteCard();
    setShowDeleteModal(false);
    setConfirmationText("");
    setIsConfirming(false);
    refetch();
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>Saved Payment Methods</h1>
          <p className={`${dark ? "text-gray-400" : "text-gray-600"}`}>Manage your saved credit/debit card</p>
        </div>

        {isLoading || checkRefLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EE1D52]"></div>
          </div>
        ) : checkRef.data == false ? (
          <div
            className={`text-center py-12 px-4 border rounded-lg ${
              dark ? "bg-gray-800 border-gray-600 text-white" : "bg-gray-50 text-gray-800"
            } shadow`}
          >
            <div className="flex justify-center mb-4">
              <FaCreditCard className={`text-5xl ${dark ? "text-gray-400" : "text-gray-300"}`} />
            </div>
            <h3 className="text-xl font-bold mb-2">Basic Info Missing</h3>
            <p className="mb-6">
              Please add your basic information before adding a payment method. Please add your basic information by going to{" "}
              <span className="text-[#EE1D52]">Price and Plan</span> clicking the button below.
            </p>
            <button
              onClick={() => navigate("/priceandplans")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold shadow-md transition-all ${
                dark ? "bg-[#EE1D52] hover:bg-[#ee1d51b9] text-white" : "bg-[#EE1D52] hover:bg-[#ee1d51b9] text-white"
              }`}
            >
              <FiExternalLink /> Price and Plan
            </button>
          </div>
        ) : !checkRef.prev_saved && checkRef?.store == false ? (
          <div
            className={`text-center py-12 px-4 border rounded-lg ${
              dark ? "bg-gray-800 border-gray-600 text-white" : "bg-gray-50 text-gray-800"
            } shadow`}
          >
            <div className="flex justify-center mb-4">
              <FaCreditCard className={`text-5xl ${dark ? "text-yellow-400" : "text-yellow-500"}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${dark ? "text-gray-100" : "text-gray-800"}`}>Payment Method Missing</h3>
            <p className={`mb-6 ${dark ? "text-gray-400" : "text-gray-600"}`}>
              We have your basic Information, but your payment method is not setup. Please add a new card by going to{" "}
              <span className={`${dark ? "text-yellow-400" : "text-yellow-500"}`}>Price and Plan</span> clicking the button below.
            </p>
            <button
              onClick={() => navigate("/priceandplans")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold shadow-md transition-all ${
                dark ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-yellow-400 text-white hover:bg-yellow-500"
              }`}
            >
              <FiExternalLink /> Price and Plan
            </button>
          </div>
        ) : checkRef.prev_saved && !data.card.card_stored ? (
          <div className={`text-center py-12 rounded-lg ${dark ? "bg-gray-800" : "bg-white"} shadow`}>
            <div className="flex justify-center mb-4">
              <FaCreditCard className={`text-5xl ${dark ? "text-gray-400" : "text-gray-300"}`} />
            </div>
            <h3 className={`text-xl font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>No Saved Card</h3>
            <p className={`mb-6 ${dark ? "text-gray-400" : "text-gray-500"}`}>Please add a Card</p>
            <button
              onClick={() => setShowCreditCardForm(true)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto ${
                dark ? "bg-[#EE1D52] hover:bg-[#ee1d51b9] text-white" : "bg-[#EE1D52] hover:bg-[#ee1d51b9] text-white"
              }`}
            >
              <FaPlus /> Add New Card
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] ${dark ? "bg-gray-800" : "bg-white"}`}>
              <div className={`p-6 ${getCardColor(data?.card?.card_details?.cardType)} text-white`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold">{data?.card?.card_details?.cardHolder}</h3>
                    <p className="text-sm opacity-80">{data?.card?.card_details?.isDefault ? "DEFAULT CARD" : ""}</p>
                  </div>
                  <div className="w-14 h-8 bg-white rounded flex px-1 items-center justify-center">
                    {typeof getCardLogo(data?.card?.card_details?.cardType) === "string" ? (
                      <img
                        src={getCardLogo(data?.card?.card_details?.cardType)}
                        alt={data?.card?.card_details?.cardType}
                        className="h-5 object-contain"
                      />
                    ) : (
                      getCardLogo(data?.card?.card_details?.cardType)
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm opacity-80">Card Number</span>
                  <span className="font-mono tracking-wider">•••• •••• •••• {data?.card?.card_details?.cardNumber}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm opacity-80 block">Expires</span>
                    <span>{formatExpiryDate(data?.card?.card_details?.cardExpiry.slice(0, 2), data?.card?.card_details?.cardExpiry.slice(-2))}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm opacity-80 block">Card Type</span>
                    <span className="uppercase">{data?.card?.card_details?.cardType}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs ${dark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                  {checkRef.status === "soon-1"
                    ? "Expiring Soon in 1 Month"
                    : checkRef.status === "soon-2"
                    ? "Expiring Soon in 2 Months"
                    : checkRef.status === "expired"
                    ? "Card Expired"
                    : "Currently Active"}
                </span>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className={`p-2 rounded-full ${dark ? "hover:bg-gray-700 text-red-400" : "hover:bg-gray-100 text-red-500"}`}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div
              onClick={() => setShowDeleteModal(true)}
              className={`rounded-xl overflow-hidden shadow-lg border-2 border-dashed flex flex-col items-center justify-center p-8 cursor-pointer transition-colors ${
                dark ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <FaPlus className={`text-3xl mb-3 ${dark ? "text-gray-400" : "text-gray-500"}`} />
              <h3 className={`text-lg font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Add New Card</h3>
              <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>Save a new payment method</p>
              <p className={`text-sm mt-1 px-1 rounded-full bg-red-100 text-red-800`}>For this you have to remove the current card</p>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md mx-4 rounded-lg shadow-lg ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Delete Card</h2>
              <p className="text-sm mb-4">This action cannot be undone. This will permanently delete your card and stop all recurring payments.</p>

              {!isConfirming ? (
                <>
                  <p className="text-sm mb-4">Are you sure you want to delete this card? All recurring payments will be stopped.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDeleteCard}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete Card
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className={`flex-1 px-4 py-2 ${
                        dark ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      } rounded-lg font-medium`}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm mb-2">
                    To confirm, please type <span className="font-bold">"delete"</span> below:
                  </p>
                  <input
                    type="text"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    className={`w-full px-3 py-2 mb-4 rounded-md border ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                    placeholder="Type 'delete' to confirm"
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={confirmDelete}
                      disabled={confirmationText.toLowerCase() !== "delete" || isDeleting}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                        confirmationText.toLowerCase() !== "delete"
                          ? dark
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      {isDeleting ? (
                        "Deleting..."
                      ) : (
                        <>
                          <FaTrash /> Confirm Delete
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsConfirming(false);
                        setConfirmationText("");
                      }}
                      className={`flex-1 px-4 py-2 ${
                        dark ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      } rounded-lg font-medium`}
                    >
                      Go Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreditCardForm && (
        <CreditCardForm
          onClose={() => setShowCreditCardForm(false)}
          isSaved={true}
          planId={""}
          isPending={isAdding}
          billingCycle={""}
          onSubmit={(cardDetails) => {
            mutateAsync(cardDetails).then(() => {
              setShowCreditCardForm(false);
              window.location.reload();
            });
          }}
        />
      )}
    </div>
  );
};

export default SavedCards;
