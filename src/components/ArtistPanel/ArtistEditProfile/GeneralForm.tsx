import React, { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import GeneralSocial from "./GeneralSocial";
import GeneralMedia from "./GeneralMedia";
import CVForm from "./CVForm";

import useGetSaveArtistDetailsMutation from "./http/useGetSaveArtistDetails";
import { useGetArtistDetails } from "../../UserProfile/http/useGetDetails";
import Loader from "../../ui/Loader";
import Invoice from "./Invoice";
import Logistics from "./Logistics";
import PhoneInput from "react-phone-number-input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-phone-number-input/style.css";
import { FaEye } from "react-icons/fa";

import "react-country-state-city/dist/react-country-state-city.css";

import dayjs from "dayjs";
import MapWithAutocomplete, {
  getCityStateFromZipCountry,
} from "../../utils/MapWithAutocomplete";
import countryList from "react-select-country-list";
import { Country, State, City } from "country-state-city";

import Select from "react-select";
import Flag from "react-world-flags";
import CustomDropdown from "../../pages/CustomDropdown";
import Dicipline from "./Dicipline";

const GeneralForm = ({ isActiveStatus }) => {
  const { data, isLoading } = useGetArtistDetails();
  const { mutate, isPending } = useGetSaveArtistDetailsMutation();
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isManagerDetails, setManagerDetails] = useState(null);
  const [tags, setTags] = useState([]);
  const options = useMemo(() => countryList(), []);

  const methods = useForm();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    register,
    trigger,
    formState: { errors },
  } = methods;

  useEffect(() => {
    watch("country");
  }, []);

  useEffect(() => {
    if (!data) return;
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
    setValue("country", data?.data?.artist?.address?.country || "");
    setValue("zip", data?.data?.artist?.zipCode || "");
    setValue("city", data?.data?.artist?.address?.city || "");
    setValue("stateRegion", data?.data?.artist?.address?.state || "");
    setValue("zip", data?.data?.artist?.address?.zipCode || "");
    setValue("phoneNumber", data?.data?.artist?.phone || "");
    setValue("address", data?.data?.artist?.address?.residentialAddress || "");
    setValue("email", data?.data?.artist?.email || "");
    setValue("about", data?.data?.artist?.aboutArtist?.about || "");
    setValue("language", data?.data?.artist?.language || []);
    setValue("gender", data?.data?.artist?.gender || "");
    setValue("accounts", data?.data?.artist?.links || "");
    setValue("highlights", data?.data?.artist?.highlights?.addHighlights || "");
    setValue("vatAmount", data?.data?.artist?.invoice?.vatAmount || "");
    setValue("discipline", data?.data?.artist?.aboutArtist?.discipline || "");

    setValue("cvEntries", data?.data?.artist?.highlights?.cv || "");
    // we will have to fix it
    setValue("documentName", data?.data?.artist?.documents?.documentName || []);
    setValue("externalTags", data?.data?.artist?.otherTags?.extTags);
    setValue(
      "lastRevalidationDate",
      dayjs(data?.data?.artist?.lastRevalidationDate).format("YYYY-MM-DD") || ""
    );

    setValue(
      "nextRevalidationDate",
      dayjs(data?.data?.artist?.nextRevalidationDate).format("YYYY-MM-DD") || ""
    );

    setValue(
      "managerName",
      data?.data?.artist?.managerDetails?.managerName || ""
    );

    setValue(
      "managerLanguage",
      data?.data?.artist?.managerDetails?.language || []
    );

    setValue(
      "managerAddress",
      data?.data?.artist?.managerDetails?.address?.address || ""
    );
    setValue(
      "managerCity",
      data?.data?.artist?.managerDetails?.address?.city || ""
    );
    setValue(
      "managerCountry",
      data?.data?.artist?.managerDetails?.address?.country || ""
    );
    setValue(
      "managerState",
      data?.data?.artist?.managerDetails?.address?.state || ""
    );
    setValue(
      "managerZipCode",
      data?.data?.artist?.managerDetails?.address?.zipCode || ""
    );

    setValue(
      "managerEmail",
      data?.data?.artist?.managerDetails?.managerEmail || ""
    );
    setValue(
      "managerGender",
      data?.data?.artist?.managerDetails?.managerGender || ""
    );
    setValue(
      "managerPhone",
      data?.data?.artist?.managerDetails?.managerPhone || ""
    );

    setValue(
      "emergencyContactAddress",
      data?.data?.artist?.emergencyInfo?.emergencyContactAddress || ""
    );

    setValue(
      "emergencyContactEmail",
      data?.data?.artist?.emergencyInfo.emergencyContactEmail || ""
    );

    setValue(
      "emergencyContactName",
      data?.data?.artist?.emergencyInfo.emergencyContactName || ""
    );

    setValue(
      "emergencyContactPhone",
      data?.data?.artist?.emergencyInfo.emergencyContactPhone || ""
    );

    setValue(
      "emergencyContactRelation",
      data?.data?.artist?.emergencyInfo.emergencyContactRelation || ""
    );
    setValue("additionalImage", []);
    setValue(
      "existingAdditionalImage",
      data?.data?.artist?.profile?.additionalImage || []
    );

    setValue("mainImage", data?.data?.artist?.profile?.mainImage);
    setValue("backImage", data?.data?.artist?.profile?.backImage);

    setValue("inProcessImage", data?.data?.artist?.profile?.inProcessImage);
    setValue("mainVideo", data?.data?.artist?.profile?.mainVideo);

    setValue("additionalVideo", []);
    setValue(
      "existingAdditionalVideo",
      data?.data?.artist?.profile?.additionalVideo
    );
    setValue(
      "isArtistEditInfoRequest",
      setIsEditInfo(data?.data?.artist?.isArtistEditInfoRequest)
    );
    setManagerDetails(data?.data?.artist?.isManagerDetails);
    setValue(
      "style",
      data?.data?.artist?.aboutArtist?.discipline?.map((item) =>
        item?.style?.map((opt) => {
          return { value: opt, label: opt };
        })
      ) || []
    );

    style: data?.data?.artist?.aboutArtist?.discipline?.map((item) =>
      item?.style?.map((opt) => {
        return { value: opt, label: opt };
      })
    );
  }, [data]);

  // console.log(getValues("discipline"));

  // console.log(getValues("style"));

  const handlePDF = (file) => {
    window.open(`${data?.data?.url}/documents/${file}`, "_blank");
  };

  const handleTagChange = (e) => {
    const inputValue = e.target.value;

    const newTags = inputValue.split(/[\s,]+/);
    // .filter((tag) => tag.startsWith("#") && tag.length > 1);
    setTags(newTags);
  };

  const handleRemoveTags = (index) => {
    console.log(index);
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("externalTags", newTags);
  };

  const countryValue = getValues("country");

  const watchZip = watch("zip");
  const watchCountry = watch("country");
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (watchCountry && watchZip && watchZip.length > 4) {
      getCityStateFromZipCountry(watchCountry, watchZip, apiKey).then(
        ({ state, city }) => {
          setValue("city", city);
          setValue("stateRegion", state);
          console.log(state, city);
        }
      );
    }
  }, [watchCountry, watchZip]);

  const onSubmit = (data) => {
    console.log("OnSubmit", data);
    console.log(data.additionalVide);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          if (
            key === "cvEntries" ||
            key === "accounts" ||
            key === "discipline"
          ) {
            formData.append(key, JSON.stringify(item));
          } else {
            formData.append(key, item);
          }
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (isManagerDetails) {
      formData.append("isManagerDetails", "true");
    }

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
    <div className="w-full md:w-full flex shadow-lg justify-center items-center">
      <div className="rounded-md w-full bg-white">
        <div className="xl:p-4 lg:p-3 md:p-4 p-3 w-full">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex  justify-between mb-3 pb-3">
                <h2 className="text-xl font-semibold  text-[#1A1C21]">
                  General Information
                </h2>

                <span
                  className={`text-sm ${
                    isActiveStatus === "active"
                      ? "bg-green-200 "
                      : isActiveStatus === "under-review"
                      ? "bg-yellow-200"
                      : isActiveStatus === "inactive"
                      ? "bg-red-200"
                      : null
                  }  px-2 flex items-center gap-1 rounded-md  `}
                >
                  <span className="w-1.5 h-1.5 block bg-black rounded-full"></span>{" "}
                  {isActiveStatus === "active"
                    ? "Active"
                      ? "Published"
                      : ""
                    : isActiveStatus === "under-review"
                    ? "Pending Approval"
                    : ""
                    ? "Under-Review"
                    : isActiveStatus === "inactive"
                    ? "Draft"
                    : ""
                    ? "Inactive"
                    : null}
                </span>
              </div>

              <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    // placeholder="Fullname"
                    {...register("artistName", {
                      required: "Name is required",
                    })}
                    disabled={isActiveStatus !== "active"}
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
                    disabled={isActiveStatus !== "active"}
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
                    disabled={isActiveStatus !== "active"}
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
                    disabled={isActiveStatus !== "active"}
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
                    disabled={isActiveStatus !== "active"}
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
                    disabled={isActiveStatus !== "active"}
                    className="border border-[#E6E6E6] p-3 w-full rounded-md focus:outline-none peer placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                  >
                    <option value="" label="Select a Gender" />
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
                    disabled={isActiveStatus !== "active"}
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
                    disabled={isActiveStatus !== "active"}
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
                    {...register("address", {
                      required: "Address is required",
                    })}
                    disabled={isActiveStatus !== "active"}
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
                  <CustomDropdown
                    control={control}
                    options={options}
                    countryValue={countryValue}
                    name="country"
                    isActiveStatus={isActiveStatus}
                  />

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
                    // placeholder="Enter Your Zip Code"
                    {...register("zip", { required: "Zip Code is required" })}
                    disabled={isActiveStatus !== "active"}
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

              <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    // placeholder="Enter Your City"
                    {...register("city", { required: "City is required" })}
                    disabled={isActiveStatus !== "active"}
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
                    {...register("stateRegion", {
                      required: "State/Region is required",
                    })}
                    disabled={isActiveStatus !== "active"}
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

              {/* Cv And Highlight */}

              <CVForm control={control} isActiveStatus={isActiveStatus} />

              <div className="w-full relative">
                <h2 className="text-xl font-semibold mb-3 pb-3 text-[#1A1C21]">
                  About
                </h2>
                <Controller
                  name="about"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <ReactQuill
                        readOnly={isActiveStatus !== "active"}
                        {...field}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md"
                        theme="snow"
                        placeholder="Write about yourself..."
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["bold", "italic", "underline"],
                            [{ align: [] }],
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

                <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full ">
                  <h2 className="text-xl font-medium mb-3 text-[#1A1C21]">
                    Insignia
                  </h2>
                  <div className="flex gap-3 items-center justify-center">
                    {data?.data?.artist?.insignia?.map((item, i) => (
                      <div>
                        <img
                          src={`${data.data.url}/users/${item.insigniaImage}`}
                          alt=""
                          className="lg:w-[10vw] lg:h-[15vh] object-cover"
                        />
                        <h1 className="text-center font-medium">
                          {item.credentialName}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>

                <GeneralSocial
                  control={control}
                  isActiveStatus={isActiveStatus}
                />

                <Dicipline
                  control={control}
                  isActiveStatus={isActiveStatus}
                  prefillValues={getValues("discipline")}
                  watch={watch}
                />

                {/* <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full ">
                  <h2 className="text-xl font-medium mb-3 text-[#1A1C21]">
                    Add Dicipline
                  </h2>
                </div> */}
              </div>

              <GeneralMedia
                control={control}
                data={data?.data?.artist?.profile}
                url={data?.data?.url}
                isActiveStatus={isActiveStatus}
              />
              <Invoice control={control} />

              <Logistics control={control} />

              <div className="p-4 mt-4 bg-white rounded-lg shadow-md max-w-full">
                <h2 className="text-xl font-semibold mb-3 text-[#1A1C21]">
                  Others
                </h2>
                <div className="flex  flex-col gap-5">
                  <div className="md:w-[48%] w-full relative flex flex-col gap-3 items-center">
                    {/* Document Names */}
                    {data?.data?.artist?.documents?.map((item, index) => (
                      <div
                        key={index}
                        className="w-full flex gap-3 items-center"
                      >
                        <input
                          type="text"
                          value={item?.documentName}
                          readOnly
                          className="border border-[#E6E6E6] p-3 w-full rounded-md font-montserrat text-left placeholder:text-zinc-500 outline-none"
                        />
                        <label
                          htmlFor={`documentName-${index}`}
                          className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                        >
                          Document Name {index + 1}
                        </label>

                        <span
                          onClick={() => handlePDF(item?.uploadDocs)}
                          className={`cursor-pointer flex flex-col justify-center ${
                            isActiveStatus !== "active"
                              ? "pointer-events-none"
                              : ""
                          }`}
                        >
                          <FaEye />
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className=" w-full relative">
                    <input
                      type="text"
                      {...register("externalTags", {
                        required: "ExternalTags",
                      })}
                      disabled={isActiveStatus !== "active"}
                      className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder:text-zinc-500 outline-none"
                      placeholder="Enter tags Start with # (separate with space or comma)"
                      onChange={handleTagChange}
                    />
                    <label
                      htmlFor="externalTags"
                      className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                    >
                      External Tags
                    </label>

                    <div className="mt-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 border border-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                        >
                          {tag}
                          <span
                            onClick={() => handleRemoveTags(index)}
                            className={`ml-3 text-black cursor-pointer ${
                              isActiveStatus !== "active"
                                ? "pointer-events-none"
                                : ""
                            }`}
                          >
                            X
                          </span>
                        </span>
                      ))}
                    </div>
                    {errors.externalTags && (
                      <div className="text-red-500 text-sm mt-1">
                        <div>{String(errors.externalTags?.message || "")}</div>
                      </div>
                    )}
                  </div>

                  <h2 className="text-md font-semibold mb-3 text-[#1A1C21] ">
                    Revalidation Information
                  </h2>

                  <div className="flex justify-between pointer-events-none">
                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        {...register("lastRevalidationDate", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="lastRevalidationDate"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Last Revalidation Date
                      </label>
                      {errors.lastRevalidationDate && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.lastRevalidationDate?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        {...register("nextRevalidationDate", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="nextRevalidationDate"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Next Revalidation Date
                      </label>
                      {errors.nextRevalidationDate && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.nextRevalidationDate?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <h2 className="text-md font-semibold mb-3 text-[#1A1C21]">
                    Manager Information
                  </h2>

                  <div className="flex justify-between flex-wrap gap-3">
                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled={isActiveStatus !== "active"}
                        type="text"
                        {...register("managerName", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerName"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager Name
                      </label>
                      {errors.managerName && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>{String(errors.managerName?.message || "")}</div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled={isActiveStatus !== "active"}
                        type="text"
                        {...register("managerEmail", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerEmail"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager Email
                      </label>
                      {errors.managerEmail && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.managerEmail?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        disabled={isActiveStatus !== "active"}
                        {...register("managerPhone", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerPhone"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager Phone
                      </label>
                      {errors.managerPhone && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.managerPhone?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled={isActiveStatus !== "active"}
                        type="text"
                        {...register("managerGender", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerGender"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager Gender
                      </label>
                      {errors.managerGender && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.managerGender?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled={isActiveStatus !== "active"}
                        type="text"
                        {...register("managerLanguage", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerLanguage"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager Language
                      </label>
                      {errors.managerLanguage && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.managerLanguage?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled={isActiveStatus !== "active"}
                        type="text"
                        {...register("managerAddress", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerAddress"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager Address
                      </label>
                      {errors.managerAddress && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.managerAddress?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled={isActiveStatus !== "active"}
                        type="text"
                        {...register("managerCountry", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerCountry"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager Country
                      </label>
                      {errors.managerCountry && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.managerCountry?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled={isActiveStatus !== "active"}
                        type="text"
                        {...register("mangerZipCode", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="mangerZipCode"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager zipCode
                      </label>
                      {errors.mangerZipCode && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.mangerZipCode?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        disabled={isActiveStatus !== "active"}
                        {...register("managerState", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="state"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager state
                      </label>
                      {errors.managerState && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.managerState?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled={isActiveStatus !== "active"}
                        type="text"
                        {...register("managerCity", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerCity"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Manager City
                      </label>
                      {errors.managerCity && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>{String(errors.managerCity?.message || "")}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <h2 className="text-md font-semibold mb-3 text-[#1A1C21]">
                    Emergency Information
                  </h2>

                  <div className="flex justify-between flex-wrap gap-3 pointer-events-none">
                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        {...register("emergencyContactName", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactName"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Emergency Contact Name
                      </label>
                      {errors.emergencyContactName && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(errors.emergencyContactName?.message || "")}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        {...register("emergencyContactPhone", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactPhone"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Emergency Contact Phone
                      </label>
                      {errors.emergencyContactPhone && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(
                              errors.emergencyContactPhone?.message || ""
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        {...register("emergencyContactEmail", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactEmail"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Emergency Contact Email
                      </label>
                      {errors.emergencyContactEmail && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(
                              errors.emergencyContactEmail?.message || ""
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        {...register("emergencyContactAddress", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactAddress"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Emergency Contact Email
                      </label>
                      {errors.emergencyContactAddress && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(
                              errors.emergencyContactAddress?.message || ""
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        {...register("emergencyContactRelation", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactRelation"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        Emergency Contact Relation
                      </label>
                      {errors.emergencyContactRelation && (
                        <div className="text-red-500 text-sm mt-1">
                          <div>
                            {String(
                              errors.emergencyContactRelation?.message || ""
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-end items-center gap-4 mt-8">
                <button
                  type="submit"
                  className={`bg-zinc-800 hover:bg-zinc-900 text-white font-medium py-2 px-4 rounded-md ${
                    isActiveStatus !== "active"
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  {isPending ? `Loading...` : " Save Changes"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default GeneralForm;
