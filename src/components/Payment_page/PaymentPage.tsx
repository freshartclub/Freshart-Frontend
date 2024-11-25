import React from "react";
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

const PaymentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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

  const calculateTotal = () => {
    const subTotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discount = 24; // Fixed discount
    const tax = 61.99; // Fixed tax
    const shipping = 0; // Free shipping
    return subTotal + tax - discount + shipping;
  };

  const total = calculateTotal();

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
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.lastName && (
                    <p className="text-red-500">
                      {String(errors.lastName.message)}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Section */}

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

              {/* Country, City, and Zip Code  */}
              <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Country</label>
                  <select
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500">
                      {String(errors.country.message)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1">Region/State</label>
                  <input
                    {...register("region/state", {
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
                  <input
                    {...register("email", {
                      required: "phoneNumber is required",
                    })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500">
                      {String(errors.phoneNumber.message)}
                    </p>
                  )}
                </div>
              </div>

              <div className=" items-center space-x-2 mb-10">
                <input
                  type="checkbox"
                  id="shipToDifferentAddress"
                  className="w-4 h-4"
                />
                <label
                  htmlFor="shipToDifferentAddress"
                  className="text-sm text-gray-700"
                >
                  Ship into different address
                </label>
              </div>

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

                {/* Card Details */}
                {/* {['Credit Card'].includes(watch('paymentOption')) && ( */}
                <>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-1">Name on Card</label>
                      <input
                        {...register("nameOnCard", {
                          required: "Name on card is required",
                        })}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      {errors.nameOnCard && (
                        <p className="text-red-500">
                          {String(errors.nameOnCard.message)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Card Number</label>
                      <input
                        {...register("cardNumber", {
                          required: "Card Number is required",
                        })}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500">
                          {String(errors.cardNumber.message)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-1">Expiry Date</label>
                      <input
                        {...register("expiryDate", {
                          required: "Expiry date is required",
                        })}
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500">
                          {String(errors.expiryDate.message)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">CVC</label>
                      <input
                        {...register("cvc", { required: "CVC is required" })}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      {errors.cvc && (
                        <p className="text-red-500">
                          {String(errors.cvc.message)}
                        </p>
                      )}
                    </div>
                  </div>
                </>
                {/* )} */}
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

              <div className="space-y-4 ">
                {items.map((item) => (
                  <div key={item.id} className="flex  items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-md object-cover "
                    />
                    <div>
                      <p className="text-sm ">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} ×{" "}
                        <span className="text-[#FF536B] font-semibold">
                          ${item.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 ">
                <div className="flex justify-between text-sm ">
                  <span className="text-[#5F6C72]">Sub-total</span>
                  <span className="font-semibold">
                    $
                    {items.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5F6C72]">Shipping</span>
                  <span className="text-green-500 semibold">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5F6C72]">Discount</span>
                  <span className="font-semibold">${24}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5F6C72]">Tax</span>
                  <span className="font-semibold">${61.99}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between ">
                  <span>Total</span>
                  <span className="font-semibold">${total.toFixed(2)} USD</span>
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
