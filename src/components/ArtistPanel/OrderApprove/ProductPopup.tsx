import { useTranslation } from "react-i18next";
import { MdCancel } from "react-icons/md";

const ProductPopup = ({ product, imageUrl, setIsPopupOpen, isPopupOpen }) => {
  const { t } = useTranslation();
  return (
    <>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded shadow-lg w-[50vw] h-[50vh] overflow-auto">
            <div className="flex p-2 justify-between items-center pb-2 border-b border-gray-300">
              <h2 className="text-lg font-bold">{t("Evidence Images")}</h2>
              <button
                className="text-red-500 font-bold"
                onClick={() => setIsPopupOpen(false)}
              >
                <MdCancel size="1.5em" />
              </button>
            </div>

            <div className="p-2">
              <h2 className="text-md font-medium mb-4">
                {t("Artwork Name")} : {product?.artWork?.artworkName}
              </h2>
              <div className="flex flex-wrap gap-2">
                {product?.evidenceImg?.map((img, i) => (
                  <img
                    key={i}
                    src={`${imageUrl}/users/${img}`}
                    alt={`Evidence ${i + 1}`}
                    className="w-24 h-24 rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPopup;
