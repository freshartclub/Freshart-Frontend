import { useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import export_icon from "../../assets/export.png";
import invoice from "../../assets/invoice.png";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import OrderDescription from "./OrderDescription";
import { useGetOrderDetails } from "./http/useGetOrderDetails";

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const values = {
    art: searchParams.get("art"),
    orderId: searchParams.get("id"),
    orderType: searchParams.get("orderType"),
  };

  const { data, isLoading, refetch } = useGetOrderDetails(values);

  useEffect(() => {
    refetch();
  }, [values.art]);

  if (isLoading) return <Loader />;

  return (
    <div className="bg-[#EFEFF7] pb-10">
      <div className="container mx-auto sm:px-6 px-3">
        <nav className="flex pt-5 gap-2 text-sm text-[#2E4053] items-center">
          <Link to="/" className="flex text-[#FF536B]">
            Home
          </Link>
          <MdOutlineKeyboardArrowRight />
          <Link to="/order" className="text-[#FF536B]">
            Order
          </Link>
          <MdOutlineKeyboardArrowRight />
          <span>Order Detail</span>
        </nav>

        <div className="flex sm:flex-row flex-col justify-end gap-5 mb-8 mt-6">
          <Button className="flex bg-[#DEDEFA]">
            <img src={export_icon} alt="Export" className="w-5 h-5 mr-2" />{" "}
            Export
          </Button>
          <Button className="flex">
            <img src={invoice} alt="Invoice" className="w-5 h-5 mr-2" /> Invoice
          </Button>
        </div>

        <OrderDescription data={data} />
      </div>
    </div>
  );
};

export default OrderTracking;
