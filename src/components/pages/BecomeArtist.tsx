import { useFormik } from "formik";
import * as Yup from "yup";
import P from "../ui/P";
import Header from "../ui/Header";
import browser from "../../assets/cloud-add.png";
import Button from "../ui/Button";
import arrow from "../../assets/arrow.png";
import axios from "axios";
import toast from "react-hot-toast";
import file_logo from "../../assets/file_logo.png";
import { useRef } from "react";
import { CommonValidation } from "../ui/CommonValidation";

const BecomeArtist = () => {
  const fileInputRef = useRef(null);
  interface FormValues {
    fullName: string;
    email: string;
    phone: string;
    category: string;
    style: string;
    zipCode: string;
    region: string;
    city: string;
    country: string;
    socialMedia: string;
    website: string;
    uploadDocs: File | null;
  }
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      category: "",
      style: "",
      zipCode: "",
      city: "",
      region: "",
      country: "",
      socialMedia: "",
      website: "",
      uploadDocs: null,
    },

    validationSchema: CommonValidation,

    onSubmit: async (values: FormValues) => {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("category", values.category);
      formData.append("style", values.style);
      formData.append("zipCode", values.zipCode);
      formData.append("region", values.region);
      formData.append("country", values.country);
      formData.append("socialMedia", values.socialMedia);
      formData.append("website", values.website);
      formData.append("city", values.city);
      formData.append("uploadDocs", values.uploadDocs);

      console.log(formData.get("uploadDocs"));

      try {
        const response = await axios.post(
          "http://localhost:5000/api/artist/become-artist",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Become Artist successfull");
        formik.resetForm();
      } catch (error) {
        console.error(
          "Become Artist failed",
          error.response ? error.response.data : error.message
        );
        toast.error("Become Artist Form failed");
      }
    },
  });

  return (
    <div className="bg-[#F9F7F6]">
      <div className="container mx-auto sm:px-6 px-3">
        <div className="xl:w-[70%] lg:w-[90%] w-full mx-auto py-10">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white  -md rounded px-8 pt-6 pb-8 mb-4"
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
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                placeholder="Enter full name"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <span className="text-red-500 text-xs ">
                  {formik.errors.fullName}
                </span>
              )}
            </div>
            <div className="flex sm:flex-row flex-col justify-between">
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                  placeholder="Enter email"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.email}
                  </span>
                )}
              </div>

              <div className="mb-4 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                  placeholder="Enter phone number"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.phone}
                  </span>
                )}
              </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-between">
              {/* Category Field */}
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus: -outline"
                >
                  <option value="">Select category</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                </select>
                {formik.touched.category && formik.errors.category && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.category}
                  </span>
                )}
              </div>

              {/* Style Field */}
              <div className="mb-4 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Style
                </label>
                <select
                  name="style"
                  value={formik.values.style}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus: -outline"
                >
                  <option value="">Select style</option>
                  <option value="style1">Style 1</option>
                  <option value="style2">Style 2</option>
                </select>
                {formik.touched.style && formik.errors.style && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.style}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ZipCode
              </label>
              <input
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                placeholder="Enter City"
              />
              {formik.touched.zipCode && formik.errors.zipCode && (
                <span className="text-red-500 text-xs  ">
                  {formik.errors.zipCode}
                </span>
              )}
            </div>
            <div className="flex sm:flex-row flex-col justify-between">
              <div className="mb-4 sm:w-[32%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City
                </label>
                <input
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                  placeholder="Enter City"
                />
                {formik.touched.city && formik.errors.city && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.city}
                  </span>
                )}
              </div>

              <div className="mb-4 sm:w-[32%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Region
                </label>
                <input
                  name="region"
                  value={formik.values.region}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                  placeholder="Enter Region"
                />
                {formik.touched.region && formik.errors.region && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.region}
                  </span>
                )}
              </div>

              <div className="mb-4 sm:w-[32%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country
                </label>
                <input
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                  placeholder="Enter Country"
                />
                {formik.touched.country && formik.errors.country && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.country}
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
                  name="socialMedia"
                  value={formik.values.socialMedia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus: -outline"
                >
                  <option value="">Instagram</option>
                  <option value="socialMedia1">Facebook</option>
                  <option value="socialMedia2">LinkedIn</option>
                  <option value="socialMedia3">Twitter</option>
                </select>

                {formik.touched.socialMedia && formik.errors.socialMedia && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.socialMedia}
                  </span>
                )}
              </div>

              <div className="mb-4 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Website
                </label>
                <input
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                  placeholder="www.google.com"
                />
                {formik.touched.website && formik.errors.website && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.website}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-8">
              <div
                className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="flex justify-center items-center">
                  <img src={browser} alt="browse-icon" />
                </div>
                <label className="block text-gray-700 sm:text-xl text-lg font-bold mb-2 text-center">
                  Upload Your CV Here
                </label>
                <label className="block text-center">
                  <input
                    ref={fileInputRef}
                    name="uploadDocs"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "uploadDocs",
                        event.currentTarget.files[0]
                      );

                      event.target.value = null;
                    }}
                    className="hidden"
                  />
                  <p className="text-gray-600 sm:text-md text-base mt-4">
                    PDF, DOC, and Excel formats, up to 5MB
                  </p>

                  {formik.values.uploadDocs && (
                    <>
                      <div className="w-full flex items-center justify-center mt-4">
                        <img
                          src={file_logo}
                          alt="file logo"
                          className="w-[20px] h-[20px] mt-2 mr-1"
                        />
                        <p className="text-red-500 text-bold mt-2">
                          {formik.values.uploadDocs.name}
                        </p>
                      </div>
                    </>
                  )}

                  <Button
                    variant={{
                      fontSize: "md",
                      thickness: "thick",
                      fontWeight: "600",
                    }}
                    className="border border-[#CBD0DC] text-[#54575C] py-3 sm:px-16 rounded-2xl cursor-pointer mt-5"
                  >
                    Browse File
                  </Button>
                </label>
                {formik.touched.website && formik.errors.website && (
                  <span className="text-red-500 text-xs  ">
                    {formik.errors.uploadDocs}
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
                  thickness: "",
                }}
                className="text-white py-3 px-6 flex uppercase"
              >
                <span> Submit</span>
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
