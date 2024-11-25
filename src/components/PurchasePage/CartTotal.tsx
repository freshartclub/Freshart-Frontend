import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import rightarr from "./assets/ArrowRight.png";
import usePostCheckOutMutation from "./http/usePostCheckOutMutation";

const CartTotal = ({ data }) => {
  const discountAmounts = data?.data?.cart.map((item) => {
    const basePrice = parseFloat(item.pricing.basePrice.replace("$", ""));
    const discountPercentage = item.pricing?.dpersentage || 0;
    const discountAmount = (basePrice * discountPercentage) / 100;
    return discountAmount;
  });
  const navigate = useNavigate();

  const { mutate, isPending } = usePostCheckOutMutation();
  const totalDiscountAmount = discountAmounts
    ?.reduce((totalDiscount, item) => {
      return totalDiscount + item;
    }, 0)
    .toFixed(2);

  // console.log(`Total Discount Amount: $${totalDiscountAmount}`);

  const totalPrice = data?.data?.cart
    .reduce((total, item) => {
      const itemPrice = parseFloat(item.pricing.basePrice.replace("$", ""));
      return total + itemPrice;
    }, 0)
    .toFixed(2);

  console.log(data);

  const card_total = [
    {
      title: "Sub-total",
      value: `$ ${totalPrice}`,
    },
    {
      title: "Shipping",
      value: "Free",
    },
    {
      title: "Discount",
      value: `$ ${totalDiscountAmount}`,
    },
    {
      title: "Tax",
      value: "$61.99",
    },
  ];

  const artWorkId = data?.data?.cart?.map((item) => item?._id);
  console.log(artWorkId);

  let itemQu = {};

  data?.data?.cart?.forEach((item) => {
    console.log(item);
    if (item?._id) {
      console.log(item._id);
      itemQu[item._id] = (itemQu[item._id] || 0) + item.quantity;
    }
  });

  console.log(itemQu);

  const handleCheckOut = () => {
    console.log("hello");
    try {
      const data = {
        subTotal: totalPrice - totalDiscountAmount,
        tax: 61.99,
        shipping: 0,
        orderType: "purchase",
        items: Object.keys(itemQu).map((id) => ({
          id: id,
          quantity: itemQu[id],
        })),
      };

      console.log(data);
      mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-5 mb-8 border rounded-md">
        <Header variant={{ size: "md", theme: "dark", weight: "semiBold" }}>
          Card Totals
        </Header>

        <div className="border-b-2 border-b-[#E4E7E9] pb-2">
          {card_total?.map((card, index) => (
            <div key={index} className="flex justify-between my-3">
              <P
                variant={{ size: "small", weight: "medium" }}
                className="text-[#636363]"
              >
                {card.title}
              </P>
              <P
                variant={{ size: "small", weight: "medium" }}
                className="text-[#191C1F]"
              >
                {card.value}
              </P>
            </div>
          ))}
        </div>

        <div className="flex justify-between py-5">
          <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
            Total
          </P>
          <P variant={{ size: "base", theme: "dark", weight: "semiBold" }}>
            $ {totalPrice - totalDiscountAmount}
          </P>
        </div>

        <Button
          onClick={() => handleCheckOut()}
          variant={{ theme: "dark", rounded: "full" }}
          className="flex gap-2 items-center w-full justify-center xl:!py-5 lg:py-3"
        >
          <P variant={{ size: "base", theme: "light", weight: "medium" }}>
            Proceed to Checkout
          </P>
          <img src={rightarr} alt="" />
        </Button>
      </div>

      <div className="border rounded-md ">
        <Header
          variant={{ size: "md", weight: "semiBold", theme: "dark" }}
          className="p-5 border-b-2 border-b-[#E4E7E9]"
        >
          Gift Card
        </Header>
        <div className="m-5">
          <input
            type="text"
            placeholder="Coupon code"
            className="w-full outline-none p-3 border"
          />

          <Button
            variant={{ fontSize: "sm", fontWeight: "600", rounded: "full" }}
            className="bg-[#FF536B] text-white uppercase mt-5"
          >
            Apply Coupon
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
