import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import rightarr from "./assets/ArrowRight.png";

const CartTotal = ({ data, state }) => {
  const discountAmounts = data.map((item) => {
    const basePrice = item?.pricing?.basePrice;

    const discountPercentage = item?.pricing?.dpersentage || 0;
    const discountAmount = (basePrice * discountPercentage) / 100;
    return discountAmount;
  });

  const navigate = useNavigate();

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

  let itemQu = {};
  data?.forEach((item) => {
    if (item?._id) {
      itemQu[item?._id] = itemQu[item?._id] || 0;
    }
  });

  const handleCheckOut = () => {
    navigate(`/payment_page?type=${state}`);
  };

  return (
    <>
      <div className="p-5 mb-8 border rounded-md">
        <div>
          <Header variant={{ size: "md", theme: "dark", weight: "semiBold" }}>Card Totals</Header>

          <div className="border-b-2 border-b-[#E4E7E9] pb-2">
            {card_total?.map((card, index) => (
              <div key={index} className="flex justify-between my-3">
                <P variant={{ size: "small", weight: "medium" }} className="text-[#636363]">
                  {card.title}
                </P>
                <P variant={{ size: "small", weight: "medium" }} className="text-[#191C1F]">
                  {card.value}
                </P>
              </div>
            ))}
          </div>

          <div className="flex justify-between py-5">
            <P variant={{ size: "base", theme: "dark", weight: "medium" }}>Total</P>
            <P variant={{ size: "base", theme: "dark", weight: "semiBold" }}>{totalPrice - totalDiscountAmount}</P>
          </div>
        </div>

        <Button
          onClick={() => handleCheckOut()}
          variant={{ theme: "dark", rounded: "full" }}
          className={`${data?.length === 0 && "pointer-events-none opacity-50"} flex gap-2 items-center w-full justify-center xl:!py-5 lg:py-3`}
        >
          <P variant={{ size: "base", theme: "light", weight: "medium" }}>Proceed to Checkout</P>
          <img src={rightarr} alt="" />
        </Button>
      </div>

      <div className={`border rounded-md ${data?.cart?.length === 0 && "pointer-events-none opacity-50"}`}>
        <Header variant={{ size: "md", weight: "semiBold", theme: "dark" }} className="p-5 border-b-2 border-b-[#E4E7E9]">
          Gift Card
        </Header>
        <div className="m-5">
          <input type="text" placeholder="Coupon code" className="w-full outline-none p-3 border" />

          <Button variant={{ fontSize: "sm", fontWeight: "600", rounded: "full" }} className="bg-[#FF536B] text-white uppercase mt-5">
            Apply Coupon
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
