import { IoLocationOutline } from "react-icons/io5";
const Address = ({ order }: any) => {
  return (
    <div className="p-5 border shadow-md ">
      <h2 className="text-[18px] text-black font-semibold">Address</h2>
      <div className="flex gap-2 mt-4 items-center ">
        <div className="  w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
          <IoLocationOutline />
        </div>
        <div>
          <p className="text-[14px]">Billing</p>
          <p className="text-[16px] text-black">{order.address}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <div className="w-[2em] h-[2em] rounded-full bg-[#F9F7F6] text-black border-4 border-[#F0F1F3] flex items-center justify-center">
          <IoLocationOutline />
        </div>
        <div>
          <p className="text-[14px]">Shipping</p>
          <p className="text-[16px] text-black">{order.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Address;
