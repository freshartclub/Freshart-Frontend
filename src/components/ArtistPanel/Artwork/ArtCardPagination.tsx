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
}

const ArtCardPagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordPerPage = 6;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;

  const [originalArtwork, setOriginalArtwork] = useState<ArtworkItem[] | null>(
    null
  );
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
      const filteredArtwork = originalArtwork?.filter((item) =>
        item.artworkName.toLowerCase().includes(query.toLowerCase())
      );
      setArtwork(filteredArtwork || null);
    }
  };

  const nPages = Math.ceil((artwork?.length || 0) / recordPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const { t } = useTranslation();

  if (isFetching) return <Loader />;

  return (
    <div className="mt-5 border bg-white rounded shadow-sm">
      <div className="flex rounded-t bg-gray-200 p-2 px-3 border-b border-gray-300 items-center flex-wrap justify-between">
        <p className="text-black text-[18px] font-semibold text-center sm:text-left">
          {t("Artworks")}
        </p>
        <div className="relative border rounded">
          <input
            type="text"
            placeholder={t("Search Artworks...")}
            className="border border-gray-50 bg-white rounded-md py-1 pr-2 pl-8"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchData}
          />
          <IoIosSearch className="absolute left-2 top-2 flex items-center" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mt-6">
        {artwork && artwork.length > 0 ? (
          artwork?.slice(firstIndex, lastIndex).map((record, index: number) => (
            <div key={index}>
              <ArtCard record={record} data={data} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-lg text-center font-medium mb-4">
              {t("You don't have any artwork yet.")}
            </p>
            <NavLink to="/artist-panel/artwork/add">
              <button className="px-6 py-2 bg-zinc-800 text-white rounded-lg">
                {t("Add Artwork")}
              </button>
            </NavLink>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap justify-center mt-4">
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#00DE00] flex items-center"></div>
          <p className="text-[14px] text-black">{t("Published")}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#f0dd32] flex items-center"></div>
          <p className="text-[14px] text-black">{t("Draft")}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#D8F002] flex items-center"></div>
          <p className="text-[14px] text-black">{t("Pending")}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#ac329e] flex items-center"></div>
          <p className="text-[14px] text-black">{t("Modified")}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-blue-600 flex items-center"></div>
          <p className="text-[14px] text-black">{t("Subscription")}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full   bg-[#EE1D52]   flex items-center"></div>
          <p className="text-[14px] text-black">{t("Not Available")}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#696868] flex items-center"></div>
          <p className="text-[14px] text-black">{t("Purchased")}</p>
        </div>
      </div>

      {artwork && artwork.length > 0 && (
        <PaginationTabs
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numbers={numbers}
          nPages={nPages}
        />
      )}
    </div>
  );
};

export default ArtCardPagination;
