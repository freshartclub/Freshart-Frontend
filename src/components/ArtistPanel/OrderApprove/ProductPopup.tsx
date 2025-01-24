import { useTranslation } from "react-i18next";
import { MdCancel } from "react-icons/md";

const ProductPopup = ({ product, imageUrl, setIsPopupOpen, isPopupOpen }) => {
  const { t } = useTranslation();
  return (
    <>
      {isPopupOpen && (
        <div className="fixed inset-0  bg-transparent  flex items-center justify-center z-[99999]">
          <div className="bg-white p-4 rounded shadow-lg w-[50vw]  h-[50vh] overflow-auto">
            <button
              className="text-red-500 font-bold float-right"
              onClick={() => setIsPopupOpen(false)}
            >
              <MdCancel size="1.5em" />
            </button>

            <h2 className="text-lg font-bold mb-4">{t("Evidence Images")}</h2>

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
      )}
    </>
  );
};

export default ProductPopup;
