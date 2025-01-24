import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ArtworkViewPopup = ({ isOpen, onClose, onAction, id, status }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewOnly = () => {
    navigate(`/artist-panel/artwork/add?id=${id}&view=true`);
    onAction("view");
    onClose();
  };

  const handleEdit = () => {
    navigate(`/artist-panel/artwork/add?id=${id}`);
    onAction("view");
    onClose();
  };

  const handlePreview = () => {
    navigate(`/artist-panel/artwork/preview?id=${id}&preview=true`);
    onAction("preview");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="z-[999] fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white relative p-6 rounded-lg shadow-lg w-[90%] max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl font-bold mb-4">{t("Choose an Option")}</h2>
        <p className="text-md mb-4">
          {t("Would you like to view the artwork or preview it?")}
        </p>
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          {status === "modified" ? null : (
            <button
              className="px-4 py-2 bg-zinc-800 text-white rounded-md w-full sm:w-auto"
              onClick={handleEdit}
            >
              {t("Edit")}
            </button>
          )}

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto"
            onClick={handleViewOnly}
          >
            {t("View Only")}
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md w-full sm:w-auto"
            onClick={handlePreview}
          >
            {t("Preview Artwork")}
          </button>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};
