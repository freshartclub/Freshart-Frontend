import loginimage from "../../assets/login.png";
import Header from "../ui/Header";
import P from "../ui/P";
import arrow from "../../assets/arrow.png";
import Button from "../ui/Button";
import logo from "../../assets/loginlogo.png";
import semicircle from "../../assets/semicircle.png";
import arrow3 from "../../assets/arrow_3.png";
import globe from "../../assets/glob.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "../ui/BackButton";
import eye from "../../assets/view.png";
import eyeclose from "../../assets/hidden.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useNewPasswordMutation from "../../http/auth/useNewPasswordMutation";

const ChangePassword = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  console.log(token)

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

  const { isPending, mutateAsync } = useNewPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
   
    try {
      const newData = {
        id:id,
        newPassword:data.newPassword,
        confirmPassword: data.confirmPassword,
        token: token,
      }
      await mutateAsync(newData);
    } catch (error) {
      console.error(error.message);
    }
  });
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-5">
                <div className="flex">
                  <input
                    type={newPasswordType}
                    placeholder="New Password"
                    {...register("newPassword")}
                    className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                  />
                  <img
                    src={newPasswordIcon}
                    alt="eye"
                    className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                    onClick={handleNewPasswordToggle}
                  />
                </div>
                {errors.newPassword && (
                  <div className="text-red-500 text-left">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>

              <div className="my-5">
                <div className="flex">
                  <input
                    type={confirmPasswordType}
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                  />
                  <img
                    src={confirmPasswordIcon}
                    alt="eye"
                    className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                    onClick={handleConfirmPasswordToggle}
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="text-red-500 text-left">
                    {errors.confirmPassword.message}
                  </div>
                )}
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
                {isPending ? "Submiting..." : "Submit"}
                  <img src={arrow} alt="arrow" className="ml-2 mt-1" />
                </Button>
              </div>
            </form>
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
