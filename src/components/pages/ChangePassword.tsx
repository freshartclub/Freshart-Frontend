// import loginimage from "../../assets/login.png";
// import Header from "../ui/Header";
// import P from "../ui/P";
// import arrow from "../../assets/arrow.png";
// import Button from "../ui/Button";
// import logo from "../../assets/loginlogo.png";
// import semicircle from "../../assets/semicircle.png";
// import arrow3 from "../../assets/arrow_3.png";
// import globe from "../../assets/glob.png";
// import { Link, useNavigate } from "react-router-dom";
// import BackButton from "../ui/BackButton";
// import eye from "../../assets/view.png";
// import eyeclose from "../../assets/hidden.png";
// import { useState } from "react";

// const ChangePassword = () => {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate("/");
//   };

//   const [newPassword, setNewPassword] = useState("");
//   const [newPasswordType, setNewPasswordType] = useState("password");
//   const [confirmPasswordType, setConfirmPasswordType] = useState("password");
//   const [newPasswordIcon, setNewPasswordIcon] = useState(eyeclose);
//   const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeclose);

//   const handleNewPasswordToggle = () => {
//     if (newPasswordType === "password") {
//       setNewPasswordIcon(eye);
//       setNewPasswordType("text");
//     } else {
//       setNewPasswordIcon(eyeclose);
//       setNewPasswordType("password");
//     }
//   };

//   const handleConfirmPasswordToggle = () => {
//     if (confirmPasswordType === "password") {
//       setConfirmPasswordIcon(eye);
//       setConfirmPasswordType("text");
//     } else {
//       setConfirmPasswordIcon(eyeclose);
//       setConfirmPasswordType("password");
//     }
//   };

//   return (
//     <div className="bg-[#F5F2EB] min-h-screen flex flex-col justify-center">
//       <div className="container mx-auto md:px-6 px-3  py-10">
//         <header className="relative py-4">
//           <div className="flex md:flex-row flex-col justify-between items-center">
//             <div>
//               <img src={logo} alt="Fresh Art Club" className="h-10" />
//             </div>
//             <div className="flex items-center mt-6 md:mt-0">
//               <Link to="/">
//                 <img src={globe} alt="" className="mr-5" />
//               </Link>

//               <Link to="/signup" className="text-black mr-4">
//                 SIGN UP
//               </Link>
//               <Button
//                 variant={{
//                   theme: "dark",
//                   rounded: "full",
//                   fontWeight: "500",
//                   thickness: "thick",
//                   fontSize: "base",
//                 }}
//                 className="flex justify-center items-center"
//               >
//                 <P variant={{ size: "base", theme: "light", weight: "normal" }}>
//                   Artist Login
//                 </P>
//                 <img src={arrow3} alt="arrow" className="ml-2 mt-1" />
//               </Button>
//             </div>
//           </div>

//           <img
//             src={semicircle}
//             alt="Semicircle"
//             className="md:absolute right-[50%] left-[50%] top-0 h-full"
//           />
//         </header>

//         <div className="grid md:grid-cols-2 grid-cols-1 gap-10 py-10">
//           <div className="text-center shadow-xl bg-white px-10 pt-10 pb-16 my-auto md:w-[80%] w-full">
//             <BackButton
//               onClick={handleBack}
//               iconClass="text-text_primary_dark font-semibold"
//               className="py-4 hidden md:flex mb-4"
//             />

//             <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
//               Change Password
//             </Header>
//             <P
//               variant={{ size: "base", theme: "dark", weight: "normal" }}
//               className="lg:w-[60%] md:w-[80%] mx-auto mt-4"
//             >
//               Enter your Password to reset forget password.
//             </P>

//             <div className="my-5 flex">
//               <input
//                 type={newPasswordType}
//                 name="newPassword"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 autoComplete="current-password"
//                 className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//               />
//               <img
//                 src={newPasswordIcon}
//                 alt="eye"
//                 className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
//                 onClick={handleNewPasswordToggle}
//               />
//             </div>

//             <div className="my-5 flex">
//               <input
//                 type={confirmPasswordType}
//                 placeholder="Confirm Password"
//                 className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
//               />
//               <img
//                 src={confirmPasswordIcon}
//                 alt="eye"
//                 className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
//                 onClick={handleConfirmPasswordToggle}
//               />
//             </div>

