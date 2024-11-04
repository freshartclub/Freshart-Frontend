import { Formik, Form, Field } from "formik";
import Header from "../ui/Header";
import Button from "../ui/Button";
import profileimage from "./assets/profileimage.png";
import P from "../ui/P";

const AccountSetting = () => {
  return (
    <div className=" shadow-xl my-10">
      <div className="rounded-md bg-white border border-[#E6E6E6]">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
          className="border-b xl:p-4 lg:p-3 md:p-2 p-2"
        >
          Account Settings
        </Header>

        <div className="xl:p-6 lg:p-4 md:p-6 p-4">
          <div className="w-full">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
              }}
              onSubmit={(values, { resetForm }) => {
                console.log(".....", values);

                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex md:flex-row flex-col justify-between w-full">
                    <div className="md:w-[60%] w-full">
                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          First Name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="Dianne"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="lastName"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Last Name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Russell"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Email
                        </label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="dianne.russell@gmail.com"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="sm:my-3 my-1 w-full">
                        <label
                          htmlFor="phoneNumber"
                          className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                        >
                          Phone Number
                        </label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="(603 555-0123)"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="flex  mt-5">
                        <Button
                          type="submit"
                          variant={{
                            fontSize: "md",
                            theme: "dark",
                            fontWeight: "500",
                            rounded: "full",
                          }}
                          className="flex items-center !px-6"
                          disabled={isSubmitting}
                        >
                          <P
                            variant={{
                              size: "base",
                              theme: "light",
                              weight: "semiBold",
                            }}
                          >
                            Save Changes
                          </P>
                        </Button>
                      </div>
                    </div>

                    <div className="md:w-[30%] w-full mt-10 ">
                      <img
                        src={profileimage}
                        alt="Profile"
                        className="mx-auto"
                      />
                      <Button
                        type="button"
                        variant={{
                          fontSize: "md",
                          theme: "light",
                          fontWeight: "500",
                          rounded: "large",
                        }}
                        className="flex items-center border-2 mt-2 border-black rounded-full"
                      >
                        <P
                          variant={{
                            size: "base",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                        >
                          Choose Image
                        </P>
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
  );
};

export default AccountSetting;
