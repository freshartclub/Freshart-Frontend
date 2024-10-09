import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import loginimage from "../../assets/login.png";
import P from "../ui/P";
import arrow from "../../assets/arrow.png";
import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import { Link, useNavigate } from "react-router-dom";
import otpimage from "../../assets/otp.png";
import useTimer, { formatTime } from "../hooks/useTimer";

const OtpPage = () => {
  const navigate = useNavigate();
  const timerLimit = 2 * 60;
  const { startTimer, stopTimer, seconds } = useTimer(timerLimit);

  const [otp, setOtp] = useState("");

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  const handleBack = () => {
    navigate("/");
  };

  const handleCompleteForm = () => {
    navigate("/registration_process");
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
            Enter the Code From the SMS We Sent to{" "}
            <strong>+91 9564568752</strong>
          </P>
          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="mb-4"
          >
            {formatTime(seconds)}
          </P>

          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderInput={(props) => (
              <input
                {...props}
                className="!w-10 h-10 border border-gray-300 rounded-lg mx-2 text-center text-lg bg-[#FFF9EF] focus:border-blue-500 focus:outline-none"
              />
            )}
            containerStyle="flex justify-center mb-4"
          />

          <P
            variant={{ size: "base", theme: "dark", weight: "medium" }}
            className="mb-8 mt-6"
          >
            Didn’t Receive Code?{" "}
            <Link to="/" className="font-bold">
              SEND AGAIN
            </Link>
          </P>

          <Button
            variant={{
              theme: "dark",
              rounded: "full",
              fontWeight: "500",
              thickness: "thick",
              fontSize: "base",
            }}
            onClick={handleCompleteForm}
            className="mt-3 flex justify-center w-full"
          >
            <P variant={{ size: "base", theme: "light", weight: "semiBold" }}>
              Submit OTP
            </P>
            <img src={arrow} alt="arrow" className="ml-2 mt-1" />
          </Button>
        </div>
        <div className="mt-10 md:mt-0 md:ml-10">
          <img src={loginimage} alt="image" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
