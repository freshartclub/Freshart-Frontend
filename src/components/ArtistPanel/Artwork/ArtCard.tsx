import { useTranslation } from "react-i18next";
import { MdModeEditOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { imageUrl } from "../../utils/baseUrls";
import deleteimg from "../assets/Container (2).png";

const ArtCard = ({ record, dark }: { record: any; dark: boolean }) => {
  const { t } = useTranslation();

  const statusColors: Record<string, string> = {
    published: "#00DE00",
    pending: "#D8F002",
    draft: "#f0dd32",
    modified: "#ac329e",
    notAvailable: "#EE1D52",
    default: "#D8F002",
  };

  const getStatusColor = () => statusColors[record?.status] || statusColors.default;

  return (
    <div
      className={`relative group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg w-full max-w-[300px] mx-auto ${
        dark ? "bg-gray-700" : "bg-white"
      }`}
      style={{
        border: `2px solid ${getStatusColor()}`,
        boxShadow: dark ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className={`h-48 w-full ${dark ? "bg-gray-800" : "bg-gray-100"} flex items-center justify-center overflow-hidden relative`}>
        <img
          className="object-contain w-full h-full p-2"
          src={`${imageUrl}/users/${record?.media}`}
          alt={record?.artworkName || "Artwork"}
          // onError={(e) => {
          //   (e.target as HTMLImageElement).src = "/path-to-fallback-image.jpg";
          // }}
        />

        {record?.status === "draft" && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
              <NavLink
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  dark ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-100"
                }`}
                to={`/artist-panel/artwork/add?id=${record._id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <MdModeEditOutline className={dark ? "text-white" : "text-gray-800"} size={18} />
              </NavLink>
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  dark ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-100"
                }`}
              >
                <img src={deleteimg} alt="delete" className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`p-3 ${dark ? "bg-gray-700" : "bg-white"}`}>
        <div className="flex justify-center mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getStatusColor() }} />
        </div>

        <div className="text-center">
          <p className={`text-xs font-light italic mb-1 ${dark ? "text-gray-300" : "text-gray-500"}`}>
            {t(record?.discipline?.artworkDiscipline || "")} | {t(record?.artworkTechnic || "")}
          </p>
          <h3 className={`font-medium text-center truncate ${dark ? "text-white" : "text-gray-900"}`}>
            {record?.artworkName?.length > 20 ? `${record.artworkName.slice(0, 20)}...` : record?.artworkName}
          </h3>
        </div>

        {record?.size && <p className={`text-xs text-center mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>{record.size}</p>}
      </div>
    </div>
  );
};

export default ArtCard;
