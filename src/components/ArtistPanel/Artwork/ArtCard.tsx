import { useTranslation } from "react-i18next";
import { MdModeEditOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { imageUrl } from "../../utils/baseUrls";
import deleteimg from "../assets/Container (2).png";

const ArtCard = ({ record }: any) => {
  const { t } = useTranslation();
  return (
    <div
      className={`relative group border rounded-md overflow-hidden transition-all sm:w-[300px] w-[250px] duration-300 hover:shadow-lg ${
        record?.status === "published"
          ? "border-[#00DE00]"
          : record?.status === "pending"
          ? "border-[#D8F002]"
          : record?.status === "draft"
          ? "border-[#696868]"
          : record?.status === "modified"
          ? "border-[#ac329e]"
          : record?.status === "notAvailable"
          ? "border-[#EE1D52]"
          : "border-gray-200"
      }`}
    >
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          className="object-contain w-full h-full p-2"
          src={`${imageUrl}/users/${record?.media}`}
          alt="Media"
        />
        {record?.status === "draft" ? (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <NavLink
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-gray-100 transition-colors"
                to={`/artist-panel/artwork/add?id=${record._id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <MdModeEditOutline className="text-gray-800" size={18} />
              </NavLink>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <img src={deleteimg} alt="delete" className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col items-center text-center py-2">
        <div
          className={`w-[.8em] h-[.8em] rounded-lg ${
            record?.status === "published"
              ? "bg-[#00DE00]"
              : record?.status === "pending"
              ? "bg-[#D8F002]"
              : record?.status === "draft"
              ? "bg-[#f0dd32]"
              : record?.status === "modified"
              ? "bg-[#ac329e]"
              : record?.status === "notAvailable"
              ? "bg-[#e53a3a]"
              : "bg-[#D8F002]"
          }`}
        ></div>

        <div className="p-3">
          <p className="text-xs text-gray-500 text-center font-light italic mb-1">
            {t(record?.discipline?.artworkDiscipline)} |{" "}
            {t(record?.artworkTechnic)}
          </p>
          <h3 className="font-medium text-gray-900 text-center truncate">
            {record?.artworkName.length > 17
              ? record?.artworkName.slice(0, 17) + "..."
              : record?.artworkName}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
