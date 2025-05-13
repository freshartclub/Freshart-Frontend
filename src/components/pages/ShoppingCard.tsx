import { useEffect } from "react";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import cross_icon from "../../assets/x-mark.png";
import useAddToCartMutation from "../DiscoverMore/http/useAddToCartMutation";
import useRemoveMutation from "../PurchasePage/http/useRemoveMutation";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import { useGetCartItems } from "./http/useGetCartItems";

const ShoppingCard = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data, isLoading, refetch } = useGetCartItems();
  const { mutate } = useRemoveMutation();
  const { mutate: addMutate } = useAddToCartMutation();

  const handleRemoveItem = (id: string) => {
    if (!token && data) {
      const cartItems = JSON.parse(localStorage.getItem("_my_cart") || "[]");
      const updatedCartItems = cartItems.filter((item: string) => item !== id);
      localStorage.setItem("_my_cart", JSON.stringify(updatedCartItems));
      refetch();
      return toast.success("Item removed from cart");
    } else {
      mutate(id);
    }
  };

  const token = localStorage.getItem("auth_token");
  const totalItems = data?.data?.cart?.length;

  // Separate items by type
  const subscriptionItems = data?.data?.cart?.filter(
    (item: any) => item?.commercialization?.activeTab === "subscription"
  );
  const purchaseItems = data?.data?.cart?.filter(
    (item: any) => item?.commercialization?.activeTab === "purchase"
  );


  const purchaseTotal = purchaseItems
    ?.reduce((total: any, item: any) => total + item?.pricing?.basePrice, 0)
    .toFixed(2);
  const grandTotal = ( Number(purchaseTotal || 0)).toFixed(2);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const ids = JSON.parse(localStorage.getItem("_my_cart") || "[]");
      if (ids?.length > 0) {
        ids.forEach(async (id: string) => {
          if (data?.data?.cart?.find((item: any) => item?._id !== id)) {
            addMutate(id);
            const filterItems = JSON.parse(
              localStorage.getItem("_my_cart") || "[]"
            );
            const updatedCartItems = filterItems.filter(
              (item: string) => item !== id
            );
            localStorage.setItem("_my_cart", JSON.stringify(updatedCartItems));
          }
        });
      }
    }
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-[100vh] bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-full sm:w-[25%] z-50`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-6 sm:px-4 h-full flex flex-col">
          <div className="flex justify-between items-center w-full px-2 py-4 border-b">
            <Header variant={{ size: "md", theme: "dark", weight: "semiBold" }}>
              Shopping Cart ({totalItems})
            </Header>
            <Button onClick={onClose}>
              <RxCross1 size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            {/* Subscription Items Section */}
            {subscriptionItems?.length > 0 && (
              <div className="mb-6">
                <div className="px-2 mb-3">
                  <Header
                    variant={{
                      size: "sm",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="text-gray-700"
                  >
                    Subscriptions
                  </Header>
                  <P variant={{ size: "sm", theme: "light" }}>
                    Recurring art experiences
                  </P>
                </div>
                <div className="space-y-3">
                  {subscriptionItems.map((item: any, index: number) => (
                    <CartItem
                      key={`sub-${index}`}
                      item={item}
                      navigate={navigate}
                      handleRemoveItem={handleRemoveItem}
                      type="subscription"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Items Section */}
            {purchaseItems?.length > 0 && (
              <div>
                <div className="px-2 mb-3">
                  <Header
                    variant={{
                      size: "sm",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="text-gray-700"
                  >
                    Purchases
                  </Header>
                  <P variant={{ size: "sm", theme: "light" }}>
                    One-time acquisitions
                  </P>
                </div>
                <div className="space-y-3">
                  {purchaseItems.map((item: any, index: number) => (
                    <CartItem
                      key={`purchase-${index}`}
                      item={item}
                      navigate={navigate}
                      handleRemoveItem={handleRemoveItem}
                      type="purchase"
                    />
                  ))}
                </div>
              </div>
            )}

            {!subscriptionItems?.length && !purchaseItems?.length && (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <P variant={{ size: "lg", theme: "light" }}>
                  Your cart is empty
                </P>
                <P variant={{ size: "sm", theme: "light" }}>
                  Discover amazing artworks to add
                </P>
              </div>
            )}
          </div>

          {/* Footer Section */}
          {(subscriptionItems?.length > 0 || purchaseItems?.length > 0) && (
            <div className="w-full p-4 bg-white border-t shadow-md">
              <div className="space-y-2 mb-4">
                
                {purchaseItems?.length > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <P variant={{ size: "sm", theme: "dark", weight: "normal" }}>
                      Purchases total:
                    </P>
                    <P variant={{ size: "sm", theme: "dark", weight: "normal" }}>
                      ${purchaseTotal}
                    </P>
                  </div>
                )}
                <div className="flex justify-between text-gray-900 border-t pt-2">
                  <P variant={{ size: "base", theme: "dark", weight: "semiBold" }}>
                    Grand total:
                  </P>
                  <P variant={{ size: "base", theme: "dark", weight: "semiBold" }}>
                    ${grandTotal}
                  </P>
                </div>
              </div>
              <Button
                onClick={() => {
                  !token ? null : navigate("/purchase_cart");
                  onClose();
                }}
                variant={{ fontSize: "md", fontWeight: "normal" }}
                className={`w-full py-2 bg-black text-white rounded-full ${
                  !token ? "pointer-events-none opacity-50" : ""
                }`}
              >
                {!token ? "Login To Checkout" : "Go To Cart"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Extracted Cart Item Component for better readability and reusability
const CartItem = ({ item, navigate, handleRemoveItem, type }: any) => {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-100">
      <div
        className="flex gap-4 items-center flex-1"
        onClick={() => navigate(`/discover_more/${item?._id}`)}
      >
        <div className="relative">
          <img
            src={`${imageUrl}/users/${item?.media?.mainImage}`}
            alt="cart image"
            className="object-cover w-[60px] h-[60px] rounded-lg"
          />
          {type === "subscription" && (
            <div className="absolute -top-2 -right-2 bg-[#E04A60] text-white text-xs px-2 py-1 rounded-full">
              Sub
            </div>
          )}
        </div>

        <div className="flex-1">
          <Header
            variant={{
              size: "sm",
              theme: "dark",
              weight: "semiBold",
            }}
            className="truncate"
          >
            {item?.artworkName}
          </Header>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">
              ${item?.pricing?.basePrice}
            </span>
            {/* {type === "subscription" && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Monthly
              </span>
            )} */}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveItem(item?._id);
        }}
        className="p-2 hover:bg-red-100 rounded-full ml-2"
      >
        <img src={cross_icon} alt="Remove item" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ShoppingCard;