import { useTranslation } from "react-i18next";
import { MdCancel } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const ProductPopup = ({ product, imageUrl, setIsPopupOpen, isPopupOpen }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
          >
            <div className="flex p-4 justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t("Evidence Images")}</h2>
              <button className="text-red-500 hover:text-red-700 transition-colors" onClick={() => setIsPopupOpen(false)}>
                <MdCancel size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <h2 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
                {t("Artwork Name")}: <span className="font-semibold text-gray-900 dark:text-white">{product?.artwork?.artworkName}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {product?.other?.evidenceImg?.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative group"
                  >
                    <img
                      src={`${imageUrl}/users/${img}`}
                      alt={`Evidence ${i + 1}`}
                      className="w-full h-32 rounded-md object-cover shadow-sm group-hover:shadow-md transition-shadow"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                      <a
                        href={`${imageUrl}/users/${img}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        View Full
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductPopup;
