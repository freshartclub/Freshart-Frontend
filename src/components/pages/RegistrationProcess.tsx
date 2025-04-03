import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import countryList from "react-select-country-list";
import * as Yup from "yup";
import arrow from "../../assets/arrow.png";
import useCompleteRegistration from "../../http/artist/useCompleteRegistration";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import UploadImage from "../ui/UploadImage";
import { getCityStateFromZipCountry } from "../utils/MapWithAutocomplete";
import { RenderAllPicklists } from "../utils/RenderAllPicklist";
import CustomDropdown from "./CustomDropdown";
import { useGetInviteFullData } from "./http/useGetInviteFullData";

const RegistrationProcess = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { mutateAsync, isPending } = useCompleteRegistration();
  const { data } = useGetInviteFullData();
  const { t } = useTranslation();

  const options = useMemo(() => countryList(), []);

  const validationSchema = Yup.object({
    artistName: Yup.string().required(t("First Name is required")),
    artistSurname1: Yup.string().required(t("Surname 1 is required")),
    artistSurname2: Yup.string().optional(),
    country: Yup.string().required(t("Country is required")),
    zipCode: Yup.string().required(t("ZipCode is required")),
    city: Yup.string().required(t("City is required")),
    state: Yup.string().required(t("State is required")),
    gender: Yup.string().required(t("Gender is required")),
    phone: Yup.string().required(t("Phone Number is required")),
    dob: Yup.date().required(t("Date of Birth is required")),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      artistName: "",
      artistSurname1: "",
      artistSurname2: "",
      phone: "",
      dob: "",
      country: "",
      zipCode: "",
      city: "",
      state: "",
      gender: "",
    },
  });

  const zipCode = watch("zipCode");
  const country = watch("country");
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (data) {
      setValue("artistName", data?.firstName);
      setValue("artistSurname1", data?.surname1);
      setValue("artistSurname2", data?.surname2);
      setValue("phone", data?.phone);

      if (data?.dob) {
        const formattedDob = formatDateForInput(data.dob);
        setValue("dob", formattedDob);
      }

      setValue("country", data?.country);
      setValue("country", data?.country);
      setValue("zipCode", data?.zipCode);
      setValue("city", data?.city);
      setValue("state", data?.region);
      setValue("gender", data?.gender);
    }
  }, [data]);

  const formatDateForInput = (dateString) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!data && country && zipCode && zipCode.length > 4) {
      getCityStateFromZipCountry(country, zipCode, apiKey).then(
        ({ state, city }) => {
          setValue("city", city);
          setValue("state", state);
        }
      );
    }
  }, [country, zipCode]);

  const picklist = RenderAllPicklists(["Gender"]);
  const picklistMap = picklist.reduce((acc, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const gender = picklistMap["Gender"];

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("mainImage", selectedFile);

    const newData = {
      data: formData,
    };

    try {
      await mutateAsync(newData);
    } catch (error) {
      console.error("Error in form submission: ", error);
    }
  });

  return (
    <div className="bg-[#F9F7F6] py-10">
      <div className="container mx-auto sm:px-6 px-3">
        <div className="xl:w-[90%] w-full mx-auto bg-white shadow-md border border-zinc-300">
          <div className="text-center xl:p-10 lg:p-6 md:p-6 p-3">
            <Header
              variant={{ size: "3xl", theme: "dark", weight: "bold" }}
              className="mb-5"
            >
              {t("Complete Your Profile")}
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="mb-5"
            >
              {t(
                "Please fill the form below to become an art lover. Feel free to add as much detail as needed."
              )}
            </P>

            <div className="flex lg:flex-row flex-col xl:gap-10 gap-8 xl:items-start items-center ">
              <div className="xl:p-8 p-3 border border-zinc-300 shadow-md rounded-xl bg-white h-fit xl:w-[30%] relative sm:w-[45%] w-[90%] flex flex-col justify-center items-center">
                <UploadImage
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />

                <span
                  className={`absolute top-5 ${
                    selectedFile ? "block" : "hidden"
                  } right-5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer`}
                  onClick={() => setSelectedFile(null)}
                >
                  &times;
                </span>
              </div>

              <form className="w-full">
                <div className="p-3 px-6 rounded-xl border border-zinc-300 bg-white shadow-md">
                  <div className="flex md:flex-row flex-col justify-between">
                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label
                        htmlFor="artistName"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        {t("First Name")} *
                      </label>
                      <input
                        {...register("artistName")}
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder={t("Enter Firstname")}
                      />
                      {errors.artistName && (
                        <p className="text-red-500 text-sm text-left">
                          {errors.artistName.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label
                        htmlFor="artistSurname1"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        {t("Surname 1")} *
                      </label>
                      <input
                        {...register("artistSurname1")}
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder={t("Enter Surname")}
                      />
                      {errors.artistSurname1 && (
                        <p className="text-red-500 text-sm text-left">
                          {errors.artistSurname1.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-row flex-col justify-between">
                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label
                        htmlFor="artistSurname2"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        {"Surname 2"}
                      </label>
                      <input
                        {...register("artistSurname2")}
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder={t("Enter Surname 2")}
                      />
                    </div>

                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        {t("Gender")} *
                      </label>

                      <select
                        {...register("gender")}
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                      >
                        <option value="">{t("Select")}</option>
                        {gender &&
                          gender.map((item, i) => (
                            <option key={i} value={item?.value}>
                              {t(item?.value)}
                            </option>
                          ))}
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm text-left">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-row flex-col justify-between">
                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">
                        {t("Phone Number")} *
                      </label>
                      <div className="flex sm:flex-row flex-col w-full gap-2">
                        <PhoneInput
                          className="appearance-none  outline-none rounded w-full text-gray-700 leading-tight focus:outline-none"
                          placeholder={t("Enter Phone number")}
                          defaultCountry={"es"}
                          // disabled={isValidatePhone}
                          value={getValues("phone")}
                          onChange={(val) => {
                            setValue("phone", val);
                          }}
                        />
                      </div>
                    </div>

                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">
                        {t("Date Of Birth")} *
                      </label>
                      <input
                        type="date"
                        {...register("dob", {
                          required: t("Date of birth is required"),
                          validate: {
                            validDate: (value) => {
                              const selectedDate = new Date(value);
                              const today = new Date();
                              return (
                                selectedDate <= today ||
                                t("Date cannot be in the future")
                              );
                            },
                            oldEnough: (value) => {
                              const selectedDate = new Date(value);
                              const minAgeDate = new Date();
                              minAgeDate.setFullYear(
                                minAgeDate.getFullYear() - 13
                              );
                              return (
                                selectedDate <= minAgeDate ||
                                t("You must be at least 13 years old")
                              );
                            },
                          },
                        })}
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder={t("Select date of birth")}
                        max={new Date().toISOString().split("T")[0]}
                      />
                      {errors.dob && (
                        <p className="text-red-500 text-sm text-left">
                          {errors.dob.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-row flex-col justify-between">
                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label
                        htmlFor="country"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        {t("Country")} *
                      </label>
                      <CustomDropdown
                        control={control}
                        options={options}
                        countryValue={getValues("country")}
                        name="country"
                        isActiveStatus="active"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm text-left">
                          {errors.country.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label
                        htmlFor="zipCode"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        {t("ZipCode")} *
                      </label>
                      <input
                        {...register("zipCode")}
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder={t("Enter ZipCode")}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm text-left">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-row flex-col justify-between">
                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        {t("City")} *
                      </label>
                      <input
                        {...register("city")}
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder={t("Enter City")}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm text-left">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        {t("State/Region")} *
                      </label>
                      <input
                        {...register("state")}
                        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder={t("Enter Province")}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm text-left">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex sm:justify-end justify-center mt-5">
                  <Button
                    type="submit"
                    onClick={onSubmit}
                    disabled={isPending}
                    variant={{
                      fontSize: "md",
                      theme: "dark",
                      fontWeight: "500",
                      rounded: "full",
                    }}
                    className="flex items-center justify-center min-w-[120px] px-6 py-2 transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed group"
                    aria-label={
                      isPending ? t("Submitting in progress") : t("Submit form")
                    }
                  >
                    {isPending ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            opacity="0.3"
                          />
                          <path
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        {t("Loading...")}
                      </>
                    ) : (
                      <>
                        <span className="mr-2">{t("Submit")}</span>
                        <img
                          src={arrow}
                          alt={t("Arrow icon")}
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationProcess;