//             <div>
//               <Button
//                 variant={{
//                   theme: "dark",
//                   rounded: "full",
//                   fontWeight: "500",
//                   thickness: "thick",
//                   fontSize: "base",
//                 }}
//                 className={`mt-3 flex justify-center w-full`}
//               >
//                 <p>Submit</p>
//                 <img src={arrow} alt="arrow" className="ml-2 mt-1" />
//               </Button>
//             </div>
//           </div>
//           <div>
//             <img src={loginimage} alt="image" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;

import loginimage from "../../assets/login.png";
import Header from "../ui/Header";
import P from "../ui/P";
import arrow from "../../assets/arrow.png";
import Button from "../ui/Button";
import logo from "../../assets/loginlogo.png";
import semicircle from "../../assets/semicircle.png";
import arrow3 from "../../assets/arrow_3.png";
import globe from "../../assets/glob.png";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../ui/BackButton";
import eye from "../../assets/view.png";
import eyeclose from "../../assets/hidden.png";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ChangePassword = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [newPasswordIcon, setNewPasswordIcon] = useState(eyeclose);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(eyeclose);

  const handleNewPasswordToggle = () => {
    setNewPasswordType(newPasswordType === "password" ? "text" : "password");
    setNewPasswordIcon(newPasswordType === "password" ? eye : eyeclose);
  };

  const handleConfirmPasswordToggle = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
    setConfirmPasswordIcon(confirmPasswordType === "password" ? eye : eyeclose);
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = ({ values }: any) => {
    console.log(values);
    // Submit the form to the backend here
  };

  return (
    <div className="bg-[#F5F2EB] min-h-screen flex flex-col justify-center">
      <div className="container mx-auto md:px-6 px-3 py-10">
        <header className="relative py-4">
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div>
              <img src={logo} alt="Fresh Art Club" className="h-10" />
            </div>
            <div className="flex items-center mt-6 md:mt-0">
              <Link to="/">
                <img src={globe} alt="" className="mr-5" />
              </Link>

              <Link to="/signup" className="text-black mr-4">
                SIGN UP
              </Link>
              <Button
                variant={{
                  theme: "dark",
                  rounded: "full",
                  fontWeight: "500",
                  thickness: "thick",
                  fontSize: "base",
                }}
                className="flex justify-center items-center"
              >
                <P variant={{ size: "base", theme: "light", weight: "normal" }}>
                  Artist Login
                </P>
                <img src={arrow3} alt="arrow" className="ml-2 mt-1" />
              </Button>
            </div>
          </div>

          <img
            src={semicircle}
            alt="Semicircle"
            className="md:absolute right-[50%] left-[50%] top-0 h-full"
          />
        </header>

        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-10 py-10 items-center">
          <div className="text-center shadow-xl bg-white lg:px-10 px-5 lg:pt-10 pt-5 lg:pb-16 pb-10 my-auto xl:w-[80%] w-full">
            <BackButton
              onClick={handleBack}
              iconClass="text-text_primary_dark font-semibold"
              className="lg:py-4 hidden md:flex mb-4"
            />

            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              Change Password
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="lg:w-[60%] md:w-[80%] mx-auto mt-4"
            >
              Enter your Password to reset forget password.
            </P>

            <Formik
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({}) => (
                <Form>
                  <div className="my-5 ">
                    <div className="flex">
                      <Field
                        type={newPasswordType}
                        name="newPassword"
                        placeholder="New Password"
                        className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                      />
                      <img
                        src={newPasswordIcon}
                        alt="eye"
                        className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                        onClick={handleNewPasswordToggle}
                      />
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-left"
                    />
                  </div>

                  <div className="my-5">
                    <div className="flex">
                      <Field
                        type={confirmPasswordType}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                      />
                      <img
                        src={confirmPasswordIcon}
                        alt="eye"
                        className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                        onClick={handleConfirmPasswordToggle}
                      />
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-left"
                    />
                  </div>

                  <div>
                    <Button
                      variant={{
                        theme: "dark",
                        rounded: "full",
                        fontWeight: "500",
                        thickness: "thick",
                        fontSize: "base",
                      }}
                      className="mt-3 flex justify-center w-full"
                      type="submit"
                    >
                      <p>Submit</p>
                      <img src={arrow} alt="arrow" className="ml-2 mt-1" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <img src={loginimage} alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
