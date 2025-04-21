import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from "react-icons/io";
import { useGetArtWorkList } from "../../ArtistDetail/http/getArtWorkList";
import Loader from "../../ui/Loader";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";
import ArtCard from "./ArtCard";
import { NavLink } from "react-router-dom";

interface ArtworkItem {
  _id: string;
  artworkName: string;
  media: {
    mainImage: string;
  };
  discipline: {
    artworkDiscipline: string;
  };
  size: string;
  owner: {
    artistName: string;
  };
  status?: string;
}

const ArtCardPagination = ({ dark }: { dark: boolean }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordPerPage = 6;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;

  const [originalArtwork, setOriginalArtwork] = useState<ArtworkItem[] | null>(null);
  const [artwork, setArtwork] = useState<ArtworkItem[] | null>(null);
  const [searchData, setSearchData] = useState<string>("");

  const selectedArtwork = "";
  const { data, isFetching } = useGetArtWorkList(selectedArtwork);

  useEffect(() => {
    if (data) {
      setOriginalArtwork(data.data);
      setArtwork(data.data);
    }
  }, [data]);

  const handleSearch = (query: string) => {
    setSearchData(query);
    if (query === "") {
      setArtwork(originalArtwork);
    } else {
      const filteredArtwork = originalArtwork?.filter((item) => item.artworkName.toLowerCase().includes(query.toLowerCase()));
      setArtwork(filteredArtwork || null);
    }
  };

  const nPages = Math.ceil((artwork?.length || 0) / recordPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const { t } = useTranslation();

  if (isFetching) return <Loader />;

  return (
    <div
      className={`my-5 rounded-lg shadow-sm transition-colors duration-200 ${
        dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border`}
    >
      <div
        className={`flex rounded-t-lg p-3 items-center flex-wrap justify-between ${
          dark ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"
        } border-b`}
      >
        <p className={`text-[18px] font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{t("Artworks")}</p>
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${dark ? "text-gray-400" : "text-gray-500"}`}>
            <IoIosSearch className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder={t("Search Artworks...")}
            className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
              dark
                ? "bg-gray-800 border-gray-500 text-white placeholder-gray-400 focus:ring-[#EE1D52] focus:border-[#EE1D52]"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-[#EE1D52] focus:border-[#EE1D52]"
            } focus:outline-none focus:ring-1 sm:text-sm`}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchData}
          />
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artwork && artwork.length > 0 ? (
            artwork.slice(firstIndex, lastIndex).map((record, index) => <ArtCard key={index} record={record} data={data} dark={dark} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <p className={`text-lg font-medium mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>{t("You don't have any artwork yet.")}</p>
              <NavLink to="/artist-panel/artwork/add">
                <button
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    dark ? "bg-[#EE1D52] hover:bg-[#EE1D52]/90 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-white"
                  }`}
                >
                  {t("Add Artwork")}
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className={`p-4 border-t ${dark ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { status: "Published", color: "#00DE00" },
            { status: "Draft", color: "#f0dd32" },
            { status: "Pending", color: "#D8F002" },
            { status: "Modified", color: "#ac329e" },
            { status: "Subscription", color: "#3b82f6" },
            { status: "Not Available", color: "#EE1D52" },
            { status: "Purchased", color: "#696868" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(item.status)}</span>
            </div>
          ))}
        </div>
      </div>

      {artwork && artwork.length > 0 && (
        <div className={`p-4 border-t ${dark ? "border-gray-700" : "border-gray-200"}`}>
          <PaginationTabs currentPage={currentPage} setCurrentPage={setCurrentPage} numbers={numbers} nPages={nPages} dark={dark} />
        </div>
      )}
    </div>
  );
};

export default ArtCardPagination;
