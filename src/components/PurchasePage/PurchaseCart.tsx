import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";
import { RiAddLine, RiArrowLeftLine, RiCloseLine, RiShoppingCartLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { lowImageUrl } from "../utils/baseUrls";
import CartTotal from "./CartTotal";
import useRemoveMutation from "./http/useRemoveMutation";
type PurchaseSubsection = "instant" | "offer" | "custom";
type CartViewMode = "purchase" | "subscription";

const PurchaseCart = () => {
  const [mode, setMode] = useState<CartViewMode>("purchase");
  const [purchaseSubsection, setPurchaseSubsection] = useState<PurchaseSubsection>("instant");
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.theme.mode);

  const { data: instantData, isLoading: instantLoading } = useGetCartItems();

  const { mutate: removeInstantProduct } = useRemoveMutation();

  const isLoading = instantLoading 

  const getCurrentData = () => {
    if (mode === "subscription") {
      return instantData?.cart?.filter((item) => item?.commercialization?.activeTab === "subscription") || [];
    }
    switch (purchaseSubsection) {
      case "instant":
        return instantData?.cart?.filter(
          (item) => item?.commercialization?.activeTab === "purchase" 
        ) || [];
      case "offer":
        return instantData?.offer_cart
       ||  [];
      case "custom":
        return  [];
      default:
        return [];
    }
  };

  const renderData = getCurrentData();

  const handleRemove = (id , mode: string) => {

    const checkType = mode === "purchase" &&  purchaseSubsection === "offer" 
    const type = checkType ? "offer" : "purchase"

    const values = {
      id,
      type
    }


    switch (purchaseSubsection) {
      case "instant":
        removeInstantProduct(values);
        break;
      case "offer":
        removeInstantProduct(values);
        break;
      case "custom":
        // removeCustomProduct(id);
        break;
      default:
        removeInstantProduct(values);
    }
  };

  const handleClearCart = () => {
    if (renderData.length === 0) return;
    renderData.forEach((item) => handleRemove(item._id , mode));
  };

  const handleContinueShopping = () => {
    navigate(`/all-artworks?type=${mode}`);
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dark ? "bg-gray-900" : "bg-white"}`}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      <div className="mx-auto px-4 md:px-6 py-4 max-w-7xl">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>
            My {mode === "purchase" ? "Purchase" : "Subscription"} Cart
          </h1>
          <p className={`${dark ? "text-gray-400" : "text-gray-600"}`}>
            Review and manage your {mode === "purchase" ? "purchases" : "subscriptions"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setMode("purchase")}
            className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all ${
              mode === "purchase"
                ? "bg-[#FF536B] text-white shadow-md"
                : dark
                ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Purchase
          </button>
          <button
            onClick={() => setMode("subscription")}
            className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all ${
              mode === "subscription"
                ? "bg-[#FF536B] text-white shadow-md"
                : dark
                ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Subscription
          </button>
        </div>

        {mode === "purchase" && (
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setPurchaseSubsection("instant")}
              className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all ${
                purchaseSubsection === "instant"
                  ? "bg-[#FF536B] text-white shadow-md"
                  : dark
                  ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
             Instant  Purchase
            </button>
            <button
              onClick={() => setPurchaseSubsection("offer")}
              className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all ${
                purchaseSubsection === "offer"
                  ? "bg-[#FF536B] text-white shadow-md"
                  : dark
                  ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
               Offers
            </button>
            <button
              onClick={() => setPurchaseSubsection("request")}
              className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all ${
                purchaseSubsection === "request"
                  ? "bg-[#FF536B] text-white shadow-md"
                  : dark
                  ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Request Order
            </button>
            <button
              onClick={() => setPurchaseSubsection("custom")}
              className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all ${
                purchaseSubsection === "custom"
                  ? "bg-[#FF536B] text-white shadow-md"
                  : dark
                  ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Custom Orders
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
          
          <div
            className={`lg:col-span-8 border rounded-lg overflow-hidden ${
              dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
            } shadow-sm`}
          >
            <div className="overflow-x-auto w-full">
              <table className={`w-full min-w-[800px] ${dark ? "text-gray-300" : "text-gray-700"}`}>
                <thead className={`text-xs uppercase ${dark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left">
                      Product Details
                    </th>
                    {mode === "purchase" && (
                      <>
                        <th scope="col" className="px-6 py-4 text-left">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4 text-left">
                          {purchaseSubsection === "offer" ? null : "Discount"}
                        </th>
                        <th scope="col" className="px-6 py-4 text-left">
                         {purchaseSubsection === "offer" ?  "Offer Price": "Subtotal" } 
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {renderData && renderData.length > 0 ? (
                    renderData.map((item: any, index: number) => {
                     
                      const basePrice = item?.pricing?.basePrice || item?.price || 0;
                      const discountPercentage = item?.pricing?.dpersentage || item?.discount || 0;
                      const discountAmount = (basePrice * discountPercentage) / 100;
                      const discountedPrice = (basePrice - discountAmount).toFixed(2);
                      const currency = item?.pricing?.currency || item?.currency || "USD";
                      const offerPrice = item?.offerprice || 0;

                      return (
                        <tr
                          key={index}
                          className={`${dark ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} border-b ${
                            dark ? "border-gray-700" : "border-gray-200"
                          } transition-colors`}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-start md:items-center gap-4">
                              <button
                                onClick={() => handleRemove(item?._id)}
                                className={`p-1.5 rounded-full transition-colors ${
                                  dark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
                                }`}
                              >
                                <RiCloseLine className="text-lg" />
                              </button>
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <img
                                  src={`${lowImageUrl}/${item?.media }`}
                                  alt={item?.artworkName || item?.name}
                                  className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                />
                                <div>
                                  <P variant={{ weight: "medium" }} className="text-sm mb-1">
                                    {item?.artworkName || item?.name}
                                  </P>
                                  {purchaseSubsection === "custom" && (
                                    <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
                                      Custom options: {item?.customOptions || item?.options || "None"}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          {mode === "purchase" && (
                            <>
                              <td className="px-6 py-5">
                                {getSymbolFromCurrency(currency.slice(0, 3))} {basePrice}
                              </td>
                              <td className="px-6 py-5">
                                {purchaseSubsection === "offer" ? (
                                  null
                                ) : purchaseSubsection === "custom" ? (
                                  "Custom"
                                ) : (
                                  `${discountPercentage}%`
                                )}
                              </td>
                              <td className="px-6 py-5 font-semibold">
                                {getSymbolFromCurrency(currency.slice(0, 3))} {purchaseSubsection === "offer" ? offerPrice :  discountedPrice}
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr className={dark ? "bg-gray-800" : ""}>
                      <td className="px-6 py-12 text-center" colSpan={mode === "purchase" ? 5 : 1}>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <RiShoppingCartLine className="text-2xl text-gray-400" />
                          </div>
                          <p className={`text-lg font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                            Your {mode === "purchase" ? purchaseSubsection?.replace(/([A-Z])/g, ' $1').trim() : 'subscription'} cart is empty
                          </p>
                          <p className={`text-sm mb-4 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            {mode === "purchase"
                              ? `No items in your ${purchaseSubsection} cart`
                              : "No active subscriptions in your cart"}
                          </p>
                          <NavLink to="/home">
                            <Button
                              variant={{
                                theme: dark ? "secondary" : "primary",
                                fontSize: "sm",
                                fontWeight: "medium",
                              }}
                              className="flex items-center gap-2"
                            >
                              <RiAddLine /> Browse Artworks
                            </Button>
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t dark:border-gray-700 flex justify-between items-center">
              <button
                onClick={handleContinueShopping}
                className={`text-sm cursor-pointer rounded-full flex gap-2 p-2 px-4 items-center ${
                  dark ? "bg-gray-700 text-white" : "text-black bg-gray-200"
                } hover:underline`}
              >
                <RiArrowLeftLine /> Continue Shopping
              </button>
              
              {renderData && renderData?.length > 0 && (
                <button
                  onClick={  handleClearCart}
                  className={`text-sm cursor-pointer rounded-full flex gap-2 p-2 px-4 items-center ${
                    dark ? "bg-gray-700 text-red-400" : "text-red-600 bg-gray-200"
                  } hover:underline`}
                >
                  <RiCloseLine /> Clear Cart
                </button>
              )}
            </div>
          </div>

 
          <div className="lg:col-span-4">
            <CartTotal 
              data={renderData} 
              mode={mode} 
              subsection={mode === "purchase" ? purchaseSubsection : undefined}
              handleRemove={handleRemove} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCart;