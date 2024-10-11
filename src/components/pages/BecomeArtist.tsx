import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import P from "../ui/P";
import Header from "../ui/Header";
import browser from "../../assets/cloud-add.png";
import Button from "../ui/Button";
import arrow from "../../assets/arrow.png";

import useBecomeAnArtistMutation from "../../http/artist/useBecomeAnArtistMutation";
import { useState } from "react";

const BecomeArtist = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone Number is required"),
    category: Yup.string().required("Category is required"),
    style: Yup.string().required("Style is required"),
    zipCode: Yup.string().required("ZipCode is required"),
    city: Yup.string().required("City is required"),
    region: Yup.string().required("Region is required"),
    country: Yup.string().required("Country is required"),
    socialMedia: Yup.string().required("Social Media Reference is required"),
    // website: Yup.string().url("Invalid URL"),
    uploadDocs: Yup.mixed().required("CV upload is required"),
  });

  const [uploadDocs, setUploadDocs] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync, isPending } = useBecomeAnArtistMutation();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    

    Object.keys(data).forEach((key) => {
      if (key === "uploadDocs" && uploadDocs) {
        formData.append(key, uploadDocs);
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

  return (
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

            <div className="sm:mb-4 mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                {...register("fullName")}
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Enter full name"
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className="flex sm:flex-row flex-col justify-between">
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Enter email"
                />
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
                <input
                  {...register("phone")}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex sm:flex-row flex-col justify-between">
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                </select>
                {errors.category && (
                  <span className="text-red-500 text-xs">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <div className="mb-4 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Style
                </label>
                <select
                  {...register("style")}
                  className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none"
                >
                  <option value="">Select style</option>
                  <option value="style1">Style 1</option>
                  <option value="style2">Style 2</option>
                </select>
                {errors.style && (
                  <span className="text-red-500 text-xs">
                    {errors.style.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ZipCode
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

            <div className="flex sm:flex-row flex-col justify-between">
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
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter</option>
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

            <div className="mb-8">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer">
                <div className="flex justify-center items-center">
                  <img src={browser} alt="browse-icon" />
                </div>
                <label className="block text-gray-700 sm:text-xl text-lg font-bold mb-2 text-center">
                  Upload Your CV Here
                </label>
                <input
                  {...register("uploadDocs", { required: true })} // Make sure to include validation if necessary
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

            <div className="flex items-center justify-end">
              <Button
                type="submit"
                variant={{
                  fontSize: "md",
                  rounded: "full",
                  theme: "dark",
                  fontWeight: "600",
                }}
                className="text-white py-3 px-6 flex uppercase"
              >
                {isPending ? "Submiting..." : "Submit"}
                <img src={arrow} alt="arrow" className="mt-1 ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeArtist;
