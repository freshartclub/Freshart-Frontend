import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CVForm from "./CVForm";
import GeneralMedia from "./GeneralMedia";
import GeneralSocial from "./GeneralSocial";

import "react-datepicker/dist/react-datepicker.css";
import { FaEye } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetArtistDetails } from "../../UserProfile/http/useGetDetails";
import Loader from "../../ui/Loader";
import Invoice from "./Invoice";
import Logistics from "./Logistics";
import useGetSaveArtistDetailsMutation from "./http/useGetSaveArtistDetails";
import "react-country-state-city/dist/react-country-state-city.css";
import dayjs from "dayjs";
import countryList from "react-select-country-list";
import { getCityStateFromZipCountry } from "../../utils/MapWithAutocomplete";
import Autocomplete from "react-google-autocomplete";
import CustomDropdown from "../../pages/CustomDropdown";
import { RenderAllPicklists } from "../../utils/RenderAllPicklist";
import { imageUrl } from "../../utils/baseUrls";
import Commercilization from "./Commercilization";
import Dicipline from "./Dicipline";
import useRevalidationMutation from "./http/useRevalidationMutation";
import { useTranslation } from "react-i18next";

const GeneralForm = ({ isActiveStatus }) => {
  const { data, isFetching } = useGetArtistDetails();
  const { mutate, isPending } = useGetSaveArtistDetailsMutation();
  const { mutate: revalidationMutation, isPending: revalidationPending } =
    useRevalidationMutation();
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isManagerDetails, setManagerDetails] = useState(null);
  const [tags, setTags] = useState([]);
  const options = useMemo(() => countryList(), []);
  const [searchResult, setSearchResult] = useState(null);

  const { t } = useTranslation();

  const methods = useForm();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    register,

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
    // setValue("address", data?.data?.artist?.address?.residentialAddress || "");
    setValue("email", data?.data?.artist?.email || "");
    setValue("about", data?.data?.artist?.aboutArtist?.about || "");
    setValue("language", data?.data?.artist?.language || []);
    setValue("gender", data?.data?.artist?.gender || "");
    setValue("accounts", data?.data?.artist?.links || "");
    setValue("highlights", data?.data?.artist?.highlights?.addHighlights || "");
    setValue("vatAmount", data?.data?.artist?.invoice?.vatAmount || "");
    setValue("discipline", data?.data?.artist?.aboutArtist?.discipline || "");

    setValue("cvEntries", data?.data?.artist?.highlights?.cv || "");

    setValue("documentName", data?.data?.artist?.documents?.documentName || []);
    setValue(
      "externalTags",
      `#${data?.data?.artist?.otherTags?.extTags} ` || []
    );
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
      data?.data?.artist?.emergencyInfo?.emergencyContactEmail || ""
    );

    setValue(
      "emergencyContactName",
      data?.data?.artist?.emergencyInfo?.emergencyContactName || ""
    );

    setValue(
      "emergencyContactPhone",
      data?.data?.artist?.emergencyInfo?.emergencyContactPhone || ""
    );

    setValue(
      "emergencyContactRelation",
      data?.data?.artist?.emergencyInfo?.emergencyContactRelation || ""
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

    setValue(
      "publishingCatalog",
      data?.data?.artist?.commercilization?.publishingCatalog || []
    );
    setValue(
      "artProvider",
      data?.data?.artist?.commercilization?.artProvider || ""
    );
    setValue(
      "artistLevel",
      data?.data?.artist?.commercilization?.artistLevel || ""
    );

    setValue(
      "artistPlus",
      data?.data?.artist?.commercilization?.artistPlus || ""
    );

    setValue(
      "customOrder",
      data?.data?.artist?.commercilization?.customOrder || ""
    );

    setValue(
      "maxNumberOfArtwork",
      data?.data?.artist?.commercilization?.maxNumberOfArtwork || ""
    );

    setValue(
      "minNumberOfArtwork",
      data?.data?.artist?.commercilization?.minNumberOfArtwork || ""
    );

    setValue(
      "scorePlatform",
      data?.data?.artist?.commercilization?.scorePlatform || ""
    );

    setValue(
      "scoreProfessional",
      data?.data?.artist?.commercilization?.scoreProfessional || ""
    );

    setSearchResult(data?.data?.artist?.address?.residentialAddress || "");
  }, [data]);

  const handlePDF = (file) => {
    window.open(`${imageUrl}/documents/${file}`, "_blank");
  };

  const handleTagChange = (e) => {
    const inputValue = e.target.value;

    const newTags = inputValue.split(/[\s,]+/);
    setTags(newTags);
  };

  const handleRemoveTags = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("externalTags", newTags);
  };

  const handleRevelidate = () => {
    try {
      revalidationMutation();
    } catch (error) {
      console.error(error);
    }
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
          // console.log(state, city);
        }
      );
    }
  }, [watchCountry, watchZip]);

  const onSubmit = (data) => {
    delete data.insignia;
    delete data.publishingCatalog;

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

    formData.append("address", searchResult);

    if (isManagerDetails) {
      formData.append("isManagerDetails", "true");
    }

    try {
      mutate(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const picklist = RenderAllPicklists([
    "Event Type",
    "Event Scope",
    "Gender",
    "Language",
    "Social Media",
  ]);

  const picklistMap = picklist.reduce((acc, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const gender = picklistMap["Gender"];
  const eventType = picklistMap["Event Type"];
  const eventScope = picklistMap["Event Scope"];
  const language = picklistMap["Language"];
  const socialMedia = picklistMap["Social Media"];

  const placesSelected = (places: google.maps.places.PlaceResult) => {
    const fullAddress = places?.formatted_address || "";
    setSearchResult(fullAddress);
  };

  function getTimeDifference(nextRevalidationDate) {
    const currentDate = new Date();
    const targetDate = new Date(nextRevalidationDate);

    const differenceMs = targetDate - currentDate;
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return `${days} Days Remaning`;
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "align",
  ];

  const defaultSizeStyle = `
  .ql-editor {
    font-size: 20px; 
      min-height: calc(1em * 9); 
    line-height: 1.5; /*
  }
`;

  if (isFetching) return <Loader />;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="rounded-md w-full bg-white">
        <div className="p-1 w-full">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap justify-between mb-3 pb-3">
                <h2 className="sm:text-xl text-lg font-semibold  text-[#1A1C21]">
                  {t("General Information")}
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
                    ? "Published"
                    : isActiveStatus === "under-review"
                    ? "Pending Approval"
                    : isActiveStatus === "inactive"
                    ? "InActive"
                    : null}
                </span>
              </div>

              <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    {...register("artistName", {
                      required: "Name is required",
                    })}
                    disabled
                    className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Artist Name")}
                  </label>
                  {errors.artistName && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(errors.artistName?.message)}
                    </div>
                  )}
                </div>
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    {...register("artistSurname1", {
                      required: "Email is required",
                    })}
                    disabled
                    className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                  />
                  <label
                    htmlFor="artistSurname1"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Artist Surname 1")}
                  </label>
                  {errors.artistSurname1 && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.artistSurname1?.message}`)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    {...register("artistSurname2")}
                    disabled
                    className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                  />
                  <label
                    htmlFor="artistSurname2"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Artist Surname 2")}
                  </label>
                </div>
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    {...register("nickName")}
                    disabled
                    className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                  />
                  <label
                    htmlFor="nickName"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Nickname")}
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    // placeholder="Fullname"
                    {...register("email", {
                      required: t("Name is required"),
                    })}
                    disabled
                    className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Email")}
                  </label>
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.email?.message}`)}
                    </div>
                  )}
                </div>

                <div className="md:w-[48%] w-full relative">
                  <PhoneInput
                    className="appearance-none border flex outline-none rounded  py-3 px-3 text-gray-700 leading-tight text-sm"
                    placeholder={t("Enter phone number")}
                    value={getValues("phoneNumber")}
                    onChange={(val) => setValue("phoneNumber", val)}
                    disabled
                  />
                  <label
                    htmlFor="phoneNumber"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Phone Number")}
                  </label>

                  {errors.phoneNumber && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.phoneNumber?.message}`)}
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
                    disabled
                    className={`border  ${
                      isActiveStatus !== "active" ? "bg-zinc-100" : ""
                    } border-[#E6E6E6] bg-zinc-100 p-3 w-full rounded-md focus:outline-none peer placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none`}
                  >
                    {gender &&
                      gender.map((item, i: number) => (
                        <option value={item?.value} key={i}>
                          {t(item?.label)}
                        </option>
                      ))}
                  </select>
                  <label
                    htmlFor="gender"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Gender")}
                  </label>
                  {errors.gender && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.gender?.message}`)}
                    </div>
                  )}
                </div>
                <div className="md:w-[48%] w-full relative">
                  <select
                    {...register("language", {
                      required: "Language is required",
                    })}
                    disabled
                    className={`border  ${
                      isActiveStatus !== "active" ? "bg-zinc-100" : ""
                    } border-[#E6E6E6] bg-zinc-100 p-3 w-full rounded-md focus:outline-none peer placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none`}
                  >
                    {language &&
                      language.map((item, i) => (
                        <option key={i} value={item?.value}>
                          {t(item?.label)}
                        </option>
                      ))}
                  </select>
                  <label
                    htmlFor="language"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Language")}
                  </label>
                  {errors.language && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.language?.message}`)}
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
                    isActiveStatus="Under Maintenance"
                  />

                  <label
                    htmlFor="country"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Country")}
                  </label>
                  {errors.country && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.country?.message}`)}
                    </div>
                  )}
                </div>

                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    {...register("zip", {
                      required: "Zip Code is required",
                    })}
                    disabled
                    className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                  />
                  <label
                    htmlFor="zip"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Zip Code")}
                  </label>
                  {errors.zip && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.zip?.message}`)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    {...register("city", { required: "City is required" })}
                    disabled
                    className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                  />
                  <label
                    htmlFor="city"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("City")}
                  </label>
                  {errors.city && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.city?.message}`)}
                    </div>
                  )}
                </div>
                <div className="md:w-[48%] w-full relative">
                  <input
                    type="text"
                    {...register("stateRegion", {
                      required: "State/Region is required",
                    })}
                    disabled
                    className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                  />
                  <label
                    htmlFor="stateRegion"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("State/Region")}
                  </label>
                  {errors.stateRegion && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.stateRegion?.message}`)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-full gap-4 mb-4">
                <div className="w-full relative">
                  <Autocomplete
                    className={`border pointer-events-none bg-zinc-100 border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500`}
                    value={searchResult}
                    apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
                    onChange={(e) => {
                      setSearchResult(e.target.value);
                    }}
                    onPlaceSelected={placesSelected}
                    options={{
                      types: [],
                    }}
                  />

                  <label
                    htmlFor="address"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    {t("Address")}
                  </label>

                  {errors.address && (
                    <div className="text-red-500 text-sm mt-1">
                      {t(`${errors.address?.message}`)}
                    </div>
                  )}
                </div>
              </div>

              <CVForm
                control={control}
                eventScope={eventScope}
                eventType={eventType}
                t={t}
              />

              <div className="w-full relative">
                <div className="p-4 mt-4 bg-white rounded-lg shadow-md border">
                  <h2 className="sm:text-xl text-lg font-semibold mb-3 pb-3 text-[#1A1C21]">
                    {t("About")}
                  </h2>
                  <Controller
                    name="about"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <style>{defaultSizeStyle}</style>
                        <ReactQuill
                          {...field}
                          className="border border-[#E6E6E6] p-3 w-full rounded-md"
                          theme="snow"
                          placeholder={t("Write about yourself...")}
                          modules={modules}
                          formats={formats}
                        />
                        <label
                          htmlFor="about"
                          className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                        >
                          {t("About")}
                        </label>
                      </div>
                    )}
                  />
                </div>

                <div className="p-4 mt-4 bg-white rounded-lg shadow-md border">
                  <h2 className="sm:text-xl text-lg font-semibold mb-3 text-[#1A1C21]">
                    {t("Insignia")}
                  </h2>
                  <div className="flex w-full overflow-x-auto gap-3 items-center justify-start scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 whitespace-nowrap scroll-smooth">
                    {data?.data?.artist?.insignia?.map((item, i: number) => (
                      <div className="min-w-[10rem] flex-shrink-0" key={i}>
                        <img
                          src={`${imageUrl}/users/${item.insigniaImage}`}
                          className="w-[10rem] h-[5rem] rounded object-cover"
                          alt={item.credentialName || "Insignia"}
                        />
                        <h1 className="text-center font-medium">
                          {t(item.credentialName)}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>

                <GeneralSocial
                  control={control}
                  isActiveStatus={isActiveStatus}
                  socialMedia={socialMedia}
                />

                <Dicipline
                  control={control}
                  isActiveStatus={isActiveStatus}
                  prefillValues={getValues("discipline")}
                  watch={watch}
                />
              </div>

              <GeneralMedia
                control={control}
                data={data?.data?.artist?.profile}
                isActiveStatus={isActiveStatus}
              />
              <Invoice control={control} />

              <Logistics control={control} />
              <Commercilization control={control} />

              <div className="p-4 mt-4 bg-white rounded-lg shadow-md border">
                <h2 className="sm:text-xl text-lg font-semibold mb-3 pb-3 text-[#1A1C21]">
                  {t("Others")}
                </h2>
                <div className="flex  flex-col gap-5">
                  <div className="w-full relative flex flex-col gap-3 items-center">
                    {data?.data?.artist?.documents?.map((item, index) => (
                      <div
                        key={index}
                        className="w-full flex gap-2 relative"
                      >
                        <label
                          htmlFor={item?.documentName}
                          className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381] pointer-events-none"
                        >
                          {t("Document") + " " + (index + 1)}
                        </label>
                        <input
                          disabled
                          type="text"
                          value={item?.documentName}
                          readOnly
                          className="border border-[#E6E6E6] p-3 w-full rounded-md font-montserrat text-left placeholder:text-zinc-500 outline-none"
                        />
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

                  <div className="w-full relative">
                    <input
                      type="text"
                      {...register("externalTags")}
                      disabled={isActiveStatus !== "active"}
                      className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder:text-zinc-500 outline-none"
                      placeholder="Enter tags Start with # (separate with space or comma)"
                      onChange={handleTagChange}
                    />
                    <label
                      htmlFor="externalTags"
                      className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                    >
                      {t("External Tags")}
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
                        {t(`${errors.externalTags.message}`)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-5">
                    <h2 className="text-md font-semibold mb-3 text-[#1A1C21] ">
                      {t("Revalidation Information")}
                    </h2>

                    <h2 className="text-md font-semibold mb-3 text-[#1A1C21] border border-green-500 px-3 py-1 rounded-md">
                      {getTimeDifference(getValues("nextRevalidationDate"))}
                    </h2>
                  </div>

                  <div className="flex justify-between items-center gap-5">
                    <div className="md:w-[48%] w-full relative">
                      <div className="flex items-center">
                        <input
                          disabled
                          type="text"
                          {...register("lastRevalidationDate", {})}
                          className="border border-[#E6E6E6] p-3 w-full  pointer-events-none rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none pr-10" // Add padding to the right
                        />
                      </div>

                      <label
                        htmlFor="lastRevalidationDate"
                        className="absolute text-sm top-[-10px] left-3  pointer-events-none bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Last Revalidation Date")}
                      </label>

                      {errors.lastRevalidationDate && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.lastRevalidationDate.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("nextRevalidationDate", {})}
                        className="border border-[#E6E6E6]  pointer-events-none p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="nextRevalidationDate"
                        className="absolute text-sm top-[-10px] left-3  pointer-events-none bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Next Revalidation Date")}
                      </label>
                      {errors.nextRevalidationDate && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.nextRevalidationDate.message}`)}
                        </div>
                      )}
                    </div>

                    {new Date(getValues("nextRevalidationDate")) <=
                    new Date() ? (
                      <div className="md:w-[48%] w-full relative">
                        <span
                          onClick={handleRevelidate}
                          className="border border-[#E6E6E6] cursor-pointer bg-black text-white p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                        >
                          {revalidationPending ? "Loading..." : "Revalidate"}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <h2 className="text-md font-semibold mb-3 text-[#1A1C21]">
                    {t("Manager Information")}
                  </h2>

                  <div className="flex justify-between flex-wrap gap-3">
                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("managerName", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerName"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager Name")}
                      </label>
                      {errors.managerName && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.managerName.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("managerEmail", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerEmail"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager Email")}
                      </label>
                      {errors.managerEmail && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.managerEmail.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        disabled
                        {...register("managerPhone", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerPhone"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager Phone")}
                      </label>
                      {errors.managerPhone && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.managerPhone.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <select
                        {...register("managerGender")}
                        disabled
                        className={`border  border-[#E6E6E6] p-3 w-full rounded-md focus:outline-none peer placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none bg-zinc-100`}
                      >
                        <option value="">{t("Select")}</option>
                        {gender &&
                          gender.map((item, i) => (
                            <option key={i}>{t(item?.label)}</option>
                          ))}
                      </select>

                      <label
                        htmlFor="managerGender"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager Gender")}
                      </label>
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <select
                        {...register("managerLanguage")}
                        disabled
                        className={`border bg-zinc-100 border-[#E6E6E6] p-3 w-full rounded-md focus:outline-none peer placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none`}
                      >
                        <option value="">{t("Select")}</option>
                        {language &&
                          language.map((item, i) => (
                            <option key={i} value={item?.value}>
                              {t(item?.label)}
                            </option>
                          ))}
                      </select>
                      <label
                        htmlFor="managerLanguage"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager Language")}
                      </label>
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("managerAddress", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerAddress"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold "
                      >
                        {t("Manager Address")}
                      </label>
                      {errors.managerAddress && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.managerAddress.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("managerCountry", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerCountry"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager Country")}
                      </label>
                      {errors.managerCountry && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.managerCountry.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("managerZipCode", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerZipCode"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager zipCode")}
                      </label>
                      {errors.managerZipCode && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.managerZipCode.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        disabled
                        {...register("managerState", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="state"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager State")}
                      </label>
                      {errors.managerState && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.managerState.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("managerCity", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="managerCity"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Manager City")}
                      </label>
                      {errors.managerCity && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.managerCity.message}`)}
                        </div>
                      )}
                    </div>
                  </div>

                  <h2 className="text-md font-semibold mb-3 text-[#1A1C21]">
                    {t("Emergency Information")}
                  </h2>

                  <div className="flex justify-between flex-wrap gap-3 pointer-events-none">
                    <div className="md:w-[48%] w-full relative">
                      <input
                        type="text"
                        disabled
                        {...register("emergencyContactName", {})}
                        className="border border-[#E6E6E6]  p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactName"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Emergency Contact Name")}
                      </label>
                      {errors.emergencyContactName && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.emergencyContactName.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("emergencyContactPhone", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactPhone"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Emergency Contact Phone")}
                      </label>
                      {errors.emergencyContactPhone && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.emergencyContactPhone.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("emergencyContactEmail", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactEmail"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Emergency Contact Email")}
                      </label>
                      {errors.emergencyContactEmail && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.emergencyContactEmail.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("emergencyContactAddress", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactAddress"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Emergency Contact Address")}
                      </label>
                      {errors.emergencyContactAddress && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.emergencyContactAddress.message}`)}
                        </div>
                      )}
                    </div>

                    <div className="md:w-[48%] w-full relative">
                      <input
                        disabled
                        type="text"
                        {...register("emergencyContactRelation", {})}
                        className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-zinc-500 outline-none"
                      />
                      <label
                        htmlFor="emergencyContactRelation"
                        className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                      >
                        {t("Emergency Contact Relation")}
                      </label>
                      {errors.emergencyContactRelation && (
                        <div className="text-red-500 text-sm mt-1">
                          {t(`${errors.emergencyContactRelation.message}`)}
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
                    isActiveStatus !== "active" ? "" : ""
                  }`}
                >
                  {isPending ? t("Loading...") : t("Save Changes")}
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
