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
import Button from "../../ui/Button";

const GeneralForm = ({ isActiveStatus }) => {
  const { data, isLoading } = useGetArtistDetails();
  const { mutate, isPending } = useGetSaveArtistDetailsMutation();
  const { mutate: revalidationMutation, isPending: revalidationPending } =
    useRevalidationMutation();

  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isManagerDetails, setManagerDetails] = useState(null);
  const [tags, setTags] = useState([]);
  const options = useMemo(() => countryList(), []);
  const [searchResult, setSearchResult] = useState(null);

  const langCode = localStorage.getItem("langCode") || "ES";

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

    const artist = data?.data?.artist || {};
    const invoice = artist.invoice || {};
    const logistics = artist.logistics || {};
    const address = artist.address || {};
    const aboutArtist = artist.aboutArtist || {};
    const reviewDetails = artist.reviewDetails || {};
    const highlights = artist.highlights || {};
    const documents = artist.documents || {};
    const otherTags = artist.otherTags || {};
    const managerDetails = artist.managerDetails || {};
    const managerAddress = managerDetails.address || {};
    const emergencyInfo = artist.emergencyInfo || {};
    const profile = artist.profile || {};
    const commercialization = artist.commercilization || {};

    // Basic artist info with reviewDetails priority
    setValue("gender", reviewDetails.gender || artist.gender || "");
    setValue("insignia", reviewDetails.insignia || artist.insignia || "");
    setValue("language", reviewDetails.language || artist.language || "");
    setValue(
      "artistSurname1",
      reviewDetails.artistSurname1 || artist.artistSurname1 || ""
    );
    setValue(
      "artistSurname2",
      reviewDetails.artistSurname2 || artist.artistSurname2 || ""
    );
    setValue("nickName", reviewDetails.nickName || artist.nickName || "");
    setValue("artistName", reviewDetails.artistName || artist.artistName || "");
    setValue("phoneNumber", reviewDetails.phone || artist.phone || "");
    setValue("email", reviewDetails.email || artist.email || "");
    setValue(
      "about",
      reviewDetails.aboutArtist?.about || aboutArtist.about || ""
    );
    setValue(
      "discipline",
      reviewDetails.aboutArtist?.discipline || aboutArtist.discipline || ""
    );

    // Address (using address object primarily)
    setValue(
      "country",
      reviewDetails.address?.country || address.country || ""
    );
    setValue(
      "zip",
      reviewDetails.address?.zipCode || address.zipCode || artist.zipCode || ""
    );
    setValue("city", reviewDetails.address?.city || address.city || "");
    setValue(
      "stateRegion",
      reviewDetails.address?.state || address.state || ""
    );
    setSearchResult(
      reviewDetails.address?.residentialAddress ||
        address.residentialAddress ||
        ""
    );

    // Tax/Invoice info
    setValue(
      "taxAddress",
      reviewDetails.invoice?.taxAddress || invoice.taxAddress || ""
    );
    setValue(
      "taxBankIBAN",
      reviewDetails.invoice?.taxBankIBAN || invoice.taxBankIBAN || ""
    );
    setValue(
      "taxBankName",
      reviewDetails.invoice?.taxBankName || invoice.taxBankName || ""
    );
    setValue(
      "taxCity",
      reviewDetails.invoice?.taxCity || invoice.taxCity || ""
    );
    setValue(
      "taxCountry",
      reviewDetails.invoice?.taxCountry || invoice.taxCountry || ""
    );
    setValue(
      "taxEmail",
      reviewDetails.invoice?.taxEmail || invoice.taxEmail || ""
    );
    setValue(
      "taxLegalName",
      reviewDetails.invoice?.taxLegalName || invoice.taxLegalName || ""
    );
    setValue(
      "taxNumber",
      reviewDetails.invoice?.taxNumber || invoice.taxNumber || ""
    );
    setValue(
      "taxPhone",
      reviewDetails.invoice?.taxPhone || invoice.taxPhone || ""
    );
    setValue(
      "taxProvince",
      reviewDetails.invoice?.taxProvince || invoice.taxProvince || ""
    );
    setValue(
      "taxZipCode",
      reviewDetails.invoice?.taxZipCode || invoice.taxZipCode || ""
    );
    setValue(
      "vatAmount",
      reviewDetails.invoice?.vatAmount || invoice.vatAmount || ""
    );

    // Logistics
    setValue(
      "logAddress",
      reviewDetails.logistics?.logAddress || logistics.logAddress || ""
    );
    setValue(
      "logCity",
      reviewDetails.logistics?.logCity || logistics.logCity || ""
    );
    setValue(
      "logCountry",
      reviewDetails.logistics?.logCountry || logistics.logCountry || ""
    );
    setValue(
      "logEmail",
      reviewDetails.logistics?.logEmail || logistics.logEmail || ""
    );
    setValue(
      "logName",
      reviewDetails.logistics?.logName || logistics.logName || ""
    );
    setValue(
      "logNotes",
      reviewDetails.logistics?.logNotes || logistics.logNotes || ""
    );
    setValue(
      "logPhone",
      reviewDetails.logistics?.logPhone || logistics.logPhone || ""
    );
    setValue(
      "logProvince",
      reviewDetails.logistics?.logProvince || logistics.logProvince || ""
    );
    setValue(
      "logZipCode",
      reviewDetails.logistics?.logZipCode || logistics.logZipCode || ""
    );

    // Additional fields
    setValue("accounts", reviewDetails.links || artist.links || []);
    setValue(
      "highlights",
      reviewDetails.highlights?.addHighlights || highlights.addHighlights || []
    );
    setValue("cvEntries", reviewDetails.highlights?.cv || highlights.cv || "");
    setValue(
      "documentName",
      reviewDetails.documents?.documentName || documents.documentName || []
    );
    setValue(
      "externalTags",
      reviewDetails.otherTags?.extTags
        ? `#${reviewDetails.otherTags.extTags}`
        : otherTags.extTags
        ? `#${otherTags.extTags}`
        : []
    );

    // Dates
    setValue(
      "lastRevalidationDate",
      reviewDetails.lastRevalidationDate
        ? dayjs(reviewDetails.lastRevalidationDate).format("YYYY-MM-DD")
        : artist.lastRevalidationDate
        ? dayjs(artist.lastRevalidationDate).format("YYYY-MM-DD")
        : ""
    );
    setValue(
      "nextRevalidationDate",
      reviewDetails.nextRevalidationDate
        ? dayjs(reviewDetails.nextRevalidationDate).format("YYYY-MM-DD")
        : artist.nextRevalidationDate
        ? dayjs(artist.nextRevalidationDate).format("YYYY-MM-DD")
        : ""
    );

    // Manager
    setValue(
      "managerName",
      reviewDetails.managerDetails?.managerName ||
        managerDetails.managerName ||
        ""
    );
    setValue(
      "managerLanguage",
      reviewDetails.managerDetails?.language || managerDetails.language || []
    );
    setValue(
      "managerAddress",
      reviewDetails.managerDetails?.address?.address ||
        managerAddress.address ||
        ""
    );
    setValue(
      "managerCity",
      reviewDetails.managerDetails?.address?.city || managerAddress.city || ""
    );
    setValue(
      "managerCountry",
      reviewDetails.managerDetails?.address?.country ||
        managerAddress.country ||
        ""
    );
    setValue(
      "managerState",
      reviewDetails.managerDetails?.address?.state || managerAddress.state || ""
    );
    setValue(
      "managerZipCode",
      reviewDetails.managerDetails?.address?.zipCode ||
        managerAddress.zipCode ||
        ""
    );
    setValue(
      "managerEmail",
      reviewDetails.managerDetails?.managerEmail ||
        managerDetails.managerEmail ||
        ""
    );
    setValue(
      "managerGender",
      reviewDetails.managerDetails?.managerGender ||
        managerDetails.managerGender ||
        ""
    );
    setValue(
      "managerPhone",
      reviewDetails.managerDetails?.managerPhone ||
        managerDetails.managerPhone ||
        ""
    );
    setManagerDetails(
      reviewDetails.isManagerDetails || artist.isManagerDetails || false
    );

    // Emergency Contact
    setValue(
      "emergencyContactAddress",
      reviewDetails.emergencyInfo?.emergencyContactAddress ||
        emergencyInfo.emergencyContactAddress ||
        ""
    );
    setValue(
      "emergencyContactEmail",
      reviewDetails.emergencyInfo?.emergencyContactEmail ||
        emergencyInfo.emergencyContactEmail ||
        ""
    );
    setValue(
      "emergencyContactName",
      reviewDetails.emergencyInfo?.emergencyContactName ||
        emergencyInfo.emergencyContactName ||
        ""
    );
    setValue(
      "emergencyContactPhone",
      reviewDetails.emergencyInfo?.emergencyContactPhone ||
        emergencyInfo.emergencyContactPhone ||
        ""
    );
    setValue(
      "emergencyContactRelation",
      reviewDetails.emergencyInfo?.emergencyContactRelation ||
        emergencyInfo.emergencyContactRelation ||
        ""
    );

    // Media
    setValue("additionalImage", []);
    setValue(
      "existingAdditionalImage",
      reviewDetails.profile?.additionalImage || profile.additionalImage || []
    );
    setValue(
      "mainImage",
      reviewDetails.profile?.mainImage || profile.mainImage || ""
    );
    setValue(
      "backImage",
      reviewDetails.profile?.backImage || profile.backImage || ""
    );
    setValue(
      "inProcessImage",
      reviewDetails.profile?.inProcessImage || profile.inProcessImage || ""
    );
    setValue(
      "mainVideo",
      reviewDetails.profile?.mainVideo || profile.mainVideo || ""
    );
    setValue("additionalVideo", []);
    setValue(
      "existingAdditionalVideo",
      reviewDetails.profile?.additionalVideo || profile.additionalVideo || []
    );

    // Commercialization
    setValue(
      "publishingCatalog",
      reviewDetails.commercilization?.publishingCatalog ||
        commercialization.publishingCatalog ||
        []
    );
    setValue(
      "artProvider",
      reviewDetails.commercilization?.artProvider ||
        commercialization.artProvider ||
        ""
    );
    setValue(
      "artistLevel",
      reviewDetails.commercilization?.artistLevel ||
        commercialization.artistLevel ||
        ""
    );
    setValue(
      "artistPlus",
      reviewDetails.commercilization?.artistPlus ||
        commercialization.artistPlus ||
        ""
    );
    setValue(
      "customOrder",
      reviewDetails.commercilization?.customOrder ||
        commercialization.customOrder ||
        ""
    );
    setValue(
      "maxNumberOfArtwork",
      reviewDetails.commercilization?.maxNumberOfArtwork ||
        commercialization.maxNumberOfArtwork ||
        ""
    );
    setValue(
      "minNumberOfArtwork",
      reviewDetails.commercilization?.minNumberOfArtwork ||
        commercialization.minNumberOfArtwork ||
        ""
    );
    setValue(
      "scorePlatform",
      reviewDetails.commercilization?.scorePlatform ||
        commercialization.scorePlatform ||
        ""
    );
    setValue(
      "scoreProfessional",
      reviewDetails.commercilization?.scoreProfessional ||
        commercialization.scoreProfessional ||
        ""
    );

    setValue(
      "isArtistEditInfoRequest",
      reviewDetails.isArtistEditInfoRequest
        ? setIsEditInfo(reviewDetails.isArtistEditInfoRequest)
        : artist.isArtistEditInfoRequest
        ? setIsEditInfo(artist.isArtistEditInfoRequest)
        : false
    );
    setValue(
      "style",
      reviewDetails.aboutArtist?.discipline?.map(
        (item) => item?.style?.map((opt) => ({ value: opt, label: opt })) || []
      ) ||
        aboutArtist.discipline?.map(
          (item) =>
            item?.style?.map((opt) => ({ value: opt, label: opt })) || []
        ) ||
        []
    );
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
      revalidationMutation(langCode);
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

  const calc = (val: string) => {
    if (!val) return;
    const today = new Date();
    const createdAt = new Date(val);

    const differenceMs = today.getTime() - createdAt.getTime();
    const days = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return days;
  };

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

  if (isLoading) return <Loader />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 mt-4 bg-white rounded-lg shadow-md border">
          <div className="flex flex-wrap justify-between mb-3 pb-3">
            <h2 className="text-lg font-semibold  text-[#1A1C21]">
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
                ? t("Published")
                : isActiveStatus === "under-review"
                ? t("Pending Approval")
                : isActiveStatus === "inactive"
                ? t("InActive")
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
                {t("Artist Display Name")}
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
        </div>

        <CVForm
          control={control}
          eventScope={eventScope}
          eventType={eventType}
          t={t}
        />

        <div className="w-full relative">
          <div className="p-4 mt-4 bg-white rounded-lg shadow-md border">
            <h2 className="text-lg font-semibold mb-3 pb-3 text-[#1A1C21]">
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
            <h2 className="text-lg font-semibold mb-3 text-[#1A1C21]">
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
        <Commercilization control={control} getValues={getValues} />

        <div className="p-4 mt-4 bg-white rounded-lg shadow-md border">
          <h2 className="text-lg font-semibold mb-3 pb-3 text-[#1A1C21]">
            {t("Others")}
          </h2>
          <div className="flex  flex-col gap-5">
            <div className="w-full relative flex flex-col gap-3 items-center">
              {data?.data?.artist?.documents?.map((item, index) => (
                <div key={index} className="w-full flex gap-2 relative">
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
                      isActiveStatus !== "active" ? "pointer-events-none" : ""
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
                        isActiveStatus !== "active" ? "pointer-events-none" : ""
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

            <div className="flex items-center mb-3 gap-3">
              <h2 className="text-md font-semibold text-[#1A1C21] ">
                {t("Revalidation Information")}
              </h2>

              {getValues("nextRevalidationDate") ? (
                calc(getValues("nextRevalidationDate")) === 0 ? null : calc(
                    getValues("nextRevalidationDate")
                  ) > 0 ? (
                  <span className="w-fit h-fit bg-[#FEEDEC] text-[#f05438] rounded-2xl text-[12px] px-2">{`${Math.abs(
                    calc(getValues("nextRevalidationDate"))
                  )} ${t("Oudated Days")}`}</span>
                ) : (
                  <span className="w-fit h-fit bg-[#f2feec] border-[#0D894F] border rounded-2xl text-[12px] px-2">{`${Math.abs(
                    calc(getValues("nextRevalidationDate"))
                  )} ${t("Days Left")}`}</span>
                )
              ) : null}
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

              {new Date(getValues("nextRevalidationDate")) <= new Date() ? (
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
          <Button
            type="submit"
            variant={{
              fontSize: "sm",
              thickness: "thick",
              fontWeight: "600",
              theme: "dark",
            }}
            className={`text-white hover:bg-white hover:border hover:border-[#102031] hover:text-[#102031] px-4 py-3 rounded ${
              isPending ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {isPending ? t("Saving...") : t("Save Changes")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default GeneralForm;
