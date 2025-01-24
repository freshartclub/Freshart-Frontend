import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import ArtCard from "./ArtCard";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";
import { IoOptionsOutline } from "react-icons/io5";
import { useGetArtWorkList } from "../../ArtistDetail/http/getArtWorkList";
import Loader from "../../ui/Loader";
import { useTranslation } from "react-i18next";
import { MdOutlineDateRange } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

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
  const [startDate, setStartDate] = useState(new Date());
  const recordPerPage = 8;
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
    <div>
      <div className="flex flex-wrap justify-between mt-5">
        <div className="relative">
          <input
            type="text"
            placeholder={t("Search Artworks...")}
            className="border bottom-2 border-gray-50 bg-white rounded-md py-1 pr-2 pl-8"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchData}
          />
          <IoIosSearch className="absolute left-2 top-2 flex items-center" />
        </div>
        <div className="flex gap-2">
          <button className="py-1 px-2 h-auto rounded-md border-gray-100 bg-white flex gap-1 items-center w-fit outline-none">
            <MdOutlineDateRange />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </button>
          <button className="py-1 px-3 rounded-lg border-2 border-gray-50 bg-white   flex items-center gap-2 transition-all duration-200 hover:scale-95">
            <IoOptionsOutline /> {t("Filters")}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 mt-6">
        {artwork?.slice(firstIndex, lastIndex).map((record, index) => (
          <div key={index}>
            <ArtCard record={record} data={data} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap justify-end pt-2">
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

      <div className="bg-gray-50 mt-3">
        <PaginationTabs
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numbers={numbers}
          nPages={nPages}
        />
      </div>
    </div>
  );
};

export default ArtCardPagination;
