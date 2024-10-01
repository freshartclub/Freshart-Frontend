import search from "../assets/search (2).png";
import Header from "../../ui/Header";
import cn from "../../utils/cn";

interface SearchProps {
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (val: string) => {};
  className?: React.HTMLProps<HTMLElement>["className"];
}

const SearchSection = ({
  searchVal,
  setSearchVal,
  onSearch,
  className,
}: SearchProps) => {
  return (
    <div className="mt-8">
      <div className="border rounded-sm px-4 py-6">
        <Header
          variant={{ size: "md", theme: "dark", weight: "bold" }}
          className="mb-5"
        >
          Search
        </Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(searchVal);
          }}
          className={cn(
            `flex items-center justify-between ${className} relative `
          )}
        >
          <input
            placeholder="Search..."
            value={searchVal}
            className="flex-1 border outline-none focus:border-secondary pr-8 py-2 rounded-sm pl-2 w-full"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button type="submit" className="absolute right-1">
            {/* <IconSelector iconType="Search" size={20} /> */}
            <img src={search} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;
