import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import rightarr from "./assets/ArrowRight.png";
import useCheckSubscription from "./http/useCheckSubscription";
import { useState } from "react";
import { imageUrl } from "../utils/baseUrls";
import ArtworkExchangePopup from "./ArtworkExchangePopup";
import ReturnInstructionsPopup from "./ReturnInstructionsPopup";
import { useAppSelector } from "../../store/typedReduxHooks";

const CartTotal = ({ data, state, handleRemove }) => {
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
      const itemPrice = item?.pricing?.basePrice;
      return total + itemPrice;
    }, 0)
    .toFixed(2);

  const card_total = [
    {
      title: "Sub-total",
      value: state === "subscription" ? "$ 00" : totalPrice,
    },
    {
      title: "Shipping",
      value: state === "subscription" ? "$ 00" : "Free",
    },
    {
      title: "Discount",
      value: state === "subscription" ? "$ 00" : `$ ${totalDiscountAmount}`,
    },
    {
      title: "Tax",
      value: state === "subscription" ? "$ 00" : "$61.99",
    },
  ];

  const handleCheckOut = async () => {
    if (state === "subscription") {
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
      navigate(`/payment_page?type=${state}`);
    }
  };

  const getUnavailableArtworkDetails = () => {
    const unavailableIds = subscriptionStatus.details.map(
      (item) => item.artworkId
    );
    return data.filter((artwork) => unavailableIds.includes(artwork._id));
  };

  const getAvailableArtworkDetails = () => {
    return data.filter((artwork) =>
      subscriptionStatus.validArtworks.includes(artwork._id)
    );
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
        <div
          className={`p-6 rounded-lg max-w-md w-full ${
            dark ? "bg-gray-800 text-gray-200" : "bg-white"
          }`}
        >
          {subscriptionStatus.status === "in_current_plan" ? (
            <>
              <Header
                variant={{ size: "md", theme: dark ? "light" : "dark", weight: "semiBold" }}
                className="mb-4"
              >
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
                    {availableArtworks.map((artwork) => (
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
                    {unavailableArtworks.map((artwork) => {
                      const detail = subscriptionStatus.details.find(

                        (d) => d.artworkId === artwork._id
                      );
                      return (
                        <li
                          key={artwork._id}
                          className="flex items-start gap-2"
                        >
                          <span className="text-red-600">✗</span>
                          <div>
                            <span>{artwork.artworkName}</span>
                            {detail?.message && (
                              <P variant={{ size: "sm", theme: "error" }}>
                                {detail.message}
                              </P>
                            )}
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
                <Button
                  onClick={() => setIsPopUpOpen(false)}
                  variant={{ theme: dark ? "dark" : "primary", rounded: "full" }}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <Header
                variant={{ size: "md", theme: dark ? "light" : "dark", weight: "semiBold" }}
                className="mb-4"
              >
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
                    const detail = subscriptionStatus?.details?.find(
                      (d) => d.artworkId === artwork._id
                    );
                    return (
                      <li
                        key={artwork._id}
                        className={`border p-3 rounded-lg ${
                          dark ? "border-gray-600" : ""
                        }`}
                      >
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
                              <P
                                variant={{ size: "base", weight: "semiBold" }}
                              >
                                {artwork?.artworkName}
                              </P>
                              <P
                                variant={{
                                  size: "sm",
                                  theme: dark ? "light" : "dark",
                                }}
                              >
                                {artwork?.pricing?.currency}{" "}
                                {artwork?.pricing?.basePrice}
                              </P>
                            </div>
                            <div>
                              <P
                                variant={{ size: "base", weight: "semiBold" }}
                              >
                                {detail?.planGrp}
                              </P>
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
                          <P
                            variant={{ size: "sm", theme: "error" }}
                            className="mt-2"
                          >
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
                  onClick={() =>
                    handleSubscriptionAction("purchase_new_subscription")
                  }
                  variant={{ theme: dark ? "dark" : "dark", rounded: "full" }}
                >
                  Get New Subscription 
                </Button>
              
                <Button
                  onClick={() => handleSubscriptionAction("remove_from_cart")}
                  variant={{ theme: "light", rounded: "full" }}
                >
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
      <div
        className={`p-5 mb-8 border rounded-md ${
          dark ? "dark bg-gray-800 border-gray-700" : ""
        }`}
      >
        <div>
          <Header
            className={`${dark ? "text-gray-300" : "text-[#2E4053]"}`}
            variant={{ size: "md", theme: "dark", weight: "semiBold" }}
          >
            Card Totals
          </Header>

          <div
            className={`border-b-2 pb-2 ${
              dark
                ? "border-b-gray-700 text-gray-300"
                : "border-b-[#E4E7E9] text-[#2E4053]"
            }`}
          >
            {card_total?.map((card, index) => (
              <div key={index} className="flex justify-between my-3">
                <P
                  variant={{ size: "small", weight: "medium" }}
                  className={dark ? "text-gray-400" : "text-[#636363]"}
                >
                  {card.title}
                </P>
                <P
                  variant={{ size: "small", weight: "medium" }}
                  className={dark ? "text-gray-200" : "text-[#191C1F]"}
                >
                  {card.value}
                </P>
              </div>
            ))}
          </div>

          <div className="flex justify-between py-5">
            <P
              variant={{
                size: "base",
                theme: dark ? "light" : "dark",
                weight: "medium",
              }}
            >
              Total
            </P>
            <P
              variant={{
                size: "base",
                theme: dark ? "light" : "dark",
                weight: "semiBold",
              }}
            >
              ${ state === "subscription" ? "00" : (totalPrice - totalDiscountAmount).toFixed(2)}
            </P>
          </div>
        </div>

        <Button
          onClick={() => handleCheckOut()}
          variant={{ theme: "dark", rounded: "full" }}
          className={`${
            data?.length === 0 && "pointer-events-none opacity-50"
          } flex gap-2 items-center w-full justify-center xl:!py-5 lg:py-3`}
        >
          <P variant={{ size: "base", theme: "light", weight: "medium" }}>
            {isPending ? "Loading..." : "Proceed to Checkout"}
          </P>
          <img src={rightarr} alt="" />
        </Button>
      </div>

      <div
        className={`border rounded-md ${
          data?.cart?.length === 0 && "pointer-events-none opacity-50"
        } ${dark ? "border-gray-700" : ""}`}
      >
        <Header
          variant={{ size: "md", weight: "semiBold", theme: dark ? "light" : "dark" }}
          className={`p-5 border-b-2 ${
            dark ? "border-b-gray-700" : "border-b-[#E4E7E9]"
          }`}
        >
          Gift Card
        </Header>
        <div className="m-5">
          <input
            type="text"
            placeholder="Coupon code"
            className={`w-full outline-none p-3 border ${
              dark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : ""
            }`}
          />

          <Button
            variant={{ fontSize: "sm", fontWeight: "600", rounded: "full" }}
            className="bg-[#FF536B] text-white uppercase mt-5"
          >
            Apply Coupon
          </Button>
        </div>
      </div>

      {renderSubscriptionPopup()}

      {onExchnage && (
        <ArtworkExchangePopup
          setOnExchange={setOnExchange}
          setShowReturnInstruction={setShowReturnInstruction}
          availableArtworkIds={availableArtworkIds}
          dark={dark}
        />
      )}

      {showReturnInstruction && (
        <ReturnInstructionsPopup
          setShowReturnInstruction={setShowReturnInstruction}
          dark={dark}
        />
      )}
    </>
  );
};

export default CartTotal;