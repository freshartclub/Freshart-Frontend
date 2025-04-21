import { PiDotsThreeVerticalBold } from "react-icons/pi";
import ProgressBar from "./ProgressBar";
import { IoArrowUp } from "react-icons/io5";
import { IoArrowDownSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Progress = ({ dark }: { dark: boolean }) => {
  const { t } = useTranslation();
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
    <div className="p-4 border shadow rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-[18px] font-semibold text-black">{t("Sales Progress")}</p>
        <PiDotsThreeVerticalBold className="text-[16px] cursor-pointer" />
      </div>
      <p className="text-[14px] text-gray-500">{t("This Quarter")}</p>

      <div>
        {progress.map((value, index) => (
          <div key={index} className="flex flex-col justify-center items-center mt-4">
            <ProgressBar progress={value.percentage} className="mx-auto" />

            <div className="mt-4 w-full">
              <p className="text-center">
                {t("You earned")} <span className="font-semibold">{value.todaysale}</span> {t("today")},{t("which is higher than yesterday.")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">{t("Target")}</p>
                  <div className="flex justify-center items-center gap-1">
                    <p className="font-bold text-xl">{value.target}</p>
                    <IoArrowDownSharp className="text-red-500" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{t("Revenue")}</p>
                  <div className="flex justify-center items-center gap-1">
                    <p className="font-bold text-xl">{value.revenue}</p>
                    <IoArrowUp className="text-green-700" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{t("Today")}</p>
                  <div className="flex justify-center items-center gap-1">
                    <p className="font-bold text-xl">{value.today}</p>
                    <IoArrowUp className="text-green-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
