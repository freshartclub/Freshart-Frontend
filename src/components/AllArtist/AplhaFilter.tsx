import { useState } from "react";
import P from "../ui/P";
import { useNavigate } from "react-router-dom";

const filterData = [
  {
    data: "A",
  },
  {
    data: "B",
  },
  {
    data: "C",
  },
  {
    data: "D",
  },
  {
    data: "E",
  },
  {
    data: "F",
  },
  {
    data: "G",
  },
  {
    data: "H",
  },
  {
    data: "I",
  },
  {
    data: "J",
  },
  {
    data: "K",
  },
  {
    data: "L",
  },
  {
    data: "M",
  },
  {
    data: "N",
  },
  {
    data: "O",
  },
  {
    data: "P",
  },
  {
    data: "Q",
  },
  {
    data: "R",
  },
  {
    data: "S",
  },
  {
    data: "T",
  },
  {
    data: "U",
  },
  {
    data: "V",
  },
  {
    data: "W",
  },
  {
    data: "X",
  },
  {
    data: "Y",
  },
  {
    data: "Z",
  },
  {
    data: "0-9",
  },
];

const ITEMS_PER_PAGE = 8;

const AplhaFilter = ({ query, data }: any) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredArtists = selectedLetter
    ? data?.artists?.filter((artist) =>
        artist.artistName.toLowerCase().startsWith(selectedLetter.toLowerCase())
      )
    : data?.artists;

  const totalPages = Math.ceil(filteredArtists?.length / ITEMS_PER_PAGE);

  const currentItems = filteredArtists?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const filteredItems = currentItems?.filter((item) =>
    item?.artistName.toLowerCase().includes(query.toLowerCase())
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLetterClick = (letter: string) => {
    const matchingArtists = data?.artists?.filter((artist) =>
      artist?.artistName?.toLowerCase().startsWith(letter.toLowerCase())
    );

    if (matchingArtists?.length === 0) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
    }
    setCurrentPage(1);
  };

  const handleAllClick = () => {
    setSelectedLetter(null);
    setCurrentPage(1);
  };

  const handleArtistDetail = (id) => {
    navigate(`/artist_detail?id=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex gap-5 my-10 flex-wrap">
        <P
          onClick={handleAllClick}
          variant={{ size: "base", theme: "dark", weight: "semiBold" }}
          className="cursor-pointer"
        >
          All
        </P>
        {filterData.map((item, index) => (
          <div key={index}>
            <P
              onClick={() => handleLetterClick(item.data)}
              variant={{ size: "base", theme: "dark", weight: "semiBold" }}
              className="cursor-pointer"
            >
              {item.data}
            </P>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        {filteredItems &&
          filteredItems.length > 0 &&
          filteredItems?.map((item, index) => (
            <div key={index} className=" text-center">
              <div
                className="mt-14 rounded-lg border cursor-pointer border-[#FF536B] flex flex-col items-center"
                onClick={() => handleArtistDetail(item?._id)}
              >
                <img
                  src={`${data.url}/users/${item?.profile?.mainImage}`}
                  alt="profile"
                  className="-mt-10 w-[10vh] h-[10vh] rounded-full object-cover"
                />
                <h1 className="text-xl my-1">{item?.artistName}</h1>
                <p className="text-sm mb-2">
                  {" "}
                  {Array.isArray(item?.aboutArtist?.discipline) &&
                    item?.aboutArtist?.discipline.map((iw, i) => (
                      <span key={i}>
                        {iw.discipline}
                        {i < item?.aboutArtist?.discipline?.length - 1 && "| "}
                      </span>
                    ))}
                </p>
                <img
                  src={`${data.url}/users/${item?.profile?.inProcessImage}`}
                  alt="Artwork"
                  className="p-4 w-full sm:w-[30vw] h-[30vh] object-cover"
                />
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      {filteredArtists?.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center my-5">
          <button
            className="mx-2 px-4 py-2 bg-gray-300 rounded-lg"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Pre
          </button>
          <span className="mx-2 px-4 py-2 bg-gray-200 rounded-lg">
            {currentPage}
          </span>
          <button
            className="mx-2 px-4 py-2 bg-gray-300 rounded-lg"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default AplhaFilter;
