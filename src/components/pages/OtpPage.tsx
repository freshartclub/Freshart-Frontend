import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import loginimage from "../../assets/login.png";
import P from "../ui/P";
import arrow from "../../assets/arrow.png";
import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import otpimage from "../../assets/otp.png";
import useTimer, { formatTime } from "../hooks/useTimer";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useOtpVerifyMutation from "../../http/auth/useOtpVerifyMutation";
import useOtpResendMutation from "../../http/auth/useOtpResendMutation";
import { useAppDispatch, useAppSelector } from "../../store/typedReduxHooks";
import { forgotPasswordUserId } from "../../store/userSlice/userSlice";

const OtpPage = () => {
  const [localId, setLocalId] = useState("");
  const userId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const timerLimit = 2 * 60; // 2 minutes
  const { startTimer, stopTimer, seconds } = useTimer(timerLimit);

  const [searchParams, setSearchParam] = useSearchParams();
  const id = searchParams.get("id");






  const validationSchema = Yup.object().shape({
    // otp: Yup.string()
    //   .length(6, "OTP must be 6 digits")
    //   .required("OTP is required"),
  });

  useEffect(() => {
    if (userId) {
      setLocalId(userId);
      dispatch(forgotPasswordUserId({userId: ""}));

    }else{
      navigate('/forget-password')
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutateAsync } = useOtpVerifyMutation(); 


  const { isPending: isResendPendig, mutateAsync: resendMutateAsync } =
    useOtpResendMutation();

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer(); // Stop the timer on unmount
    };
  }, [startTimer, stopTimer]);

  const handleBack = () => {
    navigate("/");
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(otp);
    try {
      const newData = {
        id: localId,
        otp: otp, // Ensure you're sending the correct OTP data
      };

      console.log(newData);
      await mutateAsync(newData);
    } catch (error) {
      console.error(error.message);
    }
  });

  const handleResendOtp = async () => {
    await resendMutateAsync({ id: id });
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
            Enter the Code From the Mail We Sent to{" "}
            <strong>***************@gmail.com</strong>
          </P>
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="mb-4"
          >
            {formatTime(seconds)}
          </P>

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
            {errors.otp && (
              <div className="text-red-500 text-sm text-left">
                {errors.otp.message}
              </div>
            )}

            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="mb-8 mt-6"
            >
              Didn’t Receive Code?{" "}
              <span
                onClick={handleResendOtp}
                className="font-bold cursor-pointer tracking-tight"
              >
                SEND AGAIN
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
                {isPending ? "Validating..." : "Submit OTP"}
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
  );
};

export default OtpPage;
