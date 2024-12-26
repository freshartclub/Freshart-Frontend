import { useNavigate } from "react-router-dom";

export const ArtworkViewPopup = ({ isOpen, onClose, onAction, id, status }) => {
  if (!isOpen) return null;

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

  return (
    <div className="z-[999] fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white relative p-6 rounded-lg shadow-lg w-[90%] max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl font-bold mb-4">Choose an Option</h2>
        <p className="text-md mb-4">
          Would you like to view the artwork or preview it?
        </p>
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          {status === "modified" ? null : (
            <button
              className="px-4 py-2 bg-zinc-800 text-white rounded-md w-full sm:w-auto"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto"
            onClick={handleViewOnly}
          >
            View Only
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md w-full sm:w-auto"
            onClick={handlePreview}
          >
            Preview Artwork
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
