import { Link } from "react-router-dom";
import P from "../ui/P";
import arrow_bread from "../../assets/arrow_bread.png";
import home from "../../assets/home.png";
import AccountSetting from "./AccountSetting";
import BillingAddress from "./BillingAddress";
import ChangePassword from "./ChangePassword";

const EditProfile = () => {
  return (
    <div className="bg-[#F9F7F6] pb-10">
      <div className="container mx-auto sm:px-6 px-3">
        <div className="xl:w-[70%] lg:w-[95%] w-full mx-auto">
          <ul className="flex p-2 gap-3 text-xl text-[#2E4053] items-center pt-10">
            <li>
              <Link to="/" className="rounded-md transition-all flex">
                <img
                  src={home}
                  alt="Home icon"
                  className="w-[14px] h-[14px] mr-2"
                />
                <P
                  variant={{ size: "small", theme: "dark", weight: "semiBold" }}
                  className="text-pink"
                >
                  Home
                </P>
              </Link>
            </li>
            <img
              src={arrow_bread}
              alt="Home icon"
              className="w-[4px] h-[6px] mr-2"
            />
            <li>
              <Link
                to="/products"
                className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
              >
                <P
                  variant={{ size: "small", theme: "dark", weight: "semiBold" }}
                  className="text-pink"
                >
                  Profile
                </P>
              </Link>
            </li>

            <img
              src={arrow_bread}
              alt="Home icon"
              className="w-[4px] h-[6px] mr-2"
            />
            <li>
              <Link
                to="/products"
                className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
              >
                <P variant={{ size: "small", theme: "dark", weight: "medium" }}>
                  Edit Profile
                </P>
              </Link>
            </li>
          </ul>

          <AccountSetting />
          <BillingAddress />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
