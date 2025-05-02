import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import arrow from "./assets/arrow_22.png";
import ret_arrow from "./assets/ArrowLeft.png";
import gray_cross from "./assets/garycross.png";
import CartTotal from "./CartTotal";
import useRemoveMutation from "./http/useRemoveMutation";
import { useAppSelector } from "../../store/typedReduxHooks";


const PurchaseCart = () => {
  const [state, setState] = useState("purchase");
  const navigate = useNavigate();
  const dark = useAppSelector((state) => state?.theme?.mode);

  const { data, isLoading } = useGetCartItems();
  const { mutate: removeProduct } = useRemoveMutation();

  const renderData = data?.data?.cart?.filter(
    (item) => item?.commercialization?.activeTab === state
  );

  const handleRemove = (id: string) => {
    try {
      removeProduct(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handlepurchase = () => {
    navigate(`/all-artworks?type=${state}`);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`container mx-auto px-4 md:px-6 ${dark ? "bg-[#111827] text-white" : "bg-white text-black"}`}>
      {/* Breadcrumb navigation */}
      <nav className="py-4">
        <ul className="flex items-center gap-2 text-sm">
          <li>
            <Link to="/home" className="flex items-center hover:text-[#FF536B] transition-colors">
              <img
                src={home}
                alt="Home"
                className="w-3.5 h-3.5 mr-1.5"
              />
              <P
                variant={{ size: "small", weight: "medium" }}
                className="text-[#FF536B]"
              >
                Home
              </P>
            </Link>
          </li>
          <img src={arrow} alt="Arrow" className="w-[4px] h-[6px]" />
          <li>
            <P
              variant={{ size: "small", weight: "medium" }}
              className={`${dark ? "text-gray-300" : "text-[#203F58]"} capitalize`}
            >
              {state} Cart
            </P>
          </li>
        </ul>
      </nav>

      <div className="mt-4 md:mt-6">
        <Header
          variant={{ theme: "dark", weight: "bold", size: "2xl" }}
          className={`text-center mb-6 capitalize ${dark ? "text-white" : ""}`}
        >
          My {state} Cart
        </Header>

        {/* Cart type selector */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
          <button
            onClick={() => setState("purchase")}
            className={`px-5 py-2.5 rounded-md font-medium text-sm transition-colors ${
              state === "purchase" 
                ? "bg-[#FF536B] text-white" 
                : dark 
                  ? "bg-gray-700 text-gray-300 border border-gray-600" 
                  : "bg-white text-black border border-zinc-300"
            }`}
          >
            Purchase
          </button>
          <button
            onClick={() => setState("subscription")}
            className={`px-5 py-2.5 rounded-md font-medium text-sm transition-colors ${
              state !== "purchase" 
                ? "bg-[#FF536B] text-white" 
                : dark 
                  ? "bg-gray-700 text-gray-300 border border-gray-600" 
                  : "bg-white text-black border border-zinc-300"
            }`}
          >
            Subscription
          </button>
        </div>

        {/* Cart content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
          {/* Cart items table */}
          <div className={`lg:col-span-8 border rounded-md overflow-hidden ${dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
            <div className="overflow-x-auto w-full">
              <table className={`w-full min-w-[800px] ${dark ? "text-gray-300" : "text-gray-700"}`}>
                <thead className={`text-xs uppercase ${dark ? "bg-gray-700 text-gray-300" : "bg-[#F2F4F5] text-black"}`}>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left">Products</th>
                    <th scope="col" className="px-4 py-3 text-left">Type</th>
                    <th scope="col" className="px-4 py-3 text-left">Price</th>
                    <th scope="col" className="px-4 py-3 text-left">Discount %</th>
                    <th scope="col" className="px-4 py-3 text-left">Sub-total</th>
                  </tr>
                </thead>
                <tbody>
                  {renderData && renderData?.length > 0 ? (
                    renderData?.map((table: any, index: number) => {
                      const basePrice = state === "subscription" ? 0 : table?.pricing?.basePrice;
                      const discountPercentage = state === "subscription" ? 0 : table?.pricing?.dpersentage || 0;
                      const discountAmount = (basePrice * discountPercentage) / 100;
                      const discountedPrice = (basePrice - discountAmount).toFixed(2);

                      return (
                        <tr key={index} className={`${dark ? "bg-gray-800" : "bg-white"} border-b ${dark ? "border-gray-700" : "border-gray-200"}`}>
                          <td className="px-4 py-4">
                            <div className="flex items-start md:items-center gap-3">
                              <button 
                                onClick={() => handleRemove(table?._id)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                              >
                                <img src={gray_cross} alt="Remove" className="w-4 h-4" />
                              </button>
                              <div className="flex flex-col md:flex-row md:items-center gap-3">
                                <img
                                  src={`${imageUrl}/users/${table?.media?.mainImage}`}
                                  alt={table?.artworkName}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <P
                                  variant={{ weight: "medium" }}
                                  className={`text-sm ${dark ? "text-gray-300" : ""}`}
                                >
                                  {table?.artworkName}
                                </P>
                              </div>
                            </div>
                          </td>
                          <td className={`px-4 py-4 capitalize ${dark ? "text-gray-300" : "text-[#475156]"}`}>
                            {table?.commercialization?.activeTab}
                          </td>
                          <td className={`px-4 py-4 ${dark ? "text-gray-300" : "text-[#475156]"}`}>
                            {state === "subscription" 
                              ? "00" 
                              : getSymbolFromCurrency(
                                  table?.pricing?.currency.slice(0, 3)
                                ) + " " + table?.pricing?.basePrice}
                          </td>
                          <td className={`px-4 py-4 ${dark ? "text-gray-300" : "text-[#475156]"}`}>
                            {state === "subscription" ? "00" : table?.pricing?.dpersentage}%
                          </td>
                          <td className={`px-4 py-4 font-semibold ${dark ? "text-gray-300" : "text-[#191C1F]"}`}>
                            {state === "subscription" 
                              ? "00" 
                              : getSymbolFromCurrency(
                                  table?.pricing?.currency.slice(0, 3)
                                ) + " " + discountedPrice}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className={dark ? "bg-gray-800" : ""}>
                      <td className="px-6 py-8 text-center" colSpan={5}>
                        <div className="flex flex-col items-center">
                          <p className={`text-lg font-medium mb-4 ${dark ? "text-gray-300" : ""}`}>
                            You haven't added any artwork to your cart.
                          </p>
                          <NavLink to="/home">
                            <button className={`px-6 py-2.5 ${dark ? "bg-gray-600 hover:bg-gray-500" : "bg-zinc-800 hover:bg-zinc-700"} text-white rounded-lg transition-colors`}>
                              Add To Cart
                            </button>
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4">
              <Button
                onClick={handlepurchase}
                className={`border ${dark ? "border-gray-600 hover:bg-gray-700" : "border-[#203F58] hover:bg-gray-100"} rounded-full flex items-center justify-center gap-2 px-5 py-2.5 transition-colors`}
              >
                <img src={ret_arrow} alt="Return arrow" className="w-4 h-4" />
                <P
                  variant={{ size: "base", weight: "semiBold" }}
                  className={dark ? "text-gray-300" : "text-[#203F58]"}
                >
                  Return To Shop
                </P>
              </Button>
            </div>
          </div>

          {/* Cart total */}
          <div className="lg:col-span-4">
            <CartTotal data={renderData} state={state} handleRemove={handleRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCart;