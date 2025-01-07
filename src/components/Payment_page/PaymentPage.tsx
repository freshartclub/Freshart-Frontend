import React, { useEffect, useMemo, useState } from "react";
import Header from "../ui/Header";
import ArtBreadcrumbs1 from "./ArtBreadcrumbs1";
import { useForm } from "react-hook-form";
import img_1 from "../ArtistPanel/assets/img_1.png";
import img_2 from "../ArtistPanel/assets/img_2.png";
import payment_1 from "../ArtistPanel/assets/payment_1.png";
import payment_2 from "../ArtistPanel/assets/payment_2.png";
import payment_3 from "../ArtistPanel/assets/payment_3.png";
import payment_4 from "../ArtistPanel/assets/payment_4.png";
import payment_5 from "../ArtistPanel/assets/payment_5.png";
import { useGetCartItems } from "../pages/http/useGetCartItems";
import useAddToCartMutation from "../DiscoverMore/http/useAddToCartMutation";
import CustomDropdown from "../pages/CustomDropdown";
import countryList from "react-select-country-list";
import { useGetBillingAddress } from "../ArtistPanel/ArtistEditProfile/http/useGetBillingAddress";
import { PhoneInput } from "react-international-phone";
import getSymbolFromCurrency from "currency-symbol-map";
import Loader from "../ui/Loader";
import usePostCheckOutMutation from "../PurchasePage/http/usePostCheckOutMutation";
import BillingAddress from "../EditProfile/BillingAddress";

