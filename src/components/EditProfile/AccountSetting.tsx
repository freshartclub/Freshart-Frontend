// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Header from "../ui/Header";
// import Select from "react-select";
// import "react-datepicker/dist/react-datepicker.css";
// import Button from "../ui/Button";
// import profileimage from "./assets/profileimage.png";
// import P from "../ui/P";

// const AccountSetting = () => {
//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     email: Yup.string().required("email is required"),
//     phoneNumber: Yup.string()
//       .matches(
//         /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{7,10}$/,
//         "Phone number is not valid"
//       )
//       .required("Phone Number is required"),
//   });

//   return (
//     <div className="xl:w-[70%] lg:w-[70%] md:w-[80%] w-full mx-auto shadow-xl my-10">
//       <div className="rounded-md bg-white border border-[#E6E6E6]">
//         <Header
//           variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
//           className="border-b xl:p-4 lg:p-3 md:p-2 p-2"
//         >
//           Account Settings
//         </Header>

//         <div className="xl:p-10 lg:p-8 md:p-6 p-8">
//           <div className="w-full">
//             <Formik
//               initialValues={{
//                 firstName: "",
//                 lastName: "",
//                 email: "",
//                 phoneNumber: "",
//               }}
//               validationSchema={validationSchema}
//               onSubmit={(values, { resetForm }) => {
//                 console.log(".....", values);

//                 resetForm();
//               }}
//             >
//               {({ isValid, isSubmitting }) => (
//                 <Form>
//                   <div className="flex justify-between w-full">
//                     <div className="w-[60%]">
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
//                           htmlFor="email"
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
//                           htmlFor="phoneNumber"
//                           className="block mb-2 text-sm font-semibold text-gray-700 text-left"
//                         >
//                           Phone Number
//                         </label>
//                         <Field
//                           type="text"
//                           name="phoneNumber"
//                           placeholder="(603 555-0123)"
//                           className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//                         />
//                         <ErrorMessage
//                           name="phoneNumber"
//                           component="p"
//                           className="text-red-500 text-sm text-left"
//                         />
//                       </div>

//                       <div className="flex  mt-5">
//                         <Button
//                           type="submit"
//                           variant={{
//                             fontSize: "md",
//                             theme: "dark",
//                             fontWeight: "500",
//                             rounded: "full",
//                           }}
//                           className="flex items-center !px-6"
//                           disabled={isSubmitting || !isValid}
//                         >
//                           <P
//                             variant={{
//                               size: "base",
//                               theme: "light",
//                               weight: "semiBold",
//                             }}
//                           >
//                             Save Changes
//                           </P>
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="w-[30%]">
//                       <img src={profileimage} alt="Image" />
//                       <Button
//                         type="submit"
//                         variant={{
//                           fontSize: "md",
//                           theme: "light",
//                           fontWeight: "500",
//                           rounded: "large",
//                         }}
//                         className="flex items-center border-2 mt-2 border-black rounded-full"
//                         disabled={isSubmitting || !isValid}
//                       >
//                         <P
//                           variant={{
//                             size: "base",
//                             theme: "dark",
//                             weight: "semiBold",
//                           }}
//                         >
//                           Choose Image
//                         </P>
//                       </Button>
//                     </div>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSetting;

import { Formik, Form, Field } from "formik";
import Header from "../ui/Header";
import Button from "../ui/Button";
import profileimage from "./assets/profileimage.png";
import P from "../ui/P";

const AccountSetting = () => {
  return (
    <div className="xl:w-[70%] lg:w-[95%] w-full mx-auto shadow-xl my-10">
      <div className="rounded-md bg-white border border-[#E6E6E6]">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
          className="border-b xl:p-4 lg:p-3 md:p-2 p-2"
        >
          Account Settings
        </Header>

        <div className="xl:p-6 lg:p-4 md:p-6 p-4">
          <div className="w-full">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
              }}
              onSubmit={(values, { resetForm }) => {
                console.log(".....", values);

                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex md:flex-row flex-col justify-between w-full">
                    <div className="md:w-[60%] w-full">
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
                          htmlFor="phoneNumber"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Phone Number
                        </label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="(603 555-0123)"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="flex  mt-5">
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
                    </div>

                    <div className="md:w-[30%] w-full mt-10 ">
                      <img
                        src={profileimage}
                        alt="Profile"
                        className="mx-auto"
                      />
                      <Button
                        type="button"
                        variant={{
                          fontSize: "md",
                          theme: "light",
                          fontWeight: "500",
                          rounded: "large",
                        }}
                        className="flex items-center border-2 mt-2 border-black rounded-full"
                      >
                        <P
                          variant={{
                            size: "base",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                        >
                          Choose Image
                        </P>
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
