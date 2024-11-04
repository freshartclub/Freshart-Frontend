import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import loginimage from "../../assets/login.png";
import arrow from "../../assets/arrow.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import useSignUpMutation from "../../http/auth/useSignUpMutation";

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync, isPending } = useSignUpMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error.message);
    }
  });

  return (
    <div className="bg-[#F9F7F6]">
      <div className="container mx-auto md:px-6 px-3">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 py-10 items-center">
          <div className="text-center shadow-xl bg-white xl:p-10 lg:p-8 md:p-6 p-4 xl:w-[80%] w-full">
            <Header
              variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}
            >
              Sign Up
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="lg:w-[60%] md:w-[80%] mx-auto mt-4 font-medium tracking-tight leading-none font-[poppins]"
            >
              Enter your details to register to your account
            </P>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-5">
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  className={`border ${
                    errors.email ? "border-red-500" : "border-[#D3D3D3]"
                  } p-2 w-full rounded-md focus:outline-none`}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm text-left">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className={`border ${
                    errors.password ? "border-red-500" : "border-[#D3D3D3]"
                  } p-2 w-full rounded-md focus:outline-none`}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm text-left">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="my-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("cpassword")}
                  className={`border ${
                    errors.cpassword ? "border-red-500" : "border-[#D3D3D3]"
                  } p-2 w-full rounded-md focus:outline-none`}
                />
                {errors.cpassword && (
                  <div className="text-red-500 text-sm text-left">
                    {errors.cpassword.message}
                  </div>
                )}
              </div>

              <div className="my-5">
                <Link to="/" className="text-md text-red-500 hover:underline">
                  Invitation Code?
                </Link>
              </div>

              <div className="flex text-left items-start">
                <input
                  type="checkbox"
                  {...register("terms")}
                  className="mt-2"
                />
                <p className="ml-3 font-medium tracking-tight leading-1">
                  By signing up, I have read and agree to
                  <Link to="/terms" className="text-red-600 mx-1">
                    Terms
                  </Link>
                  and
                  <Link to="/" className="text-red-600 ml-1">
                    Privacy Policy.
                  </Link>
                </p>
              </div>
              {errors.terms && (
                <div className="text-red-500 text-sm text-left">
                  {errors.terms.message}
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
                  {isPending ? "SignUp..." : "SignUp"}

                  <img src={arrow} alt="arrow" className="ml-2 mt-1" />
                </Button>
              </div>

              <div>
                <div className="flex items-center my-4">
                  <span className="flex-grow sm:w-[20%] w-[28%] 2xl:ml-10 md:mr-0 mr-2 border-2 border-t border-gray-300"></span>
                  <P
                    variant={{ theme: "dark", weight: "semiBold" }}
                    className="lg:mx-4 md:mx-2 mx-0 md:text-base text-sm"
                  >
                    Or continue with
                  </P>
                  <span className="flex-grow sm:w-[20%] w-[28%] lg:mr-10 md:ml-0 ml-2 border-2 border-t border-gray-300"></span>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-3 lg:gap-4 lg:mt-6">
                  <Button
                    variant={{
                      theme: "light",
                      rounded: "full",
                      fontWeight: "500",
                      thickness: "moderate",
                      fontSize: "base",
                    }}
                    className={`flex justify-center border border-[#102030]`}
                  >
                    <img src={google} alt="Google" className="" />
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

                  <Button
                    variant={{
                      theme: "light",
                      rounded: "full",
                      fontWeight: "500",
                      thickness: "moderate",
                      fontSize: "base",
                    }}
                    className={`flex justify-center border border-[#102030]`}
                  >
                    <img src={apple} alt="Apple" className="ml-2" />
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="ml-2 mt-[2px]"
                    >
                      Apple ID
                    </P>
                  </Button>

                  <Button
                    variant={{
                      theme: "light",
                      rounded: "full",
                      fontWeight: "500",
                      thickness: "moderate",
                      fontSize: "base",
                    }}
                    className={`flex justify-center border border-[#102030]`}
                  >
                    <img src={facebook} alt="Facebook" className="" />
                    <P
                      variant={{
                        size: "base",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="ml-1 mt-[2px]"
                    >
                      Facebook
                    </P>
                  </Button>
                </div>

                <div className="flex sm:flex-row flex-col mt-5 place-content-center">
                  <P
                    variant={{ theme: "dark", weight: "medium" }}
                    className="md:text-base text-sm"
                  >
                    Already have an account?
                  </P>
                  <Link
                    to="/login"
                    className="font-bold uppercase sm:mt-0 mt-2 ml-1 md:text-base text-sm"
                  >
                    Sign In
                  </Link>
                </div>
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

export default SignUp;
