import { Controller, set, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import P from "../ui/P";
import Header from "../ui/Header";
import browser from "../../assets/cloud-add.png";
// import "react-phone-number-input/style.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "react-select";

import useBecomeAnArtistMutation from "../../http/artist/useBecomeAnArtistMutation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useSendOtp from "../../http/artist/useSendOtp";
import useOtpVerifyMutationBecomeAnArtist from "../../http/artist/useOtpVerifyBecomeAnArtist";
import { useGetDiscipline } from "./http/useGetDiscipline";
import { useGetStyle } from "./http/useGetStyle";

import toast from "react-hot-toast";
import { useGetSocialMediaPicklist } from "./http/useGetSocialMedia";
import ThankYou from "./ThankYou";

import MapWithAutocomplete, {
  getCityStateFromZipCountry,
} from "../utils/MapWithAutocomplete";
import EmailVerification from "./Pop";

import PhoneVerification from "./PhoneVerification";

import countryList from "react-select-country-list";
import useGetPhone from "./http/useGetPhoneOtp";
import usePhoneOtpVerify from "./http/useVerifyPhoneOtp";

import CustomDropdown from "./CustomDropdown";
import { useAppSelector } from "../../store/typedReduxHooks";

const BecomeArtist = () => {
  const validationSchema = Yup.object().shape({
    artistName: Yup.string().required("Artist Name is required"),
    artistSurname1: Yup.string(),
    artistSurname2: Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone Number is required"),
    discipline: Yup.string().required("Discipline is required"),
    style: Yup.array().required("Style is required"),
    zipCode: Yup.string().required("ZipCode is required"),
    city: Yup.string().required("City is required"),
    region: Yup.string().required("Region is required"),
    country: Yup.string().required("Country is required"),
    socialMedia: Yup.string().optional(),
    uploadDocs: Yup.mixed().required("CV upload is required"),
  });

  const [uploadDocs, setUploadDocs] = useState(null);

  const [isOtpVerify, setIsOtpVerify] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const [countryCode, setCountryCode] = useState("in");
  const [validateEmail, setValidateEmail] = useState("Verify Email");
  const [validatePhone, setValidatePhone] = useState("Send Code");
  const [validateotp, setValidateotp] = useState("Validate Otp");
  const [filterStyle, setFilterStyle] = useState(null);
  const [validateError, setValidateError] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPhone, setIsModalOpenPhone] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const options = useMemo(() => countryList(), []);

  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    watch,
    trigger,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });

  const { mutateAsync, isPending } = useBecomeAnArtistMutation();
  const { mutateAsync: sendMail, isPending: sendMailPending } = useSendOtp();
  const { mutateAsync: verifyOtp, isPending: verifyOtpPending } =
    useOtpVerifyMutationBecomeAnArtist();

  const { mutateAsync: requestOtp, isPending: requestOtpPending } =
    useGetPhone();

  const { mutateAsync: verifyPhoneOtp, isPending: verifyPhoneOtpPending } =
    usePhoneOtpVerify();

  const { data: socialMediaPicklist, isLoading: socialMediaPicklistLoading } =
    useGetSocialMediaPicklist();

  const { data, isLoading } = useGetDiscipline();
  const { data: styleData, isLoading: styleLoading } = useGetStyle();

  const diciplineOption = data?.data.map((item) => {
    return item.disciplineName;
  });

  const watchEmail = watch("email");
  const watchDicipline = watch("discipline");

  const GetOutSocialMedia = socialMediaPicklist?.data?.filter(
    (item) => item.picklistName === "Social Media"
  );

  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  useEffect(() => {
    if (user) {
      setValue("artistName", user?.artistName);
      setValue("artistSurname1", user?.artistSurname1);
      setValue("artistSurname2", user?.artistSurname2);
      setValue("email", user?.email);
      setValue("phone", user?.phone);
      setValue("zipCode", user?.address?.zipCode);
      setValue("city", user?.address?.city);
      setValue("region", user?.address?.state);
      setValue("country", user?.address?.country);

      setValidateEmail(
        user?.isEmailVerified ? "Email Verified" : "Verify Email"
      );
    }
  }, [user]);

  useEffect(() => {
    if (watchDicipline) {
      const newStyle = styleData?.data?.filter(
        (item) =>
          item.discipline &&
          item.discipline.some((newItem) =>
            newItem.disciplineName.includes(getValues("discipline"))
          )
      );

      setFilterStyle(newStyle);
      setValue("style", "");
    }
  }, [watchDicipline]);

  const zipCode = watch("zipCode");
  const country = watch("country");
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (country && zipCode && zipCode.length > 4) {
      getCityStateFromZipCountry(country, zipCode, apiKey).then(
        ({ state, city }) => {
          setValue("city", city);
          setValue("region", state);
        }
      );
    }
  }, [country, zipCode]);

  useEffect(() => {
    watch("phone");
  }, []);

  const emails = getValues("email");
  const phones = getValues("phone");

  const handleRevalidateEmail = async () => {
    const result = await trigger("email");

    if (!result) {
      return toast("Email Is Not Valid");
    }

    const data = {
      email: emails || email,
      isArtistRequest: true,
    };

    sendMail(data).then(() => {
      setIsModalOpen(true);
      setVerificationCode("");
    });
  };

  console.log(email);

  const handleRevalidatePhone = async () => {
    const result = await trigger("phone");

    if (!result) {
      return toast("Phone Number Is Not Valid");
    }

    const data = {
      email: emails,
      otp: verificationCode,
    };

    verifyPhoneOtp(data).then(() => {
      setOtpSent(true);
      setValidatePhone("Verified");

      setIsModalOpenPhone(false);
      setVerificationCode("");
    });
  };

  const validateEmailOtp = () => {
    const data = {
      otp: verificationCode,
      email,
      isArtistRequest: true,
    };

    verifyOtp(data).then(() => {
      // setEmail(email);
      setIsOtpVerify(true);
      setIsModalOpen(false);
      setValidateEmail("Email Verified");
      setValidateotp("Validated");
      setVerificationCode("");
    });
  };

  const handleSendOtp = () => {
    try {
      const data = {
        email: emails,
        phone: phones,
      };
      console.log(data);
      requestOtp(data).then(() => {
        setIsModalOpenPhone(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!isOtpVerify) {
      return toast("Please Verify Otp");
    }

    if (email !== watchEmail) {
      setValidateEmail("Verify Email");
      setValidateotp("Validate Otp");
      setIsOtpVerify(false);
      return toast("Email Is Changed Re-Verify Please");
    }

    console.log("onSumbit", data);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "uploadDocs" && uploadDocs) {
        formData.append(key, uploadDocs);
      } else if (key === "style") {
        const styleValue = Array.isArray(data[key])
          ? data[key].map((item) => item.value)
          : typeof data[key] === "object"
          ? [data[key].value]
          : [data[key]];

        styleValue.forEach((value) => {
          formData.append("style", value);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      await mutateAsync(formData).then(() => {
        setPopUp(true);
      });
    } catch (error) {
      console.error(error.message);
    }
  });

  const handleCloseModel = () => {
    setIsModalOpen(false);
    if (!isOtpVerify) {
      setValidateEmail("Verify Email");
      setValidateotp("Validate Otp");
      setIsOtpVerify(false);
    }
  };

  const validateWebsite = (value) => {
    const checkValue = value.target.value;
    if (!/^https?:\/\//i.test(checkValue)) {
      console.log("hello");
      setValidateError("URL must start with 'https://'");
      return "URL must start with 'https://'";
    }
    setValidateError("");
    return true;
  };

  return (
    <>
      <div className="relative">
        <div
          className={`${
            popUp ? "bg-[#F9F7F6] pointer-events-none blur-sm" : "bg-[#F9F7F6]"
          }`}
        >
          <div className="container mx-auto sm:px-6 px-3">
            <div className="xl:w-[70%] lg:w-[90%] w-full mx-auto py-10">
              <form
                onSubmit={onSubmit}
                className="bg-white rounded px-8 pt-6 pb-8 mb-4"
              >
                <Header
                  variant={{ size: "3xl", weight: "bold", theme: "dark" }}
                  className="text-center mb-4"
                >
                  Become an artist
                </Header>
                <P
                  variant={{ size: "md", theme: "dark", weight: "normal" }}
                  className="text-sm text-gray-600 mb-8 text-center"
                >
                  Please fill the form below to become an artist. Feel free to
                  add as much detail as needed. Our admin will contact you.
                </P>

                <div className="flex sm:flex-row flex-col justify-between">
                  <div className="mb-4 sm:w-[32%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Artist Name *
                    </label>
                    <input
                      {...register("artistName")}
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter Artist Name"
                    />
                    {errors.aritstName && (
                      <span className="text-red-500 text-xs">
                        {errors.artistName.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4 sm:w-[32%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Aritst Surname 1
                    </label>
                    <input
                      {...register("artistSurname1")}
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter Artist Surname 1"
                    />
                    {errors.artistSurname1 && (
                      <span className="text-red-500 text-xs">
                        {errors.artistSurname1.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 sm:w-[32%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Artist Surname 2
                    </label>
                    <input
                      {...register("artistSurname2")}
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter Artist Surname 2"
                    />
                    {errors.artistSurname2 && (
                      <span className="text-red-500 text-xs">
                        {errors.artistSurname2.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-row flex-col justify-between w-full">
                  <div className="sm:mb-4 mb-2 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email *
                    </label>

                    <div className="flex w-full gap-2">
                      <input
                        {...register("email")}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder="Enter email"
                      />

                      <EmailVerification
                        setVerificationCode={setVerificationCode}
                        verificationCode={verificationCode}
                        validateEmailOtp={validateEmailOtp}
                        verifyOtpPending={verifyOtpPending}
                        handleRevalidateEmail={handleRevalidateEmail}
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                        sendMailPending={sendMailPending}
                        validateEmail={validateEmail}
                        handleCloseModel={handleCloseModel}
                        watchEmail={email}
                      />
                    </div>

                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4 w-full">
                  <div className="sm:mb-4 mb-2 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phone Number *
                    </label>
                    <div className="flex  flex-row w-full gap-2">
                      <PhoneInput
                        className="appearance-none  outline-none rounded py-1   w-full text-gray-700 leading-tight focus:outline-none"
                        placeholder="Enter phone number"
                        defaultCountry={countryCode}
                        value={getValues("phone")}
                        onChange={(val) => setValue("phone", val)}
                      />

                      <PhoneVerification
                        handleSendOtp={handleSendOtp}
                        requestOtpPending={requestOtpPending}
                        isModalOpenPhone={isModalOpenPhone}
                        setIsModalOpenPhone={setIsModalOpenPhone}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        handleRevalidatePhone={handleRevalidatePhone}
                        verifyPhoneOtpPending={verifyPhoneOtpPending}
                        isOtpVerify={isOtpVerify}
                        setVerificationCode={setVerificationCode}
                        verificationCode={verificationCode}
                        validatePhone={validatePhone}
                        validateEmail={validateEmail}
                      />
                    </div>

                    {errors.phone && (
                      <span className="text-red-500 text-xs">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-row flex-col justify-between">
                  <div className="mb-4 sm:w-[49%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Discipline *
                    </label>
                    <select
                      {...register("discipline")}
                      className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none"
                    >
                      <option value="">Select Discipline</option>
                      {isLoading
                        ? "Loading..."
                        : diciplineOption?.map((item, i) => (
                            <option className="text-black" value={item}>
                              {item}
                            </option>
                          ))}
                    </select>
                    {errors.discipline && (
                      <span className="text-red-500 text-xs">
                        {errors.discipline.message}
                      </span>
                    )}
                  </div>

                  <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Style *
                    </label>

                    <Controller
                      name="style"
                      control={control}
                      rules={{ required: "style is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isMulti
                          options={filterStyle?.map((item: string) => ({
                            value: item.styleName,
                            label: item.styleName,
                          }))}
                          className="block appearance-none w-full bg-white rounded leading-tight focus:outline-none lg:py-1"
                        />
                      )}
                    />

                    {errors.style && (
                      <span className="text-red-500 text-xs">
                        {errors.style.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country *
                  </label>

                  {/* <div
                  className="block  appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none"
                  {...register("country")}
                > */}
                  <CustomDropdown
                    control={control}
                    options={options}
                    name="country"
                    isActiveStatus="active"
                  />
                  {/* </div> */}

                  {errors.value && (
                    <span className="text-red-500 text-xs">
                      {errors.value.message}
                    </span>
                  )}
                </div>

                <div className="flex sm:flex-row flex-col justify-between">
                  <div className="mb-4 sm:w-[32%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Zip Code *
                    </label>
                    <input
                      {...register("zipCode")}
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter ZipCode"
                    />
                    {errors.zipCode && (
                      <span className="text-red-500 text-xs">
                        {errors.zipCode.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 sm:w-[32%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      City *
                    </label>
                    <input
                      {...register("city")}
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter City"
                    />
                    {errors.city && (
                      <span className="text-red-500 text-xs">
                        {errors.city.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 sm:w-[32%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Region *
                    </label>
                    <input
                      {...register("region")}
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter Region"
                    />
                    {errors.region && (
                      <span className="text-red-500 text-xs">
                        {errors.region.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-row flex-col justify-between">
                  <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Social Media Reference
                    </label>
                    <select
                      {...register("socialMedia")}
                      className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none"
                    >
                      <option value="">Select Social Media</option>
                      {socialMediaPicklistLoading ? (
                        <option>Loding...</option>
                      ) : (
                        GetOutSocialMedia[0]?.picklist?.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        ))
                      )}
                    </select>
                    {errors.socialMedia && (
                      <span className="text-red-500 text-xs">
                        {errors.socialMedia.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 sm:w-[49%] w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      URL
                    </label>
                    <input
                      {...register("website", {
                        required: "Website URL is required",
                      })}
                      onChange={(val) => validateWebsite(val)}
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="www.example.com"
                    />

                    <span className="text-red-500 text-xs">
                      {validateError && validateError}
                    </span>
                  </div>
                </div>

                <div className="mb-8 ">
                  <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer  ">
                    <div className="flex justify-center items-center">
                      <img src={browser} alt="browse-icon" />
                    </div>
                    <label className="block text-gray-700 sm:text-xl text-lg font-bold mb-2 text-center ">
                      Upload Your CV Here *
                    </label>
                    <input
                      {...register("uploadDocs", { required: true })}
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      className=""
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setUploadDocs(file);
                      }}
                      id="file-upload"
                    />
                    <p className="text-gray-600 sm:text-md text-base mt-4">
                      PDF, DOC, and Excel formats, up to 5MB
                    </p>
                    {errors.uploadDocs && (
                      <span className="text-red-500 text-xs">
                        {errors.uploadDocs.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="px-5 py-3 bg-black text-white rounded-md font-bold text-sm "
                    type="submit"
                  >
                    {isPending ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-[50%] ">
          {popUp ? <ThankYou /> : null}
        </div>
      </div>
    </>
  );
};

export default BecomeArtist;
