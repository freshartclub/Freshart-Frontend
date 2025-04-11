import SelectOption from "../ui/SelectOption";
import { imageUrl } from "../utils/baseUrls";
import { GoArrowRight } from "react-icons/go";
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
  selectedOption,
  selectedStyle,
  selectedInsignia,
  sort,
  letter,
  handleClear,
}: any) => {
  return (
    <>
      <p className="mt-3 text-[30px] font-semibold">Top Insignias</p>
      <div className="flex mt-4 w-full max-w-full overflow-x-auto scrollbar items-center gap-4">
        {cred && cred.length > 0 ? (
          cred.map((item, i: number) => (
            <div key={i} className="group relative cursor-pointer flex items-center" onClick={() => setSelectedInsignia(item?.credentialName)}>
              <div className="relative overflow-hidden w-[250px] h-[250px]">
                <img
                  src={`${imageUrl}/users/${item?.insigniaImage}`}
                  alt="stack"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
                <div className="absolute inset-0 flex pb-3 px-2 items-end justify-between text-white text-sm text-[17px] bg-black bg-opacity-50">
                  <span>{item?.credentialName}</span>
                  <GoArrowRight size={20} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-[#FF536B] rounded-full px-4 py-1 text-[#FF536B] cursor-pointer">No Data Found</div>
        )}
      </div>

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
            value={selectedOption ? { value: selectedOption, label: selectedOption } : null}
            options={
              discipline && discipline.length > 0
                ? discipline.map((item) => ({
                    value: item?.disciplineName,
                    label: item?.disciplineName,
                  }))
                : []
            }
            onChange={(e) => setSelectedOption(e?.value)}
            placeholder="Discipline"
          />

          <SelectOption
            value={selectedStyle ? { value: selectedStyle, label: selectedStyle } : null}
            options={styleData && styleData.length > 0 ? styleData.map((item) => ({ value: item, label: item })) : []}
            onChange={(e) => setSelectedStyle(e?.value)}
            placeholder="Style"
          />

          <SelectOption
            value={selectedInsignia ? { value: selectedInsignia, label: selectedInsignia } : null}
            options={
              cred && cred.length > 0
                ? cred.map((item) => ({
                    value: item?.credentialName,
                    label: item?.credentialName,
                  }))
                : []
            }
            onChange={(e) => setSelectedInsignia(e?.value)}
            placeholder="Insignia"
          />

          <SelectOption
            value={sort ? { value: sort, label: sort } : null}
            options={["A-Z", "Z-A", "Creation Date"].map((item) => ({
              value: item,
              label: item,
            }))}
            onChange={(e) => setSort(e?.value)}
            placeholder="Sort"
          />

          {!letter && !selectedOption && !selectedStyle && !selectedInsignia ? null : (
            <span className="uppercase text-[14px] cursor-pointer bg-[#102031] text-white rounded-full p-2" onClick={handleClear}>
              Clear Filter
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSection;
