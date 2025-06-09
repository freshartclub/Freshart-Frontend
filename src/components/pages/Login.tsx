import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import arrow from "../../assets/arrow.png";
import eyeclose from "../../assets/hidden.png";
import loginImage from "../../assets/login.png";
import eye from "../../assets/view.png";
import useSignInMutation from "../../http/auth/useSignInMutation";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";

const Login: React.FC = () => {
  const [newPasswordIcon, setNewPasswordIcon] = React.useState(eyeclose);
  const [newPasswordType, setNewPasswordType] = React.useState("password");
  const { mutateAsync, isPending } = useSignInMutation();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleNewPasswordToggle = () => {
    setNewPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
    setNewPasswordIcon((prevIcon) => (prevIcon === eyeclose ? eye : eyeclose));
  };

  const { t } = useTranslation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue("email", storedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
       if (rememberMe) {
        localStorage.setItem("email", data.email);
      } else {
        localStorage.removeItem("email");
      }
     
      await mutateAsync(data);
    } catch (error) {
      if (error) {
        localStorage.setItem("email", data.email);
      } else {
        localStorage.removeItem("email");
      }
      console.error(error?.message);
    }
  });

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="container mx-auto md:px-6 px-3">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 py-10">
        <div className="text-center shadow-md border border-zinc-300 rounded-xl bg-white xl:p-10 lg:p-8 md:p-6 p-4 xl:w-[80%] w-full">
          <Header variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}>
            {t("Welcome Back")}
          </Header>
          <P
            variant={{ size: "base", theme: "dark", weight: "normal" }}
            className="lg:w-[60%] md:w-[80%] mx-auto mt-4"
          >
            {t("Hey, Enter your details to login to your account")}
          </P>

          <form onSubmit={handleSubmit(onSubmit)} id="login">
            <div className="my-5">
              <input
                type="email"
                {...register("email", {
                  required: t("Email is required"),
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]+$/,
                    message: t("Email is not valid"),
                  },
                })}
                placeholder={t("Enter your Email")}
                className={`border ${
                  errors.email ? "border-red-500" : "border-[#D3D3D3]"
                } p-2 w-full rounded-md focus:outline-none`}
              />
              {errors.email && (
                <div className="text-red-500 text-sm text-left">
                  {t(`${errors.email.message}`)}
                </div>
              )}
            </div>

            <div className="flex">
              <input
                type={newPasswordType}
                {...register("password", {
                  required: t("Password is required"),
                })}
                placeholder={t("Enter Password")}
                className={`border ${
                  errors.password ? "border-red-500" : "border-[#D3D3D3]"
                } p-2 w-full rounded-md focus:outline-none`}
              />
              <img
                src={newPasswordIcon}
                alt="Toggle password visibility"
                className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                onClick={handleNewPasswordToggle}
              />
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm text-left">
                {t(`${errors.password.message}`)}
              </div>
            )}

            <div className="my-5">
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
                disabled={isPending}
              >
                <p>{isPending ? t("Signing In...") : t("Sign In")}</p>
                <img src={arrow} alt="arrow" className="ml-2 mt-1" />
              </Button>
            </div>

          </form>

          <div className="flex sm:flex-row flex-col justify-between items-center mb-6 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <span className="ml-2 text-sm text-gray-700">
                {t("Remember me")}
              </span>
            </label>
            <Link
              to="/forget-password"
              className="text-sm text-red-500 hover:underline mt-4 sm:mt-0"
            >
              {t("Forgot Password ?")}
            </Link>
          </div>

          <div className="flex sm:flex-row flex-col mt-5 justify-center">
            <P
              variant={{ theme: "dark", weight: "medium" }}
              className="md:text-base text-sm"
            >
              {/* {t("Don’t have account ?")}{" "} */}
              {/* <Link
                to="/signup"
                className="font-bold uppercase ml-1 md:text-base text-sm"
              >
                {t("Sign Up")}
              </Link> */}
            </P>
          </div>
          <Link
            to="/become_artist"
            className="hover:underline decoration-red-700  cursor-pointer"
          >
            {t("Artist? Become FrAC Artist")}{" "}
          </Link>
        </div>
        <div className="my-auto">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
