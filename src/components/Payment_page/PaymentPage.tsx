import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useSearchParams } from "react-router-dom";
import countryList from "react-select-country-list";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetBillingAddress } from "../ArtistPanel/ArtistEditProfile/http/useGetBillingAddress";
import CustomDropdown from "../pages/CustomDropdown";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import usePostCheckOutMutation from "../PurchasePage/http/usePostCheckOutMutation";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { lowImageUrl } from "../utils/baseUrls";
import ArtBreadcrumbs1 from "./ArtBreadcrumbs1";

declare global {
  interface Window {
    GlobalPayments: any;
  }
}

const PaymentPage = () => {
  const user = useAppSelector((state) => state.user.user);

  const [time, setTime] = useState("");
  const [active, setActive] = useState(false);
  const { data, isLoading } = useGetCartItems();
  const [orderData, setOrderData] = useState({
    hash: "",
    amount: "",
    currency: "",
    orderId: "",
    iso: "",
  });

  const generateTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  const { mutateAsync: checkOutMutation, isPending } =
    usePostCheckOutMutation();
  const [isCheckBox, setIsCheckBox] = useState(false);
  const options = useMemo(() => countryList(), []);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { data: billingData, isLoading: billingLoading } =
    useGetBillingAddress();

  const {
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  const defaultBilling = useMemo(() => {
    if (billingData) {
      return billingData.find((item) => item.isDefault === true);
    }
  }, [billingData]);

  const renderData = data?.data?.cart?.filter(
    (item) => item?.commercialization?.activeTab === type
  );

  const discountAmounts = renderData?.reduce((total, item) => {
    const basePrice = item?.pricing?.basePrice;

    const discountPercentage = item?.pricing?.dpersentage || 0;
    const discountAmount = (basePrice * discountPercentage) / 100;
    return total + discountAmount;
  }, 0);

  const totalPrice = renderData
    ?.reduce((total, item) => {
      const itemPrice = item?.pricing?.basePrice;

      return total + itemPrice;
    }, 0)
    .toFixed(2);

  const tax = 0;
  const finalPrice = totalPrice - discountAmounts + tax;
  let itemQu = {};

  renderData?.forEach((item) => {
    if (item?._id) {
      itemQu[item?._id] = itemQu[item?._id] || 0;
    }
  });

  useEffect(() => {
    if (orderData.hash && active) {
      document.getElementById("hppFrame").submit();
    }
  }, [orderData, active]);

  const createOrder = async () => {
    try {
      if (isCheckBox) {
        const shippingFields = [
          "shippingEmail",
          "shippingPhoneNumber",
          "shippingCountry",
          "shippingState",
          "shippingCity",
          "shippingZipCode",
          "shippingAddress",
        ];

        for (let i = 0; i < shippingFields.length; i++) {
          if (!getValues(shippingFields[i])) {
            return toast.error("Please fill all Shipping Details");
          }
        }
      }

      const genTime = await generateTimestamp();
      setTime(genTime);

      const payload = {
        shipping: 0,
        tax: tax,
        currency: "EUR",
        type: type,
        items: data.data.cart.map((i) => i._id),
        time: genTime,
      };

      if (isCheckBox) {
        payload["isDifferentShipping"] = true;
        payload["billingAddress"] = {
          email: getValues("shippingEmail"),
          phone: getValues("shippingPhoneNumber"),
          country: getValues("shippingCountry"),
          state: getValues("shippingState"),
          city: getValues("shippingCity"),
          zipCode: getValues("shippingZipCode"),
          address: getValues("shippingAddress"),
        };
      } else {
        payload["isDifferentShipping"] = false;
      }

      const res = await checkOutMutation(payload);
      setOrderData({
        hash: res.data.data,
        orderId: res.data.orderId,
        amount: res.data.amount,
        currency: res.data.currency,
        iso: res.data.iso,
      });
      setActive(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = (val) => {
    setIsCheckBox(val.target.checked);
  };

  if (billingLoading || isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <ArtBreadcrumbs1 />

      <div className="py-10">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "bold" }}
          className="text-black "
        >
          Billing Information
        </Header>

        <div className="flex flex-col md:flex-row w-full justify-between gap-4 mt-6 ">
          <div className="form w-full md:w-[70%]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  readOnly
                  type="text"
                  value={defaultBilling?.billingDetails?.billingFirstName || ""}
                  placeholder="First Name"
                  className="w-full p-2 border outline-none border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  readOnly
                  type="text"
                  value={defaultBilling?.billingDetails?.billingLastName || ""}
                  placeholder="Last Name"
                  className="w-full p-2 border outline-none border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1">Company Name (Optional)</label>
                <input
                  type="text"
                  value={
                    defaultBilling?.billingDetails?.billingCompanyName || ""
                  }
                  readOnly
                  className="w-full p-2 border outline-none border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="text"
                  readOnly
                  value={defaultBilling?.billingDetails?.billingEmail || ""}
                  className="w-full p-2 outline-none border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1">Phone Number</label>
                <PhoneInput
                  className="appearance-none outline-none rounded py-1 w-full text-gray-700 leading-tight focus:outline-none"
                  placeholder="Enter phone number"
                  disabled
                  defaultCountry="in"
                  value={defaultBilling?.billingDetails?.billingPhone || ""}
                />
              </div>
            </div>

            <div className="grid pointer-events-none opacity-65 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block mb-1">Country</label>
                <CustomDropdown
                  control={control}
                  options={options}
                  name="country"
                  isActiveStatus="active"
                  countryValue={
                    defaultBilling?.billingDetails?.billingCountry || ""
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Region/State</label>
                <input
                  type="text"
                  readOnly
                  value={defaultBilling?.billingDetails?.billingState || ""}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  value={defaultBilling?.billingDetails?.billingCity || ""}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  value={defaultBilling?.billingDetails?.billingZipCode || ""}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <input
                type="text"
                readOnly
                value={defaultBilling?.billingDetails?.billingAddress || ""}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="items-center space-x-2 mb-10">
              <input
                type="checkbox"
                id="shipToDifferentAddress"
                className={`w-4 h-4 ${
                  orderData.hash
                    ? "opacity-50 pointer-events-none cursor-not-allowed"
                    : ""
                } `}
                onChange={(val) => handleCheck(val)}
              />
              <label
                htmlFor="shipToDifferentAddress"
                className="text-sm text-gray-700"
              >
                Ship into different address
              </label>
            </div>

            {isCheckBox ? (
              <div>
                <Header
                  variant={{ size: "xl", theme: "dark", weight: "bold" }}
                  className="text-black mb-8 "
                >
                  Shipping Information
                </Header>

                <div
                  className={`${
                    orderData.hash
                      ? "opacity-50 pointer-events-none cursor-not-allowed"
                      : ""
                  } grid md:grid-cols-2 gap-4 mb-4`}
                >
                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      {...register("shippingEmail", {
                        required: "Email is required",
                      })}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {errors.shippingEmail && (
                      <p className="text-red-500">
                        {String(errors.shippingEmail.message)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1">Phone Number</label>

                    <PhoneInput
                      className="appearance-none  outline-none rounded py-1   w-full text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter phone number"
                      defaultCountry="in"
                      value={getValues("shippingPhoneNumber")}
                      onChange={(val) => setValue("shippingPhoneNumber", val)}
                    />

                    {errors.shippingPhoneNumber && (
                      <p className="text-red-500">
                        {String(errors.shippingPhoneNumber.message)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Country</label>
                    <CustomDropdown
                      control={control}
                      options={options}
                      name="shippingCountry"
                      isActiveStatus="active"
                    />
                    {errors.shippingCountry && (
                      <p className="text-red-500">
                        {String(errors.shippingCountry.message)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1">Region/State</label>
                    <input
                      {...register("shippingState", {
                        required: "State is required",
                      })}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {errors.shippingState && (
                      <p className="text-red-500">
                        {String(errors.shippingState.message)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1">City</label>
                    <input
                      {...register("shippingCity", {
                        required: "City is required",
                      })}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {errors.shippingCity && (
                      <p className="text-red-500">
                        {String(errors.shippingCity.message)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1">Zip Code</label>
                    <input
                      {...register("shippingZipCode", {
                        required: "Zip Code is required",
                      })}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {errors.shippingZipCode && (
                      <p className="text-red-500">
                        {String(errors.shippingZipCode.message)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Address</label>
                  <input
                    {...register("shippingAddress", {
                      required: "Address is required",
                    })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.address && (
                    <p className="text-red-500">
                      {String(errors.address.message)}
                    </p>
                  )}
                </div>
              </div>
            ) : null}

            <h3 className="text-md font-medium mb-4 mt-10">
              Additional Information
            </h3>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">
                Order note <span className="font-normal">(Optional)</span>{" "}
              </label>
              <input
                readOnly={orderData?.hash ? true : false}
                {...register("additionalInfo")}
                type="text"
                placeholder="Notes about your order, e.g. special notes for delivery"
                className={`w-full ${
                  orderData.hash
                    ? "opacity-50 pointer-events-none cursor-not-allowed"
                    : ""
                }  p-2 border border-gray-300 rounded-lg`}
              />
              {errors.additionalinfo && (
                <p className="text-red-500">
                  {String(errors.additionalinfo.message)}
                </p>
              )}
            </div>
          </div>

          <div className="orderSummery w-full md:w-[30%] border shadow-md rounded p-4 max-h-min">
            <h2 className="text-base font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {renderData &&
                renderData.length > 0 &&
                renderData?.map((item, i: number) => (
                  <div key={i} className="flex items-center space-x-4">
                    <img
                      src={`${lowImageUrl}/${item?.media?.mainImage}`}
                      alt={item.title}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm">{item?.artworkName}</p>

                      <span className="text-[#FF536B] font-semibold">
                        {getSymbolFromCurrency(
                          item?.pricing?.currency.slice(0, 3)
                        )}
                        {" " + item?.pricing?.basePrice}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="my-6 space-y-2">
              <div className="flex justify-between text-sm ">
                <span className="text-[#5F6C72]">Sub-total</span>
                <span className="font-semibold">{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5F6C72]">Shipping</span>
                <span className="text-green-500 semibold">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5F6C72]">Discount</span>
                <span className="font-semibold">
                  {getSymbolFromCurrency("EUR")}
                  {" " + discountAmounts}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5F6C72]">Tax</span>
                <span className="font-semibold">
                  {getSymbolFromCurrency("EUR")}
                  {" " + tax}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between ">
                <span>Total</span>
                <span className="font-semibold">
                  {getSymbolFromCurrency("EUR")}
                  {" " + finalPrice}
                </span>
              </div>
            </div>

            {orderData?.hash ? (
              <iframe
                name="hppFrame"
                title="Hosted Payment Page"
                width="100%"
                height="600px"
                style={{ border: "none" }}
                sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation"
                // src={hppUrl}
              ></iframe>
            ) : null}

            <form
              id="hppFrame"
              method="POST"
              action="https://hpp.sandbox.addonpayments.com/pay"
              target="hppFrame"
            >
              <>
                <input type="hidden" name="TIMESTAMP" value={time} />
                <input
                  type="hidden"
                  name="MERCHANT_ID"
                  value={import.meta.env.VITE_MERCHANT_ID}
                />
                <input
                  type="hidden"
                  name="ORDER_ID"
                  value={orderData.orderId}
                />
                <input type="hidden" name="AMOUNT" value={orderData.amount} />
                <input
                  type="hidden"
                  name="CURRENCY"
                  value={orderData.currency}
                />
                <input type="hidden" name="SHA1HASH" value={orderData.hash} />
                <input type="hidden" name="AUTO_SETTLE_FLAG" value="1" />
                <input
                  type="hidden"
                  name="HPP_BILLING_CITY"
                  value={defaultBilling?.billingDetails?.billingCity}
                />
                <input
                  type="hidden"
                  name="HPP_BILLING_COUNTRY"
                  value={orderData.iso}
                />
                <input
                  type="hidden"
                  name="HPP_BILLING_STREET1"
                  value={defaultBilling?.billingDetails?.billingAddress}
                />
                <input
                  type="hidden"
                  name="HPP_BILLING_POSTALCODE"
                  value={defaultBilling?.billingDetails?.billingZipCode}
                />
                <input
                  type="hidden"
                  name="HPP_CUSTOMER_EMAIL"
                  value={user?.email}
                />
                <input
                  type="hidden"
                  name="MERCHANT_RESPONSE_URL"
                  value={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/api/artist/get-response-data`}
                />
              </>

              <p className="text-[#9999] text-xs mb-1">
                If you have different shipping address then make sure fill that
              </p>
            </form>
            {isPending ? (
              <span>Wait....</span>
            ) : (
              <input
                disabled={isPending}
                className={`${
                  active
                    ? "hidden"
                    : "p-2 w-full bg-black rounded-md text-center text-white cursor-pointer hover:bg-[#131313df]"
                }`}
                onClick={() => {
                  createOrder();
                }}
                type="button"
                value="Proceed For Payment"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
