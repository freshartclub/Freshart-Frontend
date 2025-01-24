import { useTranslation } from "react-i18next";
import { CiSaveDown2 } from "react-icons/ci";
import { PiFilesFill } from "react-icons/pi";
import OrderInformation from "./OrderInformation";
import { default as Address, default as OrderList } from "./OrderList";
import OrderStatus from "./OrderStatus";

const OrderDetail = () => {
  const { t } = useTranslation();

  const order = {};
  return (
    <div className="px-5 py-7">
      <div>
        <h1 className="font-bold text-[20px] mdtext-[24px] text-black">
          {t("Order Details")}
        </h1>
        <div className="flex flex-wrap justify-between mt-4">
          <div className="flex gap-3">
            <button className="py-1 px-2 rounded-md flex gap-2 items-center bg-white text-black hover:cursor-pointer">
              {" "}
              {t("Processing")}
            </button>
            <button className="py-1 px-2 rounded-md flex gap-2 items-center bg-[#DEDEFA] text-black hover:cursor-pointer">
              <CiSaveDown2 /> {t("Export")}
            </button>
            <button className="py-1 px-2 rounded-md flex gap-2 items-center bg-black text-white hover:cursor-pointer">
              <PiFilesFill /> {t("Invoice")}
            </button>
          </div>
        </div>
        <OrderInformation order={order} />

        <div className="grid md:grid-cols-3 gap-x-4 gap-y-4 mt-3">
          <div className="col-span-2 bg-white border rounded-md h-fit">
            <OrderList order={order} />
          </div>
          <div className="col-span-1">
            <div className="bg-white border rounded-md mb-4">
              <Address order={order} />
            </div>
            <div className="bg-white border rounded-md ">
              <OrderStatus order={order} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
