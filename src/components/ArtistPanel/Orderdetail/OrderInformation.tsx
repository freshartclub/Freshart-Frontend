import { MdBookmarkAdded } from "react-icons/md";
import { CgBox } from "react-icons/cg";
import { GrDeliver } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { RxMobile } from "react-icons/rx";
import { PiFilesFill } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
const OrderInformation = ({ order }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mt-5">
      <div className="bg-white border rounded-md p-5">
        <div className="flex gap-2">
          <h2 className="text-[18px] text-black font-semibold">Order</h2>
          <h2 className="text-[18px] text-black font-semibold">
            {order.Orderid}
          </h2>
          <div
            className={`w-fit rounded-lg py-0 px-2 flex items-center  ${
              order.status === "processing"
                ? "bg-[#FDF1E8] text-[#E46A11] "
                : order.status === "Shiped"
                ? "bg-[#E8F8FD] text-[#13B2E4]"
                : order.status === "cancelled"
                ? "bg-[#FEEDEC] text-[#F04438]"
                : "bg-[#E7F4EE] text-[#0D894F]"
            }`}
          >
            {order.status}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <MdBookmarkAdded />
            </div>
            <p className="text-[14px]">Added</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.date}</h2>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <CgBox />
            </div>
            <p className="text-[14px]">Payment Method</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.paymenttype}</h2>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <GrDeliver />
            </div>
            <p className="text-[14px]">Shipping Method</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.shippingmethod}</h2>
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-md p-5">
        <h2 className="text-[18px] text-black font-semibold">Customer</h2>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <BsPerson />
            </div>
            <p className="text-[14px]">Customer</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.customername}</h2>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <FiMail />
            </div>
            <p className="text-[14px]">Email</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.customeremail}</h2>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <RxMobile />
            </div>
            <p className="text-[14px]">Phone</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.mobileno}</h2>
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-md p-5">
        <h2 className="text-[18px] text-black font-semibold">Document</h2>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <PiFilesFill />
            </div>
            <p className="text-[14px]">Invoice</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.invoce}</h2>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <GrDeliver />
            </div>
            <p className="text-[14px]">Shipping</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.shippings}</h2>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 items-center">
            <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
              <LuSettings />
            </div>
            <p className="text-[14px]">Rewards</p>
          </div>
          <div className="text-black text-[14px] font-semibold">
            <h2>{order.rewards}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
