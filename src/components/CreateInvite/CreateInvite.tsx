import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import countryList from "react-select-country-list";
import CustomDropdown from "../pages/CustomDropdown";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { getCityStateFromZipCountry } from "../utils/MapWithAutocomplete";
import { RenderAllPicklists } from "../utils/RenderAllPicklist";
import useCreateInviteMutation from "./https/useCreateInviteMutation";
import { useGetInviteCode } from "./https/useGetInviteCode";
import toast from "react-hot-toast";

const CreateInvite = () => {
  const [isGnerated, setIsGnerated] = useState(false);
  const [inviteCode, setInviteCode] = useState(null);
  const [inviteId, setInviteId] = useState("");

  const { mutate, isPending } = useCreateInviteMutation(setInviteId);
  const langCode = localStorage.getItem("langCode") || "ES";

  const options = useMemo(() => countryList(), []);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      surname1: "",
      surname2: "",
      country: "",
      zipcode: "",
      city: "",
      region: "",
      gender: "",
      dob: "",
      discountCode: "",
      inviteCode: "",
    },
    mode: "onBlur",
  });

  const { data, isLoading } = useGetInviteCode(isGnerated);

  useEffect(() => {
    setInviteCode(data);
    setValue("inviteCode", data);
  }, [data]);

  const handleGenerateInviteCode = () => {
    setIsGnerated(true);
  };

  useEffect(() => {
    setValue("country", "Spain");
  }, []);

  const picklist = RenderAllPicklists(["Gender"]);

  const picklistMap = picklist.reduce((acc, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const gender = picklistMap["Gender"];

  const zipCode = watch("zipcode");
  const country = watch("country");
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (country && zipCode && zipCode.length > 4) {
      getCityStateFromZipCountry(country, zipCode, apiKey).then(
        ({ state, city }) => {
          setValue("city", city);
          setValue("region", state);
        }
      );
    }
  }, [country, zipCode]);

  const countryValue = getValues("country");

  const onSubmit = (data) => {
    if (inviteId) return toast.error("Invite code already generated");

    const getCode = getValues("inviteCode");
    if (!getCode) return toast.error("Invite code is required");

    const updatedData = { ...data, langCode: langCode };
    mutate(updatedData);
  };

  return (
    <div className="bg-[#F9F7F6]">
      <div className="container mx-auto sm:px-6 px-3">
        <div className="xl:w-[70%] lg:w-[90%] w-full mx-auto py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <Header
              variant={{ size: "3xl", weight: "bold", theme: "dark" }}
              className="text-center mb-4"
            >
              Create Invite Link
            </Header>
            <P
              variant={{ size: "md", theme: "dark", weight: "normal" }}
              className="text-sm text-gray-600 mb-8 text-center"
            >
              Please fill the form below to create an invite link. Feel free to
              add as much detail as needed.
            </P>

            <div className="flex sm:flex-row flex-col justify-between">
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="admin@gmail.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <PhoneInput
                  className="appearance-none  outline-none rounded w-full text-gray-700 leading-tight focus:outline-none"
                  placeholder="Enter Phone number"
                  defaultCountry={"es"}
                  value={getValues("phone")}
                  onChange={(val) => {
                    setValue("phone", val);
                  }}
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 grid-cols-1 gap-3 sm:mb-4 mb-2">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fisrt Name
                </label>
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Fisrt Name"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Surname1
                </label>
                <input
                  {...register("surname1", {
                    required: "Surname1 is required",
                  })}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Surname1"
                />
                {errors.surname1 && (
                  <span className="text-red-500 text-xs">
                    {errors.surname1.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Surname2
                </label>
                <input
                  {...register("surname2")}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Surname2"
                />
              </div>
            </div>

            <div className="flex sm:flex-row flex-col justify-between">
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country
                </label>
                <CustomDropdown
                  control={control}
                  countryValue={countryValue}
                  options={options}
                  name="country"
                  isActiveStatus="active"
                />
              </div>

              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Zipcode
                </label>
                <input
                  {...register("zipcode", {
                    required: "Zipcode is required",
                  })}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="452010"
                />
                {errors.zipcode && (
                  <span className="text-red-500 text-xs">
                    {errors.zipcode.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex sm:flex-row flex-col justify-between">
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City
                </label>
                <input
                  {...register("city", { required: "City is required" })}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter City"
                />
                {errors.city && (
                  <span className="text-red-500 text-xs">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Region
                </label>
                <input
                  {...register("region", {
                    required: "Region is required",
                  })}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Region"
                />
                {errors.region && (
                  <span className="text-red-500 text-xs">
                    {errors.region.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex sm:flex-row flex-col justify-between">
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Gender
                </label>
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  className="block appearance-none w-full bg-white border px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Gender</option>
                  {gender &&
                    gender?.map((item, i) => (
                      <option key={i} value={item?.value}>
                        {item?.value}
                      </option>
                    ))}
                </select>
                {errors.gender && (
                  <span className="text-red-500 text-xs">
                    {errors.gender.message}
                  </span>
                )}
              </div>

              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dob", {
                    required: "Date of Birth is required",
                    validate: {
                      validDate: (value) => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        return (
                          selectedDate <= today ||
                          "Date cannot be in the future"
                        );
                      },
                      oldEnough: (value) => {
                        const selectedDate = new Date(value);
                        const minAgeDate = new Date();
                        minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
                        return (
                          selectedDate <= minAgeDate ||
                          "You must be at least 13 years old"
                        );
                      },
                    },
                  })}
                  className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Select date of birth"
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.dob && (
                  <span className="text-red-500 text-xs">
                    {errors.dob.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex sm:flex-row flex-col justify-between">
              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Add Discount Code
                </label>
                <input
                  {...register("discountCode")}
                  className="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="XXXXX - XXXXX - XXXXX"
                />
              </div>

              <div className="sm:mb-4 mb-2 sm:w-[49%] w-full">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-sm font-bold">
                    Invite Code
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateInviteCode}
                    className={`text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded ${
                      inviteCode
                        ? "cursor-not-allowed  pointer-events-none opacity-60"
                        : ""
                    }`}
                  >
                    {isLoading ? "Genrating...." : "Generate Code"}
                  </button>
                </div>
                <input
                  {...register("inviteCode", { readOnly: true })}
                  value={inviteCode || ""}
                  readOnly
                  className="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="ABCD-EFCFD-DHDF"
                />
              </div>
            </div>

            <div className="flex items-center sm:gap-5 gap-2 mt-2">
              <span className="bg-[#102031] cursor-pointer text-white rounded-full text-sm sm:text-base py-3 sm:px-6 px-4 flex uppercase">
                COPY CODE
              </span>

              <Button
                type="submit"
                variant={{
                  fontSize: "base",
                  rounded: "full",
                  theme: "dark",
                  fontWeight: "500",
                  thickness: "",
                }}
                className={`${
                  inviteId
                    ? "cursor-not-allowed pointer-events-none opacity-60"
                    : ""
                } text-white bg-[#203F58] text-sm sm:text-base sm:px-6 px-4 flex uppercase`}
              >
                <span>{isPending ? "Sending..." : "SEND LINK"}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInvite;
