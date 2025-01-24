import { useTranslation } from "react-i18next";
import arrow from "../artworkDetails/assets/arrow.png";
import button_arrow from "../artworkDetails/assets/button_arrow.png";
import edit from "../artworkDetails/assets/edit.png";
import send from "../artworkDetails/assets/send.png";

const ArtworkHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between w-full items-center py-4 px-4 sm:px-6 md:px-8">
      <div className="flex items-center gap-2">
        <img src={arrow} alt="Back Arrow" className="w-2 h-3" />
        <button className="text-[#1C252Ecd] text-base sm:text-md font-bold">
          {t("Back")}
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button>
          <img src={send} alt="Send Icon" className="w-5 h-8" />
        </button>
        <button>
          <img src={edit} alt="Edit Icon" className="w-5 h-8" />
        </button>

        <div className="flex items-center bg-[#1C252E] rounded-lg px-3 py-1 sm:px-4 sm:py-2">
          <button className="text-white font-medium text-sm sm:text-md mr-2">
            {t("Published")}
          </button>
          <img src={button_arrow} alt="Arrow" className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

export default ArtworkHeader;