const PaymentPage = () => {
  const { data, isLoading } = useGetCartItems();
  const { mutate, isPending } = useAddToCartMutation();
  const { mutate: checkOutMutation, isPending: checkOutPending } =
    usePostCheckOutMutation();
  const [isCheckBox, setIsCheckBox] = useState(false);
  const options = useMemo(() => countryList(), []);

  const {
    data: billingData,
    isLoading: billingLoading,
    isFetching,
  } = useGetBillingAddress();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    if (billingData) {
      setValue("firstName", billingData[0]?.billingDetails?.billingFirstName);
      setValue("lastName", billingData[0]?.billingDetails?.billingLastName);
      setValue("email", billingData[0]?.billingDetails?.billingEmail);
      setValue("phone", billingData[0]?.billingDetails?.billingPhone);
      setValue(
        "companyName",
        billingData[0]?.billingDetails?.billingCompanyName
      );
      setValue("address", billingData[0]?.billingDetails?.billingAddress);
      setValue("country", billingData[0]?.billingDetails?.billingCountry);
      setValue("zipCode", billingData[0]?.billingDetails?.billingZipCode);
      setValue("state", billingData[0]?.billingDetails?.billingState);
      setValue("city", billingData[0]?.billingDetails?.billingCity);
      setValue(
        "addressType",
        billingData[0]?.billingDetails?.billingAddressType
      );
      // setId(billingData[0]?._id);
    }
  }, [billingData]);

  const countryValue = getValues("country");

  const discountAmounts = data?.data?.cart?.reduce((total, item) => {
    const basePrice = parseFloat(
      item?.item?.pricing?.basePrice?.replace("$", "")
    );
    const discountPercentage = item?.item?.pricing?.dpersentage || 0;
    const discountAmount =
      (basePrice * item?.quantity * discountPercentage) / 100;
    return total + discountAmount;
  }, 0);

  const totalPrice = data?.data?.cart
    ?.reduce((total, item) => {
      const itemPrice = parseFloat(
        item?.item?.pricing?.basePrice?.replace("$", "")
      );
      return total + itemPrice * item?.quantity;
    }, 0)
    .toFixed(2);

  const tax = 5;

  const finalPrice = totalPrice - discountAmounts + tax;

  let itemQu = {};

  data?.data?.cart?.forEach((item) => {
    if (item?.item?._id) {
      itemQu[item?.item?._id] = (itemQu[item?.item?._id] || 0) + item.quantity;
    }
  });

  const orderType = data?.data?.cart?.map(
    (item) => item?.item?.commercialization?.activeTab
  );

  const onSubmit = (data: any) => {
    try {
      const billingDetails = billingData[0]?.billingDetails || {};

      const payload = {
        shipping: 0,
        totalPrice: finalPrice,
        discountAmount: discountAmounts,
        tax: tax,
        orderType: orderType[0],

        items: Object.keys(itemQu).map((id) => ({
          id: id,
          quantity: itemQu[id],
        })),

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

      console.log(payload);

      checkOutMutation(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const items = [
    {
      id: 1,
      title: "Stylish wall art with abstract charcoal",
      quantity: 1,
      price: 70,
      image: img_1,
    },
    {
      id: 2,
      title: "Wall framed painting with handpicking brush",
      quantity: 3,
      price: 250,
      image: img_2,
    },
  ];

  const handleCheck = (val) => {
    setIsCheckBox(val.target.checked);
    console.log(val.target.value);
  };

  if (billingLoading || isFetching || isLoading) {
    return <Loader />;
  }

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
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.firstName && (
                    <p className="text-red-500">
                      {String(errors.firstName.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.lastName && (
                    <p className="text-red-500">
                      {String(errors.lastName.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Company Name (Optional)</label>
                  <input
                    {...register("companyName")}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.companyName && (
                    <p className="text-red-500">
                      {String(errors.companyName.message)}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    {...register("email", { required: "email is required" })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.email && (
                    <p className="text-red-500">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Phone Number</label>
                  <PhoneInput
                    className="appearance-none  outline-none rounded py-1   w-full text-gray-700 leading-tight focus:outline-none"
                    placeholder="Enter phone number"
                    defaultCountry="in"
                    value={getValues("phone")}
                    onChange={(val) => setValue("phone", val)}
                  />

                  {errors.phoneNumber && (
                    <p className="text-red-500">
                      {String(errors.phoneNumber.message)}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Section */}

              {/* Country, City, and Zip Code  */}
              <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Country</label>
                  <CustomDropdown
                    control={control}
                    options={options}
                    name="country"
                    isActiveStatus="active"
                    countryValue={countryValue}
                  />
                  {errors.country && (
                    <p className="text-red-500">
                      {String(errors.country.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Region/State</label>
                  <input
                    {...register("state", {
                      required: "State is required",
                    })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.state && (
                    <p className="text-red-500">
                      {String(errors.state.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">City</label>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.city && (
                    <p className="text-red-500">
                      {String(errors.city.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Zip Code</label>
                  <input
                    {...register("zipCode", {
                      required: "Zip Code is required",
                    })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500">
                      {String(errors.zipCode.message)}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1">Address</label>
                <input
                  {...register("address", { required: "Address is required" })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.address && (
                  <p className="text-red-500">
                    {String(errors.address.message)}
                  </p>
                )}
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
                {data?.data?.cart?.map((item) => {
                  // console.log(item); // Logs each 'item' in the cart
                  return (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={`${data?.url}/users/${item?.item?.media?.mainImage}`}
                        alt={item.title}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm">{item?.item?.artworkName}</p>
                        <p className="text-sm text-gray-500">
                          {item?.item?.quantity ? item?.item?.quantity : "1"} ×{" "}
                          <span className="text-[#FF536B] font-semibold">
                            {getSymbolFromCurrency(
                              item?.item?.pricing?.currency
                            )}
                            {" " + item?.item?.pricing?.basePrice}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2 ">
                <div className="flex justify-between text-sm ">
                  <span className="text-[#5F6C72]">Sub-total</span>
                  <span className="font-semibold">
                    {getSymbolFromCurrency("EUR")}
                    {" " + totalPrice}
                  </span>
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

              <button
                type="submit"
                className="  md:w-full bg-black text-white p-2 md:py-3 rounded-full text-sm flex  items-center  justify-center space-x-2 hover:bg-gray-800 transition mt-4"
              >
                <span className="font-semibold">PLACE ORDER</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
