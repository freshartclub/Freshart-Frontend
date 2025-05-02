import { useForm, Controller } from "react-hook-form";
import Header from "../ui/Header";
import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";
import { useGetArtistDetails } from "../UserProfile/http/useGetDetails";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import image_icon from "../../assets/image_icon.png";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import useEditUserProfileMutation from "./https/useEditUserProfile";
import Loader from "../ui/Loader";

const AccountSetting = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState(null);

  const triggerImg = useRef(null);
  const { data, isLoading } = useGetArtistDetails();
  const { mutate, isPending } = useEditUserProfileMutation();

  const url = data?.data?.url;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
    
    register,
  } = useForm({
    defaultValues: {
      artistName: "",
      artistSurname1: "",
      artistSurname2: "",
      email: "",
      profileImage: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        artistName: data?.data?.artist?.artistName,
        artistSurname1: data?.data?.artist?.artistSurname1,
        artistSurname2: data?.data?.artist?.artistSurname2,
        email: data?.data?.artist?.email,
        phone: data?.data?.artist?.phone,
      });
      setProfileImage(
        data?.data?.artist?.profile?.mainImage
          ? `${imageUrl}/users/${data?.data?.artist?.profile?.mainImage}`
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
      setProfile(file);
      const img = URL.createObjectURL(file);
      setProfileImage(img);
    }
  };

  const onSubmit = (values) => {
    try {
      console.log("Form data:", values);
      const formData = new FormData();
      formData.append("artistName", values.artistName);
      formData.append("artistSurname1", values.artistSurname1);
      formData.append("artistSurname2", values.artistSurname2);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("mainImage", profile);

      mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

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
                      htmlFor="artistName"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("artistName")}
                      placeholder="Dianne"
                      className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                    />
                  </div>

                  <div className="sm:my-3 flex justify-between gap-2 items-center my-1 w-full">
                    <div className="w-full">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        Surname 1
                      </label>
                      <input
                        type="text"
                        {...register("artistSurname1")}
                        placeholder="Russell"
                        className="border border-[#D3D3D3] p-2 w-full  rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        Surname 2
                      </label>
                      <input
                        type="text"
                        {...register("artistSurname2")}
                        placeholder="Russell"
                        className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                      />
                    </div>
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
                      htmlFor="phone"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      Phone Number
                    </label>
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          className="appearance-none outline-none rounded py-1 w-full text-gray-700 leading-tight focus:outline-none"
                          placeholder="Enter phone number"
                          onChange={(val) => setValue("phone", val)}
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
                        {isPending ? "Saving..." : "Save Changes"}
                      </P>
                    </Button>
                  </div>
                </div>

                <div className="md:w-[30%] w-full flex flex-col  relative justify-center items-center">
                  <img
                    src={profileImage || image_icon}
                    alt="Profile"
                    className="mx-auto"
                  />
                  <span
                    className={`absolute top-5 right-0 bg-red-500 ${
                      profileImage ? "block" : "hidden"
                    } text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer`}
                    onClick={() => setProfileImage(null)}
                  >
                    &times;
                  </span>
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
