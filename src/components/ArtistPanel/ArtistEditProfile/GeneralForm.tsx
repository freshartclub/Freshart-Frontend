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
import { useAppSelector } from "../../../store/typedReduxHooks";

const GeneralForm = ({ isActiveStatus }) => {
  const { data, isLoading } = useGetArtistDetails();
  const { mutate, isPending } = useGetSaveArtistDetailsMutation();
  const { mutate: revalidationMutation, isPending: revalidationPending } = useRevalidationMutation();

  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isManagerDetails, setManagerDetails] = useState(null);
  const [tags, setTags] = useState([]);
  const options = useMemo(() => countryList(), []);
  const [searchResult, setSearchResult] = useState(null);

  const langCode = localStorage.getItem("langCode") || "ES";
  const dark = useAppSelector((state) => state.theme.mode);

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
    setValue("artistSurname1", reviewDetails.artistSurname1 || artist.artistSurname1 || "");
    setValue("artistSurname2", reviewDetails.artistSurname2 || artist.artistSurname2 || "");
    setValue("nickName", reviewDetails.nickName || artist.nickName || "");
    setValue("artistName", reviewDetails.artistName || artist.artistName || "");
    setValue("phoneNumber", reviewDetails.phone || artist.phone || "");
    setValue("email", reviewDetails.email || artist.email || "");
    setValue("about", reviewDetails.aboutArtist?.about || aboutArtist.about || "");
    setValue("discipline", reviewDetails.aboutArtist?.discipline || aboutArtist.discipline || "");

    // Address (using address object primarily)
    setValue("country", reviewDetails.address?.country || address.country || "");
    setValue("zip", reviewDetails.address?.zipCode || address.zipCode || artist.zipCode || "");
    setValue("city", reviewDetails.address?.city || address.city || "");
    setValue("stateRegion", reviewDetails.address?.state || address.state || "");
    setSearchResult(reviewDetails.address?.residentialAddress || address.residentialAddress || "");

    // Tax/Invoice info
    setValue("taxAddress", reviewDetails.invoice?.taxAddress || invoice.taxAddress || "");
    setValue("taxBankIBAN", reviewDetails.invoice?.taxBankIBAN || invoice.taxBankIBAN || "");
    setValue("taxBankName", reviewDetails.invoice?.taxBankName || invoice.taxBankName || "");
    setValue("taxCity", reviewDetails.invoice?.taxCity || invoice.taxCity || "");
    setValue("taxCountry", reviewDetails.invoice?.taxCountry || invoice.taxCountry || "");
    setValue("taxEmail", reviewDetails.invoice?.taxEmail || invoice.taxEmail || "");
    setValue("taxLegalName", reviewDetails.invoice?.taxLegalName || invoice.taxLegalName || "");
    setValue("taxNumber", reviewDetails.invoice?.taxNumber || invoice.taxNumber || "");
    setValue("taxPhone", reviewDetails.invoice?.taxPhone || invoice.taxPhone || "");
    setValue("taxProvince", reviewDetails.invoice?.taxProvince || invoice.taxProvince || "");
    setValue("taxZipCode", reviewDetails.invoice?.taxZipCode || invoice.taxZipCode || "");
    setValue("vatAmount", reviewDetails.invoice?.vatAmount || invoice.vatAmount || "");

    // Logistics
    setValue("logAddress", reviewDetails.logistics?.logAddress || logistics.logAddress || "");
    setValue("logCity", reviewDetails.logistics?.logCity || logistics.logCity || "");
    setValue("logCountry", reviewDetails.logistics?.logCountry || logistics.logCountry || "");
    setValue("logEmail", reviewDetails.logistics?.logEmail || logistics.logEmail || "");
    setValue("logName", reviewDetails.logistics?.logName || logistics.logName || "");
    setValue("logNotes", reviewDetails.logistics?.logNotes || logistics.logNotes || "");
    setValue("logPhone", reviewDetails.logistics?.logPhone || logistics.logPhone || "");
    setValue("logProvince", reviewDetails.logistics?.logProvince || logistics.logProvince || "");
    setValue("logZipCode", reviewDetails.logistics?.logZipCode || logistics.logZipCode || "");

    // Additional fields
    setValue("accounts", reviewDetails.links || artist.links || []);
    setValue("highlights", reviewDetails.highlights?.addHighlights || highlights.addHighlights || []);
    setValue("cvEntries", reviewDetails.highlights?.cv || highlights.cv || "");
    setValue("documentName", reviewDetails.documents?.documentName || documents.documentName || []);
    setValue(
      "externalTags",
      reviewDetails.otherTags?.extTags ? `#${reviewDetails.otherTags.extTags}` : otherTags.extTags ? `#${otherTags.extTags}` : []
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
    setValue("managerName", reviewDetails.managerDetails?.managerName || managerDetails.managerName || "");
    setValue("managerLanguage", reviewDetails.managerDetails?.language || managerDetails.language || []);
    setValue("managerAddress", reviewDetails.managerDetails?.address?.address || managerAddress.address || "");
    setValue("managerCity", reviewDetails.managerDetails?.address?.city || managerAddress.city || "");
    setValue("managerCountry", reviewDetails.managerDetails?.address?.country || managerAddress.country || "");
    setValue("managerState", reviewDetails.managerDetails?.address?.state || managerAddress.state || "");
    setValue("managerZipCode", reviewDetails.managerDetails?.address?.zipCode || managerAddress.zipCode || "");
    setValue("managerEmail", reviewDetails.managerDetails?.managerEmail || managerDetails.managerEmail || "");
    setValue("managerGender", reviewDetails.managerDetails?.managerGender || managerDetails.managerGender || "");
    setValue("managerPhone", reviewDetails.managerDetails?.managerPhone || managerDetails.managerPhone || "");
    setManagerDetails(reviewDetails.isManagerDetails || artist.isManagerDetails || false);

    // Emergency Contact
    setValue("emergencyContactAddress", reviewDetails.emergencyInfo?.emergencyContactAddress || emergencyInfo.emergencyContactAddress || "");
    setValue("emergencyContactEmail", reviewDetails.emergencyInfo?.emergencyContactEmail || emergencyInfo.emergencyContactEmail || "");
    setValue("emergencyContactName", reviewDetails.emergencyInfo?.emergencyContactName || emergencyInfo.emergencyContactName || "");
    setValue("emergencyContactPhone", reviewDetails.emergencyInfo?.emergencyContactPhone || emergencyInfo.emergencyContactPhone || "");
    setValue("emergencyContactRelation", reviewDetails.emergencyInfo?.emergencyContactRelation || emergencyInfo.emergencyContactRelation || "");

    // Media
    setValue("additionalImage", []);
    setValue("existingAdditionalImage", reviewDetails.profile?.additionalImage || profile.additionalImage || []);
    setValue("mainImage", reviewDetails.profile?.mainImage || profile.mainImage || "");
    setValue("backImage", reviewDetails.profile?.backImage || profile.backImage || "");
    setValue("inProcessImage", reviewDetails.profile?.inProcessImage || profile.inProcessImage || "");
    setValue("mainVideo", reviewDetails.profile?.mainVideo || profile.mainVideo || "");
    setValue("additionalVideo", []);
    setValue("existingAdditionalVideo", reviewDetails.profile?.additionalVideo || profile.additionalVideo || []);

    // Commercialization
    setValue("publishingCatalog", reviewDetails.commercilization?.publishingCatalog || commercialization.publishingCatalog || []);
    setValue("artProvider", reviewDetails.commercilization?.artProvider || commercialization.artProvider || "");
    setValue("artistLevel", reviewDetails.commercilization?.artistLevel || commercialization.artistLevel || "");
    setValue("artistPlus", reviewDetails.commercilization?.artistPlus || commercialization.artistPlus || "");
    setValue("customOrder", reviewDetails.commercilization?.customOrder || commercialization.customOrder || "");
    setValue("maxNumberOfArtwork", reviewDetails.commercilization?.maxNumberOfArtwork || commercialization.maxNumberOfArtwork || "");
    setValue("minNumberOfArtwork", reviewDetails.commercilization?.minNumberOfArtwork || commercialization.minNumberOfArtwork || "");
    setValue("scorePlatform", reviewDetails.commercilization?.scorePlatform || commercialization.scorePlatform || "");
    setValue("scoreProfessional", reviewDetails.commercilization?.scoreProfessional || commercialization.scoreProfessional || "");

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
      reviewDetails.aboutArtist?.discipline?.map((item) => item?.style?.map((opt) => ({ value: opt, label: opt })) || []) ||
        aboutArtist.discipline?.map((item) => item?.style?.map((opt) => ({ value: opt, label: opt })) || []) ||
        []
    );
  }, [data]);

  const handlePDF = (file: string) => {
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
      getCityStateFromZipCountry(watchCountry, watchZip, apiKey).then(({ state, city }) => {
        setValue("city", city);
        setValue("stateRegion", state);
        // console.log(state, city);
      });
    }
  }, [watchCountry, watchZip]);

  const onSubmit = (data) => {
    delete data.insignia;
    delete data.publishingCatalog;

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          if (key === "cvEntries" || key === "accounts" || key === "discipline") {
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

  const picklist = RenderAllPicklists(["Event Type", "Event Scope", "Gender", "Language", "Social Media"]);

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
    toolbar: [[{ header: [1, 2, 3, 4, 5, false] }], [{ list: "ordered" }, { list: "bullet" }], ["bold", "italic", "underline"], [{ align: [] }]],
  };

  const formats = ["header", "font", "size", "list", "bullet", "bold", "italic", "underline", "align"];

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
        <div className={`p-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 items-center">
              <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("General Information")}</h2>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1
    ${
      isActiveStatus === "active"
        ? "bg-green-100 text-green-800"
        : isActiveStatus === "under-review"
        ? "bg-yellow-100 text-yellow-800"
        : isActiveStatus === "inactive"
        ? "bg-red-100 text-red-800"
        : "bg-gray-100 text-gray-600"
    }
  `}
              >
                <span
                  className={`w-2 h-2 rounded-full
      ${
        isActiveStatus === "active"
          ? "bg-green-500"
          : isActiveStatus === "under-review"
          ? "bg-yellow-500"
          : isActiveStatus === "inactive"
          ? "bg-red-500"
          : "bg-gray-400"
      }
    `}
                ></span>
                {isActiveStatus === "active"
                  ? t("Published")
                  : isActiveStatus === "under-review"
                  ? t("Pending Approval")
                  : isActiveStatus === "inactive"
                  ? t("Inactive")
                  : t("Unknown")}
              </span>
            </div>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artist Name")}</label>
              <input
                type="text"
                {...register("artistName", {
                  required: "Name is required",
                })}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.artistName && <div className="text-red-500 text-sm mt-1">{t(errors.artistName?.message)}</div>}
            </div>
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artist Surname 1")}</label>
              <input
                type="text"
                {...register("artistSurname1", {
                  required: "Email is required",
                })}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.artistSurname1 && <div className="text-red-500 text-sm mt-1">{t(`${errors.artistSurname1?.message}`)}</div>}
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artist Surname 2")}</label>
              <input
                type="text"
                {...register("artistSurname2")}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
            </div>
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Artist Display Name")}</label>
              <input
                type="text"
                {...register("nickName")}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Email")}</label>
              <input
                type="text"
                {...register("email", {
                  required: t("Name is required"),
                })}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{t(`${errors.email?.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Phone Number")}</label>
              <PhoneInput
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder={t("Enter phone number")}
                value={getValues("phoneNumber")}
                onChange={(val) => setValue("phoneNumber", val)}
                disabled
              />

              {errors.phoneNumber && <div className="text-red-500 text-sm mt-1">{t(`${errors.phoneNumber?.message}`)}</div>}
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Gender")}</label>
              <select
                {...register("gender", {
                  required: "Gender is required",
                })}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                {gender &&
                  gender.map((item, i: number) => (
                    <option value={item?.value} key={i}>
                      {t(item?.label)}
                    </option>
                  ))}
              </select>
              {errors.gender && <div className="text-red-500 text-sm mt-1">{t(`${errors.gender?.message}`)}</div>}
            </div>
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Language")}</label>
              <select
                {...register("language", {
                  required: "Language is required",
                })}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                {language &&
                  language.map((item, i) => (
                    <option key={i} value={item?.value}>
                      {t(item?.label)}
                    </option>
                  ))}
              </select>
              {errors.language && <div className="text-red-500 text-sm mt-1">{t(`${errors.language?.message}`)}</div>}
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Country")}</label>
              <CustomDropdown control={control} options={options} countryValue={countryValue} name="country" isActiveStatus="Under Maintenance" />

              {errors.country && <div className="text-red-500 text-sm mt-1">{t(`${errors.country?.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Zip Code")}</label>
              <input
                type="text"
                {...register("zip", {
                  required: "Zip Code is required",
                })}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.zip && <div className="text-red-500 text-sm mt-1">{t(`${errors.zip?.message}`)}</div>}
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("City")}</label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.city && <div className="text-red-500 text-sm mt-1">{t(`${errors.city?.message}`)}</div>}
            </div>
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("State/Region")}</label>
              <input
                type="text"
                {...register("stateRegion", {
                  required: "State/Region is required",
                })}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.stateRegion && <div className="text-red-500 text-sm mt-1">{t(`${errors.stateRegion?.message}`)}</div>}
            </div>
          </div>

          <div className="flex w-full gap-4 mb-4">
            <div className="w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Address")}</label>
              <Autocomplete
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
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

              {errors.address && <div className="text-red-500 text-sm mt-1">{t(`${errors.address?.message}`)}</div>}
            </div>
          </div>
        </div>

        <CVForm control={control} eventScope={eventScope} eventType={eventType} t={t} dark={dark} />

        <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("About")}</h2>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          <Controller
            name="about"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className={`relative ${dark ? "quill-dark" : ""}`}>
                <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("About")}</label>
                <style>{defaultSizeStyle}</style>
                <style>
                  {`
          .quill-dark .ql-editor {
            background-color: #374151;
            color: #F9FAFB;
          }

          .quill-dark .ql-toolbar {
            background-color: #1F2937;
            border-color: #4B5563;
          }

          .quill-dark .ql-container {
            border-color: #4B5563;
          }

          .quill-dark .ql-picker-label,
          .quill-dark .ql-picker-item {
            color: #F9FAFB;
          }

          .quill-dark .ql-stroke {
            stroke: #F9FAFB;
          }

          .quill-dark .ql-fill {
            fill: #F9FAFB;
          }
        `}
                </style>
                <ReactQuill {...field} placeholder={t("Write about yourself...")} modules={modules} formats={formats} />
              </div>
            )}
          />
        </div>

        <div className={`p-6 pb-2 mt-6 rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white border"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Insignia")}</h2>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          <div className="relative">
            <div
              className={`flex overflow-x-auto pb-4 gap-6 scroll-smooth whitespace-nowrap 
      scrollbar-thin ${dark ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800" : "scrollbar-thumb-gray-300 scrollbar-track-gray-100"}`}
            >
              {data?.data?.artist?.insignia?.map((item, i: number) => (
                <div
                  key={i}
                  className={`flex flex-col items-center flex-shrink-0 rounded-lg transition-all duration-300 
            ${dark ? "hover:bg-gray-700" : "hover:bg-gray-50"} hover:shadow-md`}
                >
                  <img
                    src={`${imageUrl}/users/${item.insigniaImage}`}
                    className="w-40 h-24 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    alt={item.credentialName || "Insignia"}
                    loading="lazy"
                  />

                  <h3 className={`mt-3 text-center font-medium max-w-[10rem] truncate ${dark ? "text-gray-200" : "text-gray-700"}`}>
                    {t(item.credentialName)}
                  </h3>
                </div>
              ))}

              {!data?.data?.artist?.insignia?.length && (
                <div className={`flex items-center justify-center w-full py-8 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  <p>{t("No insignia available")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <GeneralSocial control={control} isActiveStatus={isActiveStatus} socialMedia={socialMedia} dark={dark} />
        <Dicipline control={control} isActiveStatus={isActiveStatus} prefillValues={getValues("discipline")} watch={watch} dark={dark} />
        <GeneralMedia control={control} data={data?.data?.artist?.profile} isActiveStatus={isActiveStatus} dark={dark} />
        <Invoice control={control} dark={dark} />
        <Logistics control={control} dark={dark} />
        <Commercilization control={control} getValues={getValues} dark={dark} />

        <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Others")}</h2>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
          <div className="flex  flex-col gap-5">
            <div className="w-full relative flex flex-col gap-3 items-center">
              {data?.data?.artist?.documents?.map((item, index) => (
                <div key={index} className="w-full flex flex-col relative">
                  <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {t("Document") + " " + (index + 1)}
                  </label>
                  <input
                    disabled
                    type="text"
                    value={item?.documentName}
                    readOnly
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                      dark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                  <span
                    onClick={() => handlePDF(item?.uploadDocs)}
                    className={`cursor-pointer absolute top-11 right-4 transform flex flex-col justify-center`}
                  >
                    <FaEye size={20} className={dark ? "text-gray-100" : "text-gray-700"} />
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("External Tags")}</label>
              <input
                type="text"
                {...register("externalTags")}
                disabled={isActiveStatus !== "active"}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="Enter tags Start with # (separate with space or comma)"
                onChange={handleTagChange}
              />

              <div className="mt-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 border border-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                    {tag}
                    <span
                      onClick={() => handleRemoveTags(index)}
                      className={`ml-3 text-black cursor-pointer ${isActiveStatus !== "active" ? "pointer-events-none" : ""}`}
                    >
                      X
                    </span>
                  </span>
                ))}
              </div>
              {errors.externalTags && <div className="text-red-500 text-sm mt-1">{t(`${errors.externalTags.message}`)}</div>}
            </div>

            <div className="flex items-center gap-2">
              <h2 className={`block font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Revalidation Information")}</h2>

              {getValues("nextRevalidationDate") ? (
                calc(getValues("nextRevalidationDate")) === 0 ? null : calc(getValues("nextRevalidationDate")) > 0 ? (
                  <span className="w-fit bg-[#FEEDEC] text-[#f05438] rounded-2xl text-[12px] px-2">{`${Math.abs(
                    calc(getValues("nextRevalidationDate"))
                  )} ${t("Oudated Days")}`}</span>
                ) : (
                  <span className="w-fit bg-[#f2feec] border-[#0D894F] border rounded-2xl text-[12px] px-2">{`${Math.abs(
                    calc(getValues("nextRevalidationDate"))
                  )} ${t("Days Left")}`}</span>
                )
              ) : null}
            </div>

            <div className="flex justify-between md:flex-row flex-col items-center gap-5">
              <div className="md:w-[48%] w-full relative">
                <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Last Revalidation Date")}</label>
                <input
                  disabled
                  type="text"
                  {...register("lastRevalidationDate", {})}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    dark
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />

                {errors.lastRevalidationDate && <div className="text-red-500 text-sm mt-1">{t(`${errors.lastRevalidationDate.message}`)}</div>}
              </div>

              <div className="md:w-[48%] w-full relative">
                <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Next Revalidation Date")}</label>
                <input
                  disabled
                  type="text"
                  {...register("nextRevalidationDate", {})}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    dark
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {errors.nextRevalidationDate && <div className="text-red-500 text-sm mt-1">{t(`${errors.nextRevalidationDate.message}`)}</div>}
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
          </div>
        </div>

        <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Manager Information")}</h2>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
          <div className="flex justify-between flex-wrap gap-3">
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager Name")}</label>
              <input
                disabled
                type="text"
                {...register("managerName", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.managerName && <div className="text-red-500 text-sm mt-1">{t(`${errors.managerName.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager Email")}</label>
              <input
                disabled
                type="text"
                {...register("managerEmail", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.managerEmail && <div className="text-red-500 text-sm mt-1">{t(`${errors.managerEmail.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager Phone")}</label>
              <input
                type="text"
                disabled
                {...register("managerPhone", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.managerPhone && <div className="text-red-500 text-sm mt-1">{t(`${errors.managerPhone.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager Gender")}</label>
              <select
                {...register("managerGender")}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">{t("Select")}</option>
                {gender && gender.map((item, i) => <option key={i}>{t(item?.label)}</option>)}
              </select>
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager Language")}</label>
              <select
                {...register("managerLanguage")}
                disabled
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="">{t("Select")}</option>
                {language &&
                  language.map((item, i) => (
                    <option key={i} value={item?.value}>
                      {t(item?.label)}
                    </option>
                  ))}
              </select>
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager Address")}</label>
              <input
                disabled
                type="text"
                {...register("managerAddress", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.managerAddress && <div className="text-red-500 text-sm mt-1">{t(`${errors.managerAddress.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager Country")}</label>
              <input
                disabled
                type="text"
                {...register("managerCountry", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.managerCountry && <div className="text-red-500 text-sm mt-1">{t(`${errors.managerCountry.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager zipCode")}</label>
              <input
                disabled
                type="text"
                {...register("managerZipCode", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.managerZipCode && <div className="text-red-500 text-sm mt-1">{t(`${errors.managerZipCode.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager State")}</label>
              <input
                type="text"
                disabled
                {...register("managerState", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.managerState && <div className="text-red-500 text-sm mt-1">{t(`${errors.managerState.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Manager City")}</label>
              <input
                disabled
                type="text"
                {...register("managerCity", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.managerCity && <div className="text-red-500 text-sm mt-1">{t(`${errors.managerCity.message}`)}</div>}
            </div>
          </div>
        </div>

        <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Emergency Information")}</h2>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          <div className="flex justify-between flex-wrap gap-3 pointer-events-none">
            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Emergency Contact Name")}</label>
              <input
                type="text"
                disabled
                {...register("emergencyContactName", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.emergencyContactName && <div className="text-red-500 text-sm mt-1">{t(`${errors.emergencyContactName.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Emergency Contact Phone")}</label>
              <input
                disabled
                type="text"
                {...register("emergencyContactPhone", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.emergencyContactPhone && <div className="text-red-500 text-sm mt-1">{t(`${errors.emergencyContactPhone.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Emergency Contact Email")}</label>
              <input
                disabled
                type="text"
                {...register("emergencyContactEmail", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.emergencyContactEmail && <div className="text-red-500 text-sm mt-1">{t(`${errors.emergencyContactEmail.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Emergency Contact Address")}</label>
              <input
                disabled
                type="text"
                {...register("emergencyContactAddress", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.emergencyContactAddress && <div className="text-red-500 text-sm mt-1">{t(`${errors.emergencyContactAddress.message}`)}</div>}
            </div>

            <div className="md:w-[48%] w-full relative">
              <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                {t("Emergency Contact Relation")}
              </label>
              <input
                disabled
                type="text"
                {...register("emergencyContactRelation", {})}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.emergencyContactRelation && <div className="text-red-500 text-sm mt-1">{t(`${errors.emergencyContactRelation.message}`)}</div>}
            </div>
          </div>
        </div>

        <div className={`fixed bottom-0 left-0 right-0 py-4 px-6 flex justify-end gap-4`}>
          <button
            type="submit"
            disabled={isPending}
            className={`px-6 py-3 rounded-lg font-medium transition-all bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white ${
              isPending ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {isPending ? t("Saving...") : t("Save Changes")}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default GeneralForm;
