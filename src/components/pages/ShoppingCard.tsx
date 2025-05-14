import { useEffect } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { RiArrowRightLine, RiCheckboxBlankCircleFill, RiDeleteBinLine, RiShoppingCartLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import useAddToCartMutation from "../DiscoverMore/http/useAddToCartMutation";
import useRemoveMutation from "../PurchasePage/http/useRemoveMutation";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import { useGetCartItems } from "./http/useGetCartItems";

const ShoppingCard = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const { data, isLoading, refetch } = useGetCartItems();
  const { mutate } = useRemoveMutation();
  const { mutate: addMutate } = useAddToCartMutation();

  const handleRemoveItem = (id: string) => {
    if (!isAuthorized && data) {
      const cartItems = JSON.parse(localStorage.getItem("_my_cart") || "[]");
      const updatedCartItems = cartItems.filter((item: string) => item !== id);
      localStorage.setItem("_my_cart", JSON.stringify(updatedCartItems));
      refetch();
      return toast.success("Item removed from cart");
    } else {
      mutate(id);
    }
  };

  const totalItems = data?.data?.cart?.length;

  const subscriptionItems = data?.data?.cart?.filter((item: any) => item?.commercialization?.activeTab === "subscription");
  const purchaseItems = data?.data?.cart?.filter((item: any) => item?.commercialization?.activeTab === "purchase");

  const purchaseTotal = purchaseItems?.reduce((total: any, item: any) => total + item?.pricing?.basePrice, 0).toFixed(2);
  const grandTotal = Number(purchaseTotal || 0).toFixed(2);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      const ids = JSON.parse(localStorage.getItem("_my_cart") || "[]");
      if (ids?.length > 0) {
        ids.forEach(async (id: string) => {
          if (data?.data?.cart?.find((item: any) => item?._id !== id)) {
            addMutate(id);
            const filterItems = JSON.parse(localStorage.getItem("_my_cart") || "[]");
            const updatedCartItems = filterItems.filter((item: string) => item !== id);
            localStorage.setItem("_my_cart", JSON.stringify(updatedCartItems));
          }
        });
      }
    }
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-[100vh] ${
        dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      } shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} w-full sm:w-[25%] z-50 flex flex-col`}
    >
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto h-full flex flex-col">
          <div className={`flex px-4 justify-between items-center w-full py-4 border-b ${dark ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center gap-2">
              <RiShoppingCartLine className="text-xl" />
              <Header variant={{ size: "md", weight: "semiBold", theme: dark ? "light" : "dark" }}>Your Cart ({totalItems})</Header>
            </div>
            <span onClick={onClose} className="p-2 hover:bg-opacity-10 hover:bg-gray-500 rounded-full">
              <MdClose size={20} />
            </span>
          </div>

          <div className="flex-1 px-4 overflow-y-auto py-4 space-y-6">
            {!subscriptionItems?.length && !purchaseItems?.length && (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <RiShoppingCartLine className="text-2xl text-gray-400 dark:text-gray-500" />
                </div>
                <Header variant={{ size: "lg", weight: "medium", theme: dark ? "light" : "dark" }} className="mb-2">
                  Your cart is empty
                </Header>
                <P variant={{ theme: dark ? "light" : "dark" }} className="max-w-xs">
                  Discover amazing artworks to add to your Cart
                </P>
                <span
                  onClick={() => {
                    navigate("/all-artworks?type=purchase");
                    onClose();
                  }}
                  className={`w-full mt-4 cursor-pointer ${
                    dark ? "bg-gray-700" : "bg-gray-200"
                  } py-3 rounded-full flex items-center justify-center gap-2`}
                >
                  Browse Artworks <RiArrowRightLine />
                </span>
              </div>
            )}

            {subscriptionItems?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <RiCheckboxBlankCircleFill className="text-blue-500 text-xs" />
                  <Header variant={{ weight: "semiBold", theme: dark ? "light" : "dark" }}>Subscription</Header>
                </div>

                <div className="space-y-3">
                  {subscriptionItems.map((item: any, index: number) => (
                    <CartItem
                      key={`sub-${index}`}
                      item={item}
                      navigate={navigate}
                      handleRemoveItem={handleRemoveItem}
                      type="subscription"
                      dark={dark}
                    />
                  ))}
                </div>
              </div>
            )}

            {purchaseItems?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <RiCheckboxBlankCircleFill className="text-purple-500 text-xs" />
                  <Header variant={{ weight: "semiBold", theme: dark ? "light" : "dark" }}>Purchase</Header>
                </div>

                <div className="space-y-3">
                  {purchaseItems.map((item: any, index: number) => (
                    <CartItem
                      key={`purchase-${index}`}
                      item={item}
                      navigate={navigate}
                      handleRemoveItem={handleRemoveItem}
                      type="purchase"
                      dark={dark}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {(subscriptionItems?.length > 0 || purchaseItems?.length > 0) && (
            <div className={`w-full p-4 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-t shadow-md`}>
              <div className="space-y-3 mb-4">
                {purchaseItems?.length > 0 && (
                  <div className="flex justify-between">
                    <P variant={{ theme: dark ? "light" : "dark" }}>Purchase Total:</P>
                    <P variant={{ weight: "medium", theme: dark ? "light" : "dark" }}>${grandTotal}</P>
                  </div>
                )}
              </div>
              <span
                onClick={() => {
                  !isAuthorized ? null : navigate("/purchase_cart");
                  onClose();
                }}
                className={`w-full cursor-pointer ${dark ? "bg-gray-700" : "bg-gray-200"} py-3 rounded-full flex items-center justify-center gap-2 ${
                  !isAuthorized ? "pointer-events-none opacity-70" : ""
                }`}
              >
                {!isAuthorized ? "Login To Checkout" : "Proceed to Checkout"}
                <RiArrowRightLine />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CartItem = ({ item, navigate, handleRemoveItem, type, dark }: any) => {
  return (
    <div
      className={`flex justify-between border items-center p-3 ${
        dark ? "bg-gray-800 hover:bg-gray-700 border-gray-700" : "bg-gray-50 hover:bg-gray-100 border-gray-300"
      } rounded-lg transition-colors duration-200 border cursor-pointer`}
      onClick={() => navigate(`/discover_more/${item?._id}`)}
    >
      <div className="flex gap-3 items-center flex-1">
        <div className="relative">
          <img src={`${imageUrl}/users/${item?.media?.mainImage}`} alt="cart image" className="object-cover w-14 h-14 rounded-lg" />
          {type === "subscription" && <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">Sub</div>}
        </div>

        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{item?.artworkName}</p>
          <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>${item?.pricing?.basePrice}</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveItem(item?._id);
        }}
        className={`p-2 ${dark ? "hover:bg-gray-600 text-gray-400" : "hover:bg-gray-200 text-gray-500"} rounded-full ml-2 transition-colors`}
      >
        <RiDeleteBinLine className="text-lg" />
      </button>
    </div>
  );
};

export default ShoppingCard;
