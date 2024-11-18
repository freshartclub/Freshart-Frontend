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

  const [isOpen, setIsOpen] = useState(false);
  const [button, setButton] = useState(true);

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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync, isPending } = useBecomeAnArtistMutation();
  const { mutateAsync: sendMail, isPending: sendMailPending } = useSendOtp();
  const { mutateAsync: verifyOtp, isPending: verifyOtpPending } =
    useOtpVerifyMutationBecomeAnArtist();

  const { data, isLoading } = useGetDiscipline();
  const { data: styleData, isLoading: styleLoading } = useGetStyle();

  const dOption = data?.data.map((item) => {
    return item.disciplineName;
  });

  const currentDicipline = watch("discipline");

  const newStyle = styleData?.data.filter(
    (item) =>
      item.discipline &&
      item.discipline.some((newItem) =>
        newItem.disciplineName.includes(currentDicipline)
      )
  );

  const onSubmit = handleSubmit(async (data) => {
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
      await mutateAsync(formData);
    } catch (error) {
      console.error(error.message);
    }
  });

  useEffect(() => {
    watch("phone");
    watch("email");
    if (!errors.email) {
      setEmail(getValues("email"));
    }
  }, [watch("email")]);

  const sendOtp = () => {
    const data = {
      email,
      isArtistRequest: true,
    };

    sendMail(data).then(() => {
      setIsOpen(true);
    });
  };

  const validateOtp = () => {
    const data = {
      otp: inputRef.current.value,
      email,
      isArtistRequest: true,
    };
    verifyOtp(data).then(() => {
      setIsOpen(false);
      setButton(false);
    });
  };

  const EmailVerificationModal = () => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
          <h2 className="text-xl font-bold mb-4">Email Verification</h2>
          <p className="mb-4">
            Please enter the verification code sent to your email.
          </p>
          <input
            type="text"
            className="border rounded w-full py-2 px-3 mb-4"
            placeholder="Verification Code"
            ref={inputRef}
          />
          <div className="flex justify-between">
            <span
              className={`bg-blue-500  text-white px-2 py-3 rounded-md text-sm text-center cursor-pointer`}
              onClick={validateOtp}
            >
              {verifyOtpPending ? "Validating.." : " Validate"}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-[#F9F7F6]">
        <div className="container mx-auto sm:px-6 px-3">
          <div className="xl:w-[70%] lg:w-[90%] w-full mx-auto py-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
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
                    Artist Name
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
                    Email
                  </label>
                  <div className="flex  items-center gap-2">
                    <input
                      {...register("email")}
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter email"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="mb-4 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <PhoneInput
                    className="appearance-none border outline-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                    placeholder="Enter phone number"
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
                    Discipline
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
                    Style
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
                        className="block appearance-none w-full bg-white rounded leading-tight focus:outline-none"
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
                  Country
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
                    Zip Code
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
                    Region
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

                <div className="mb-4 sm:w-[32%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    City
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
                    {ARTIST_SOCIAL_LINKS.map((item, index) => (
                      <option value={item.value}>{item.value}</option>
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
                    Website
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
                    Upload Your CV Here
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
              {}
              <div className="flex items-center justify-end gap-2">
                {!button ? (
                  <Button
                    type="submit"
                    variant={{
                      fontSize: "md",
                      rounded: "full",
                      theme: "dark",
                      fontWeight: "600",
                    }}
                    className={` text-white py-3 px-6 flex uppercase`}
                  >
                    {isPending ? "Submiting..." : "Submit"}

                    <img src={arrow} alt="arrow" className="mt-1 ml-2" />
                  </Button>
                ) : (
                  <span
                    onClick={sendOtp}
                    className="bg-black  text-white w-[8vw] py-3   rounded-md text-sm text-center cursor-pointer"
                  >
                    {sendMailPending ? "Loading..." : "Verify Email "}
                  </span>
                )}
              </div>
            </form>

            <EmailVerificationModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeArtist;
