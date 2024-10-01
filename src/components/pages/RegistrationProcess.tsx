import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../ui/Header";
import P from "../ui/P";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../ui/Button";
import arrow from "../../assets/arrow.png";
import BackButton from "../ui/BackButton";
import { useNavigate } from "react-router-dom";

const RegistrationProcess = () => {
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Femal" },
    { value: "other", label: "Other" },
  ];

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const redirectToPricePlan = (values: any) => {
    console.log("...........", values.name);
  };

  const redirectToTermAndCondition = () => {
    window.scrollTo(0, 0);
    navigate("/terms");
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    surname1: Yup.string().required("Surname 1 is required"),
    surname2: Yup.string().required("Surname 2 is required"),
    country: Yup.object().required("Country is required").nullable(),
    zipcode: Yup.string().required("Zipcode is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
    gender: Yup.object().required("Gender is required").nullable(), // Corrected to be an object
    dob: Yup.date().required("Date of Birth is required").nullable(),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  return (
    <div className="bg-[#F9F7F6]">
      <div className="container mx-auto sm:px-6 px-3x">
        <div className="xl:w-[80%] lg:w-[70%] md:w-[80%] w-full mx-auto bg-white shadow-xl mt-10">
          <div className="text-center  xl:p-10 lg:p-8 md:p-6 p-8">
            <BackButton
              onClick={handleBack}
              iconClass="text-text_primary_dark font-semibold"
              className="py-4 hidden md:flex mb-4"
            />

            <Header
              variant={{ size: "2xl", theme: "dark", weight: "bold" }}
              className="mb-5"
            >
              Complete Your Profile
            </Header>
            <P
              variant={{ size: "small", theme: "dark", weight: "normal" }}
              className="mb-5"
            >
              Please fill the form below to become a art lover. Feel free to add
              as much detail as needed.
            </P>

            <div>
              <div className="w-full">
                <Formik
                  initialValues={{
                    name: "",
                    surname1: "",
                    surname2: "",
                    country: null,
                    zipcode: "",
                    city: "",
                    province: "",
                    gender: null,
                    dob: null,
                    terms: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    console.log(".....", values);
                    redirectToPricePlan(values);
                    resetForm();
                    navigate("/priceandplans");
                  }}
                >
                  {({ setFieldValue, values, isValid, isSubmitting }) => (
                    <Form>
                      <div className="xl:w-[90%] mx-auto lg:w-[70%] md:w-[80%] w-full p-10 rounded-xl bg-white shadow-2xl">
                        <div className="flex sm:flex-row flex-col justify-between">
                          <div className="sm:my-3 my-1 sm:w-[32%] w-full">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              Name
                            </label>
                            <Field
                              type="text"
                              name="name"
                              placeholder="Name"
                              className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                            />
                            <ErrorMessage
                              name="name"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>

                          <div className="sm:my-3 my-1 sm:w-[32%] w-full">
                            <label
                              htmlFor="surname1"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              Surname 1
                            </label>
                            <Field
                              type="text"
                              name="surname1"
                              placeholder="Surname 1"
                              className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                            />
                            <ErrorMessage
                              name="surname1"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>

                          <div className="sm:my-3 my-1 sm:w-[32%] w-full">
                            <label
                              htmlFor="surname2"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              Surname 2
                            </label>
                            <Field
                              type="text"
                              name="surname2"
                              placeholder="Surname 2"
                              className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                            />
                            <ErrorMessage
                              name="surname2"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>
                        </div>

                        <div className="flex sm:flex-row flex-col justify-between">
                          <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                            <label
                              htmlFor="country"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              Country
                            </label>
                            <Select
                              name="country"
                              options={countryOptions}
                              placeholder="Select a country"
                              className="rounded-md focus:outline-none text-left"
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  padding: "2px",
                                }),
                              }}
                              value={values.country}
                              onChange={(option) =>
                                setFieldValue("country", option)
                              }
                            />
                            <ErrorMessage
                              name="country"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>

                          <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                            <label
                              htmlFor="zipcode"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              Zipcode
                            </label>
                            <Field
                              type="text"
                              name="zipcode"
                              placeholder="452010"
                              className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                            />
                            <ErrorMessage
                              name="zipcode"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>
                        </div>

                        <div className="flex sm:flex-row flex-col justify-between">
                          <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                            <label
                              htmlFor="city"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              City
                            </label>
                            <Field
                              type="text"
                              name="city"
                              placeholder="City"
                              className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                            />
                            <ErrorMessage
                              name="city"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>

                          <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                            <label
                              htmlFor="province"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              Province
                            </label>
                            <Field
                              type="text"
                              name="province"
                              placeholder="Province"
                              className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                            />
                            <ErrorMessage
                              name="province"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>
                        </div>

                        <div className="flex sm:flex-row flex-col justify-between">
                          <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                            <label
                              htmlFor="Gender"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              Gender
                            </label>
                            <Select
                              name="gender"
                              options={genderOptions}
                              placeholder="Male"
                              className="rounded-md text-left"
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  padding: "2px",
                                }),
                              }}
                              value={values.gender}
                              onChange={(option) =>
                                setFieldValue("gender", option)
                              }
                            />

                            <ErrorMessage
                              name="gender"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>

                          <div className="sm:my-3 my-1 sm:w-[49%] w-full">
                            <label
                              htmlFor="dob"
                              className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                            >
                              Date of Birth
                            </label>
                            <DatePicker
                              selected={values.dob}
                              onChange={(date) => setFieldValue("dob", date)}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select your date of birth"
                              className="border border-[#D3D3D3] p-2 w-[100%] rounded-md focus:outline-none"
                              popperClassName="react-datepicker-popper"
                            />
                            <ErrorMessage
                              name="dob"
                              component="p"
                              className="text-red-500 text-sm text-left"
                            />
                          </div>
                        </div>

                        <div className="flex items-center mt-2">
                          <Field
                            type="checkbox"
                            name="terms"
                            id="terms"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="terms"
                            className="ml-2 text-sm text-gray-700"
                          >
                            I accept all{" "}
                            <a
                              href="#"
                              className="text-[#FF536B] font-semibold border-b border-b-[#FF536B]"
                              onClick={redirectToTermAndCondition}
                            >
                              Terms & Conditions.
                            </a>
                          </label>
                        </div>
                        <ErrorMessage
                          name="terms"
                          component="div"
                          className="text-red-500 text-sm text-left"
                        />

                        <div className="flex sm:justify-end justify-center mt-5">
                          <Button
                            type="submit"
                            variant={{
                              fontSize: "md",
                              theme: "dark",
                              fontWeight: "500",
                              rounded: "large",
                            }}
                            className="flex items-center"
                            disabled={isSubmitting || !isValid}
                          >
                            <span onClick={redirectToPricePlan}>
                              Continue to Payment
                            </span>
                            <img src={arrow} alt="arrow" className="ml-2" />
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationProcess;
