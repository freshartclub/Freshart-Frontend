import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import GeneralSocial from "./GeneralSocial";
import GeneralMedia from "./GeneralMedia";
import CVForm from "./CVForm";
import { json, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../store/typedReduxHooks";
import useGetSaveArtistDetailsMutation from "./http/useGetSaveArtistDetails";
import { useGetArtistDetails } from "../../UserProfile/http/useGetDetails";
import Loader from "../../ui/Loader";
import Invoice from "./Invoice";
import Logistics from "./Logistics";
import PhoneInput from "react-phone-number-input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-phone-number-input/style.css";

const GeneralForm = () => {
  const { data, isLoading } = useGetArtistDetails();
  const dataaa = useAppSelector((state) => state.user.user);

  console.log("this is coming from state", dataaa);

  const { mutate, isPending } = useGetSaveArtistDetailsMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      artistName: data?.data?.artist?.artistName || "",
      artistSurname1: data?.data?.artist?.artistSurname1 || "",
      artistSurname2: data?.data?.artist?.artistSurname2 || "",
      nickName: data?.data?.artist?.nickName || "",

      country: data?.data?.artist?.address?.country || "Spain",
      zip: data?.data?.artist?.address?.zipCode || "",
      city: data?.data?.artist?.address?.city || "",
      stateRegion: data?.data?.artist?.address?.state || "",
      phoneNumber: data?.data?.artist?.phone || "",
      address: data?.data?.artist?.address?.residentialAddress || "",
      email: data?.data?.artist?.email || "",
      language: data?.data?.artist?.language || [],
      gender: data?.data?.artist?.gender || "",
      about: data?.data?.artist?.aboutArtist?.about || "",

      additionalImage: data?.data?.artist?.profile?.additionalImage || "",
      additionalVideo: data?.data?.artist?.profile?.mainVideo || "",
      cvEntries: data?.data?.artist?.highlights?.cv || "",
      accounts: data?.data?.artist?.links || "",
      insignia: data?.data?.artist?.insignia || "",
      taxAddress: data?.data?.artist?.invoice?.taxAddress || "",
      taxBankIBAN: data?.data?.artist?.invoice?.taxBankIBAN || "",

      taxBankName: data?.data?.artist?.invoice?.taxBankName || "",

      taxCity: data?.data?.artist?.invoice?.taxCity || "",

      taxCountry: data?.data?.artist?.invoice?.taxCountry || "",

      taxEmail: data?.data?.artist?.invoice?.taxEmail || "",

      taxLegalName: data?.data?.artist?.invoice?.taxLegalName || "",

      taxNumber: data?.data?.artist?.invoice?.taxNumber || "",

      taxPhone: data?.data?.artist?.invoice?.taxPhone || "",
      taxProvince: data?.data?.artist?.invoice?.taxProvince || "",

      taxZipCode: data?.data?.artist?.invoice?.taxZipCode || "",
      addHighlights: data?.data?.artist?.highlights?.addHighlights || "",
    },
  });

  useEffect(() => {
    console.log("I will run first");

    if (data) {
      setValue("gender", data?.data?.artist?.gender || "");
      setValue("insignia", data?.data?.artist?.insignia || "");
      setValue("taxAddress", data?.data?.artist?.invoice?.taxAddress || "");
      setValue("taxAddress", data?.data?.artist?.invoice?.taxAddress || "");

      setValue("taxBankIBAN", data?.data?.artist?.invoice?.taxBankIBAN || "");

      setValue("taxBankName", data?.data?.artist?.invoice?.taxBankName || "");

      setValue("taxCity", data?.data?.artist?.invoice?.taxCity || "");

      setValue("taxCountry", data?.data?.artist?.invoice?.taxCountry || "");

      setValue("taxEmail", data?.data?.artist?.invoice?.taxEmail || "");
      setValue("taxLegalName", data?.data?.artist?.invoice?.taxLegalName || "");

      setValue("taxNumber", data?.data?.artist?.invoice?.taxNumber || "");

      setValue("taxPhone", data?.data?.artist?.invoice?.taxPhone || "");

      setValue("taxProvince", data?.data?.artist?.invoice?.taxProvince || "");

      setValue("taxZipCode", data?.data?.artist?.invoice?.taxZipCode || "");

      setValue("logAddress", data?.data?.artist?.logistics?.logAddress || "");

      setValue("logCity", data?.data?.artist?.logistics?.logCity || "");
      setValue("logCountry", data?.data?.artist?.logistics?.logCountry || "");
      setValue("logEmail", data?.data?.artist?.logistics?.logEmail || "");
      setValue("logName", data?.data?.artist?.logistics?.logName || "");
      setValue("logNotes", data?.data?.artist?.logistics?.logNotes || "");
      setValue("logPhone", data?.data?.artist?.logistics?.logPhone || "");

      setValue("logProvince", data?.data?.artist?.logistics?.logProvince || "");

      setValue("logZipCode", data?.data?.artist?.logistics?.logZipCode || "");

      setValue("language", data?.data?.artist?.language || "");
      setValue("artistSurname1", data?.data?.artist?.artistSurname1 || "");
      setValue("artistSurname2", data?.data?.artist?.artistSurname2 || "");
      setValue("nickName", data?.data?.artist?.nickName || "");

      setValue("artistName", data?.data?.artist?.artistName || "");
      setValue("country", data?.data?.artist?.address?.country || "Spain");
      setValue("zip", data?.data?.artist?.zipCode || "");
      setValue("city", data?.data?.artist?.address?.city || "");
      setValue("stateRegion", data?.data?.artist?.address?.state || "");
      setValue("zip", data?.data?.artist?.address?.zipCode || "");
      setValue("phoneNumber", data?.data?.artist?.phone || "");
      setValue(
        "address",
        data?.data?.artist?.address?.residentialAddress || ""
      );
      setValue("email", data?.data?.artist?.email || "");
      setValue("about", data?.data?.artist?.aboutArtist?.about || "");
      setValue("language", data?.data?.artist?.language || []);
      setValue("gender", data?.data?.artist?.gender || "");
      setValue("accounts", data?.data?.artist?.links || "");
      setValue(
        "addHighlights",
        data?.data?.artist?.highlights?.addHighlights || ""
      );

      setValue("cvEntries", data?.data?.artist?.highlights?.cv || "");
      setValue(
        "additionalImage",
        data?.data?.artist?.profile?.additionalImage || []
      );
      setValue("additionalVideo", data?.data?.artist?.profile?.mainVideo || "");
    }
  }, [data]);

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          if (key === "cvEntries" || key === "accounts") {
            formData.append(key, JSON.stringify(item));
          } else {
            formData.append(key, item);
          }
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      mutate(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-[70%] flex shadow-lg justify-center items-center">
      <div className="rounded-md w-full bg-white">
        <div className="xl:p-4 lg:p-3 md:p-4 p-3 w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Fullname"
                  {...register("artistName", { required: "Name is required" })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Artist Name
                </label>
                {errors.artistName && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.artistName?.message || "")}</div>
                  </div>
                )}
              </div>
              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Enter Your Email id"
                  {...register("artistSurname1", {
                    required: "Email is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                />
                <label
                  htmlFor="artistSurname1"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Artist Surname1
                </label>
                {errors.artistSurname1 && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.artistSurname1?.message || "")}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Fullname"
                  {...register("artistSurname2", {
                    required: "Name is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                />
                <label
                  htmlFor="artistSurname2"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Artist Surname2
                </label>
                {errors.artistSurname2 && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.artistSurname2?.message || "")}</div>
                  </div>
                )}
              </div>
              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Enter Your Email id"
                  {...register("nickName", {
                    required: "nickName is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                />
                <label
                  htmlFor="nickName"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Nickname
                </label>
                {errors.nickName && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.nickName?.message || "")}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full gap-4 mb-4">
              <div className="md:w-[48%] lg:w-full w-full relative">
                <input
                  type="text"
                  // placeholder="Fullname"
                  {...register("email", {
                    required: "Name is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Email
                </label>
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.email?.message || "")}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
              <div className="md:w-[48%] w-full relative">
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md focus:outline-none peer placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                >
                  <option value="" label="Select a country" />
                  <option value="Female" label="Female" />
                  <option value="Male" label="Male" />
                  <option value="Other" label="Other" />
                </select>
                <label
                  htmlFor="gender"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Gender
                </label>
                {errors.gender && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.gender?.message || "")}</div>
                  </div>
                )}
              </div>
              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Enter Your Email id"
                  {...register("language", {
                    required: "language is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                />
                <label
                  htmlFor="language"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Language
                </label>
                {errors.language && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.language?.message || "")}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
              <div className="md:w-[48%] w-full relative">
                <PhoneInput
                  className="appearance-none border flex outline-none rounded  py-3 px-3 text-gray-700 leading-tight text-sm"
                  placeholder="Enter phone number"
                  value={getValues("phoneNumber")}
                  onChange={(val) => setValue("phoneNumber", val)}
                />
                <label
                  htmlFor="phoneNumber"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Phone Number
                </label>

                {errors.phoneNumber && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.phoneNumber?.message || "")}</div>
                  </div>
                )}
              </div>

              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Enter Your Adress"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500"
                />
                <label
                  htmlFor="address"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Address
                </label>
                {errors.address && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.address?.message || "")}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
              <div className="md:w-[48%] w-full relative">
                <select
                  {...register("country", {
                    required: "Country is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md focus:outline-none peer placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                >
                  <option value="" label="Select a country" />
                  <option value="United States" label="United States" />
                  <option value="Canada" label="Canada" />
                  <option value="Australia" label="Australia" />
                  <option value="United Kingdom" label="United Kingdom" />
                  <option value="Germany" label="Germany" />
                  <option value="India" label="India" />
                </select>
                <label
                  htmlFor="country"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Country
                </label>
                {errors.country && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.country?.message || "")}</div>
                  </div>
                )}
              </div>
              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Enter your country"
                  {...register("stateRegion", {
                    required: "State/Region is required",
                  })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                />
                <label
                  htmlFor="stateRegion"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  State/Region
                </label>
                {errors.stateRegion && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.stateRegion?.message || "")}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Enter Your City"
                  {...register("city", { required: "City is required" })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                />
                <label
                  htmlFor="city"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  City
                </label>
                {errors.city && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.city?.message || "")}</div>
                  </div>
                )}
              </div>
              <div className="md:w-[48%] w-full relative">
                <input
                  type="text"
                  // placeholder="Enter Your Zip Code"
                  {...register("zip", { required: "Zip Code is required" })}
                  className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                />
                <label
                  htmlFor="zip"
                  className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                >
                  Zip Code
                </label>
                {errors.zip && (
                  <div className="text-red-500 text-sm mt-1">
                    <div>{String(errors.zip?.message || "")}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full relative">
              <Controller
                name="about"
                control={control}
                defaultValue="" // Set default value if any
                render={({ field }) => (
                  <div className="relative">
                    <ReactQuill
                      {...field} // Pass field props to ReactQuill
                      className="border border-[#E6E6E6] p-3 w-full rounded-md"
                      theme="snow" // Choose a Quill theme
                      placeholder="Write about yourself..." // Custom placeholder
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["bold", "italic", "underline"],
                          [{ align: [] }],
                          ["link"],
                        ],
                      }}
                    />
                    <label
                      htmlFor="about"
                      className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                    >
                      About
                    </label>
                  </div>
                )}
              />

              {/* <textarea
                rows={3}
                // placeholder="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci."
                {...register("about")}
                className="border border-[#E6E6E6] outline-none p-3 w-full rounded-md placeholder:font-montserrat font-normal text-left placeholder:text-[#1C252E]"
              />
              <label
                htmlFor="about"
                className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
              >
                About
              </label> */}
            </div>

            <GeneralSocial control={control} />
            <GeneralMedia control={control} />
            <CVForm control={control} />
            <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1C21]">
                Insignia
              </h2>
              <div className="flex gap-2 items-center justify-center">
                {data?.data?.artist?.insignia.map((item, i) => (
                  <div>
                    <img
                      src={`${data.data.url}/uploads/users/${item.insigniaImage}`}
                      alt=""
                      className="w-[10vw] h-[10vh]"
                    />
                    <h1>{item.credentialName}</h1>
                  </div>
                ))}
              </div>
            </div>

            <Invoice control={control} />
            <Logistics control={control} />
            <div className="flex flex-wrap justify-end items-center gap-4 mt-8">
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-zinc-900 text-white font-medium py-2 px-4 rounded-md"
              >
                {isPending ? "Loading..." : " Save Changes"}
              </button>
              {/* <Link
                  to="/dashboard"
                  className="text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-md"
                >
                  Cancel
                </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralForm;
