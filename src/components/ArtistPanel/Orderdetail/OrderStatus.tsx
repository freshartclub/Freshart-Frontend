import { MdShoppingCartCheckout } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { IoGiftOutline } from "react-icons/io5";
import { GrDeliver } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const OrderStatus = ({ order }: any) => {
  const { t } = useTranslation();
  return (
    <div className="p-5 border shadow-md">
      <h2 className="text-[18px] text-black font-semibold">
        {t("Order Status")}
      </h2>
      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-blue-800 border-4 border-[#F0F1F3] flex items-center justify-center">
          <MdShoppingCartCheckout />
        </div>
        <div>
          <p className="text-[16px] text-black font-semibold">
            {t("Order Placed")}
          </p>
          <p className="text-[14px]">{t("An order has been placed.")}</p>
          <p className="text-[14px]">
            <span>{order?.orderplaced?.data}, </span>
            <span>{order?.orderplaced?.time}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-blue-800 border-4 border-[#F0F1F3] flex items-center justify-center">
          <TfiReload />
        </div>
        <div>
          <p className="text-[16px] text-black font-semibold">
            {t("Processing")}
          </p>
          <p className="text-[14px]">
            {t("Seller has proccessed your order.")}
          </p>
          <p className="text-[14px]">
            <span>{order?.processing?.data}, </span>
            <span>{order?.processing?.time}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4  ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
          <IoGiftOutline />
        </div>
        <div>
          <p className="text-[16px] text-black font-semibold">{t("Packed")}</p>
          <p className="text-[14px]">
            <span>{order?.packed?.data}, </span>
            <span>{order?.packed?.time}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
          <GrDeliver />
        </div>
        <div>
          <p className="text-[16px] text-black font-semibold">
            {t("Shipping")}
          </p>
          <p className="text-[14px]">
            <span>{order?.shipping?.data}, </span>
            <span>{order?.shipping?.time}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center"></div>
        <div>
          <p className="text-[16px] text-black font-semibold">
            {t("Delivered")}
          </p>
          <p className="text-[14px]">
            <span>{order?.delivered?.data}, </span>
            <span>{order?.delivered?.time}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
