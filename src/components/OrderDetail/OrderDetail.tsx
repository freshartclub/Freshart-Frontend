import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import arrow from "../../assets/arrow_22.png";
import P from "../ui/P";
import Button from "../ui/Button";
import export_icon from "../../assets/export.png";
import invoice from "../../assets/invoice.png";
import OrderDescription from "./OrderDescription";

const OrderDetail = () => {
  return (
    <div className="bg-[#EFEFF7] pb-10">
      <div className="container mx-auto sm:px-6 px-3 ">
        <div>
          <ul className="flex pt-5 gap-4 text-xl text-[#2E4053] items-center">
            <li>
              <Link to="/" className="rounded-md transition-all flex">
                <img
                  src={home}
                  alt="Home icon"
                  className="w-[14px] h-[14px] mr-2"
                />
                <P
                  variant={{ size: "small", theme: "dark", weight: "normal" }}
                  className="text-[#FF536B]"
                >
                  Home
                </P>
              </Link>
            </li>
            <img src={arrow} alt="Home icon" className=" mr-2" />
            <li>
              <Link
                to="/order"
                className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
              >
                <P
                  variant={{ size: "small", theme: "dark", weight: "normal" }}
                  className="text-[#FF536B]"
                >
                  Order
                </P>
              </Link>
            </li>
            <img src={arrow} alt="Home icon" className=" mr-2" />
            <li>
              <Link
                to="/order_detail"
                className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
              >
                <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
                  Order Detail
                </P>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex sm:flex-row flex-col justify-end gap-5 mb-8 md:mt-0 mt-6">
          <Button
            variant={{ fontSize: "sm", fontWeight: "bold" }}
            className="flex bg-[#DEDEFA]"
          >
            <img src={export_icon} alt="" className="w-[18px] h-[17px] mr-2" />
            <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
              Export
            </P>
          </Button>
          <Button
            variant={{ fontSize: "lg", fontWeight: "bold", theme: "dark" }}
            className="flex"
          >
            <img src={invoice} alt="" className="w-[18px] h-[16px] mr-2" />
            <P variant={{ size: "small", theme: "light", weight: "normal" }}>
              Invoice
            </P>
          </Button>
        </div>

        <OrderDescription />
      </div>
    </div>
  );
};

export default OrderDetail;
