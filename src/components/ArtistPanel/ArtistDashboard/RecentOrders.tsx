import { IoOptionsOutline } from "react-icons/io5";
import Pagination from "./Pagination";
const RecentOrders = () => {
  return (
    <div className="mt-5 ">
      <div className="bg-white p-4">
        <div className=" flex justify-between">
          <p className="text-black text-[18px] font-semibold">Recent Orders</p>
          <button className="py-2 px-3 rounded-lg border-2 border-gray-50  text-black flex items-center gap-2 transition-all duration-200 hover:scale-95">
            <IoOptionsOutline /> Filters
          </button>
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default RecentOrders;
