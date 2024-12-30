import Header from "../ui/Header";
import { RxCross1 } from "react-icons/rx";
import P from "../ui/P";
import cross_icon from "../../assets/x-mark.png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useGetCartItems } from "./http/useGetCartItems";

import Loader from "../ui/Loader";
import useRemoveMutation from "../PurchasePage/http/useRemoveMutation";

const ShoppingCard = ({ isOpen, onClose }: any) => {
  const { data, isLoading } = useGetCartItems();

  const { mutate, isPending } = useRemoveMutation();

  console.log(data?.data?.cart);

  const handleCart = () => {
    navigate("/purchase_cart");
    onClose();
  };

  const handleRemoveItem = (indexToRemove: any) => {
    mutate(indexToRemove);
  };

  const totalItems = data?.data?.cart?.length;

  const totalPrice = data?.data?.cart
    ?.reduce((total: any, item: any) => {
      const itemPrice = parseFloat(
        item?.item?.pricing?.basePrice?.replace("$", "")
      );
      return total + itemPrice;
    }, 0)
    .toFixed(2);

  const navigate = useNavigate();
  const redirectToDetailPage = () => {
    navigate("/discover_more");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-[100vh] w-fu bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-[25%] z-50`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container   mx-auto px-10 sm:px-3">
          <div className="flex justify-between w-full p-4 my-6">
            <Header variant={{ size: "md", theme: "dark", weight: "semiBold" }}>
              Shopping Cart ({totalItems})
            </Header>
            <Button onClick={onClose}>
              <RxCross1 />
            </Button>
          </div>

          <div className="">
            {data?.data?.cart?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between p-4 mb-1">
                <div
                  className="flex justify-between gap-10"
                  onClick={redirectToDetailPage}
                >
                  <img
                    src={`${data?.url}/users/${item?.item?.media?.mainImage}`}
                    alt="cart image"
                    className="object-cover lg:w-[10vw] rounded"
                  />
                  <div className="flex flex-col justify-center">
                    <P
                      variant={{ size: "base", theme: "dark", weight: "light" }}
                    >
                      {item?.item?.artworkName}
                    </P>
                    <div className="flex justify-evenly gap-2">
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "normal",
                        }}
                      >
                        Quantity {item?.quantity}
                      </P>
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "normal",
                        }}
                      >
                        Price {item?.item?.pricing?.basePrice}
                      </P>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <button onClick={() => handleRemoveItem(item?.item?._id)}>
                    <img src={cross_icon} alt="cross icon" />
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
                  onClick={handleCart}
                  variant={{ fontSize: "md", fontWeight: "normal" }}
                  className="w-full my-2 bg-lime-50 rounded-full"
                >
                  Go To Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
