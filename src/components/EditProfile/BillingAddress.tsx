import { useState, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Header from "../ui/Header";
import Button from "../ui/Button";
import P from "../ui/P";
import Select from "react-select";
import { useGetArtistDetails } from "../UserProfile/http/useGetDetails";
import countryList from "react-select-country-list";
import CustomDropdown from "../pages/CustomDropdown";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { getCityStateFromZipCountry } from "../utils/MapWithAutocomplete";
import useBillingMutation from "../ArtistPanel/ArtistEditProfile/http/useBillingMutation";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetBillingAddress } from "../ArtistPanel/ArtistEditProfile/http/useGetBillingAddress";

const BillingAddress = () => {
  const options = useMemo(() => countryList(), []);

  const [countryCode, setCountryCode] = useState("in");
  const [id, setId] = useState(null);

  const { mutateAsync, isPending } = useBillingMutation();
  const { data: billingData, isLoading: billingLoading } =
    useGetBillingAddress();

  const userId = useAppSelector((state) => state?.user?.user?._id);

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    country: "",
    zipCode: "",
    state: "",
    city: "",
  });

  const { control, watch, handleSubmit, setValue, reset, getValues } = useForm({
    defaultValues: initialValues,
  });

  const { data, isLoading } = useGetArtistDetails();

  const watchCountry = watch("country");
  const watchZip = watch("zipCode");
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (watchCountry && watchZip && watchZip.length > 4) {
      getCityStateFromZipCountry(watchCountry, watchZip, apiKey).then(
        ({ state, city }) => {
          setValue("city", city);
          setValue("state", state);
        }
      );
    }
  }, [watchCountry, watchZip]);

  useEffect(() => {
    if (billingData) {
      setValue("firstName", billingData[0]?.billingDetails?.billingFirstName);
      setValue("lastName", billingData[0]?.billingDetails?.billingLastName);
      setValue("email", billingData[0]?.billingDetails?.billingEmail);
      setValue("phone", billingData[0]?.billingDetails?.billingPhone);
      setValue(
        "companyName",
        billingData[0]?.billingDetails?.billingCompanyName
      );
      setValue("address", billingData[0]?.billingDetails?.billingAddress);
      setValue("country", billingData[0]?.billingDetails?.billingCountry);
      setValue("zipCode", billingData[0]?.billingDetails?.billingZipCode);
      setValue("state", billingData[0]?.billingDetails?.billingState);
      setValue("city", billingData[0]?.billingDetails?.billingCity);
      setValue(
        "addressType",
        billingData[0]?.billingDetails?.billingAddressType
      );
      setId(billingData[0]?._id);
    }
  }, [billingData]);

  const countryValue = getValues("country");

  // console.log(billingData?.billingDetails?.billingFirstName);

  const onSubmit = (data) => {
    console.log(data);
    try {
      const newValue = {
        id,
        data,
      };
      mutateAsync(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="shadow-xl my-10">
        <div className="rounded-md bg-white border border-[#E6E6E6]">
          <Header
            variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
            className="border-b xl:p-4 lg:p-3 md:p-2 p-2"
          >
            Billing Address
          </Header>

          <div className="xl:p-6 lg:p-4 md:p-6 p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <div className="flex md:flex-row flex-col md:gap-4 w-full">
                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      First Name
                    </label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Dianne"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      )}
                    />
                  </div>

                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      Last Name
                    </label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Russell"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      )}
                    />
                  </div>

                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="companyName"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      Company Name
                    </label>
                    <Controller
                      name="companyName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Zakirsoft"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex md:flex-row flex-col md:gap-4 w-full">
                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      Email
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="dianne.russell@gmail.com"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      )}
                    />
                  </div>

                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      Phone Number
                    </label>
                    <PhoneInput
                      className="appearance-none  outline-none rounded py-1   w-full text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter phone number"
                      defaultCountry={countryCode}
                      value={getValues("phone")}
                      onChange={(val) => setValue("phone", val)}
                    />
                  </div>
                </div>

                <div className="flex md:flex-row flex-col md:gap-4 w-full">
                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      Country
                    </label>
                    <CustomDropdown
                      control={control}
                      name="country"
                      options={options}
                      isActiveStatus="active"
                      countryValue={countryValue}
                    />
                  </div>

                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="zipCode"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      Zip Code
                    </label>
                    <Controller
                      name="zipCode"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="200033"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex md:flex-row flex-col md:gap-4 w-full">
                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="state"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      States
                    </label>
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter your state"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      )}
                    />
                  </div>

                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      City
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter your city"
                          className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="sm:my-3 my-1 w-full">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                  >
                    Street Address
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="4140 Parl"
                        className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
