// import { ErrorMessage, Field, Form, Formik } from "formik";
// import Header from "../ui/Header";
// import * as Yup from "yup";
// import Button from "../ui/Button";
// import P from "../ui/P";
// import Select from "react-select";

// const BillingAddress = () => {
//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     companyName: Yup.string().required("Company Name is required"),
//     streetAddress: Yup.string().required("Street Address is required"),
//     phone: Yup.string()
//       .matches(
//         /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{7,10}$/, // Improved regex for phone number validation
//         "Phone number is not valid"
//       )
//       .required("Phone Number is required"),
//     country: Yup.string().required("Country is required"),
//     state: Yup.string().required("State is required"),
//     zipCode: Yup.string().required("Zip Code is required"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//   });

//   const countryOptions = [
//     { value: "us", label: "United States" },
//     { value: "ca", label: "Canada" },
//     { value: "uk", label: "United Kingdom" },
//   ];

//   const stateOptions = [
//     { value: "chocolate", label: "Chocolate" },
//     { value: "strawberry", label: "Strawberry" },
//     { value: "vanilla", label: "Vanilla" },
//   ];

//   return (
//     <div>
//       {" "}
//       <div className="xl:w-[70%] lg:w-[70%] md:w-[80%] w-full mx-auto shadow-xl my-10">
//         <div className="rounded-md bg-white border border-[#E6E6E6]">
//           <Header
//             variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
//             className="border-b xl:p-4 lg:p-3 md:p-2 p-2"
//           >
//             Billing Address
//           </Header>

