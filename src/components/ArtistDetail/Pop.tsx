import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

export const ArtworkViewPopup = ({ isOpen, onClose, id, status, dark }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewOnly = () => {
    navigate(`/artist-panel/artwork/add?id=${id}&view=true`);
    onClose();
  };

  const handleEdit = () => {
    navigate(`/artist-panel/artwork/add?id=${id}`);
    onClose();
  };

  const handlePreview = () => {
    navigate(`/artist-panel/artwork/preview/${id}?preview=true`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
      <div className={`relative rounded-lg shadow-xl w-[90%] max-w-md p-6 ${dark ? "bg-gray-800" : "bg-white"}`}>
        <button
          className={`absolute top-4 right-4 p-1 rounded-full ${dark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
          onClick={onClose}
        >
          <FiX size={20} />
        </button>

        <h2 className={`text-xl font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>{t("Choose an Option")}</h2>
        <p className={`text-md mb-6 ${dark ? "text-gray-300" : "text-gray-600"}`}>{t("Would you like to view the artwork or preview it?")}</p>

        <div className="flex flex-col gap-3">
          {status === "modified" ? null : (
            <button
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                dark ? "bg-[#EE1D52] hover:bg-[#EE1D52]/90 text-white" : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
              onClick={handleEdit}
            >
              {t("Edit")}
            </button>
          )}

          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              dark ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={handleViewOnly}
          >
            {t("View Only")}
          </button>

          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              dark ? "bg-green-600 hover:bg-green-500 text-white" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={handlePreview}
          >
            {t("Preview Artwork")}
          </button>
        </div>
      </div>
    </div>
  );
};
