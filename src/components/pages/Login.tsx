import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginImage from "../../assets/login.png";
import arrow from "../../assets/arrow.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import eye from "../../assets/view.png";
import eyeclose from "../../assets/hidden.png";
import { CommonValidation } from "../ui/CommonValidation";
import useSignInMutation from "../../http/auth/useSignInMutation";

const Login: React.FC = () => {
  const [newPasswordIcon, setNewPasswordIcon] = React.useState(eyeclose);
  const [newPasswordType, setNewPasswordType] = React.useState("password");
  const { mutateAsync, isPending } = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNewPasswordToggle = () => {
    setNewPasswordType(prevType => (prevType === "password" ? "text" : "password"));
    setNewPasswordIcon(prevIcon => (prevIcon === eyeclose ? eye : eyeclose));
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error.message);
    }
  });
 

  return (
    <div className="container mx-auto md:px-6 px-3">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 py-10">
        <div className="text-center shadow-xl bg-white xl:p-10 lg:p-8 md:p-6 p-4 xl:w-[80%] w-full">
          <Header variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}>
            Welcome Back
          </Header>
          <P
            variant={{ size: "base", theme: "dark", weight: "normal" }}
            className="lg:w-[60%] md:w-[80%] mx-auto mt-4"
          >
            Hey, Enter your details to login to your account
          </P>

          <form onSubmit={handleSubmit(onSubmit)} id="login">
            <div className="my-5">
              <input
                type="email"
                {...register("email", { required: "Email is required", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]+$/, message: "Email is not valid" } })}
                placeholder="Email or phone number"
                className={`border ${errors.email ? "border-red-500" : "border-[#D3D3D3]"} p-2 w-full rounded-md focus:outline-none`}
              />
              {errors.email && <div className="text-red-500 text-sm text-left">{errors.email.message}</div>}
            </div>

            <div className="flex">
              <input
                type={newPasswordType}
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className={`border ${errors.password ? "border-red-500" : "border-[#D3D3D3]"} p-2 w-full rounded-md focus:outline-none`}
              />
              <img
                src={newPasswordIcon}
                alt="Toggle password visibility"
                className="w-[24px] h-[24px] mt-2 -ml-10 cursor-pointer"
                onClick={handleNewPasswordToggle}
              />
            </div>
            {errors.password && <div className="text-red-500 text-sm text-left">{errors.password.message}</div>}

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
                <p>{isPending ? 'Signing in...' : 'Sign in'}</p>
                <img src={arrow} alt="arrow" className="ml-2 mt-1" />
              </Button>
            </div>
          </form>

          <div className="flex sm:flex-row flex-col justify-between items-center mb-6 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <Link
              to="/forget-password"
              className="text-sm text-red-500 hover:underline mt-4 sm:mt-0"
            >
              Forget Password?
            </Link>
          </div>

          <div>
            <div className="flex items-center my-4">
              <span className="flex-grow sm:w-[20%] w-[28%] lg:ml-10 md:mr-0 mr-2 border-2 border-t border-gray-300"></span>
              <P
                variant={{ theme: "dark", weight: "semiBold" }}
                className="lg:mx-4 md:mx-2 mx-0 md:text-base text-sm"
              >
                Or continue with
              </P>
              <span className="flex-grow sm:w-[20%] w-[28%] lg:mr-10 md:ml-0 ml-2 border-2 border-t border-gray-300"></span>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-3 lg:gap-4 lg:mt-6">
              {/* Social login buttons */}
              <Button
                variant={{
                  theme: "light",
                  rounded: "full",
                  fontWeight: "500",
                  thickness: "moderate",
                  fontSize: "base",
                }}
                className={`flex justify-center border border-[#102030]`}
                type="button" // Ensure this is set correctly
              >
                <img src={google} alt="Google" className="ml-2" />
                <P
                  variant={{
                    size: "base",
                    theme: "dark",
                    weight: "medium",
                  }}
                  className="ml-1 mt-[2px]"
                >
                  Google
                </P>
              </Button>
              {/* Repeat for other social login buttons... */}
            </div>

            <div className="flex sm:flex-row flex-col mt-5 justify-center">
              <P
                variant={{ theme: "dark", weight: "medium" }}
                className="md:text-base text-sm"
              >
                Don’t have an account?
              </P>
              <Link
                to="/signup"
                className="font-bold uppercase ml-1 md:text-base text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="my-auto">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
