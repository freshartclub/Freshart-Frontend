import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationTabs = ({
  currentPage,
  setCurrentPage,
  nPages,
  dark,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  nPages: number;
  dark: boolean;
}) => {
  const { t } = useTranslation();

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < nPages) setCurrentPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    if (nPages <= 5) return Array.from({ length: nPages }, (_, i) => i + 1);

    if (currentPage <= 3) {
      return [1, 2, 3, "...", nPages];
    } else if (currentPage >= nPages - 2) {
      return [1, "...", nPages - 2, nPages - 1, nPages];
    } else {
      return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", nPages];
    }
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
          dark
            ? currentPage === 1
              ? "text-gray-600 bg-gray-700 cursor-not-allowed"
              : "text-gray-300 hover:bg-gray-700"
            : currentPage === 1
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <FiChevronLeft />
        {t("Previous")}
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => (typeof page === "number" ? setCurrentPage(page) : null)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              dark
                ? typeof page === "number"
                  ? page === currentPage
                    ? "bg-[#EE1D52] text-white"
                    : "text-gray-300 hover:bg-gray-700"
                  : "text-gray-500 cursor-default"
                : typeof page === "number"
                ? page === currentPage
                  ? "bg-[#EE1D52] text-white"
                  : "text-gray-700 hover:bg-gray-100"
                : "text-gray-500 cursor-default"
            }`}
            disabled={typeof page !== "number"}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={nextPage}
        disabled={currentPage === nPages}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
          dark
            ? currentPage === nPages
              ? "text-gray-600 bg-gray-700 cursor-not-allowed"
              : "text-gray-300 hover:bg-gray-700"
            : currentPage === nPages
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {t("Next")}
        <FiChevronRight />
      </button>
    </div>
  );
};

export default PaginationTabs;
