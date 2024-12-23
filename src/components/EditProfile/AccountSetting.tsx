import { useForm, Controller } from "react-hook-form";
import Header from "../ui/Header";
import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";
import { useGetArtistDetails } from "../UserProfile/http/useGetDetails";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import image_icon from "../../assets/image_icon.png";
import P from "../ui/P";

const AccountSetting = () => {
  const [profileImage, setProfileImage] = useState(null);
  const triggerImg = useRef(null);
  const { data, isLoading } = useGetArtistDetails();

  const url = data?.data?.url;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
    getValues,
    register,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      profileImage: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        firstName: data?.data?.artist?.artistName,
        lastName: data?.data?.artist?.artistSurname2,
        email: data?.data?.artist?.email,
        phoneNumber: data?.data?.artist?.phone,
      });
      setProfileImage(
        data?.data?.artist?.profile?.mainImage
          ? `${url}/users/${data?.data?.artist?.profile?.mainImage}`
          : null
      );
    }
  }, [data, reset, url]);

  const triggerInput = () => {
    triggerImg.current.click();
  };

  const handleImageChange = (e) => {
    console.log(e.target.files?.[0]);
    const file = e.target.files?.[0];

    if (file) {
      const img = URL.createObjectURL(file);
      setProfileImage(img);
    }
  };

  const onSubmit = (values) => {
    console.log("Form data:", values);
    // Handle form submission logic here
  };

  return (
    <div className="shadow-xl my-10">
      <div className="rounded-md bg-white border border-[#E6E6E6]">
        <Header
          variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
          className="border-b xl:p-4 lg:p-3 md:p-2 p-2"
        >
          Account Settings
        </Header>

        <div className="xl:p-6 lg:p-4 md:p-6 p-4">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex md:flex-row flex-col justify-between w-full">
                <div className="md:w-[60%] w-full">
                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
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
                    <input
                      type="text"
                      {...register("lastName")}
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
                    <input
                      type="text"
                      {...register("email")}
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
                    <Controller
                      control={control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          className="appearance-none outline-none rounded py-1 w-full text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter phone number"
                          onChange={(val) => setValue("phoneNumber", val)}
                        />
                      )}
                    />
                  </div>

                  <div className="flex mt-5">
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

                <div className="md:w-[30%] w-full flex flex-col justify-center items-center">
                  <img
                    src={profileImage || image_icon}
                    alt="Profile"
                    className="mx-auto"
                  />
                  <span className="flex items-center rounded-full">
                    <input
                      onChange={handleImageChange}
                      type="file"
                      ref={triggerImg}
                      accept="image/png, image/jpeg"
                      className="hidden"
                    />

                    <span
                      className="bg-[#DEDEFA] font-bold mt-2 p-3 px-4 rounded-md cursor-pointer"
                      onClick={triggerInput}
                    >
                      Add Image
                    </span>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
