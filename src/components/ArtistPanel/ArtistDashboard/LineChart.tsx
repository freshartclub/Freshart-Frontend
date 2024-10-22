import { PiDotsThreeVerticalBold } from "react-icons/pi";
import LineImage from "../assets/Line.png";

const LineChart = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between gap-3">
        <div>
          <p className="text-black font-semibold text-[18px]">Statistics</p>
        </div>
        <div className="flex gap-3 ">
          <div className="flex items-center  gap-2">
            <div className="w-[10px] h-[10px] rounded-2xl bg-red-700"></div>
            <p>Revenue</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[10px] h-[10px] rounded-2xl bg-red-700 flex "></div>
            <p>seles</p>
          </div>
        </div>
        <div className="flex items-center">
          <PiDotsThreeVerticalBold />
        </div>
      </div>
      <p className="text-[14px]">Revenue and Sales</p>
      <img src={LineImage} alt="chart" className="mt-3 w-full object-cover" />
    </div>
  );
};

export default LineChart;
