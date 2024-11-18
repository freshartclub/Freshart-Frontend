import { Link, useNavigate } from "react-router-dom";
import P from "../ui/P";
import arrow from "./assets/arrow_22.png";
import home from "../../assets/home.png";
import Header from "../ui/Header";
import image from "./assets/Image.png";
import image2 from "./assets/Image1.png";
import Button from "../ui/Button";
import ret_arrow from "./assets/ArrowLeft.png";
import CartTotal from "./CartTotal";
import gray_cross from "./assets/garycross.png";
import red_cross from "./assets/XCircle.png";
import { useState } from "react";
import { useGetCartItems } from "../pages/http/useGetCartItems";

const product_data = [
  {
    id: 1,
    title: "Stylish wall art with abstract charcoal",
    price: "$70",
    total: "$70",
    productimg: image,
    cross: gray_cross,
  },
  {
    id: 2,
    title: "Wall framed painting with handpicking brush",
    price: "$250",
    total: "$250",
    productimg: image2,
    cross: red_cross,
  },
];

const PurchaseCart = () => {
  const [cross, setCross] = useState(product_data);
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    const newList = cross.filter((item) => item.id !== id);
    setCross(newList);
  };

  const { data, isPending } = useGetCartItems();

  console.log("This is from purchase ", data);

  const discountAmounts = data?.data?.cart.map((item: any) => {
    const basePrice = parseFloat(item.pricing.basePrice.replace("$", ""));
    const discountPercentage = item.pricing?.dpersentage || 0;
    const discountAmount = (basePrice * discountPercentage) / 100;
    return discountAmount;
  });

  const handlepurchase = () => {
    navigate("/purchase");
  };

  console.log(discountAmounts);
  return (
    <div className="container mx-auto px-6 sm:px-3 mt-4">
      <ul className="flex p-2 gap-4 text-xl text-[#2E4053] items-center">
        <li>
          <Link to="/" className="rounded-md transition-all flex">
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
              className="text-[#203F58]"
            >
              Purchase Cart
            </P>
          </Link>
        </li>
      </ul>

      <div className="mt-5">
        <Header
          variant={{ theme: "dark", weight: "bold", size: "2xl" }}
          className="text-center mb-5"
        >
          My Purchase Cart
        </Header>

        <div className="w-full flex lg:flex-row flex-col gap-5 my-10">
          <div className="lg:w-[70%] w-full border rounded-md">
            <Header
              variant={{ theme: "dark", weight: "semiBold" }}
              className="p-5"
            >
              Shopping Cart
            </Header>

            <div>
              <table className="w-full border-b text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-black uppercase bg-[#F2F4F5] ">
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
                <tbody className="">
                  {data?.data?.cart.map((table: any, index: number) => {
                    const basePrice = parseFloat(
                      table.pricing.basePrice.replace("$", "")
                    );
                    const discountPercentage = table.pricing.dpersentage || 0;
                    const discountAmount =
                      (basePrice * discountPercentage) / 100;
                    const discountedPrice = (
                      basePrice - discountAmount
                    ).toFixed(2);

                    return (
                      <tr key={index} className="bg-white">
                        <td
                          scope="row"
                          className="flex sm:flex-row flex-col justify-start xl:gap-4 lg:gap-2 gap-2 sm:items-center
                   xl:px-6 lg:px-4 px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          <button onClick={() => handleRemove(table.id)}>
                            <img src={gray_cross} alt="cross" />
                          </button>

                          <img
                            src={`${data?.url}/users/${table.media.mainImage}`}
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
                            {table.artworkName}
                          </P>
                        </td>
                        <td className="xl:px-6 lg:px-4 px-2 py-4 text-[#475156] font-medium">
                          ${table.pricing.basePrice}
                        </td>
                        <td className="xl:px-6 lg:px-4 px-2 py-4 text-[#475156] font-medium">
                          {table.pricing.dpersentage}%
                        </td>
                        <td className="xl:px-6 lg:px-4 px-2 py-4 text-[#191C1F] font-semibold">
                          ${discountedPrice}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="p-5 flex sm:flex-row flex-col gap-5 sm:gap-0 justify-between">
                <Button
                  onClick={handlepurchase}
                  className="border border-[#203F58] rounded-full flex items-center justify-center gap-2"
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

                <Button
                  variant={{ theme: "dark", rounded: "full" }}
                  className="flex gap-2 items-center justify-center"
                >
                  <P
                    variant={{
                      size: "base",
                      theme: "light",
                      weight: "medium",
                    }}
                    className=""
                  >
                    Update Cart
                  </P>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:w-[28%] w-full">
            <CartTotal data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCart;
