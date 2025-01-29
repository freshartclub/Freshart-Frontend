import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import arrow from "../../assets/arrow.png";
import eyeclose from "../../assets/hidden.png";
import loginimage from "../../assets/login.png";
import eye from "../../assets/view.png";
import useNewPasswordMutation from "../../http/auth/useNewPasswordMutation";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

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
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Confirm Password must match")
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
        id: id,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
        token: token,
      };
      await mutateAsync(newData);
    } catch (error) {
      console.error(error.message);
    }
  });

  const { t } = useTranslation();

  return (
    <div className="bg-[#F5F2EB] min-h-screen flex flex-col justify-center">
      {/* Navbar  */}
      <div className="container mx-auto md:px-6 px-3 py-10">
        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-10 py-10 items-center">
          <div className="text-center shadow-xl bg-white lg:px-10 px-5 lg:pt-10 pt-5 lg:pb-16 pb-10 my-auto xl:w-[80%] w-full">
            <BackButton
              onClick={handleBack}
              iconClass="text-text_primary_dark font-semibold"
              className="lg:py-4 hidden md:flex mb-4"
            />

            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              {t("Reset Password")}
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="lg:w-[60%] md:w-[80%] mx-auto mt-4"
            >
              {t("Enter your Password to reset forget password.")}
            </P>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-5">
                <div className="flex">
                  <input
                    type={newPasswordType}
                    placeholder={t("New Password")}
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
                    {t(`${errors.newPassword.message}`)}
                  </div>
                )}
              </div>

              <div className="my-5">
                <div className="flex">
                  <input
                    type={confirmPasswordType}
                    placeholder={t("Confirm Password")}
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
                    {t(`${errors.confirmPassword.message}`)}
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
                  {isPending ? t("Submitting...") : t("Submit")}
                  {!isPending && <img src={arrow} alt="arrow" className="ml-2 mt-1" />}
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
