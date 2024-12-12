import { useState, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Header from "../../ui/Header";
import Button from "../../ui/Button";
import P from "../../ui/P";
import Select from "react-select";
import countryList from "react-select-country-list";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { useGetArtistDetails } from "./http/useGetDetails";
import CustomDropdown from "../../pages/CustomDropdown";
import { getCityStateFromZipCountry } from "../../utils/MapWithAutocomplete";
import { GiCancel } from "react-icons/gi";
import Loader from "../../ui/Loader";
import useBillingMutation from "./http/useBillingMutation";

const AdressPop = ({ setCheckBox, newData = {}, setUpdateData }) => {
  const options = useMemo(() => countryList(), []);
  const [id, setId] = useState(null);

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
    addressType: "",
  });

  const { control, watch, handleSubmit, setValue, reset, getValues } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (!newData) return;
    setValue("firstName", newData?.billingDetails?.billingFirstName);
    setValue("lastName", newData?.billingDetails?.billingLastName);
    setValue("email", newData?.billingDetails?.billingEmail);
    setValue("phone", newData?.billingDetails?.billingPhone);
    setValue("companyName", newData?.billingDetails?.billingCompanyName);
    setValue("address", newData?.billingDetails?.billingAddress);
    setValue("country", newData?.billingDetails?.billingCountry);
    setValue("zipCode", newData?.billingDetails?.billingZipCode);
    setValue("state", newData?.billingDetails?.billingState);
    setValue("city", newData?.billingDetails?.billingCity);
    setValue("addressType", newData?.billingDetails?.billingAddressType);
    setId(newData._id);
  }, []);

  const countryValue = getValues("country");

  const { data, isLoading } = useGetArtistDetails();
  const { mutateAsync, isPending } = useBillingMutation();

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

  const onSubmit = (data) => {
    console.log(data);
    const newValue = {
      id,
      data,
    };
    mutateAsync(newValue).then(() => {
      setCheckBox(false);
      setUpdateData(null);
      reset();
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative flex justify-center items-center min-h-[50vh] z-[9999] ">
      <div className="absolute lg:top-[-100%] lg:left-[25%] bottom-0 left-0 w-full sm:w-[200%] lg:w-[100%] xl:w-[90%] max-w-[600px]">
        <div className="shadow-xl my-10 ">
          <div className="rounded-md w-full bg-white border border-[#E6E6E6]">
            <div className="flex px-3 justify-between items-center py-4">
              <Header
                variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
                className="border-b"
              >
                Billing Address
              </Header>
              <span
                className="cursor-pointer"
                onClick={() => setCheckBox(false)}
              >
                <GiCancel size="1.5em" />
              </span>
            </div>

            <div className="px-4 py-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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
                  </div>

                  {/* Company Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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
                  </div>

                  {/* Phone and Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="sm:my-3 my-1 w-full">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        Phone Number
                      </label>
                      <PhoneInput
                        className="appearance-none outline-none rounded py-1 w-full text-gray-700 leading-tight focus:outline-none"
                        placeholder="Enter phone number"
                        value={getValues("phone")}
                        onChange={(val) => setValue("phone", val)}
                      />
                    </div>

                    <div className="sm:my-3 my-1 w-full">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        Address Type
                      </label>
                      <Controller
                        name="addressType"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                          >
                            <option disabled>Select</option>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                          </select>
                        )}
                      />
                    </div>
                  </div>

                  {/* Zip Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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

                  {/* State and City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="sm:my-3 my-1 w-full">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                      >
                        State
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

                  {/* Street Address */}
                  <div className="sm:my-3 my-1 w-full">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                    >
                      Address
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

                  <div className="flex mt-5 justify-center">
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
    </div>
  );
};

export default AdressPop;
