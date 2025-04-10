import loginimage from "../../assets/login.png";
import Header from "../ui/Header";
import P from "../ui/P";
import arrow from "../../assets/arrow.png";
import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useVerifySignUpMutation from "../../http/auth/useVerifySignUpMutation";
import { useAppDispatch, useAppSelector } from "../../store/typedReduxHooks";
import { useEffect, useState } from "react";
import { forgotPasswordUserId } from "../../store/slice/userSlice";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const SignUpOtp = () => {
  const [localId, setLocalId] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const { t } = useTranslation();

  const userId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    passCode: Yup.string()
      .matches(/^[0-9]+$/, t("Invalid Code"))
      .required(t("Validation Code is required")),
  });

  useEffect(() => {
    if (userId) {
      setLocalId(userId);
      dispatch(forgotPasswordUserId({ userId: "" }));
    } else {
      navigate("/signup");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync, isPending } = useVerifySignUpMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        id: localId,
        otp: data.passCode,
      };

      await mutateAsync(newData).then(() => {
        navigate("/registration_process");
      });
    } catch (error) {
      toast.error(t(error.response?.data?.message));
    }
  });

  return (
    <div className="bg-[#F5F2EB] min-h-screen flex flex-col justify-center">
      <div className="container mx-auto md:px-6 px-3">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 py-10">
          <div className="bg-white shadow-xl px-10 py-10 rounded-lg md:w-[80%] w-full text-center my-auto">
            <BackButton
              onClick={handleBack}
              iconClass="text-text_primary_dark font-semibold"
              className="pb-4 hidden md:flex"
            />
            <Header
              variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}
            >
              {t("Enter Validation Code")}
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="lg:w-[60%] md:w-[80%] mx-auto mt-4 tracking-tight leading-1"
            >
              {t("Enter your validation code sent to your email")}
            </P>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
              <div>
                <input
                  type="passCode"
                  placeholder={t("Enter Validation Code")}
                  {...register("passCode")}
                  className={`border ${
                    errors.passCode ? "border-red-500" : "border-[#D3D3D3]"
                  } p-2 w-full rounded-md focus:outline-none`}
                />
                {errors.passCode && (
                  <div className="text-red-500 text-sm text-left">
                    {errors.passCode.message}
                  </div>
                )}
              </div>

              <Button
                variant={{
                  theme: "dark",
                  rounded: "full",
                  fontWeight: "500",
                  thickness: "thick",
                  fontSize: "base",
                }}
                className="mt-3 flex justify-center w-full mb-5"
                type="submit"
              >
                <P
                  variant={{ size: "base", theme: "light", weight: "semiBold" }}
                >
                  {isPending ? t("Vaildating...") : t("Validate OTP")}
                </P>
                <img src={arrow} alt="arrow" className="ml-2 mt-1" />
              </Button>
            </form>
          </div>
          <div className="mt-10 md:mt-0 md:ml-10">
            <img src={loginimage} alt="image" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpOtp;
