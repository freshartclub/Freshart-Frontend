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
    <div className="flex gap-3 py-4 justify-end p-2">
      <div
        className="w-[2.5em] h-[2em] rounded-lg bg-[#F2F2F2] text-black flex items-center justify-center hover:cursor-pointer"
        onClick={preButtonHandler}
      >
        <IoIosArrowBack />
      </div>

      <div className="flex gap-2">
        {numbers.map((num: any, index: any) => (
          <div key={index}>
            <div
              onClick={() => setCurrentPage(num)}
              className={`w-[2.5em] h-[2em] rounded-lg bg-[#F2F2F2] text-black flex items-center justify-center ${
                currentPage === num ? "bg-black text-white" : ""
              } hover:cursor-pointer`}
            >
              <p>{num}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="w-[2.5em] h-[2em] rounded-lg bg-[#F2F2F2] text-black flex items-center justify-center hover:cursor-pointer"
        onClick={nextButtonHandler}
      >
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default PaginationTabs;
