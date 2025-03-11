import SelectOption from "../ui/SelectOption";
import search_icon from "./assets/search.png";

const FilterSection = ({
  setSort,
  discipline,
  setSelectedOption,
  setSelectedStyle,
  setSelectedInsignia,
  cred,
  styleData,
  query,
  setQuery,
  handleClear,
}: any) => {
  return (
    <div className="flex justify-between lg:flex-row flex-col xl:gap-10 gap-3 my-10 w-full">
      <div className="flex lg:w-[30%] items-center">
        <input
          type="text"
          className="w-full placeholder-gray-400 text-gray-900 p-3 outline-none  border border-[#FF536B] rounded-full"
          placeholder="Search Artist By Name & Tags"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <img src={search_icon} alt="search icon" className="-ml-8" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SelectOption
          options={
            discipline && discipline.length > 0 ? (
              discipline.map((item) => ({
                value: item?.disciplineName,
                label: item?.disciplineName,
              }))
            ) : (
              <span>No Discipline Found</span>
            )
          }
          onChange={(e) => setSelectedOption(e.value)}
          placeholder="Discipline"
        />

        <SelectOption
          options={
            styleData && styleData.length > 0 ? (
              styleData.map((item) => ({ value: item, label: item }))
            ) : (
              <span>No Style Found</span>
            )
          }
          onChange={(e) => setSelectedStyle(e.value)}
          placeholder="Style"
        />

        <SelectOption
          options={
            cred && cred.length > 0 ? (
              cred.map((item) => ({
                value: item?.credentialName,
                label: item?.credentialName,
              }))
            ) : (
              <span>No Insignia Found</span>
            )
          }
          onChange={(e) => {
            setSelectedInsignia(e.value);
          }}
          placeholder="Insignia"
        />
        <SelectOption
          options={["A-Z", "Z-A", "Creation Date"].map((item) => ({
            value: item,
            label: item,
          }))}
          onChange={(e) => setSort(e.value)}
          placeholder="Sort"
        />
        <span
          className="uppercase text-[14px] cursor-pointer bg-[#102031] text-white rounded p-2"
          onClick={handleClear}
        >
          Clear Filter
        </span>
      </div>
    </div>
  );
};

export default FilterSection;
