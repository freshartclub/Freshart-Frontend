import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";
import { RiAddLine, RiArrowLeftLine, RiCloseLine, RiShoppingCartLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import CartTotal from "./CartTotal";
import useRemoveMutation from "./http/useRemoveMutation";

const PurchaseCart = () => {
  const [state, setState] = useState<"purchase" | "subscription">("purchase");
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state.theme.mode);

  const { data, isLoading } = useGetCartItems();
  const { mutate: removeProduct } = useRemoveMutation();

  const renderData = data?.data?.cart?.filter((item) => item?.commercialization?.activeTab === state);

  const handleRemove = (id: string) => {
    removeProduct(id);
  };

  const handlePurchase = () => {
    navigate(`/all-artworks?type=${state}`);
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
      <div className="mx-auto px-4 md:px-6 py-4">
        <div className="mb-4">
          <h1 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-gray-800"}`}>
            My {state === "purchase" ? "Purchase" : "Subscription"} Cart
          </h1>
          <p className={`${dark ? "text-gray-400" : "text-gray-600"}`}>View/Update your {state === "purchase" ? "Purchase" : "Subscription"} Cart</p>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
            <button
              onClick={() => setState("purchase")}
              className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all ${
                state === "purchase"
                  ? "bg-[#FF536B] text-white shadow-md"
                  : dark
                  ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Purchase
            </button>
            <button
              onClick={() => setState("subscription")}
              className={`px-5 py-2.5 rounded-md font-medium text-sm transition-all ${
                state === "subscription"
                  ? "bg-[#FF536B] text-white shadow-md"
                  : dark
                  ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Subscription
            </button>
          </div>

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
                        Products
                      </th>
                      {state === "purchase" && (
                        <>
                          <th scope="col" className="px-6 py-4 text-left">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-4 text-left">
                            Discount
                          </th>
                          <th scope="col" className="px-6 py-4 text-left">
                            Sub-total
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {renderData && renderData.length > 0 ? (
                      renderData.map((item: any, index: number) => {
                        const basePrice = state === "subscription" ? 0 : item?.pricing?.basePrice;
                        const discountPercentage = state === "subscription" ? 0 : item?.pricing?.dpersentage || 0;
                        const discountAmount = (basePrice * discountPercentage) / 100;
                        const discountedPrice = (basePrice - discountAmount).toFixed(2);

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
                                    src={`${imageUrl}/users/${item?.media?.mainImage}`}
                                    alt={item?.artworkName}
                                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                  />
                                  <div>
                                    <P variant={{ weight: "medium" }} className="text-sm">
                                      {item?.artworkName}
                                    </P>
                                    {/* <P variant={{ weight: "normal" }} className={`mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                                      {item?.owner?.artistName}
                                    </P> */}
                                  </div>
                                </div>
                              </div>
                            </td>
                            {state === "purchase" && (
                              <>
                                <td className="px-6 py-5">
                                  {getSymbolFromCurrency(item?.pricing?.currency.slice(0, 3))} {item?.pricing?.basePrice}
                                </td>
                                <td className="px-6 py-5">{item?.pricing?.dpersentage}%</td>
                                <td className="px-6 py-5 font-semibold">
                                  {getSymbolFromCurrency(item?.pricing?.currency.slice(0, 3))} {discountedPrice}
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })
                    ) : (
                      <tr className={dark ? "bg-gray-800" : ""}>
                        <td className="px-6 py-12 text-center" colSpan={state === "purchase" ? 5 : 1}>
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                              <RiShoppingCartLine className="text-2xl text-gray-400" />
                            </div>
                            <p className={`text-lg font-medium mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                              Your {state === "purchase" ? "purchase" : "subscription"} cart is empty
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
                                <RiAddLine /> Add Artworks
                              </Button>
                            </NavLink>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <span
                onClick={handlePurchase}
                className={`text-sm cursor-pointer w-max rounded-full  flex gap-2 p-3 px-4 m-2 items-center ${
                  dark ? "bg-gray-700 text-white" : "text-black bg-gray-200"
                } hover:underline`}
              >
                <RiArrowLeftLine /> Return To Shop
              </span>
            </div>

            <div className="lg:col-span-4">
              <CartTotal data={renderData} state={state} handleRemove={handleRemove} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCart;
