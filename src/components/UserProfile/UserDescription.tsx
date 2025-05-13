import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheckCircle, FiEdit2, FiGlobe, FiMail, FiMapPin, FiPackage, FiPhone, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import Modal from "./Modal";

const order_data = [
  {
    icon: FiShoppingBag,
    number: "02",
    status: "Total Orders",
    color: "bg-blue-50 dark:bg-blue-900/30",
    iconColor: "text-blue-500 dark:text-blue-300",
  },
  {
    icon: FiPackage,
    number: "01",
    status: "Pending Orders",
    color: "bg-orange-50 dark:bg-orange-900/30",
    iconColor: "text-orange-500 dark:text-orange-300",
  },
  {
    icon: FiCheckCircle,
    number: "01",
    status: "Completed Orders",
    color: "bg-green-50 dark:bg-green-900/30",
    iconColor: "text-green-500 dark:text-green-300",
  },
];

const UserDescription = ({ user, dark }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { t } = useTranslation();

  const personal_info = [
    {
      title: "Name",
      value: user?.artistName ? `${user?.artistName} ${user?.artistSurname1} ${user?.artistSurname2}` : "N/A",
      icon: <FiUser className="text-gray-500 dark:text-gray-400" />,
    },
    {
      title: "Email",
      value: user?.email ? `${user?.email}` : "N/A",
      icon: <FiMail className="text-gray-500 dark:text-gray-400" />,
    },
    {
      title: "Phone No",
      value: user?.phone ? `${user?.phone}` : "N/A",
      icon: <FiPhone className="text-gray-500 dark:text-gray-400" />,
    },
    {
      title: "Country",
      value: user?.address?.country ? `${user?.address?.country}` : "N/A",
      icon: <FiMapPin className="text-gray-500 dark:text-gray-400" />,
    },
    {
      title: "Language",
      value: user?.language ? `${user?.language}` : "N/A",
      icon: <FiGlobe className="text-gray-500 dark:text-gray-400" />,
    },
  ];

  const handleProfileEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div className={`xl:w-[78%] lg:w[80%] md:w-[75%] w-full ${dark ? "dark" : ""}`}>
      <div className="mb-8">
        <h1 className={`text-2xl font-bold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>{t(`Welcome back, ${user?.artistName}!`)}</h1>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
          {t("Manage your account details, track orders, and update your preferences from your personalized dashboard.")}
        </p>
      </div>

      <div className={`rounded-xl shadow-sm overflow-hidden border ${dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
        <div className="p-6 relative">
          <button
            onClick={handleProfileEdit}
            className={`flex absolute right-6 top-6 items-center gap-2 px-4 py-2 rounded-lg bg-[#EE1D52] hover:bg-[#d41c4e] text-white transition-colors`}
          >
            <FiEdit2 size="1rem" />
            {t("Edit Profile")}
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <FiUser className={`w-5 h-5 ${dark ? "text-gray-300" : "text-gray-600"}`} />
              <h2 className={`text-lg font-bold ${dark ? "text-gray-200" : "text-gray-800"}`}>{t("Personal Information")}</h2>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {personal_info?.map((item, index) => (
                <div key={index} className={`p-4 border rounded-lg ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon}
                    <h3 className={`text-sm font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}>{t(item.title)}</h3>
                  </div>
                  <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"} break-all`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-bold mb-6 ${dark ? "text-gray-200" : "text-gray-800"}`}>{t("Order Summary")}</h2>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {order_data.map((item, index) => (
                <div key={index} className={`flex items-center p-4 rounded-lg ${item.color}`}>
                  <div className={`p-3 rounded-full ${dark ? "bg-gray-700" : "bg-white"} ${item.iconColor}`}>
                    <item.icon size="1.5rem" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-xl font-bold mb-1 ${dark ? "text-gray-200" : "text-gray-800"}`}>{item.number}</p>
                    <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>{t(item.status)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} dark={dark}>
        <div className={`p-6 rounded-lg ${dark ? "bg-gray-800" : "bg-white"} w-full`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("Edit Profile")}</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className={`p-1 rounded-full ${dark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-500"}`}
            >
              <FiX size="1.5rem" />
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className={`block mb-2 text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Full Name")}</label>
              <input
                type="text"
                defaultValue={`${user?.artistName} ${user?.artistSurname1} ${user?.artistSurname2}`}
                className={`w-full px-4 py-2 rounded-lg border text-sm ${
                  dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>

            <div>
              <label className={`block mb-2 text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Email")}</label>
              <input
                type="email"
                defaultValue={user?.email || ""}
                className={`w-full px-4 py-2 rounded-lg border text-sm ${
                  dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>

            <div>
              <label className={`block mb-2 text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("Phone Number")}</label>
              <input
                type="tel"
                defaultValue={user?.phone || ""}
                className={`w-full px-4 py-2 rounded-lg border text-sm ${
                  dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium text-white text-sm ${
                  dark ? "bg-[#EE1D52] hover:bg-[#d41c4e]" : "bg-[#EE1D52] hover:bg-[#d41c4e]"
                } transition-colors`}
              >
                {t("Save Changes")}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserDescription;
