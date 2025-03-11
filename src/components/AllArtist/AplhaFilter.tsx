import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";

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
];

const AplhaFilter = ({
  setLetter,
  setCurrPage,
  currPage,
  data,
  totalPages,
}: any) => {
  const navigate = useNavigate();

  const handleArtistDetail = (id: string) => {
    navigate(`/artist_detail/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mapData = (val: string[]) => {
    if (!val || val.length === 0) return "";
    return val.join(" | ");
  };

  return (
    <>
      <div className="flex gap-5 my-10 flex-wrap">
        <P
          onClick={() => setLetter("")}
          variant={{ size: "base", theme: "dark", weight: "semiBold" }}
          className="cursor-pointer"
        >
          All
        </P>
        {filterData.map((item, index) => (
          <div key={index}>
            <P
              onClick={() => setLetter(item.data)}
              variant={{ size: "base", theme: "dark", weight: "semiBold" }}
              className="cursor-pointer"
            >
              {item.data}
            </P>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        {data && data.length > 0 ? (
          data?.map((item, index: number) => (
            <div key={index} className=" text-center">
              <div
                className="mt-14 rounded-lg border cursor-pointer border-[#FF536B] flex flex-col items-center"
                onClick={() => handleArtistDetail(item?._id)}
              >
                <img
                  src={`${imageUrl}/users/${item?.profile?.mainImage}`}
                  alt="profile"
                  className="-mt-10 w-[10vh] h-[10vh] rounded-full object-cover"
                />
                <h1 className="text-xl my-1">{item?.artistName}</h1>
                <p className="text-sm mb-2">
                  {item?.aboutArtist?.discipline &&
                    mapData(
                      item?.aboutArtist?.discipline?.map(
                        (item) => item?.discipline
                      )
                    )}
                </p>
                <img
                  src={`${imageUrl}/users/${
                    item?.profile?.inProcessImage || item?.profile?.mainImage
                  }`}
                  alt="Artwork"
                  className="p-2 w-full sm:w-[30vw] h-[30vh] object-cover"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 col-span-4 text-center w-full h-[20vh] flex items-center justify-center rounded border border-zinc-300 p-2">
            No Artist Found for this Filter
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mb-8 mt-0 gap-2">
        <button
          onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
          disabled={currPage === 1}
          className={`p-2 border rounded-full mr-3 ${
            currPage === 1
              ? "border border-zinc-300 opacity-50 cursor-not-allowed"
              : "bg-[#102031] text-white"
          }`}
        >
          <IoChevronBackOutline />
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isFirst = pageNumber === 1;
          const isLast = pageNumber === totalPages;
          const isNearCurrent =
            Math.abs(currPage - pageNumber) <= 2 || isFirst || isLast;

          if (isNearCurrent) {
            return (
              <button
                key={index}
                onClick={() => setCurrPage(pageNumber)}
                className={`p-1 px-3 border rounded-full ${
                  currPage === pageNumber
                    ? "bg-[#ff725e] text-white"
                    : "bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            (pageNumber === currPage - 3 && currPage > 4) ||
            (pageNumber === currPage + 3 && currPage < totalPages - 3)
          ) {
            return <span key={index}>...</span>;
          }
          return null;
        })}

        <button
          onClick={() => setCurrPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currPage === totalPages}
          className={`p-2 border rounded-full ml-3 ${
            currPage === totalPages || totalPages === 0
              ? "border border-zinc-300 opacity-50 cursor-not-allowed"
              : "bg-[#102031] text-white"
          }`}
        >
          <IoChevronForwardOutline />
        </button>
      </div>
    </>
  );
};

export default AplhaFilter;
