import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { cardData } from "../Data/ArtworkData";
import ArtCard from "./ArtCard";
import PaginationTabs from "../ArtistDashboard/PaginationTabs";
import SelectDateBtn from "../ArtistDashboard/SelectDateBtn";
import FilterBtn from "../Artwork/FilterBtn";
import { useGetArtWorkList } from "../../ArtistDetail/http/getArtWorkList";
import Loader from "../../ui/Loader";
const ArtCardPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 8;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = cardData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(cardData.length / recordPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const { data, isLoading } = useGetArtWorkList();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="flex flex-wrap justify-between mt-5">
        <div className="relative">
          <input
            type="text "
            placeholder="search Artworks..."
            className="border bottom-2 border-gray-50 bg-white rounded-md py-1 pr-2 pl-8"
          ></input>
          <IoIosSearch className="absolute left-2 top-2  flex items-center" />
        </div>
        <div className="flex gap-2">
          <SelectDateBtn />
          <FilterBtn />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5 mt-4">
        {data.map((record, index) => (
          // <div key={record.index}>
          <div key={index}>
            <ArtCard record={record} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap justify-end">
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#00DE00] flex items-center"></div>
          <p className="text-[14px] text-black">Published</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#EE1D52] flex items-center"></div>
          <p className="text-[14px] text-black">Not Available</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#FFA600] flex items-center"></div>
          <p className="text-[14px] text-black">In subscription</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#696868] flex items-center"></div>
          <p className="text-[14px] text-black">Purchased</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[.8em] h-[.8em] rounded-full bg-[#D8F002] flex items-center"></div>
          <p className="text-[14px] text-black">Darft</p>
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
