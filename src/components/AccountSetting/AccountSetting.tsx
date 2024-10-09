import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import arrow_bread from "../../assets/arrow_22.png";
import P from "../ui/P";
import Header from "../ui/Header";
import Button from "../ui/Button";

const setting_data = [
  {
    header: "Activity",
    title: "Donec mi odio, faucibus at, scelerisque quis",
    title_data: [
      {
        title1: "Email me when someone comments onmy article",
        title2: "Email me when someone answers on my form",
        title3: "Email me hen someone follows me",
      },
    ],
  },
  {
    header: "Application",
    title: "Vestibulum facilisis, purus nec pulvinar iaculis",

    title_data: [
      {
        title1: "News and announcements",
        title2: "Weekly product updates",
        title3: "Weekly blog digest",
      },
    ],
  },
];

const AccountSetting = () => {
  return (
    <div className="bg-[#F9F7F6] py-10">
      <div className="container mx-auto md:px-6 px-3">
        <ul className="flex p-2 gap-3 text-xl text-[#2E4053] items-center">
          <li>
            <Link to="/" className="rounded-md transition-all flex">
              <img
                src={home}
                alt="Home icon"
                className="w-[14px] h-[14px] mr-2"
              />
              <P
                variant={{ size: "small", theme: "dark", weight: "semiBold" }}
                className="text-[#FF536B]"
              >
                Home
              </P>
            </Link>
          </li>
          <img src={arrow_bread} alt="Home icon" className="" />
          <li>
            <Link
              to="/products"
              className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
            >
              <P
                variant={{ size: "small", theme: "dark", weight: "semiBold" }}
                className="text-[#FF536B]"
              >
                Account
              </P>
            </Link>
          </li>
          <img src={arrow_bread} alt="Home icon" className="" />
          <li>
            <Link
              to="/products"
              className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
            >
              <P variant={{ size: "small", theme: "dark", weight: "semiBold" }}>
                Notification
              </P>
            </Link>
          </li>
        </ul>

        <div className="bg-white rounded-xl shadow-xl p-5 mt-8">
          {setting_data.map((item, index) => (
            <div key={index} className="flex md:flex-row flex-col mb-5">
              {/* Left Section with Header and Title */}
              <div className="md:w-[35%] w-full">
                <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
                  {item.header}
                </Header>
                <P
                  variant={{ size: "base", theme: "dark", weight: "normal" }}
                  className="text-[#637381] mt-2"
                >
                  {item.title}
                </P>
              </div>

              {/* Right Section with title_data mapping */}
              <div className="bg-gray-100 rounded-lg shadow-md md:w-[65%] w-full p-4 md:mt-0 mt-2">
                {item.title_data.map((data, idx) => (
                  <>
                    <div className="flex justify-between mb-5" key={idx}>
                      <P
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "medium",
                        }}
                      >
                        {data.title1}
                      </P>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between mb-5">
                      <P
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "medium",
                        }}
                      >
                        {data.title2}
                      </P>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <P
                        variant={{
                          size: "base",
                          theme: "dark",
                          weight: "medium",
                        }}
                      >
                        {data.title3}
                      </P>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
                        </label>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
          <div className="flex  justify-end w-auto">
            <Button
              variant={{ fontSize: "base", theme: "dark", fontWeight: "600" }}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
