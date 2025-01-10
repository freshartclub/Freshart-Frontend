import { Link, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import P from "../ui/P";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import overview from "./assets/user.png";
import billing from "./assets/icon2.png";
import setting from "./assets/setting.png";
import Button from "../ui/Button";
import edit from "./assets/edit.png";
import order1 from "./assets/Rocket.png";
import order2 from "./assets/Receipt.png";
import order3 from "./assets/Package.png";
import add_arrow from "./assets/ArrowRight.png";
import visa from "./assets/Visa.png";
import mastercard from "./assets/mastercard.png";
import view1 from "./assets/viewArrow.png";
import dots from "./assets/DotsThree.png";
import copy from "./assets/Copy.png";
import { useAppSelector } from "../../store/typedReduxHooks";

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

const table_data = [
  {
    order_id: "#96459761",
    status: "in progress",
    date: "Dec 30, 2019 05:18",
    total: "$1,500 (5 Products)",
    action: "View details",
    view: view1,
  },
  {
    order_id: "#71667167",
    status: "COMPLETED",
    date: "Feb 2, 2019 19:28",
    total: "$80 (11 Products)",
    action: "View details",
    view: view1,
  },
  {
    order_id: "#95214362",
    status: "CANCELED",
    date: "Mar 20, 2019 23:14",
    total: "$160 (3 Products)",
    action: "View details",
    view: view1,
  },
];

const getStatusColor = (status: any) => {
  switch (status.toLowerCase()) {
    case "in progress":
      return "text-[#FF536B]";
    case "completed":
      return "text-[#2DB224]";
    case "canceled":
      return "text-[#EE5858]";
    default:
      return "text-black";
  }
};
const colors = ["bg-[#EAF6FE]", "bg-[#FFF3EB]", "bg-[#EAF7E9]"];

const UserDescription = ({ user }) => {
  const isArtist = useAppSelector((state) => state.user.isArtist);
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
      title: "Counrty",
      value: user?.address?.country ? `${user?.address?.country}` : "N/A",
    },
    {
      title: "Language",
      value: user?.language ? `${user?.language}` : "N/A",
    },
  ];

  return (
    <div className="xl:w-[78%] lg:w[80%] md:w-[75%] w-full">
      <div>
        <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
          {`Hello, ${user?.artistName} ${user?.artistSurname1} ${user?.artistSurname2}`}
        </Header>
        <P
          variant={{ size: "base", theme: "dark", weight: "medium" }}
          className="my-3 xl:w-[81%] lg:w-full"
        >
          From your account dashboard. you can easily check & view your
          <Link to="/" className="text-[#FF536B] mx-1">
            Recent Orders
          </Link>
          , manage your
          <Link to="/" className="text-[#FF536B] mx-1">
            Shipping and Billing Addresses
          </Link>
          and edit your
          <Link to="/" className="text-[#FF536B] mx-1">
            Password
          </Link>
          and
          <Link to="/" className="text-[#FF536B] mx-1">
            Account Details.
          </Link>
        </P>
      </div>
      <div className="border border-gray-300 rounded-md shadow-xl my-5">
        <div className="border-b border-gray-200 dark:border-neutral-700">
          <Tabs className="border-none">
            <TabList className="border-b p-4 flex gap-10">
              <Tab className="border-none">
                <div className="flex gap-1 items-center outline-none">
                  <img src={overview} alt="user" />
                  <P
                    variant={{ size: "base", theme: "dark", weight: "medium" }}
                    className="outline-none"
                  >
                    Overview
                  </P>
                </div>
              </Tab>

              <Tab className="border-none">
                <div className="flex  gap-1 items-center">
                  <img src={billing} alt="billing" />
                  <P
                    variant={{ size: "base", theme: "dark", weight: "medium" }}
                  >
                    Billings
                  </P>
                </div>
              </Tab>

              <Tab className="border-none">
                <div className="flex gap-1 items-center">
                  <img src={setting} alt="setting" />
                  <P
                    variant={{ size: "base", theme: "dark", weight: "medium" }}
                  >
                    Settings
                  </P>
                </div>
              </Tab>
            </TabList>

            <TabPanel className="">
              <div className="p-4">
                <div className="flex justify-end">
                  {user?.isActivated ? null : (
                    <button
                      onClick={handleProfile}
                      className="flex gap-2 items-center justify-center bg-black text-white px-2 py-2"
                    >
                      <img src={edit} alt="edit" />
                      Edit profile
                    </button>
                  )}
                </div>
                <Header
                  variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
                  className="text-[#334155]"
                >
                  Personal Info
                </Header>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center mt-4">
                  {personal_info.map((item, index) => (
                    <div key={index} className="mb-5">
                      <Header
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "bold",
                        }}
                      >
                        {item.title}
                      </Header>
                      <P
                        variant={{
                          size: "small",
                          theme: "dark",
                          weight: "medium",
                        }}
                        className="text-[#64748B]"
                      >
                        {item.value}
                      </P>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-8 gap-3 xl:mb-10 mb-5">
                  {order_data.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center xl:p-4 p-3 ${
                        colors[index % colors.length]
                      }`}
                    >
                      <img
                        src={item.order}
                        alt={item.status}
                        className="bg-white p-2"
                      />
                      <div className="ml-2">
                        <P
                          variant={{
                            size: "md",
                            theme: "dark",
                            weight: "semiBold",
                          }}
                          className="mb-1"
                        >
                          {item.number}
                        </P>
                        <P
                          variant={{
                            size: "base",
                            theme: "dark",
                            weight: "medium",
                          }}
                        >
                          {item.status}
                        </P>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-y border-gray-200 p-4 flex justify-between items-center">
                <P
                  variant={{
                    size: "base",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                  className="text-[#334155]"
                >
                  Payment Option
                </P>

                <Link
                  className="flex text-[#FF536B] items-center text-base font-semibold"
                  to="/"
                >
                  Add Card
                  <img src={add_arrow} alt="add arrow" />
                </Link>
              </div>

              <div className="flex xl:flex-row flex-col  items-center p-4 gap-6">
                <div className="bg-custom-gradient1 p-5 sm:w-80 w-72 rounded-md">
                  <div className="flex justify-between mb-5">
                    <Header
                      variant={{
                        size: "lg",
                        theme: "light",
                        weight: "normal",
                      }}
                    >
                      $95,400.00 USD
                    </Header>
                    <img src={dots} alt="dot image" />
                  </div>

                  <div>
                    <Header
                      variant={{
                        theme: "light",
                        weight: "normal",
                      }}
                      className="text-sm uppercase"
                    >
                      Card number
                    </Header>
                    <div className="flex gap-3 mt-2 mb-5">
                      <P
                        variant={{
                          size: "md",
                          theme: "light",
                          weight: "light",
                        }}
                      >
                        **** **** **** 3814
                      </P>
                      <img src={copy} alt="copy image" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <img src={visa} alt="visa" />
                    <P
                      variant={{
                        size: "base",
                        theme: "light",
                        weight: "normal",
                      }}
                    >
                      Kevin Gilbert
                    </P>
                  </div>
                </div>

                <div className="bg-custom-gradient2 p-5 sm:w-80 w-72 rounded-md">
                  <div className=" mb-5">
                    <Header
                      variant={{
                        size: "lg",
                        theme: "light",
                        weight: "normal",
                      }}
                    >
                      $87,583.00 USD
                    </Header>
                  </div>
                  <div>
                    <Header
                      variant={{
                        theme: "light",
                        weight: "normal",
                      }}
                      className="text-sm uppercase"
                    >
                      Card number
                    </Header>
                    <div className="flex gap-3 mt-2 mb-5">
                      <P
                        variant={{
                          size: "md",
                          theme: "light",
                          weight: "light",
                        }}
                      >
                        **** **** **** 1761
                      </P>
                      <img src={copy} alt="copy image" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <img src={mastercard} alt="mastercard" />
                    <P
                      variant={{
                        size: "base",
                        theme: "light",
                        weight: "normal",
                      }}
                    >
                      Kevin Gilbert
                    </P>
                  </div>
                </div>
              </div>

              <div className="border-y border-gray-200 p-4 flex justify-between items-center">
                <P
                  variant={{
                    size: "base",
                    theme: "dark",
                    weight: "semiBold",
                  }}
                  className="text-[#334155]"
                >
                  Recent Order
                </P>

                <Link
                  className="flex text-[#FF536B] items-center text-base font-semibold"
                  to="/"
                >
                  View All
                  <img src={add_arrow} alt="add arrow" />
                </Link>
              </div>

              <div>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-[#E4E7E9] dark:bg-[#E4E7E9] dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 ">
                          Order
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {table_data.map((item, index) => (
                        <>
                          <tr className="bg-white dark:bg-gray-800 overflow-x-scroll">
                            <th
                              scope="row"
                              className="xl:px-6 lg:px-4 px-1 py-4 text-sm font-semibold text-[#191C1F] whitespace-nowrap dark:text-white"
                            >
                              {item.order_id}
                            </th>
                            <td
                              className={`xl:px-6 lg:px-4 px-1 py-4 uppercase text-sm font-semibold  ${getStatusColor(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </td>
                            <td className="xl:px-6 lg:px-4 px-1 py-4 text-sm text-[#5F6C72] font-medium">
                              {item.date}
                            </td>
                            <td className="xl:px-6 lg:px-4 px-1 py-4 text-sm text-[#475156] font-medium">
                              {item.total}
                            </td>
                            <div className="flex items-center text-sm cursor-pointer">
                              <td className="xl:px-2 px-1 py-4 text-sm text-[#35637C] font-semibold">
                                {item.action}
                              </td>
                              <img src={view1} alt="view" />
                            </div>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex gap-10 w-full my-10">
                <div className="w-[32%]">
                  <Header
                    variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                    className="mb-4"
                  >
                    Overview
                  </Header>
                </div>

                <div className="w-[32%]">
                  <Header
                    variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                  >
                    Highlights:
                  </Header>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex gap-10 w-full my-10">
                <div className="w-[32%]">
                  <Header
                    variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                    className="mb-4"
                  >
                    Overview
                  </Header>
                </div>

                <div className="w-[32%]">
                  <Header
                    variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                  >
                    Highlights:
                  </Header>
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
