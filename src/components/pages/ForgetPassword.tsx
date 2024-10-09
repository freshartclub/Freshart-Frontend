import loginimage from "../../assets/login.png";
import Header from "../ui/Header";
import P from "../ui/P";
import arrow from "../../assets/arrow.png";
import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

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
              Forget Password
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="lg:w-[60%] md:w-[80%] mx-auto mt-4"
            >
              Enter your mobile number or email to get 4 digit OTP
            </P>
            <div className="my-5">
              <input
                type="text"
                placeholder="Email or phone number"
                className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
              />
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
            >
              <P variant={{ size: "base", theme: "light", weight: "semiBold" }}>
                Send OTP
              </P>
              <img src={arrow} alt="arrow" className="ml-2 mt-1" />
            </Button>
          </div>
          <div className="mt-10 md:mt-0 md:ml-10">
            <img src={loginimage} alt="image" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
