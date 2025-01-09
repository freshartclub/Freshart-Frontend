import Header from "../ui/Header";
import { RxCross1 } from "react-icons/rx";
import P from "../ui/P";
import cross_icon from "../../assets/x-mark.png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useGetCartItems } from "./http/useGetCartItems";

import Loader from "../ui/Loader";
import useRemoveMutation from "../PurchasePage/http/useRemoveMutation";
import { imageUrl } from "../utils/baseUrls";

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
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-full sm:w-[25%] z-50`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-6 sm:px-4">
          {/* Header Section */}
          <div className="flex justify-between items-center w-full p-4 border-b">
            <Header variant={{ size: "md", theme: "dark", weight: "semiBold" }}>
              Shopping Cart ({totalItems})
            </Header>
            <Button onClick={onClose} className="p-1">
              <RxCross1 size={20} />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="mt-4 space-y-4 overflow-y-auto max-h-[65vh]">
            {data?.data?.cart?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 rounded shadow-sm"
              >
                <div
                  className="flex gap-4 items-center"
                  onClick={redirectToDetailPage}
                >
                  <img
                    src={`${imageUrl}/users/${item?.item?.media?.mainImage}`}
                    alt="cart image"
                    className="object-cover w-[20vw] sm:w-[10vw] rounded"
                  />

                  <div>
                    <P
                      variant={{ size: "base", theme: "dark", weight: "light" }}
                    >
                      {item?.item?.artworkName}
                    </P>
                    <div className="flex gap-2 flex-col text-sm text-gray-600">
                      <span>Quantity: {item?.quantity}</span>
                      <span>Price: ${item?.item?.pricing?.basePrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(item?.item?._id)}
                  className="p-2 hover:bg-red-100 rounded"
                >
                  <img src={cross_icon} alt="Remove item" className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t shadow-md">
            <div className="flex justify-between text-gray-800 mb-4">
              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                {totalItems} Artworks
              </P>
              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                Total: ${totalPrice}
              </P>
            </div>
            <Button
              onClick={handleCart}
              variant={{ fontSize: "md", fontWeight: "normal" }}
              className="w-full py-2 bg-black text-white rounded-full"
            >
              Go To Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
