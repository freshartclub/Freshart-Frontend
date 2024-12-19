import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../ui/Header";
import P from "../ui/P";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../ui/Button";
import arrow from "../../assets/arrow.png";
import BackButton from "../ui/BackButton";
import { useNavigate } from "react-router-dom";
import upload_image from "../../assets/Upload_image.png";
import UploadImage from "../ui/UploadImage";
import useCompleteRegistration from "../../http/artist/useCompleteRegistration";
import { useAppSelector } from "../../store/typedReduxHooks";
import CustomDropdown from "./CustomDropdown";
import countryList from "react-select-country-list";
import { getCityStateFromZipCountry } from "../utils/MapWithAutocomplete";

const RegistrationProcess = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { mutateAsync, isPending } = useCompleteRegistration();

  const { userId } = useAppSelector((state) => state.user);
  const options = useMemo(() => countryList(), []);

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const redirectToPricePlan = (data: any) => {
    navigate("/priceandplans");
  };

  const redirectToTermAndCondition = () => {
    window.scrollTo(0, 0);
    window.open("/terms", "_blank");
  };

  const validationSchema = Yup.object({
    artistName: Yup.string().required("Name is required"),
    artistSurname1: Yup.string().required("Surname1 is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string().required("ZipCode is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("state is required"),
    gender: Yup.string().required("Gender is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      artistName: "",
      artistSurname1: "",
      country: "",
      zipCode: "",
      city: "",
      state: "",
      gender: "",
      terms: false,
    },
  });

  const zipCode = watch("zipCode");
  const country = watch("country");
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (country && zipCode && zipCode.length > 4) {
      getCityStateFromZipCountry(country, zipCode, apiKey).then(
        ({ state, city }) => {
          setValue("city", city);
          setValue("state", state);
        }
      );
    }
  }, [country, zipCode]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("mainImage", selectedFile);

    const newData = {
      data: formData,
      userId: userId,
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
        <div className="xl:w-[90%] w-full mx-auto bg-white shadow-xl">
          <div className="text-center xl:p-10 lg:p-6 md:p-6 p-3">
            <BackButton
              onClick={handleBack}
              iconClass="text-text_primary_dark font-semibold"
              className="py-4 hidden md:flex mb-4"
            />

            <Header
              variant={{ size: "3xl", theme: "dark", weight: "bold" }}
              className="mb-5"
            >
              Complete Your Profile
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="mb-5"
            >
              Please fill the form below to become an art lover. Feel free to
              add as much detail as needed.
            </P>

            <div className="flex lg:flex-row flex-col xl:gap-10 gap-8 xl:items-start items-center">
              <div className="xl:p-8 p-3 shadow-xl rounded-xl bg-white h-fit xl:w-[30%] sm:w-[45%] w-[90%] flex flex-col justify-center items-center">
                <UploadImage
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />
              </div>

              <div className="w-full">
                <form className="w-full">
                  <div className="md:p-10 p-3 rounded-xl bg-white shadow-2xl">
                    <div className="flex md:flex-row flex-col justify-between">
                      <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                        <label
                          htmlFor="artistName"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Name *
                        </label>
                        <input
                          {...register("artistName")}
                          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter Name
"
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
                          Surname 1 *
                        </label>
                        <input
                          {...register("artistSurname1")}
                          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter Surname
"
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
                          Surname 2
                        </label>
                        <input
                          {...register("artistSurname2")}
                          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter Surname
"
                        />
                        {errors.artistSurname2 && (
                          <p className="text-red-500 text-sm text-left">
                            {errors.artistSurname2.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                        <label
                          htmlFor="gender"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Gender *
                        </label>

                        <select
                          {...register("gender")}
                          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
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
                        <label
                          htmlFor="country"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Country
                        </label>
                        <CustomDropdown
                          control={control}
                          options={options}
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
                          Zipcode
                        </label>
                        <input
                          {...register("zipCode")}
                          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter Zipcode
"
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
                          City *
                        </label>
                        <input
                          {...register("city")}
                          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter City
"
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
                          Province *
                        </label>
                        <input
                          {...register("state")}
                          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter Province
"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm text-left">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex text-left mt-5">
                    <Controller
                      name="terms"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          {...field}
                          id="terms"
                          className="h-4 w-4 mt-[2px] text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      )}
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm text-gray-700"
                    >
                      I accept all
                      <a
                        href="#"
                        className="text-[#FF536B] ml-2 font-semibold border-b border-b-[#FF536B]"
                        onClick={redirectToTermAndCondition}
                      >
                        Terms & Conditions.
                      </a>
                    </label>
                  </div>
                  {errors.terms && (
                    <div className="text-red-500 text-sm text-left">
                      {errors.terms.message}
                    </div>
                  )}

                  <div className="flex sm:justify-end justify-center mt-5">
                    <Button
                      onClick={onSubmit}
                      type="submit"
                      variant={{
                        fontSize: "md",
                        theme: "dark",
                        fontWeight: "500",
                        rounded: "full",
                      }}
                      className="flex items-center"
                      // disabled={isSubmitting || !isValid}
                    >
                      {isPending ? "Loading..." : "Continue"}
                      <img src={arrow} alt="arrow" className="ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationProcess;
