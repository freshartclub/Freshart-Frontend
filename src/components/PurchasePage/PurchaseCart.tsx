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

const PurchaseCart = () => {
  const [state, setState] = useState("purchase");
  const navigate = useNavigate();

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
    <div className="container mx-auto px-6 sm:px-3 mt-4">
      <ul className="flex p-2 gap-4 text-xl text-[#2E4053] items-center">
        <li>
          <Link to="/home" className="rounded-md transition-all flex">
            <img
              src={home}
              alt="Home icon"
              className="w-[14px] h-[14px] mr-2"
            />
            <P
              variant={{ size: "small", theme: "dark", weight: "medium" }}
              className="text-[#FF536B]"
            >
              Home
            </P>
          </Link>
        </li>
        <img src={arrow} alt="Home icon" className="w-[4px] h-[6px] mr-1" />
        <li>
          <Link to="/" className="rounded-md transition-all flex">
            <P
              variant={{ size: "small", theme: "dark", weight: "medium" }}
              className="text-[#203F58] capitalize"
            >
              {state} Cart
            </P>
          </Link>
        </li>
      </ul>

      <div className="mt-5">
        <Header
          variant={{ theme: "dark", weight: "bold", size: "2xl" }}
          className="text-center mb-5 capitalize"
        >
          My {state} Cart
        </Header>

        <div className="flex sm:flex-row flex-col justify-between gap-5 mb-8">
          <div className=" flex gap-5 mt-8">
            <span
              onClick={() => setState("purchase")}
              className={`${
                state === "purchase" && "bg-[#FF536B] text-white"
              } font-bold text-md border border-zinc-800 px-5 py-2 cursor-pointer rounded-md`}
            >
              Purchase
            </span>
            <span
              onClick={() => setState("subscription")}
              className={`${
                state !== "purchase" && "bg-[#FF536B] text-white"
              } font-bold text-md border border-zinc-800 px-5 py-2 cursor-pointer  rounded-md`}
            >
              Subscription
            </span>
          </div>
        </div>

        <div className="w-full flex lg:flex-row flex-col gap-5 my-10">
          <div className="lg:w-[75%] w-full border rounded-md">
            <div className="overflow-x-auto w-full">
              <table className=" min-w-[800px] border-b text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-black uppercase bg-[#F2F4F5]">
                  <tr>
                    <th
                      scope="col"
                      className="xl:px-6 lg:px-4 px-2 py-3 uppercase"
                    >
                      Products
                    </th>
                    <th
                      scope="col"
                      className="xl:px-6 lg:px-4 px-2 py-3 uppercase"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="xl:px-6 lg:px-4 px-2 py-3 uppercase"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="xl:px-6 lg:px-4 px-2 py-3 uppercase"
                    >
                      Discount %
                    </th>
                    <th
                      scope="col"
                      className="xl:px-6 lg:px-4 px-2 py-3 uppercase"
                    >
                      Sub-total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {renderData && renderData?.length > 0 ? (
                    renderData?.map((table: any, index: number) => {
                      const basePrice = table?.pricing?.basePrice;

                      const discountPercentage =
                        table?.pricing?.dpersentage || 0;

                      const discountAmount =
                        (basePrice * discountPercentage) / 100;

                      const discountedPrice = (
                        basePrice - discountAmount
                      ).toFixed(2);

                      return (
                        <tr key={index} className="bg-white">
                          <td
                            scope="row"
                            className="flex sm:flex-row flex-col justify-start xl:gap-4 lg:gap-2 gap-2 sm:items-center xl:px-6 lg:px-4 px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            <button onClick={() => handleRemove(table?._id)}>
                              <img src={gray_cross} alt="cross" />
                            </button>

                            <img
                              src={`${imageUrl}/users/${table?.media?.mainImage}`}
                              alt="image"
                              className="w-[72px] h-[72px] object-cover"
                            />
                            <P
                              variant={{
                                weight: "medium",
                                theme: "dark",
                              }}
                              className="xl:text-base text-sm"
                            >
                              {table?.artworkName}
                            </P>
                          </td>

                          <td className="xl:px-6 lg:px-4 px-2 py-4 text-[#475156] font-medium capitalize">
                            {table?.commercialization?.activeTab}
                          </td>

                          <td className="xl:px-6 lg:px-4 px-2 py-4 text-[#475156] font-medium">
                            {getSymbolFromCurrency(
                              table?.pricing?.currency.slice(0, 3)
                            ) +
                              " " +
                              table.pricing?.basePrice}
                          </td>
                          <td className="xl:px-6 lg:px-4 px-2 py-4 text-[#475156] font-medium">
                            {table?.pricing?.dpersentage}%
                          </td>

                          <td className="xl:px-6 lg:px-4 px-2 py-4 text-[#191C1F] font-semibold">
                            {getSymbolFromCurrency(
                              table?.pricing?.currency.slice(0, 3)
                            ) +
                              " " +
                              discountedPrice}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="px-6 py-4 text-center" colSpan={5}>
                        <p className="text-lg text-center font-medium mb-4">
                          You haven't added any artwork to your cart.
                        </p>
                        <NavLink to="/home">
                          <button className="px-6 py-2 bg-zinc-800 text-white rounded-lg">
                            Add To Cart
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Button
              onClick={handlepurchase}
              className="mt-3 ml-3 border border-[#203F58] rounded-full flex items-center justify-center gap-2"
            >
              <img src={ret_arrow} alt="arrow" />
              <P
                variant={{
                  size: "base",
                  theme: "dark",
                  weight: "semiBold",
                }}
                className="text-[#203F58]"
              >
                Return To Shop
              </P>
            </Button>
          </div>

          <div className="lg:w-[28%] w-full">
            <CartTotal data={renderData} state={state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCart;
