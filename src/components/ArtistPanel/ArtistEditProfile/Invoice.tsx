import { useTranslation } from "react-i18next";

const Invoice = ({ control, dark }) => {
  const { t } = useTranslation();
  const invoiceData = [
    {
      name: "taxNumber",
      label: "Tax Number/NIF",
      message: "Tax Number is required",
    },
    {
      name: "taxLegalName",
      label: "Tax Legal Name",
      message: "Tax Legal Name is required",
    },

    {
      name: "taxAddress",
      label: "Tax Address",
      message: "Tax Address is required",
    },

    {
      name: "taxCountry",
      label: "Tax Country",
      message: "Tax Country is required",
    },
    {
      name: "taxCity",
      label: "Tax City",
      message: "Tax City is required",
    },
    {
      name: "taxZipCode",
      label: "Tax Zip Code",
      message: "Tax Zip Code is required",
    },
    {
      name: "taxProvince",
      label: "Tax Province",
      message: "Tax Province is required",
    },

    {
      name: "taxEmail",
      label: "Tax Email",
      message: "Tax Email is required",
    },

    {
      name: "taxPhone",
      label: "Tax Phone",
      message: "Tax Phone is required",
    },
    {
      name: "vatAmount",
      label: "Tax Vat",
      message: "Tax Vat is required",
    },
    {
      name: "taxBankIBAN",
      label: "Tax Bank IBAN",
      message: "Tax Bank IBAN is required",
    },
    {
      name: "taxBankName",
      label: "Tax Bank Name",
      message: "Tax Bank Name is required",
    },
  ];

  return (
    <div className={`p-6 mt-6 border rounded-xl shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Invoicing & Commercialization")}</h2>
        <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
      <div className="flex flex-wrap justify-between w-full gap-4 mb-4">
        {invoiceData.map(({ name, label, message }) => (
          <div key={name} className="md:w-[48%] w-full relative">
            <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(label)}</label>
            <input
              disabled
              type="text"
              {...control.register(name, { required: message })}
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

export default Invoice;
