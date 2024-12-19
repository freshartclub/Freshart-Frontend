import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import rightarr from "./assets/ArrowRight.png";
import usePostCheckOutMutation from "./http/usePostCheckOutMutation";

const CartTotal = ({ data }) => {
  const discountAmounts = data?.cart?.map((item) => {
    const basePrice = parseFloat(
      item?.item?.pricing?.basePrice?.replace("$", "")
    );
    const discountPercentage = item?.item?.pricing?.dpersentage || 0;
    const discountAmount =
      (basePrice * item?.quantity * discountPercentage) / 100;
    return discountAmount;
  });

  const { mutate, isPending } = usePostCheckOutMutation();

  const totalDiscountAmount = discountAmounts
    ?.reduce((totalDiscount, item) => {
      return totalDiscount + item;
    }, 0)
    .toFixed(2);

  const totalPrice = data?.cart
    ?.reduce((total, item) => {
      const itemPrice = parseFloat(
        item?.item?.pricing?.basePrice?.replace("$", "")
      );
      return total + itemPrice * item?.quantity;
    }, 0)
    .toFixed(2);

  const card_total = [
    {
      title: "Sub-total",
      value: `$ ${totalPrice}` || 0,
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

  const orderType = data?.cart?.map(
    (item) => item?.item?.commercialization?.activeTab
  );

  let itemQu = {};

  data?.cart?.forEach((item) => {
    if (item?.item?._id) {
      itemQu[item?.item?._id] = (itemQu[item?.item?._id] || 0) + item.quantity;
    }
  });

  const handleCheckOut = () => {
    try {
      const data = {
        subTotal: totalPrice - totalDiscountAmount,
        tax: 0,
        discount: totalDiscountAmount,
        shipping: 0,
        orderType: orderType[0],
        items: Object.keys(itemQu).map((id) => ({
          id: id,
          quantity: itemQu[id],
        })),
      };

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
          className={`${
            data?.cart?.length === 0 && "pointer-events-none opacity-50"
          } flex gap-2 items-center w-full justify-center xl:!py-5 lg:py-3`}
        >
          <P variant={{ size: "base", theme: "light", weight: "medium" }}>
            {isPending ? "Processing..." : "Proceed to Checkout"}
          </P>
          <img src={rightarr} alt="" />
        </Button>
      </div>

      <div
        className={`border rounded-md ${
          data?.cart?.length === 0 && "pointer-events-none opacity-50"
        }`}
      >
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
