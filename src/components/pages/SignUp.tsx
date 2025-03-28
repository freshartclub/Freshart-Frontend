import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import arrow from "../../assets/arrow.png";
import loginimage from "../../assets/login.png";
import useSignUpMutation from "../../http/auth/useSignUpMutation";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { useGetInvite } from "./http/useGetInvite";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const invite = searchParams.get("invite") as string;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Confirm Password must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const langCode = localStorage.getItem("langCode") || "EN";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync, isPending } = useSignUpMutation();
  const { data: inviteData } = useGetInvite(invite);

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.langCode = langCode?.toUpperCase();
      if (inviteData) data.invite = inviteData.inviteCode;

      if (data) await mutateAsync(data);
    } catch (error) {
      console.error(error.message);
    }
  });

  useEffect(() => {
    setValue("email", inviteData?.email);
  }, [inviteData]);

  const handleTerms = () => {
    window.open("/terms", "_blank");
  };

  const { t } = useTranslation();

  return (
    <div className="mx-auto md:px-6 px-3">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 py-10 items-center">
        <div className="text-center shadow-md rounded-xl border border-zinc-300 bg-white xl:p-10 lg:p-8 md:p-6 p-4 xl:w-[80%] w-full">
          <Header variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}>
            {t("Sign Up")}
          </Header>
          <P
            variant={{ size: "base", theme: "dark", weight: "normal" }}
            className="lg:w-[60%] md:w-[80%] mx-auto mt-4 font-medium tracking-tight leading-none"
          >
            {t("Enter your details to register to your account")}
          </P>

          <form onSubmit={handleSubmit(onSubmit)}>
            {inviteData && (
              <div className="flex flex-col justify-start gap-2 my-5">
                <span className="text-xs font-semibold w-max rounded-full px-2 py-0.5 bg-[#D3D3D3]">
                  Invite Code Used
                </span>
                <input
                  type="text"
                  disabled
                  readOnly
                  value={inviteData.inviteCode}
                  placeholder={t("Invite Code")}
                  className={`border border-[#D3D3D3] opacity-60 p-2 w-full rounded-md focus:outline-none`}
                />
              </div>
            )}
            <div className="my-5">
              <input
                type="email"
                readOnly={inviteData ? true : false}
                placeholder={t("Enter Email")}
                {...register("email")}
                className={`border ${
                  errors.email ? "border-red-500" : "border-[#D3D3D3]"
                } ${
                  inviteData ? "opacity-60" : ""
                } p-2 w-full rounded-md focus:outline-none`}
              />
              {errors.email && (
                <div className="text-red-500 text-sm text-left">
                  {t(`${errors.email.message}`)}
                </div>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder={t("Enter Password")}
                {...register("password")}
                className={`border ${
                  errors.password ? "border-red-500" : "border-[#D3D3D3]"
                } p-2 w-full rounded-md focus:outline-none`}
              />
              {errors.password && (
                <div className="text-red-500 text-sm text-left">
                  {t(`${errors.password.message}`)}
                </div>
              )}
            </div>

            <div className="my-5">
              <input
                type="password"
                placeholder={t("Confirm Password")}
                {...register("cpassword")}
                className={`border ${
                  errors.cpassword ? "border-red-500" : "border-[#D3D3D3]"
                } p-2 w-full rounded-md focus:outline-none`}
              />
              {errors.cpassword && (
                <div className="text-red-500 text-sm text-left">
                  {t(`${errors.cpassword.message}`)}
                </div>
              )}
            </div>

            <div className="flex text-left items-start">
              <input type="checkbox" {...register("terms")} className="mt-2" />
              <p className="ml-3 font-medium tracking-tight leading-1">
                {t("By signing up, I have read and agree to")}
                <span
                  onClick={handleTerms}
                  className="text-red-600 mx-1  cursor-pointer hover:underline"
                >
                  {t("Terms")}
                </span>
                {t("&")}
                <span
                  onClick={handleTerms}
                  className="text-red-600 ml-1 cursor-pointer hover:underline"
                >
                  {t("Privacy Policy.")}
                </span>
              </p>
            </div>
            {errors.terms && (
              <div className="text-red-500 text-sm text-left">
                {t(`${errors.terms.message}`)}
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
                type="submit"
                className={`mt-3 flex justify-center w-full`}
                disabled={isSubmitting || isPending}
              >
                {isPending ? t("Loading...") : t("Sign Up")}

                <img src={arrow} alt="arrow" className="ml-2 mt-1" />
              </Button>
            </div>

            <div className="flex sm:flex-row flex-col mt-5 justify-center">
              <P
                variant={{ theme: "dark", weight: "medium" }}
                className="md:text-base text-sm"
              >
                {t("Already have account ?")}{" "}
                <Link
                  to="/login"
                  className="font-bold uppercase ml-1 md:text-base text-sm"
                >
                  {t("Sign In")}
                </Link>
              </P>
            </div>
            <Link
              to="/become_artist"
              className="hover:underline decoration-red-700  cursor-pointer"
            >
              {t("Are you an artist")}{" "}
            </Link>
          </form>
        </div>
        <div>
          <img src={loginimage} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
