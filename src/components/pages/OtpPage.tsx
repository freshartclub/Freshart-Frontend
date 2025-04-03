import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import arrow from "../../assets/arrow.png";
import loginimage from "../../assets/login.png";
import otpimage from "../../assets/otp.png";
import useOtpResendMutation from "../../http/auth/useOtpResendMutation";
import useOtpVerifyMutation from "../../http/auth/useOtpVerifyMutation";
import { useAppDispatch, useAppSelector } from "../../store/typedReduxHooks";
import { forgotPasswordUserId } from "../../store/userSlice/userSlice";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";
import P from "../ui/P";

const OtpPage = () => {
  const [localId, setLocalId] = useState("");
  const userId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const validationSchema = Yup.object().shape({
    // otp: Yup.string()
    //   .length(6, "OTP must be 6 digits")
    //   .required("OTP is required"),
  });

  useEffect(() => {
    if (userId) {
      setLocalId(userId);
      dispatch(forgotPasswordUserId({ userId: "" }));
    } else {
      navigate("/forget-password");
    }
  }, []);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsTimerRunning(false);
    }
  }, [timer, isTimerRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutateAsync } = useOtpVerifyMutation();
  const { isPending: isResendPendig, mutateAsync: resendMutateAsync } =
    useOtpResendMutation();

  const handleBack = () => {
    navigate("/");
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!otp) return toast.error(t("Please enter OTP"));
    if (otp.length !== 6) return toast.error(t("Please enter valid OTP"));

    try {
      const newData = {
        id: localId,
        otp: otp,
      };

      await mutateAsync(newData);
    } catch (error) {
      console.error(error.message);
    }
  });

  const handleResendOtp = async () => {
    if (timer > 0) return;

    try {
      const resendData = { id: localId };
      await resendMutateAsync(resendData);
      setTimer(120);
      setIsTimerRunning(true);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  return (
    <div className="bg-[#F5F2EB] min-h-screen flex flex-col justify-center">
      <div className="container mx-auto md:px-6 px-3 py-10 flex flex-col md:flex-row justify-between items-center">
        <div className="bg-white shadow-xl p-10 rounded-lg md:w-[40%] w-full text-center my-auto">
          <BackButton
            onClick={handleBack}
            iconClass="text-text_primary_dark font-semibold"
            className="py-4 hidden md:flex mb-4"
          />
          <img src={otpimage} alt="otp image" className="mx-auto mb-6" />
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="mb-2 text-base text-text_primary_dark font-normal lg:w-[60%] md:w-[80%] mx-auto mt-4"
          >
            {t("Enter the OTP From the Mail We Sent to You")}
          </P>
          <P className="mb-4">{formatTime(timer)}</P>

          <form onSubmit={onSubmit} className="mb-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  className="!w-10 h-10 border border-gray-300 rounded-lg mx-2 text-center text-lg bg-[#FFF9EF] focus:border-blue-500 focus:outline-none"
                />
              )}
              containerStyle="flex justify-center mb-4"
            />
            {errors?.otp && (
              <div className="text-red-500 text-sm text-left">
                {t(`${errors?.otp?.message}`)}
              </div>
            )}

            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="mb-8 mt-6"
            >
              {t("Didn’t Receive Code ?")}{" "}
              <span
                onClick={handleResendOtp}
                className={`${
                  timer === 0
                    ? ""
                    : "pointer-events-none cursor-not-allowed opacity-65"
                } font-bold cursor-pointer tracking-tight`}
              >
                {isResendPendig ? t("Sending...") : t("Resend")}
              </span>
            </P>

            <Button
              variant={{
                theme: "dark",
                rounded: "full",
                fontWeight: "500",
                thickness: "thick",
                fontSize: "base",
              }}
              type="submit"
              className="mt-3 flex justify-center w-full"
              disabled={isSubmitting}
            >
              <P variant={{ size: "base", theme: "light", weight: "semiBold" }}>
                {isPending ? t("Validating...") : t("Submit OTP")}
              </P>
              {!isPending && (
                <img src={arrow} alt="arrow" className="ml-2 mt-1" />
              )}
            </Button>
          </form>
        </div>
        <div className="mt-10 md:mt-0 md:ml-10">
          <img src={loginimage} alt="image" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
