import { useTranslation } from "react-i18next";

const Logistics = ({ control, dark }) => {
  const { t } = useTranslation();
  const logisticsData = [
    {
      name: "logName",
      label: "Logistic Name",
      message: "Logistic Name is required",
    },
    {
      name: "logAddress",
      label: "Logistic Address",
      message: "Logistic Addressis required",
    },
    {
      name: "logZipCode",
      label: "Logistic ZipCode",
      message: "Logistic ZipCodeis required",
    },
    {
      name: "logCity",
      label: "Logistic City",
      message: "Logistic City is required",
    },
    {
      name: "logProvince",
      label: "Logistic Province",
      message: "Logistic Province is required",
    },
    {
      name: "logCountry",
      label: "Logistic Country",
      message: "Logistic Country is required",
    },
    {
      name: "logEmail",
      label: "Logistic Email",
      message: "Logistic Email required",
    },
    {
      name: "logPhone",
      label: "Logistic Phone",
      message: "Logistic Phone is required",
    },

    {
      name: "logNotes",
      label: "Logistic Notes",
      message: "Logistic Notes is required",
    },
  ];

  return (
    <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Logistics")}</h2>
        <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
      <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
        {logisticsData.map(({ name, label }) => (
          <div key={name} className="md:w-[48%] w-full relative">
            <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(label)}</label>
            <input
              disabled
              type="text"
              {...control.register(name)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logistics;
