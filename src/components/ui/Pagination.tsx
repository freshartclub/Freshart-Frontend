import next from "../CircleBlog/assets/next.png";
import previous from "../CircleBlog/assets/previous.png";

export const Pagination = ({ totalPages, currentPage, onChangePage }:any) => {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);
  
    return (
      <div className="flex justify-center mt-6">
        <button
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 rounded text-[#7F56D9] flex"
        >
            <img src={previous} alt="previous" className="mt-1 mr-2" /> 
          Previous
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onChangePage(page)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === page ? 'text-[#7F56D9]' : 'text-[#6941C6]'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 rounded text-[#7F56D9] flex"
        >
              Next
            <img src={next} alt="next" className="mt-1 ml-2" /> 
        </button>
      </div>



  
);
};