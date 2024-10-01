import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import { useState } from "react";
import DatePicker from "react-datepicker";

const CreateInvite = () => {
  const [startDate, setStartDate] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      name: "",
      surname1: "",
      surname2: "",
      country: "",
      zipcode: "",
      city: "",
      province: "",
      selectGender: "",
      dob: "",
      discountCode: "",
      inviteCode: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email formate")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      name: Yup.string().required("Name is required"),
      surname1: Yup.string().required("Surname1 is required"),
      surname2: Yup.string().required("Surname2 is required"),
      country: Yup.string().required("Country is required"),
      zipcode: Yup.string().required("Zip code is required"),
      city: Yup.string().required("City is required"),
      province: Yup.string().required("Province is required"),
      selectGender: Yup.string().required("Gender is required"),
      dob: Yup.string().required("Dob is required"),
      discountCode: Yup.string().required("Discount Code is required"),
      inviteCode: Yup.string().required("Invite Code is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <div className="bg-[#F9F7F6]">
        <div className="container mx-auto sm:px-6 px-3">
          <div className="xl:w-[50%] lg:w-[70%] w-full mx-auto py-10">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <Header
                variant={{ size: "3xl", weight: "bold", theme: "dark" }}
                className="text-center mb-4"
              >
                Create Invite Link
              </Header>
              <P
                variant={{ size: "md", theme: "dark", weight: "normal" }}
                className="text-sm text-gray-600 mb-8 text-center"
              >
                Please fill the form below to Create a invite link. Feel free to
                add as much detail as needed.
              </P>

              <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                    placeholder="admin@gmal.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.email}
                    </span>
                  )}
                </div>

                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>

                  <input
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                    placeholder="+91 9546213252"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 grid-cols-1 gap-3 sm:mb-4 mb-2">
                <div className="">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>

                  <input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                    placeholder="Name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.name}
                    </span>
                  )}
                </div>

                <div className="">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Surname1
                  </label>

                  <input
                    name="surname1"
                    value={formik.values.surname1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                    placeholder="Surname1"
                  />
                  {formik.touched.surname1 && formik.errors.surname1 && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.surname1}
                    </span>
                  )}
                </div>

                <div className="">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Surname2
                  </label>

                  <input
                    name="surname2"
                    value={formik.values.surname2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                    placeholder="Surname2"
                  />
                  {formik.touched.surname2 && formik.errors.surname2 && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.surname2}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country
                  </label>

                  <select
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus: -outline"
                  >
                    <option value="">Select Country</option>
                    <option value="category1">Country 1</option>
                    <option value="category2">Country 2</option>
                  </select>
                  {formik.touched.country && formik.errors.country && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.country}
                    </span>
                  )}
                </div>

                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Zipcode
                  </label>
                  <input
                    name="zipcode"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                    placeholder="452010"
                  />
                  {formik.touched.zipcode && formik.errors.zipcode && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.zipcode}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
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
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.city}
                    </span>
                  )}
                </div>

                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Province
                  </label>

                  <input
                    name="province"
                    value={formik.values.province}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                    placeholder="Enter Province"
                  />
                  {formik.touched.province && formik.errors.province && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.province}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Gender
                  </label>
                  <select
                    name="selectGender"
                    value={formik.values.selectGender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus: -outline"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {formik.touched.selectGender &&
                    formik.errors.selectGender && (
                      <span className="text-red-500 text-xs italic">
                        {formik.errors.selectGender}
                      </span>
                    )}
                </div>

                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Birth
                  </label>

                  <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    onBlur={formik.handleBlur}
                    className="  appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus: -outline"
                  />

                  {/* {formik.touched.dob && formik.errors.dob && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.dob}
                    </span>
                  )} */}
                </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Add Discount Code
                  </label>
                  <input
                    name="discountCode"
                    value={formik.values.discountCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className=" appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="XXXXX - XXXXX - XXXXX"
                  />
                  {formik.touched.discountCode && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.discountCode}
                    </span>
                  )}
                </div>

                <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Invite Code
                  </label>
                  <input
                    name="inviteCode"
                    value={formik.values.inviteCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className=" appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="ABCD-EFCFD-DHDF"
                  />
                  {formik.touched.inviteCode && formik.errors.inviteCode && (
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.inviteCode}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center sm:gap-5 gap-2">
                <Button
                  type="submit"
                  variant={{
                    fontSize: "base",
                    rounded: "full",
                    theme: "dark",
                    fontWeight: "500",
                    thickness: "",
                  }}
                  className="text-white py-2 sm:px-6 px-4 flex uppercase"
                >
                  <span>COPY CODE</span>
                </Button>
                <Button
                  type="submit"
                  variant={{
                    fontSize: "base",
                    rounded: "full",
                    theme: "dark",
                    fontWeight: "500",
                    thickness: "",
                  }}
                  className="text-white py-2 sm:px-6 px-4 flex uppercase"
                >
                  <span>SEND LINK</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvite;
