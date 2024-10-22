import { PiDotsThreeVerticalBold } from "react-icons/pi";
import ProgressBar from "./ProgressBar";
import { IoArrowUp } from "react-icons/io5";
import { IoArrowDownSharp } from "react-icons/io5";
const Progress = () => {
  const progress = [
    {
      percentage: "75.5",
      todaysale: "$240",
      target: "20k",
      revenue: "16k",
      today: "1.5k",
    },
  ];
  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-[18px] font-semibold text-black">Sales Progress</p>
          <PiDotsThreeVerticalBold className="text-[16px]" />
        </div>
        <p className="text-[14px]">This Quarter</p>

        <div>
          {progress.map((value, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <ProgressBar progress={value.percentage} className="mx-auto" />
              <div>
                <p>
                  You succeed earn <span>{value.todaysale}</span> today, its
                  higher than yesterday
                </p>
                <div className="flex justify-around gap-2 pt-2">
                  <div>
                    <p>Target</p>
                    <div className="flex gap-1 items-center">
                      <p className="font-bold text-black text-[20px]">
                        {value.target}
                      </p>
                      <IoArrowDownSharp className="text-red-500" />
                    </div>
                  </div>
                  <div>
                    <p>Revenue</p>
                    <div className="flex gap-1 items-center">
                      <p className="font-bold text-black text-[20px]">
                        {value.revenue}
                      </p>
                      <IoArrowUp className="text-green-700" />
                    </div>
                  </div>
                  <div>
                    <p>Today</p>
                    <div className="flex gap-1 items-center">
                      <p className="font-bold text-black text-[20px]">
                        {value.today}
                      </p>
                      <IoArrowUp className="text-green-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
