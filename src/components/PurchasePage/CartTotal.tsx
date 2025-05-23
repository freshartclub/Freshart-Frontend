import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import ArtworkExchangePopup from "./ArtworkExchangePopup";
import rightarr from "./assets/ArrowRight.png";
import useCheckSubscription from "./http/useCheckSubscription";
import ReturnInstructionsPopup from "./ReturnInstructionsPopup";

const CartTotal = ({ data, state, handleRemove, mode, subsection }) => {
  const discountAmounts = data.map((item) => {
    const basePrice = item?.pricing?.basePrice;
    const discountPercentage = item?.pricing?.dpersentage || 0;
    const discountAmount = (basePrice * discountPercentage) / 100;
    return discountAmount;
  });
  const [showReturnInstruction, setShowReturnInstruction] = useState(false);
  const [onExchnage, setOnExchange] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    status: null,
    details: [],
    validArtworks: [],
  });
  const [availableArtworkIds, setAvailableArtworkIds] = useState([]);
  const [expandedTax, setExpandedTax] = useState(false);
  const [expandedDiscount, setExpandedDiscount] = useState(false);
  const dark = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCheckSubscription();

  const totalDiscountAmount = discountAmounts
    ?.reduce((totalDiscount, item) => {
      return totalDiscount + item;
    }, 0)
    .toFixed(2);

  const totalPrice = data
    ?.reduce((total, item) => {
      const itemPrice = subsection === "offer" ? item?.offerprice : Number(item?.pricing?.basePrice);
      return total + itemPrice;
    }, 0)
    .toFixed(2);


  const vatAmount = data?.map((item) => item?.pricing?.vatAmount) || [];

  const totalTaxAmount = data?.reduce((totalTax, item) => {
    const itemPrice = subsection === "offer" ? item?.offerprice : Number(item?.pricing?.basePrice) || 0;
    const itemVat = Number(item?.pricing?.vatAmount) || 0;


    return totalTax + (itemPrice * (itemVat / 100));
  }, 0).toFixed(2)

  const tdis = data?.reduce((discount, item) => {

    const itemPrice = subsection === "offer" ? 0 : Number(item?.pricing?.basePrice) || 0;

    const discountPercentage = Number(item?.pricing?.dpersentage) || 0;

    return discount + (itemPrice * (discountPercentage / 100));
  }, 0);


  const tax = totalPrice * (vatAmount / 100);

  const finalPrice =
    (Number(totalPrice) || 0)
    - (Number(tdis) || 0)
    + (Number(totalTaxAmount) || 0);


  const card_total = [
    {
      title: "Sub-total",
      value: mode === "subscription" ? "$ 00" : totalPrice,
    },
    {
      title: "Shipping",
      value: mode === "subscription" ? "$ 00" : "Free",
    },
    {
      title: "Discount",
      value: mode === "subscription" ? "$ 00" : mode === "purchase" ? tdis : `Euro ${totalDiscountAmount}`,
    },
    {
      title: "Tax",
      value: mode === "subscription" ? "$ 00" : `$ ${totalTaxAmount}`,
    },
  ];

  const handleCheckOut = async () => {
    if (mode === "subscription") {
      try {
        if (!data || data.length === 0) {
          console.error("No items in cart");
          return;
        }

        const ids = data?.map((item) => {
          if (!item?._id) {
            throw new Error("One or more items missing ID");
          }
          return item?._id;
        });

        const payload = { ids };
        const result = await mutateAsync(payload);

        if (result?.data?.validArtworks) {
          setIsPopUpOpen(true);
          setSubscriptionStatus({
            status: "in_current_plan",
            details: result?.data?.notInCurrentPlan || [],
            validArtworks: result?.data?.validArtworks || [],
          });
          setAvailableArtworkIds(result?.data?.validArtworks);
        } else if (result?.data?.notInCurrentPlan) {
          setIsPopUpOpen(true);
          setSubscriptionStatus({
            status: "not_in_any_plan",
            details: result?.data?.notInCurrentPlan || [],
            validArtworks: [],
          });
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
        if (error.response?.data?.notInCurrentPlan) {
          setIsPopUpOpen(true);
          setSubscriptionStatus({
            status: "not_in_any_plan",
            details: error.response.data.notInCurrentPlan || [],
            validArtworks: [],
          });
        }
      }
    } else {
      navigate(`/payment_page?type=${mode}&subType=${subsection}`);
    }
  };

  const getUnavailableArtworkDetails = () => {
    const unavailableIds = subscriptionStatus.details.map((item) => item.artworkId);
    return data.filter((artwork) => unavailableIds.includes(artwork._id));
  };

  const getAvailableArtworkDetails = () => {
    return data.filter((artwork) => subscriptionStatus.validArtworks.includes(artwork._id));
  };

  const handleSubscriptionAction = (action) => {
    setIsPopUpOpen(false);

    switch (action) {
      case "confirm_exchange":
        setOnExchange(true);
        // navigate(`/payment_page?type=subscription&action=exchange`);
        break;
      case "select_other_subscription":
        navigate("/subscriptions");
        break;
      case "purchase_new_subscription":
        navigate("/subscriptions?new=true");
        break;
      case "upgrade_subscription":
        navigate("/subscriptions?upgrade=true");
        break;
      case "remove_from_cart":
        // Implement remove from cart logic here
        break;
      default:
        break;
    }
  };

  const renderSubscriptionPopup = () => {
    if (!isPopUpOpen) return null;

    const unavailableArtworks = getUnavailableArtworkDetails();
    const availableArtworks = getAvailableArtworkDetails();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`p-4 rounded-lg max-h-[90vh] overflow-y-auto max-w-md w-full ${dark ? "bg-gray-800 text-gray-200" : "bg-white"}`}>
          {subscriptionStatus.status === "in_current_plan" ? (
            <>
              <Header variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "semiBold" }} className="mb-2">
                Subscription Status
              </Header>

              {availableArtworks.length > 0 && (
                <div className="mb-4">
                  <P
                    variant={{
                      size: "base",
                      theme: dark ? "light" : "dark",
                      weight: "medium",
                    }}
                  >
                    These artworks are in your current plan:
                  </P>
                  <ul className="mt-2 space-y-2">
                    {availableArtworks?.map((artwork) => (
                      <li key={artwork._id} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{artwork.artworkName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {unavailableArtworks.length > 0 && (
                <div className="mb-4">
                  <P
                    variant={{
                      size: "base",
                      theme: dark ? "light" : "dark",
                      weight: "medium",
                    }}
                  >
                    These artworks require action:
                  </P>
                  <ul className="mt-2 space-y-2">
                    {unavailableArtworks?.map((artwork) => {
                      const detail = subscriptionStatus?.details.find((d) => d.artworkId === artwork._id);
                      return (
                        <li key={artwork._id} className="flex items-start gap-2">
                          <span className="text-red-600">✗</span>
                          <div>
                            <span>{artwork.artworkName}</span>
                            {detail?.message && <P variant={{ size: "sm", theme: "error" }}>{detail.message}</P>}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="flex flex-col space-y-3 mt-4">
                <Button
                  className={`${dark ? "text-gray-300 bg-[#102030]" : "text-gray-300"}`}
                  onClick={() => handleSubscriptionAction("confirm_exchange")}
                  variant={{ theme: dark ? "light" : "dark", rounded: "full" }}
                >
                  Confirm Exchange
                </Button>
                <Button onClick={() => setIsPopUpOpen(false)} variant={{ theme: dark ? "dark" : "primary", rounded: "full" }}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <Header variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "semiBold" }} className="mb-2">
                Subscription Required
              </Header>

              <div className="mb-4">
                <P
                  variant={{
                    size: "base",
                    theme: dark ? "light" : "dark",
                    weight: "medium",
                  }}
                >
                  The following artworks require a subscription:
                </P>
                <ul className="mt-2 space-y-3">
                  {unavailableArtworks.map((artwork) => {
                    const detail = subscriptionStatus?.details?.find((d) => d.artworkId === artwork._id);
                    return (
                      <li key={artwork._id} className={`border p-3 rounded-lg ${dark ? "border-gray-600" : ""}`}>
                        <div className="flex items-center gap-3">
                          {artwork.media.mainImage && (
                            <img
                              src={`${imageUrl}/users/${artwork?.media?.mainImage}`}
                              alt={artwork?.artworkName}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex justify-between gap-20 items-center">
                            <div>
                              <P variant={{ size: "base", weight: "semiBold" }}>{artwork?.artworkName}</P>
                              <P
                                variant={{
                                  size: "sm",
                                  theme: dark ? "light" : "dark",
                                }}
                              >
                                {artwork?.pricing?.currency} {artwork?.pricing?.basePrice}
                              </P>
                            </div>
                            <div>
                              <P variant={{ size: "base", weight: "semiBold" }}>{detail?.planGrp}</P>
                              <P
                                variant={{
                                  size: "sm",
                                  theme: dark ? "light" : "dark",
                                }}
                              >
                                {detail?.planName}
                              </P>
                            </div>
                          </div>
                        </div>
                        {detail?.message && (
                          <P variant={{ size: "sm", theme: "error" }} className="mt-2">
                            {detail?.message}
                          </P>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  onClick={() => handleSubscriptionAction("purchase_new_subscription")}
                  variant={{ theme: dark ? "dark" : "dark", rounded: "full" }}
                >
                  Get New Subscription
                </Button>

                <Button onClick={() => handleSubscriptionAction("remove_from_cart")} variant={{ theme: "light", rounded: "full" }}>
                  Remove from Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`p-6 mb-8 border rounded-lg shadow-sm ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        {mode === "subscription" ? (
          <div className="text-center py-6">
            <Header className={`mb-4 ${dark ? "text-gray-300" : "text-[#2E4053]"}`} variant={{ size: "lg", theme: "dark", weight: "bold" }}>
              Premium Subscription
            </Header>
            <P variant={{ size: "base", weight: "medium" }} className={dark ? "text-gray-400" : "text-[#636363]"}>
              Enjoy unlimited access to all artworks
            </P>
          </div>
        ) : (
          <div>
            <Header className={`mb-5 ${dark ? "text-gray-300" : "text-[#2E4053]"}`} variant={{ size: "lg", theme: "dark", weight: "bold" }}>
              Order Summary
            </Header>

            <div className={`border-b pb-4 ${dark ? "border-gray-700" : "border-gray-200"}`}>
              {card_total?.map((card, index) => (
                <>
                  <div key={index}>

                    <div className="flex justify-between items-center py-2">
                      <P variant={{ size: "base", weight: "medium" }} className={dark ? "text-gray-400" : "text-[#636363]"}>
                        {card?.title}
                      </P>
                      <div className="flex items-center gap-2">
                        <P variant={{ size: "base", weight: "medium" }} className={dark ? "text-gray-200" : "text-[#191C1F]"}>
                          {card?.value}
                        </P>
                        {card?.title === 'Discount' && data?.length > 1 && (
                          <button
                            onClick={() => setExpandedDiscount(!expandedDiscount)}
                            className="focus:outline-none"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform ${expandedDiscount ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}

                        {card?.title === 'Tax' && data.length > 1 && (
                          <button
                            onClick={() => setExpandedTax(!expandedTax)}
                            className="focus:outline-none"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform ${expandedTax ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {card?.title === 'Tax' && expandedTax && data?.length > 1 && (
                      <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                        {data?.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center py-1 text-sm">
                            <span className={dark ? "text-gray-400" : "text-[#636363]"}>{item?.artworkName}</span>
                            <span className={dark ? "text-gray-300" : "text-[#191C1F]"}>{item?.pricing?.vatAmount + "%"}</span>
                          </div>
                        ))}


                      </div>
                    )}


                    {card?.title === 'Discount' && expandedDiscount && data?.length > 1 && (
                      <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                        {data?.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center py-1 text-sm">
                            <span className={dark ? "text-gray-400" : "text-[#636363]"}>{item?.artworkName}</span>
                            <span className={dark ? "text-gray-300" : "text-[#191C1F]"}>{item?.pricing?.dpersentage ? item?.pricing?.dpersentage + "%" : "N/A"}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </>
              ))}
            </div>

            <div className={`flex justify-between items-center py-5 ${dark ? "text-gray-300" : "text-[#2E4053]"}`}>
              <P variant={{ size: "base", weight: "medium" }}>Total Amount</P>
              <P variant={{ size: "base", weight: "medium" }} className={dark ? "text-white" : "text-[#191C1F]"}>
                {getSymbolFromCurrency(card_total?.[0]?.value?.match(/[^\d.-]/g)?.[0] || "$")}
                {finalPrice}
              </P>
            </div>
          </div>
        )}

        <Button
          onClick={() => handleCheckOut()}
          variant={{ theme: "primary", rounded: "full" }}
          className={`${data?.length === 0 ? "pointer-events-none opacity-50" : "hover:shadow-md"} 
      flex gap-3 items-center w-full justify-center py-4 transition-all duration-200
      ${dark ? "bg-[#FF536B] hover:bg-[#E04A60]" : "bg-[#FF536B] hover:bg-[#E04A60]"}`}
          disabled={isPending}
        >
          {isPending ? (
            <span>Loding...</span>
          ) : (
            <>
              <P variant={{ size: "base", theme: "light", weight: "semiBold" }}>
                {mode === "subscription" ? "Subscribe Now" : "Proceed to Checkout"}
              </P>
              <img src={rightarr} alt="" className="w-5 h-5 filter brightness-0 invert" />
            </>
          )}
        </Button>
      </div>

      {mode === "subscription" ? null : (
        <div className={`border rounded-md ${data?.cart?.length === 0 && "pointer-events-none opacity-50"} ${dark ? "border-gray-700" : ""}`}>
          <Header
            variant={{ size: "md", weight: "semiBold", theme: dark ? "light" : "dark" }}
            className={`p-5 border-b-2 ${dark ? "border-b-gray-700" : "border-b-[#E4E7E9]"}`}
          >
            Gift Card
          </Header>
          <div className="m-5">
            <input
              type="text"
              placeholder="Coupon code"
              className={`w-full outline-none p-3 border ${dark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}`}
            />

            <Button variant={{ fontSize: "sm", fontWeight: "600", rounded: "full" }} className="bg-[#FF536B] text-white uppercase mt-5">
              Apply Coupon
            </Button>
          </div>
        </div>
      )}

      {renderSubscriptionPopup()}

      {onExchnage && (
        <ArtworkExchangePopup
          setOnExchange={setOnExchange}
          setShowReturnInstruction={setShowReturnInstruction}
          availableArtworkIds={availableArtworkIds}
          dark={dark}
        />
      )}

      {showReturnInstruction && <ReturnInstructionsPopup setShowReturnInstruction={setShowReturnInstruction} dark={dark} />}
    </>
  );
};

export default CartTotal;
