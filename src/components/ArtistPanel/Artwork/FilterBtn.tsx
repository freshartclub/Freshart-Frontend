import { IoOptionsOutline } from "react-icons/io5";
const FilterBtn = () => {
  return (
    <button className="py-1 px-3 rounded-lg border-2 border-gray-50 bg-white   flex items-center gap-2 transition-all duration-200 hover:scale-95">
      <IoOptionsOutline /> Filters
    </button>
  );
};

export default FilterBtn;
