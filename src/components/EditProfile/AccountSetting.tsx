import { Formik, Form, Field } from "formik";
import Header from "../ui/Header";
import Button from "../ui/Button";
// import profileimage from "./assets/profileimage.png";
import P from "../ui/P";
import { useEffect, useRef, useState } from "react";
import { useGetArtistDetails } from "../UserProfile/http/useGetDetails";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const AccountSetting = () => {
  const [profileImage, setProfileImage] = useState(null);
  const triggerImg = useRef(null);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    phoneNumber: "",
  });

  const { data, isLoading } = useGetArtistDetails();

  console.log(data?.data);

  const url = data?.data?.url;

  useEffect(() => {
    if (data?.data) {
      setInitialValues((prev) => ({
        ...prev,
        firstName: data?.data?.artist?.artistName,
        lastName: data?.data?.artist?.artistSurname2,
        email: data?.data?.artist?.email,
        phoneNumber: data?.data?.artist?.phone,
      }));
      setProfileImage(`${url}/users/${data?.data?.artist?.profile?.mainImage}`);
    }
  }, [data]);

  const triggerInput = () => {
    triggerImg.current.click();
  };

  const handleImageChnage = (e) => {
    console.log(e.target.files?.[0]);
    const file = e.target.files?.[0];

    if (file) {
      const img = URL.createObjectURL(file);
      setProfileImage(img);
    }
  };
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
              initialValues={initialValues}
              enableReinitialize={true}
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
                        <PhoneInput
                          className="appearance-none  outline-none rounded py-1   w-full text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter phone number"
                          name="phoneNumber"
                          // defaultCountry={countryCode}
                          // value={getValues("phone")}
                          // onChange={(val) => setValue("phone", val)}
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

                    <div className="md:w-[30%] w-full  flex flex-col justify-center items-center ">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="mx-auto"
                      />
                      <span className="flex items-center rounded-full">
                        <input
                          onChange={(e) => handleImageChnage(e)}
                          type="file"
                          ref={triggerImg}
                          accept="image/png, image/jpeg"
                          className="hidden"
                        />

                        <span
                          className={`bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer`}
                          onClick={triggerInput}
                        >
                          Add Image
                        </span>
                      </span>
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
