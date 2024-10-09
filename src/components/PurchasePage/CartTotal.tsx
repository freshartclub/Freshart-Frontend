import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import rightarr from "./assets/ArrowRight.png";

const card_total = [
  {
    title: "Sub-total",
    value: "$320",
  },
  {
    title: "Shipping",
    value: "Free",
  },
  {
    title: "Discount",
    value: "$24",
  },
  {
    title: "Tax",
    value: "$61.99",
  },
];

const CartTotal = () => {
  return (
    <>
      <div className="p-5 mb-8 border rounded-md">
        <Header variant={{ size: "md", theme: "dark", weight: "semiBold" }}>
          Card Totals
        </Header>

        <div className="border-b-2 border-b-[#E4E7E9] pb-2">
          {card_total.map((card, index) => (
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
            $357.99 USD
          </P>
        </div>

        <Button
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
