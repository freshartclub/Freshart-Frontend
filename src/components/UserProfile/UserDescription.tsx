import { Link, useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Header from "../ui/Header";
import P from "../ui/P";
import edit from "./assets/edit.png";
import order3 from "./assets/Package.png";
import order2 from "./assets/Receipt.png";
import order1 from "./assets/Rocket.png";

import overview from "./assets/user.png";


const order_data = [
  {
    order: order1,
    number: "02",
    status: "Total Orders",
  },
  {
    order: order2,
    number: "01",
    status: "Pending Orders",
  },
  {
    order: order3,
    number: "01",
    status: "Completed Orders",
  },
];

const colors = [
  "bg-[#EAF6FE] dark:bg-[#1E3A8A]", 
  "bg-[#FFF3EB] dark:bg-[#7C2D12]", 
  "bg-[#EAF7E9] dark:bg-[#14532D]"
];

const UserDescription = ({ user, dark }) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/edit_profile", { replace: true });
    localStorage.setItem("profile", "user");
  };

  const personal_info = [
    {
      title: "Name",
      value: user?.artistName
        ? `${user?.artistName} ${user?.artistSurname1} ${user?.artistSurname2}`
        : "N/A",
    },
    {
      title: "Email",
      value: user?.email ? `${user?.email}` : "N/A",
    },
    {
      title: "Phone No",
      value: user?.phone ? `${user?.phone}` : "N/A",
    },
    {
      title: "Country",
      value: user?.address?.country ? `${user?.address?.country}` : "N/A",
    },
    {
      title: "Language",
      value: user?.language ? `${user?.language}` : "N/A",
    },
  ];

  return (
    <div className={`xl:w-[78%] lg:w[80%] md:w-[75%] w-full ${dark ? "dark" : ""}`}>
      <div>
        <Header variant={{ size: "xl", theme: dark ? "light" : "dark", weight: "semiBold" }}>
          {`Hello, ${user?.artistName} ${user?.artistSurname1} ${user?.artistSurname2}`}
        </Header>
        <P
          variant={{ size: "base", theme: dark ? "light" : "dark", weight: "medium" }}
          className="my-3 xl:w-[81%] lg:w-full text-gray-600 dark:text-gray-300"
        >
          From your account dashboard. you can easily check & view your
          <Link to="/" className={dark ? "text-[#FF8A98] mx-1" : "text-[#FF536B] mx-1"}>
            Recent Orders
          </Link>
          , manage your
          <Link to="/" className={dark ? "text-[#FF8A98] mx-1" : "text-[#FF536B] mx-1"}>
            Shipping and Billing Addresses
          </Link>
          and edit your
          <Link to="/" className={dark ? "text-[#FF8A98] mx-1" : "text-[#FF536B] mx-1"}>
            Password
          </Link>
          and
          <Link to="/" className={dark ? "text-[#FF8A98] mx-1" : "text-[#FF536B] mx-1"}>
            Account Details.
          </Link>
        </P>
      </div>
      <div className="border border-gray-300 dark:border-gray-700 rounded-md shadow-xl my-5 bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <Tabs className="border-none">
            <TabList className="border-b p-4 flex gap-10 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Tab className="border-none">
                <div className="flex gap-1 items-center outline-none">
                  <img 
                    src={overview} 
                    alt="user" 
                    className={`w-5 h-5 ${dark ? "invert" : ""}`} 
                  />
                  <P
                    variant={{ size: "base", theme: dark ? "light" : "dark", weight: "medium" }}
                    className="outline-none"
                  >
                    Overview
                  </P>
                </div>
              </Tab>
            </TabList>

            <TabPanel className="bg-white dark:bg-gray-800">
              <div className="p-4">
                <div className="flex justify-end">
                  {user?.isActivated ? null : (
                    <button
                      onClick={handleProfile}
                      className="flex gap-2 items-center justify-center bg-black dark:bg-white dark:text-black text-white px-2 py-2 rounded"
                    >
                      <img 
                        src={edit} 
                        alt="edit" 
                        className={`w-4 h-4 ${dark ? "invert" : ""}`} 
                      />
                      Edit profile
                    </button>
                  )}
                </div>

                <Header
                  variant={{ size: "lg", theme: dark ? "light" : "dark", weight: "semiBold" }}
                  className="text-gray-800 dark:text-gray-200"
                >
                  Personal Info
                </Header>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center mt-4">
                  {personal_info?.map((item, index) => (
                    <div key={index} className="mb-5">
                      <Header
                        variant={{
                          size: "base",
                          theme: dark ? "light" : "dark",
                          weight: "bold",
                        }}
                        className="text-gray-800 dark:text-gray-200"
                      >
                        {item?.title}
                      </Header>
                      <P
                        variant={{
                          size: "small",
                          theme: dark ? "light" : "dark",
                          weight: "medium",
                        }}
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {item?.value}
                      </P>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-8 gap-3 xl:mb-10 mb-5">
                  {order_data.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center xl:p-4 p-3 rounded ${
                        colors[index % colors.length]
                      }`}
                    >
                      <img
                        src={item?.order}
                        alt={item?.status}
                        className="w-10 h-10 p-2 bg-white dark:bg-gray-700 rounded dark:invert"
                      />
                      <div className="ml-2">
                        <P
                          variant={{
                            size: "md",
                            theme: dark ? "light" : "dark",
                            weight: "semiBold",
                          }}
                          className="mb-1 text-gray-800 dark:text-gray-200"
                        >
                          {item?.number}
                        </P>
                        <P
                          variant={{
                            size: "base",
                            theme: dark ? "light" : "dark",
                            weight: "medium",
                          }}
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {item?.status}
                        </P>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDescription;