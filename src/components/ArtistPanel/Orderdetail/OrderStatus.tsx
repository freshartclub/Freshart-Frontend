import { MdShoppingCartCheckout } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { IoGiftOutline } from "react-icons/io5";
import { GrDeliver } from "react-icons/gr";
const OrderStatus = ({ order }: any) => {
  return (
    <div className="p-5">
      <h2 className="text-[18px] text-black font-semibold">Order Status</h2>
      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-blue-800 border-4 border-[#F0F1F3] flex items-center justify-center">
          <MdShoppingCartCheckout />
        </div>
        <div>
          <p className="text-[16px] text-black font-semibold">Order Placed</p>
          <p className="text-[14px]">An order has been placed.</p>
          <p className="text-[14px]">
            <span>{order.orderplaced[0].data}, </span>
            <span>{order.orderplaced[0].time}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-blue-800 border-4 border-[#F0F1F3] flex items-center justify-center">
          <TfiReload />
        </div>
        <div>
          <p className="text-[16px] text-black font-semibold">Processing</p>
          <p className="text-[14px]">Seller has proccessed your order.</p>
          <p className="text-[14px]">
            <span>{order.processing[0].data}, </span>
            <span>{order.processing[0].time}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
          <IoGiftOutline />
        </div>
        <div>
          <p className="text-[16px] text-black font-semibold">Packed</p>
          <p className="text-[14px]">
            <span>{order.packed[0].data}, </span>
            <span>{order.packed[0].time}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
          <GrDeliver />
        </div>
        <div>
          <p className="text-[16px] text-black font-semibold">Shipping</p>
          <p className="text-[14px]">
            <span>{order.shipping[0].data}, </span>
            <span>{order.shipping[0].time}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4 ">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center"></div>
        <div>
          <p className="text-[16px] text-black font-semibold">Delivered</p>
          <p className="text-[14px]">
            <span>{order.delivered[0].data}, </span>
            <span>{order.delivered[0].time}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
