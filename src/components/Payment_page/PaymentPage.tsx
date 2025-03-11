import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useSearchParams } from "react-router-dom";
import countryList from "react-select-country-list";
import { useGetBillingAddress } from "../ArtistPanel/ArtistEditProfile/http/useGetBillingAddress";
import payment_1 from "../ArtistPanel/assets/payment_1.png";
import payment_2 from "../ArtistPanel/assets/payment_2.png";
import payment_3 from "../ArtistPanel/assets/payment_3.png";
import payment_4 from "../ArtistPanel/assets/payment_4.png";
import payment_5 from "../ArtistPanel/assets/payment_5.png";
import CustomDropdown from "../pages/CustomDropdown";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import usePostCheckOutMutation from "../PurchasePage/http/usePostCheckOutMutation";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { lowImageUrl } from "../utils/baseUrls";
import ArtBreadcrumbs1 from "./ArtBreadcrumbs1";
import { useGenerateHash } from "./http/useGenerateHash";

declare global {
  interface Window {
    GlobalPayments: any;
  }
}

const PaymentPage = () => {
  const [hash, setHash] = useState("");
  const [time, setTime] = useState("");
  const iframeRef = useRef(null);
  const { data, isLoading } = useGetCartItems();

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

  const merchantId = "367155777";
  const orderId = "Nyre567uy2et78i4tvt6879ygjhtrTXWYS6g";
  const amount = "1501";
  const currency = "EUR";

  const {
    data: hashData,
    isLoading: hashLoading,
    refetch,
  } = useGenerateHash(time, merchantId, orderId, amount, currency);

  const { mutate: checkOutMutation, isPending: checkOutPending } =
    usePostCheckOutMutation();
  const [isCheckBox, setIsCheckBox] = useState(false);
  const options = useMemo(() => countryList(), []);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { data: billingData, isLoading: billingLoading } =
    useGetBillingAddress();

  const {
    register,
    handleSubmit,
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

  const orderType = renderData?.map(
    (item) => item?.commercialization?.activeTab
  );

  const cartLookup = renderData?.reduce((acc, item) => {
    if (item?._id) {
      acc[item?._id] = item?.commercialization?.activeTab;
    }
    return acc;
  }, {});

  useEffect(() => {
    setTime(generateTimestamp());
  }, []);

  const generateSHA1Hash = async () => {
    await refetch();
  };

  useEffect(() => {
    if (time) {
      if (!hashData) generateSHA1Hash();
      if (hashData) setHash(hashData);
    }
  }, [time, hashData]);

  useEffect(() => {
    if (hash && time) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://hpp.sandbox.addonpayments.com/pay";
      form.target = "hppFrame";

      const fields = {
        TIMESTAMP: time,
        MERCHANT_ID: merchantId,
        ORDER_ID: orderId,
        AMOUNT: amount,
        CURRENCY: currency,
        SHA1HASH: `${hash}`,
        HPP_BILLING_CITY: "Indore",
        HPP_BILLING_COUNTRY: "356",
        HPP_BILLING_STREET1: "Adhartal",
        HPP_BILLING_POSTALCODE: "482004",
        HPP_CUSTOMER_EMAIL: "rachit@gmail.com",
        AUTO_SETTLE_FLAG: "1",
        MERCHANT_RESPONSE_URL: "http://localhost:5173/payment-success",
      };

      for (const key in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    }
  }, [hash]);

  const onSubmit = (data: any) => {
    try {
      const billingDetails = defaultBilling?.billingDetails || {};

      const payload = {
        shipping: 0,
        totalPrice: finalPrice,
        discountAmount: discountAmounts,
        tax: tax,
        type: orderType[0],

        items: Object.keys(itemQu).map((id) => {
          return {
            id: id,
            quantity: itemQu[id],
            type: cartLookup[id] || null,
            currency: "USD",
          };
        }),

        billingAddress: {
          firstName: billingDetails.billingFirstName || "",
          lastName: billingDetails.billingLastName || "",
          email: billingDetails.billingEmail || "",
          phone: billingDetails.billingPhone || "",
          companyName: billingDetails.billingCompanyName || "",
          address: billingDetails.billingAddress || "",
          country: billingDetails.billingCountry || "",
          zipCode: billingDetails.billingZipCode || "",
          state: billingDetails.billingState || "",
          city: billingDetails.billingCity || "",
          addressType: billingDetails.billingAddressType || "",
        },
        shippingAddress: {
          firstName: data.shippingFirstName,
          lastName: data.shippingLastName,
          email: data.shippingEmail,
          phone: data.shippingPhoneNumber,
          companyName: data.shippingCompanyName,
          address: data.shippingAddress,
          country: data.shippingCountry,
          zipCode: data.shippingZipCode,
          state: data.shippingstate,
          city: data.shippingCity,
          addressType: data.shippingAddressType,
        },

        note: data?.additionalInfo,
      };

      checkOutMutation(payload);
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    value={
                      defaultBilling?.billingDetails?.billingFirstName || ""
                    }
                    placeholder="First Name"
                    className="w-full p-2 border outline-none border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input
                    readOnly
                    type="text"
                    value={
                      defaultBilling?.billingDetails?.billingLastName || ""
                    }
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

              <div className=" items-center space-x-2 mb-10">
                <input
                  type="checkbox"
                  id="shipToDifferentAddress"
                  className="w-4 h-4"
                  onChange={(val) => handleCheck(val)}
                />
                <label
                  htmlFor="shipToDifferentAddress"
                  className="text-sm text-gray-700"
                >
                  Ship into different address
                </label>
              </div>

              {/* this is for shipping */}
              {isCheckBox ? (
                <div>
                  <Header
                    variant={{ size: "xl", theme: "dark", weight: "bold" }}
                    className="text-black mb-8 "
                  >
                    Shipping Information
                  </Header>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
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

                  {/* Country, City, and Zip Code  */}
                  <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block mb-1">Country</label>
                      <CustomDropdown
                        control={control}
                        options={options}
                        name="shippingCountry"
                        isActiveStatus="active"
                        // countryValue={countryValue}
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

              {/* Payment Options */}

              <div className="border p-4">
                <h3 className="text-md font-semibold mb-4">Payment Option</h3>
                <hr />
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6 mt-6 items-center border-b ">
                  <div className="flex flex-col items-center space-y-2 mb-4 border-r">
                    <div>
                      <img className="" src={payment_1}></img>
                    </div>
                    <label className="text-sm mb-2 font-bold">
                      Cash on Delivery
                    </label>

                    <input
                      {...register("paymentOption", {
                        required: "Payment option is required",
                      })}
                      type="radio"
                      value="Cash on Delivery"
                      className="mr-2"
                    />
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-r mb-4">
                    <div>
                      <img className="" src={payment_2}></img>
                    </div>

                    <label className="text-sm mb-2 font-bold">Venmo</label>

                    <input
                      {...register("paymentOption")}
                      type="radio"
                      value="Venmo"
                      className="mr-2"
                    />
                  </div>
                  <div className="flex flex-col items-center space-y-2  border-r mb-4">
                    <div>
                      <img className="" src={payment_3}></img>
                    </div>

                    <label className="text-sm mb-2 font-bold">Paypal</label>

                    <input
                      {...register("paymentOption")}
                      type="radio"
                      value="Paypal"
                      className="mr-2"
                    />
                  </div>
                  <div className="flex  flex-col items-center space-y-2 border-r mb-4">
                    <div>
                      <img className="" src={payment_4}></img>
                    </div>

                    <label className="text-sm mb-2 font-bold">Amazon Pay</label>

                    <input
                      {...register("paymentOption")}
                      type="radio"
                      value="Amazon Pay"
                      className="mr-2"
                    />
                  </div>
                  <div className=" flex flex-col items-center space-y-2 border-r mb-4">
                    <div>
                      <img className="" src={payment_5}></img>
                    </div>

                    <label className="text-sm mb-2 font-bold">
                      Debit/Credit Card
                    </label>

                    <input
                      {...register("paymentOption")}
                      type="radio"
                      value="Credit Card"
                      className="mr-2 "
                    />
                  </div>
                  {errors.paymentOption && (
                    <p className="text-red-500">
                      {String(errors.paymentOption.message)}
                    </p>
                  )}
                </div>
              </div>

              {/* Additional information */}
              <h3 className="text-md font-medium mb-4 mt-10">
                Additional Information
              </h3>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">
                  Order note <span className="font-normal">(Optional)</span>{" "}
                </label>
                <input
                  {...register("additionalInfo")}
                  type="text"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  className="w-full p-2   border border-gray-300 rounded-lg "
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

              {/* <button
                type="submit"
                className="  md:w-full bg-black text-white p-2 md:py-3 rounded-full text-sm flex  items-center  justify-center space-x-2 hover:bg-gray-800 transition mt-4"
              >
                <span className="font-semibold">
                  {checkOutPending ? "LOADING..." : "PLACE ORDER"}
                </span>
              </button> */}

              <iframe
                name="hppFrame"
                ref={iframeRef}
                title="Hosted Payment Page"
                width="100%"
                height="600px"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
