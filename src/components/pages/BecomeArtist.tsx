import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import P from "../ui/P";
import Header from "../ui/Header";
import browser from "../../assets/cloud-add.png";
import Button from "../ui/Button";
import arrow from "../../assets/arrow.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";

import useBecomeAnArtistMutation from "../../http/artist/useBecomeAnArtistMutation";
import { useEffect, useRef, useState } from "react";
import { style } from "../utils/selectedField";
import useSendOtp from "../../http/artist/useSendOtp";
import useOtpVerifyMutationBecomeAnArtist from "../../http/artist/useOtpVerifyBecomeAnArtist";
import { useGetDiscipline } from "./http/useGetDiscipline";
import { useGetStyle } from "./http/useGetStyle";
import { ARTIST_SOCIAL_LINKS } from "../utils/mockData";
import SocialMediaLinks from "../ArtistPanel/ArtistEditProfile/GeneralSocial";
import toast from "react-hot-toast";
import { useGetSocialMediaPicklist } from "./http/useGetSocialMedia";
import ThankYou from "./ThankYou";

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
    website: Yup.mixed(),
  });

  const [uploadDocs, setUploadDocs] = useState(null);

  const [isOtpVerify, setIsOtpVerify] = useState(false);
  const [popUp, setPopUp] = useState(true);
  const [geoLocation, setGeoLocation] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [validateEmail, setValidateEmail] = useState("Verify Email");
  const [validateotp, setValidateotp] = useState("Validate Otp");

  const [email, setEmail] = useState("");

  const inputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });

  const { mutateAsync, isPending } = useBecomeAnArtistMutation();
  const { mutateAsync: sendMail, isPending: sendMailPending } = useSendOtp();
  const { mutateAsync: verifyOtp, isPending: verifyOtpPending } =
    useOtpVerifyMutationBecomeAnArtist();

  const { data: socialMediaPicklist, isLoading: socialMediaPicklistLoading } =
    useGetSocialMediaPicklist();

  const { data, isLoading } = useGetDiscipline();
  const { data: styleData, isLoading: styleLoading } = useGetStyle();

  const dOption = data?.data.map((item) => {
    return item.disciplineName;
  });

  const watchEmail = watch("email");

  const currentDicipline = watch("discipline");

  const GetOutSocialMedia = socialMediaPicklist?.data?.filter(
    (item) => item.picklistName === "Social Media"
  );

  const newStyle = styleData?.data?.filter(
    (item) =>
      item.discipline &&
      item.discipline.some((newItem) =>
        newItem.disciplineName.includes(getValues("discipline"))
      )
  );

  useEffect(() => {
    watch("phone");
    watch("email");
    if (!errors.email) {
      setEmail(getValues("email"));
    }

    const getGeoLocation = async () => {
      const request = await fetch("https://ipapi.co/json");
      const jsonResponse = await request.json();
      setGeoLocation(jsonResponse);
    };

    getGeoLocation();
  }, []);

  useEffect(() => {
    setValue("country", geoLocation?.country_name);
    setValue("city", geoLocation?.city);
    setValue("region", geoLocation?.region);
    setCountryCode(geoLocation?.country);
  }, [geoLocation]);

  const handleRevalidateEmail = async () => {
    const result = await trigger("email");

    if (!result) {
      return toast("Email Is Not Valid");
    }

    const data = {
      email,
      isArtistRequest: true,
    };

    sendMail(data).then(() => {
      setValidateEmail("Resend");
    });
  };

  const validateOtp = () => {
    const data = {
      otp: inputRef.current.value,
      email,
      isArtistRequest: true,
    };

    if (data.otp !== inputRef.current.value) {
      return alert("Please Verify Otp");
    }

    verifyOtp(data).then(() => {
      setIsOtpVerify(true);
      setValidateotp("Validated");
    });
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

  return (
    <>
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
                Please fill the form below to become an artist. Feel free to add
                as much detail as needed. Our admin will contact you.
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

              <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full ">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email *
                  </label>

                  <div className="flex w-full justify-between  items-center gap-2 ">
                    <input
                      {...register("email")}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none border rounded lg:w-[16vw]  py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter email"
                    />
                    <span
                      onClick={() => handleRevalidateEmail()}
                      className="px-2 border border-zinc-800 rounded py-3 text-sm font-bold cursor-pointer"
                    >
                      {sendMailPending ? "Sending Otp..." : `${validateEmail}`}
                    </span>
                  </div>

                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full ">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enter Otp
                  </label>

                  <div className="flex  items-center gap-2 w-full justify-between">
                    <input
                      className="appearance-none border rounded w-[14vw]  py-3 px-5 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter Otp"
                      ref={inputRef}
                    />

                    <span
                      onClick={validateOtp}
                      className="px-5 border border-zinc-800 rounded py-3  text-sm font-bold cursor-pointer"
                    >
                      {verifyOtpPending ? "Validating..." : `${validateotp}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="mb-4 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number *
                  </label>
                  <PhoneInput
                    className="appearance-none border outline-none rounded  py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                    placeholder="Enter phone number"
                    defaultCountry={countryCode}
                    value={getValues("phone")}
                    onChange={(val) => setValue("phone", val)}
                  />

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
                      : dOption?.map((item, i) => (
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
                        options={newStyle?.map((item, i) => ({
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
                <input
                  {...register("country")}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Enter Country"
                />
                {errors.country && (
                  <span className="text-red-500 text-xs">
                    {errors.country.message}
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
                    {GetOutSocialMedia &&
                      GetOutSocialMedia.length > 0 &&
                      GetOutSocialMedia[0]?.picklist?.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  {errors.socialMedia && (
                    <span className="text-red-500 text-xs">
                      {errors.socialMedia.message}
                    </span>
                  )}
                </div>

                <div className="mb-4 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Links
                  </label>
                  <input
                    {...register("website")}
                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                    placeholder="www.example.com"
                  />
                  {errors.website && (
                    <span className="text-red-500 text-xs">
                      {errors.website.message}
                    </span>
                  )}
                </div>
              </div>
              {/* <SocialMediaLinks control={control} /> */}

              <div className="mb-8">
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer">
                  <div className="flex justify-center items-center">
                    <img src={browser} alt="browse-icon" />
                  </div>
                  <label className="block text-gray-700 sm:text-xl text-lg font-bold mb-2 text-center">
                    Upload Your CV Here *
                  </label>
                  <input
                    {...register("uploadDocs", { required: true })}
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        {popUp ? <ThankYou /> : null}
      </div>
    </>
  );
};

export default BecomeArtist;