//           <div className="xl:p-10 lg:p-8 md:p-6 p-8">
//             <div className="w-full">
//               <Formik
//                 initialValues={{
//                   firstName: "",
//                   lastName: "",
//                   email: "",
//                   phone: "",
//                   companyName: "",
//                   streetAddress: "",
//                   country: "",
//                   zipCode: "",
//                   state: "",
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={(values, { resetForm }) => {
//                   console.log(".....", values);
//                   resetForm();
//                 }}
//               >
//                 {({ isValid, isSubmitting, setFieldValue, values }) => (
//                   <Form>
//                     <div className="flex gap-4 w-full">
//                       <div className="sm:my-3 my-1 w-full">
//                         <label
//                           htmlFor="firstName"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           First Name
//                         </label>
//                         <Field
//                           type="text"
//                           name="firstName"
//                           placeholder="Dianne"
//                           className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//                         />
//                         <ErrorMessage
//                           name="firstName"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>

//                       <div className="sm:my-3 my-1 w-full">
//                         <label
//                           htmlFor="lastName"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           Last Name
//                         </label>
//                         <Field
//                           type="text"
//                           name="lastName"
//                           placeholder="Russell"
//                           className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//                         />
//                         <ErrorMessage
//                           name="lastName"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>

//                       <div className="sm:my-3 my-1 w-full">
//                         <label
//                           htmlFor="companyName"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           Company Name
//                         </label>
//                         <Field
//                           type="text"
//                           name="companyName"
//                           placeholder="Zakirsoft"
//                           className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//                         />
//                         <ErrorMessage
//                           name="companyName"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>
//                     </div>

//                     <div className="sm:my-3 my-1 w-full">
//                       <label
//                         htmlFor="streetAddress"
//                         className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                       >
//                         Street Address
//                       </label>
//                       <Field
//                         type="text"
//                         name="streetAddress"
//                         placeholder="4140 Parl"
//                         className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//                       />
//                       <ErrorMessage
//                         name="streetAddress"
//                         component="p"
//                         className="text-red-500 text-sm text-left"
//                       />
//                     </div>

//                     <div className="flex gap-4 w-full">
//                       <div className="sm:my-3 my-1 w-full">
//                         <label
//                           htmlFor="country"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           Country/Region
//                         </label>

//                         <Select
//                           name="country"
//                           options={countryOptions}
//                           placeholder="Select a country"
//                           className="rounded-md focus:outline-none text-left"
//                           styles={{
//                             control: (provided) => ({
//                               ...provided,
//                               padding: "2px",
//                             }),
//                           }}
//                           onChange={(option) =>
//                             setFieldValue("country", option)
//                           }
//                         />
//                         <ErrorMessage
//                           name="country"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>

//                       <div className="sm:my-3 my-1 w-full">
//                         <label
//                           htmlFor="state"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           States
//                         </label>
//                         <Select
//                           name="state"
//                           options={stateOptions}
//                           placeholder="Select a country"
//                           className="rounded-md focus:outline-none text-left"
//                           styles={{
//                             control: (provided) => ({
//                               ...provided,
//                               padding: "2px",
//                             }),
//                           }}
//                           onChange={(option) => setFieldValue("state", option)}
//                         />
//                         <ErrorMessage
//                           name="state"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>

//                       <div className="sm:my-3 my-1 w-full">
//                         <label
//                           htmlFor="zipCode"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           Zip Code
//                         </label>
//                         <Field
//                           type="text"
//                           name="zipCode"
//                           placeholder="200033"
//                           className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//                         />
//                         <ErrorMessage
//                           name="zipCode"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex gap-4 w-full">
//                       <div className="sm:my-3 my-1 w-full">
//                         <label
//                           htmlFor="streetAddress"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           Email
//                         </label>
//                         <Field
//                           type="text"
//                           name="email"
//                           placeholder="dianne.russell@gmail.com"
//                           className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//                         />
//                         <ErrorMessage
//                           name="email"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>

//                       <div className="sm:my-3 my-1 w-full">
//                         <label
//                           htmlFor="phone"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           Phone Number
//                         </label>
//                         <Field
//                           type="text"
//                           name="phone"
//                           placeholder="(603 555-0123)"
//                           className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//                         />
//                         <ErrorMessage
//                           name="phone"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex  mt-5">
//                       <Button
//                         type="submit"
//                         variant={{
//                           fontSize: "md",
//                           theme: "dark",
//                           fontWeight: "500",
//                           rounded: "full",
//                         }}
//                         className="flex items-center !px-6"
//                         disabled={isSubmitting || !isValid}
//                       >
//                         <P
//                           variant={{
//                             size: "base",
//                             theme: "light",
//                             weight: "semiBold",
//                           }}
//                         >
//                           Save Changes
//                         </P>
//                       </Button>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BillingAddress;

import { Field, Form, Formik } from "formik";
import Header from "../ui/Header";
import Button from "../ui/Button";
import P from "../ui/P";
import Select from "react-select";

const BillingAddress = () => {
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
  ];

  const stateOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <div className="xl:w-[70%] lg:w-[95%] w-full mx-auto shadow-xl my-10">
        <div className="rounded-md bg-white border border-[#E6E6E6]">
          <Header
            variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
            className="border-b xl:p-4 lg:p-3 md:p-2 p-2"
          >
            Billing Address
          </Header>

          <div className="xl:p-6 lg:p-4 md:p-6 p-4">
            <div className="w-full">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  companyName: "",
                  streetAddress: "",
                  country: "",
                  zipCode: "",
                  state: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  console.log("Form submitted with values:", values);
                  resetForm();
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="flex md:flex-row flex-col md:gap-4 w-full">
                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          First Name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="Dianne"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="lastName"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Last Name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Russell"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="companyName"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Company Name
                        </label>
                        <Field
                          type="text"
                          name="companyName"
                          placeholder="Zakirsoft"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="sm:my-3 my-1 w-full">
                      <label
                        htmlFor="streetAddress"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        Street Address
                      </label>
                      <Field
                        type="text"
                        name="streetAddress"
                        placeholder="4140 Parl"
                        className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                      />
                    </div>

                    <div className="flex md:flex-row flex-col md:gap-4 w-full">
                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="country"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Country/Region
                        </label>

                        <Select
                          name="country"
                          options={countryOptions}
                          placeholder="Select a country"
                          className="rounded-md focus:outline-none text-left"
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              padding: "2px",
                            }),
                          }}
                          onChange={(option) =>
                            setFieldValue("country", option)
                          }
                        />
                      </div>

                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="state"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          States
                        </label>
                        <Select
                          name="state"
                          options={stateOptions}
                          placeholder="Select a state"
                          className="rounded-md focus:outline-none text-left"
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              padding: "2px",
                            }),
                          }}
                          onChange={(option) => setFieldValue("state", option)}
                        />
                      </div>

                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="zipCode"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Zip Code
                        </label>
                        <Field
                          type="text"
                          name="zipCode"
                          placeholder="200033"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex md:flex-row flex-col md:gap-4 w-full">
                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Email
                        </label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="dianne.russell@gmail.com"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Phone Number
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          placeholder="(603 555-0123)"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <Button
                        type="submit"
                        variant={{
                          fontSize: "md",
                          theme: "dark",
                          fontWeight: "500",
                          rounded: "full",
                        }}
                        className="flex items-center !px-6"
                        disabled={isSubmitting}
                      >
                        <P
                          variant={{
                            size: "base",
                            theme: "light",
                            weight: "semiBold",
                          }}
                        >
                          Save Changes
                        </P>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
