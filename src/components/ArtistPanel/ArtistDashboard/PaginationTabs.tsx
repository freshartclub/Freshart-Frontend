import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PaginationTabs = ({
  currentPage,
  setCurrentPage,
  nPages,
  numbers,
}: any) => {
  const preButtonHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextButtonHandler = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex gap-3 pb-4 pt-2 justify-end px-2">
      <div
        className="w-[2em] h-[2em] rounded-full border bg-[#F2F2F2] text-black flex items-center justify-center hover:cursor-pointer"
        onClick={preButtonHandler}
      >
        <IoIosArrowBack />
      </div>

      <div className="flex gap-2">
        {numbers.map((num: any, index: any) => (
          <div key={index}>
            <div
              onClick={() => setCurrentPage(num)}
              className={`w-[2em] h-[2em] rounded-full bg-[#F2F2F2] text-black flex items-center justify-center ${
                currentPage === num ? "bg-black text-white" : ""
              } hover:cursor-pointer`}
            >
              <p>{num}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="w-[2em] h-[2em] rounded-full border bg-[#F2F2F2] text-black flex items-center justify-center hover:cursor-pointer"
        onClick={nextButtonHandler}
      >
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default PaginationTabs;
