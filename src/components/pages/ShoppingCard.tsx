import { useState } from "react";
import Header from "../ui/Header";
import { RxCross1 } from "react-icons/rx";
import P from "../ui/P";
import profile1 from "../../assets/profile_1.png";
import cross_icon from "../../assets/x-mark.png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const ShoppingCard = ({ isOpen, onClose }: any) => {
  const [cardData, setCardData] = useState([
    {
      img: profile1,
      heading: "Surfing board painting",
      quantity: "2 pieces x",
      price: "$50.53",
      cross: cross_icon,
    },
    {
      img: profile1,
      heading: "Painting horse grass",
      quantity: "1 pieces x",
      price: "$50.53",
      cross: cross_icon,
    },
    {
      img: profile1,
      heading: "Surfing board painting",
      quantity: "2 pieces x",
      price: "$50.53",
      cross: cross_icon,
    },
  ]);

  const handleRemoveItem = (indexToRemove: number) => {
    setCardData((prevCardData) =>
      prevCardData.filter((_, index) => index !== indexToRemove)
    );
  };

  const totalItems = cardData.length;

  const totalPrice = cardData
    .reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace("$", ""));
      return total + itemPrice;
    }, 0)
    .toFixed(2);

  const navigate = useNavigate();
  const redirectToDetailPage = () => {
    navigate("/discover_more");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-[25%] z-50`}
    >
      <div className="container mx-auto px-10 sm:px-3">
        <div className="flex justify-between w-full p-4 my-6">
          <Header variant={{ size: "md", theme: "dark", weight: "semiBold" }}>
            Shopping Cart ({totalItems})
          </Header>
          <Button onClick={onClose}>
            <RxCross1 />
          </Button>
        </div>

        <div className="">
          {cardData.map((item, index) => (
            <div key={index} className="flex justify-between p-4 mb-1">
              <div
                className="flex justify-between gap-10"
                onClick={redirectToDetailPage}
              >
                <img src={item.img} alt="cart image" />
                <div className="flex flex-col justify-center">
                  <P variant={{ size: "base", theme: "dark", weight: "light" }}>
                    {item.heading}
                  </P>
                  <div className="flex">
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "normal",
                      }}
                    >
                      {item.quantity}
                    </P>
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "normal",
                      }}
                    >
                      {item.price}
                    </P>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <button onClick={() => handleRemoveItem(index)}>
                  <img src={item.cross} alt="cross icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 w-[95%] ">
          <div className="flex flex-col justify-self-end">
            <div className="flex justify-between">
              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                {totalItems} Artworks
              </P>
              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                Total: ${totalPrice}
              </P>
            </div>

            <div className="w-full">
              <Button
                variant={{
                  fontSize: "md",
                  theme: "dark",
                  fontWeight: "normal",
                  rounded: "full",
                }}
                className="w-full my-2"
              >
                Checkout
              </Button>
            </div>

            <div className="w-full">
              <Button
                variant={{ fontSize: "md", fontWeight: "normal" }}
                className="w-full my-2 bg-lime-50 rounded-full"
              >
                Go To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;
