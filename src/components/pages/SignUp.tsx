import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import loginimage from "../../assets/login.png";
import arrow from "../../assets/arrow.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";

const SignUp = () => {
  const validationSchema = Yup.object({
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
              className="lg:w-[60%] md:w-[80%] mx-auto mt-4"
            >
              Enter your details to register to your account
            </P>

            <Formik
              initialValues={{
                email: "",
                password: "",
                cpassword: "",
                terms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={() => {}}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <div className="my-5">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm text-left"
                    />
                  </div>

                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm text-left"
                    />
                  </div>

                  <div className="my-5">
                    <Field
                      type="password"
                      name="cpassword"
                      placeholder="Confirm Password"
                      className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="cpassword"
                      component="div"
                      className="text-red-500 text-sm text-left"
                    />
                  </div>

                  <div className="my-5">
                    <Link
                      to="/"
                      className="text-md text-red-500 hover:underline"
                    >
                      Invitation Code?
                    </Link>
                  </div>

                  <div className="flex text-left items-start">
                    <Field type="checkbox" name="terms" className="mt-2" />
                    <p className="ml-3">
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
                  <ErrorMessage
                    name="terms"
                    component="div"
                    className="text-red-500 text-sm text-left"
                  />

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
                      disabled={isSubmitting || !isValid}
                    >
                      <p>Sign Up</p>
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
                        <img src={google} alt="arrow" className="ml-2" />
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
                        <img src={apple} alt="arrow" className="ml-2" />
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
                        <img src={facebook} alt="arrow" className="" />
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

                    <div className="flex sm:flex-row flex-col mt-5">
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
                </Form>
              )}
            </Formik>
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
