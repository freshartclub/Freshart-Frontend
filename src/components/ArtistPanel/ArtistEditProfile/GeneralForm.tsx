import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import GeneralSocial from "./GeneralSocial";
import GeneralMedia from "./GeneralMedia";
import CVForm from "./CVForm";
import { json, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../store/typedReduxHooks";
import useGetSaveArtistDetailsMutation from "./http/useGetSaveArtistDetails";
import { useGetArtistDetails } from "../../UserProfile/http/useGetDetails";
import Loader from "../../ui/Loader";

const GeneralForm = () => {
  // const data = useAppSelector((state) => state.data.data);
  // console.log(data);
  const { data, isLoading } = useGetArtistDetails();

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
      name: data?.artistName || "",
      country: data?.address?.country || "Spain",
      zip: data?.address.zipCode || "",
      city: data?.address?.city || "",
      stateRegion: data?.address?.state || "",
      phoneNumber: data?.phone || "",
      address: data?.address?.residentialAddress || "",
      email: data?.email || "",
      language: data?.language || [],
      gender: data?.gender || "",
      about: data?.aboutArtist?.about || "",

      imageFields: data?.profile.additionalImage || "",
      videoFields: data?.profile.mainVideo || "",
      cvEntries: data?.highlights.cv || "",
      accounts: data?.links || "",
    },
  });

  console.log(getValues());

  useEffect(() => {
    if (data) {
      setValue("name", data.artistName || "");
      setValue("country", data.address.country || "Spain");
      setValue("zip", data.zipCode || "");
      setValue("city", data?.address?.city || "");
      setValue("stateRegion", data.address?.state || "");
      setValue("zip", data.address.zipCode || "");
      setValue("phoneNumber", data.phone || "");
      setValue("address", data.address?.residentialAddress || "");
      setValue("email", data.email || "");
      setValue("about", data?.aboutArtist?.about || "");
      setValue("language", data.language || []);
      setValue("gender", data.gender || "");
      setValue("accounts", data.links || "");
      setValue("cvEntries", data?.highlights.cv || "");
      setValue("imageFields", data?.profile?.additionalImage || "");
      setValue("videoFields", data?.profile?.mainVideo || "");
    }
  }, [data, setValue]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "images" && key !== "videos" && key !== "cvEntries") {
        formData.append(key, data[key]);
      }
    });

    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((image, index) => {
        // Ensure you append valid string or Blob data
        if (typeof image === "object" && image.url) {
          formData.append(`images[${index}]`, image.url); // Use URL or convert object to string if necessary
        }
      });
    }

    if (data.videos && Array.isArray(data.videos)) {
      data.videos.forEach((video, index) => {
        // Similarly handle videos array
        if (typeof video === "object" && video.url) {
          formData.append(`videos[${index}]`, video.url);
        }
      });
    }

    if (data.cvEntries && Array.isArray(data.cvEntries)) {
      data.cvEntries.forEach((cv, index) => {
        // Convert the whole cv object to a JSON string

        formData.append(`cvEntries[${index}]`, JSON.stringify(cv));
      });
    }

    if (data.accounts && Array.isArray(data.accounts)) {
      data.accounts.forEach((account, index) => {
        if (account.socialMedia && account.website) {
          formData.append(
            `accounts[${index}].socialMedia`,
            account.socialMedia
          );
          formData.append(`accounts[${index}].website`, account.website);
        }
      });
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      mutate(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[70%] flex shadow-lg justify-center items-center">
          {/* Child Container with Border */}
          <div className="rounded-md w-full bg-white">
            <div className="xl:p-4 lg:p-3 md:p-4 p-3 w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                  <div className="md:w-[48%] w-full relative">
                    <input
                      type="text"
                      placeholder="Jayvion Simon"
                      {...register("name", { required: "Name is required" })}
                      className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                    >
                      Name
                    </label>
                    {errors.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className="md:w-[48%] w-full relative">
                    <input
                      type="text"
                      placeholder="nannie.abernathy70@yahoo.com"
                      {...register("email", { required: "Email is required" })}
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
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                  <div className="md:w-[48%] w-full relative">
                    <input
                      type="text"
                      placeholder="365-374-4961"
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                      })}
                      className="border border-[#E6E6E6] p-3 w-full rounded-md placeholder::font-montserrat font-normal text-left placeholder:text-[#1C252E] outline-none"
                    />
                    <label
                      htmlFor="phoneNumber"
                      className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                    >
                      Phone Number
                    </label>
                    {errors.phoneNumber && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                  <div className="md:w-[48%] w-full relative">
                    <input
                      type="text"
                      placeholder="Enter Your Adress"
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
                        {errors.address.message}
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
                        {errors.country.message}
                      </div>
                    )}
                  </div>
                  <div className="md:w-[48%] w-full relative">
                    <input
                      type="text"
                      placeholder="Enter your country"
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
                        {errors.stateRegion.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
                  <div className="md:w-[48%] w-full relative">
                    <input
                      type="text"
                      placeholder="Enter Your City"
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
                        {errors.city.message}
                      </div>
                    )}
                  </div>
                  <div className="md:w-[48%] w-full relative">
                    <input
                      type="text"
                      placeholder="Enter Your Zip Code"
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
                        {errors.zip.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full relative">
                  <textarea
                    rows="3"
                    placeholder="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci."
                    {...register("about")}
                    className="border border-[#E6E6E6] outline-none p-3 w-full rounded-md placeholder:font-montserrat font-normal text-left placeholder:text-[#1C252E]"
                  />
                  <label
                    htmlFor="about"
                    className="absolute text-sm top-[-10px] left-3 bg-white px-1 font-montserrat font-semibold text-[#637381]"
                  >
                    About
                  </label>
                </div>

                <GeneralSocial control={control} register={register} />
                <GeneralMedia control={control} setValue={setValue} />
                <CVForm control={control} />

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
      )}
    </>
  );
};

export default GeneralForm;
