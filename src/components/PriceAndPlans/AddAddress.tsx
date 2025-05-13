import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FiMapPin, FiX } from "react-icons/fi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import countryList from "react-select-country-list";
import { useAppSelector } from "../../store/typedReduxHooks";
import CustomDropdown from "../pages/CustomDropdown";
import { getCityStateFromZipCountry } from "../utils/MapWithAutocomplete";
import useCreatePayer from "./http/useCreatePayer";
import useSendCode from "./http/useSendCode";
import useVerifyCode from "./http/useVerifyCode";
import toast from "react-hot-toast";

const AddAddress = ({ toPhoneVerify, setToPhoneVerify, onClose, data }) => {
  const options = useMemo(() => countryList(), []);
  const { t } = useTranslation();

  const { mutateAsync, isPending } = useCreatePayer();
  const dark = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.user.user);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [countdown, setCountdown] = useState(0);

  const { mutateAsync: sendCodeAsync, isPending: sendPending } = useSendCode();
  const { mutateAsync: verifyCodeAsync, isPending: verifyPending } = useVerifyCode();

  const { control, watch, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      artistName: "",
      artistSurname1: "",
      artistSurname2: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      zipCode: "",
      state: "",
      city: "",
    },
  });

  useEffect(() => {
    if (!data) return;
    setValue("artistName", data?.artistName);
    setValue("artistSurname1", data?.artistSurname1);
    setValue("artistSurname2", data?.artistSurname2);
    setValue("email", data?.email);
    setValue("phone", data?.phone);
    setValue("address", data?.address?.residentialAddress);
    setValue("country", data?.address?.country);
    setValue("zipCode", data?.address?.zipCode);
    setValue("state", data?.address?.state);
    setValue("city", data?.address?.city);
  }, [data, setValue]);

  const countryValue = getValues("country");

  const watchCountry = watch("country");
  const watchZip = watch("zipCode");
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (watchCountry && watchZip && watchZip.length > 4) {
      getCityStateFromZipCountry(watchCountry, watchZip, apiKey).then(({ state, city, address }) => {
        setValue("city", city);
        setValue("state", state);
        setValue("address", address);
      });
    }
  }, [watchCountry, watchZip, apiKey, setValue]);

  const onSubmit = async (data) => {
    mutateAsync(data).then(() => {
      setShowOtpModal(true);
      handleSendOtp();
    });
  };

  const getDarkClass = (lightClass: string, darkClass: string) => (dark ? darkClass : lightClass);

  const handleSendOtp = () => {
    sendCodeAsync(phoneNumber).then(() => {
      setOtpSent(true);
      setCountdown(60);
    });

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) return toast.error("Please enter a valid OTP");

    verifyCodeAsync(otp).then(() => {
      setShowOtpModal(false);
      setToPhoneVerify(false);
      onClose();
    });
  };

  const handleResendOtp = () => {
    setOtp("");
    handleSendOtp();
  };

  const formatOtp = (value: string) => {
    if (/[^0-9]/.test(value)) return "";
    setOtp(value);
  };

  return (
    <>
      {!toPhoneVerify && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${getDarkClass("bg-black/50", "bg-black/70")} backdrop-blur-sm`}>
          <div
            className={`${getDarkClass(
              "bg-white",
              "bg-gray-800"
            )} rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-y-auto scrollbar mx-4 ${getDarkClass(
              "border-gray-200",
              "border-gray-700"
            )} border`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${getDarkClass("text-gray-900", "text-white")}`}>{t("Basic Information")}</h2>
                <button
                  onClick={onClose}
                  className={`${getDarkClass("text-gray-500 hover:text-gray-700", "text-gray-400 hover:text-gray-300")} transition-colors`}
                >
                  <FiX size="1.5em" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <label
                        htmlFor="artistName"
                        className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}
                      >
                        {t("Artist Name")} <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="artistName"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            required
                            placeholder="Dianne"
                            className={`w-full px-4 py-2 text-sm border ${getDarkClass(
                              "border-gray-300",
                              "border-gray-600"
                            )} rounded-lg focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] ${getDarkClass(
                              "bg-white text-gray-900 placeholder-gray-400",
                              "bg-gray-700 text-white placeholder-gray-400"
                            )}`}
                          />
                        )}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="lastName"
                        className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}
                      >
                        {t("User Surname 1")} <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="artistSurname1"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            required
                            placeholder="Russell"
                            className={`w-full px-4 py-2 text-sm border ${getDarkClass(
                              "border-gray-300",
                              "border-gray-600"
                            )} rounded-lg focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] ${getDarkClass(
                              "bg-white text-gray-900 placeholder-gray-400",
                              "bg-gray-700 text-white placeholder-gray-400"
                            )}`}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <label
                        htmlFor="artistSurname2"
                        className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}
                      >
                        {t("User Surname 2")}
                      </label>
                      <Controller
                        name="artistSurname2"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Zakirsoft"
                            className={`w-full px-4 py-2 text-sm border ${getDarkClass(
                              "border-gray-300",
                              "border-gray-600"
                            )} rounded-lg focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] ${getDarkClass(
                              "bg-white text-gray-900 placeholder-gray-400",
                              "bg-gray-700 text-white placeholder-gray-400"
                            )}`}
                          />
                        )}
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="email" className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}>
                        {t("Email")} <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="email"
                            required
                            placeholder="dianne.russell@gmail.com"
                            className={`w-full px-4 py-2 text-sm border ${getDarkClass(
                              "border-gray-300",
                              "border-gray-600"
                            )} rounded-lg focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] ${getDarkClass(
                              "bg-white text-gray-900 placeholder-gray-400",
                              "bg-gray-700 text-white placeholder-gray-400"
                            )}`}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label htmlFor="phone" className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}>
                      {t("Phone Number")} <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`border ${getDarkClass(
                        "border-gray-300",
                        "border-gray-600"
                      )} rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#EE1D52]`}
                    >
                      <PhoneInput
                        inputClassName={`w-full px-4 py-2 text-sm ${getDarkClass(
                          "bg-white text-gray-900",
                          "bg-gray-700 text-white"
                        )} border-none focus:ring-0`}
                        placeholder={t("Enter phone number")}
                        defaultCountry="in"
                        value={getValues("phone")}
                        onChange={(val) => setValue("phone", val)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <label
                        htmlFor="country"
                        className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}
                      >
                        {t("Country")} <span className="text-red-500">*</span>
                      </label>
                      <CustomDropdown
                        control={control}
                        name="country"
                        options={options}
                        countryValue={countryValue}
                        isActiveStatus="active"
                        dark={dark}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="zipCode"
                        className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}
                      >
                        {t("Zip Code")} <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="zipCode"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            required
                            placeholder="200033"
                            className={`w-full px-4 py-2 text-sm border ${getDarkClass(
                              "border-gray-300",
                              "border-gray-600"
                            )} rounded-lg focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] ${getDarkClass(
                              "bg-white text-gray-900 placeholder-gray-400",
                              "bg-gray-700 text-white placeholder-gray-400"
                            )}`}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <label htmlFor="state" className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}>
                        {t("State")} <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            required
                            placeholder={t("Enter your state")}
                            className={`w-full px-4 py-2 text-sm border ${getDarkClass(
                              "border-gray-300",
                              "border-gray-600"
                            )} rounded-lg focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] ${getDarkClass(
                              "bg-white text-gray-900 placeholder-gray-400",
                              "bg-gray-700 text-white placeholder-gray-400"
                            )}`}
                          />
                        )}
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="city" className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}>
                        {t("City")} <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            required
                            placeholder={t("Enter your city")}
                            className={`w-full px-4 py-2 text-sm border ${getDarkClass(
                              "border-gray-300",
                              "border-gray-600"
                            )} rounded-lg focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] ${getDarkClass(
                              "bg-white text-gray-900 placeholder-gray-400",
                              "bg-gray-700 text-white placeholder-gray-400"
                            )}`}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label htmlFor="address" className={`block mb-2 text-sm font-medium ${getDarkClass("text-gray-700", "text-gray-300")} text-left`}>
                      {t("Address")} <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <div
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${getDarkClass(
                              "text-gray-500",
                              "text-gray-400"
                            )}`}
                          >
                            <FiMapPin />
                          </div>
                          <input
                            {...field}
                            type="text"
                            required
                            placeholder="4140 Parker Rd. Allentown, New Mexico 31134"
                            className={`w-full pl-10 px-4 py-2 text-sm border ${getDarkClass(
                              "border-gray-300",
                              "border-gray-600"
                            )} rounded-lg focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] ${getDarkClass(
                              "bg-white text-gray-900 placeholder-gray-400",
                              "bg-gray-700 text-white placeholder-gray-400"
                            )}`}
                          />
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex mt-6 space-x-3 justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      className={`px-6 py-2 text-sm font-medium ${getDarkClass(
                        "text-gray-700 bg-white border-gray-300 hover:bg-gray-50",
                        "text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600"
                      )} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE1D52]`}
                    >
                      {t("Cancel")}
                    </button>
                    <button type="submit" className="flex rounded-lg bg-[#EE1D52] text-white items-center px-6 py-2" disabled={isPending}>
                      {isPending ? t("Saving...") : t("Save Address")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {(showOtpModal || toPhoneVerify) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto scrollbar mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Verify Your Phone Number</h2>
                <button
                  onClick={() => {
                    setShowOtpModal(false);
                    setToPhoneVerify(false);
                    setOtpSent(false);
                    setOtp("");
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {!otpSent ? (
                  <>
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                      <svg className="h-6 w-6 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-blue-800">We'll send a verification code to your phone number</p>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <PhoneInput
                        inputClassName={`w-full px-4 py-2 text-sm`}
                        placeholder={t("Enter phone number")}
                        defaultCountry="in"
                        value={phoneNumber}
                        onChange={(val) => setPhoneNumber(val)}
                      />
                    </div>

                    <button
                      onClick={handleSendOtp}
                      disabled={!phoneNumber}
                      className={`w-full px-4 py-2 rounded-md font-medium ${
                        !phoneNumber ? "bg-gray-300 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {sendPending ? "Sending..." : "Send Verification Code"}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col bg-green-50 p-3 border border-green-700 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-800 font-medium">Verification code sent!</p>
                      </div>
                      <div className="mt-1">
                        <p className="text-green-700 text-sm">We've sent a 6-digit code to {phoneNumber}. Code will be valid for 15 minutes only.</p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                        Enter Verification Code
                      </label>
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => formatOtp(e.target.value)}
                        maxLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-center text-xl tracking-widest"
                        placeholder="------"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      {countdown > 0 ? (
                        <span className="text-sm text-gray-500">Resend code in {countdown}s</span>
                      ) : (
                        <button onClick={handleResendOtp} className="text-sm text-black hover:text-gray-700 underline">
                          {sendPending ? "Sending..." : "Resend code"}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.length !== 6}
                      className={`w-full px-4 py-2 rounded-md font-medium ${
                        otp.length !== 6 ? "bg-gray-300 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {verifyPending ? "Verifying..." : "Verify & Continue"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAddress;
