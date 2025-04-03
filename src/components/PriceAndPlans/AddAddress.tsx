import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GiCancel } from "react-icons/gi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import countryList from "react-select-country-list";
import CustomDropdown from "../pages/CustomDropdown";
import Button from "../ui/Button";
import { getCityStateFromZipCountry } from "../utils/MapWithAutocomplete";
import useCreatePayer from "./http/useCreatePayer";

const AddAddress = ({ onClose, data }) => {
  const options = useMemo(() => countryList(), []);
  const { t } = useTranslation();

  const { mutateAsync, isPending } = useCreatePayer();

  const { control, watch, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
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
    },
  });

  useEffect(() => {
    if (!data) return;
    setValue("firstName", data?.billingFirstName);
    setValue("lastName", data?.billingLastName);
    setValue("email", data?.billingEmail);
    setValue("phone", data?.billingPhone);
    setValue("companyName", data?.billingCompanyName);
    setValue("address", data?.billingAddress);
    setValue("country", data?.billingCountry);
    setValue("zipCode", data?.billingZipCode);
    setValue("state", data?.billingState);
    setValue("city", data?.billingCity);
    setValue("addressType", data?.billingAddressType);
  }, []);

  const countryValue = getValues("country");

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

  const onSubmit = async (data) => {
    mutateAsync(data).then(() => {
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-y-auto scrollbar mx-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {t("Billing Address")}
            </h2>
            <span className="cursor-pointer" onClick={onClose}>
              <GiCancel size="1.5em" />
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="sm:my-3 my-1 w-full">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                  >
                    {t("First Name")}
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
                    {t("Last Name")}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="sm:my-3 my-1 w-full">
                  <label
                    htmlFor="companyName"
                    className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                  >
                    {t("Company Name")}
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
                    {t("Email")}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="sm:my-3 my-1 w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                  >
                    {t("Phone Number")}
                  </label>
                  <PhoneInput
                    className="appearance-none outline-none rounded py-1 w-full text-gray-700 leading-tight focus:outline-none"
                    placeholder={t("Enter phone number")}
                    defaultCountry="in"
                    value={getValues("phone")}
                    onChange={(val) => setValue("phone", val)}
                  />
                </div>

                <div className="sm:my-3 my-1 w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                  >
                    {t("Address Type")}
                  </label>
                  <Controller
                    name="addressType"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="border border-[#D3D3D3] p-2 w-full rounded-md focus:outline-none"
                      >
                        <option disabled>{t("Select")}</option>
                        <option value="Home">{t("Home")}</option>
                        <option value="Office">{t("Office")}</option>
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
                    {t("Country")}
                  </label>
                  <CustomDropdown
                    control={control}
                    name="country"
                    options={options}
                    countryValue={countryValue}
                    isActiveStatus="active"
                  />
                </div>
                <div className="sm:my-3 my-1 w-full">
                  <label
                    htmlFor="zipCode"
                    className="block mb-2 text-sm font-semibold text-gray-700 text-left"
                  >
                    {t("Zip Code")}
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
                    {t("State")}
                  </label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder={t("Enter your state")}
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
                    {t("City")}
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder={t("Enter your city")}
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
                  {t("Address")}
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
                  {isPending ? t("Saving...") : t("Create")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
