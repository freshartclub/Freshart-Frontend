import Header from "../ui/Header";
import search_icon from "./assets/search.png";
import { useState } from "react";
import SelectOption from "../ui/SelectOption";

const FilterSection = ({ query, search }: any) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const credentialOption = [
    { value: "color1", label: "Color1" },
    { value: "color2", label: "Color2" },
    { value: "color3", label: "Color3" },
  ];

  return (
    <div className="flex lg:flex-row flex-col xl:gap-10 gap-3 my-10 w-full">
      <div className="flex items-center xl:gap-10 gap-2 2xl:w-[50%] lg:w-[40%]">
        <Header
          variant={{ theme: "dark", weight: "bold" }}
          className="xl:text-3xl sm:text-xl text-md"
        >
          All Artists
        </Header>
        <div className="xl:w-[50%] w-[60%] flex items-center">
          <input
            type="text"
            className="w-full placeholder-gray-400 text-gray-900 p-3 outline-none  border border-[#FF536B] rounded-full"
            placeholder="Search"
            onChange={search}
            value={query}
          />
          <img src={search_icon} alt="search icon" className="-ml-8" />
        </div>
      </div>

      <div className="relative flex items-center">
        {isSearchOpen && (
          <input
            type="text"
            placeholder="Search..."
            className="ml-3 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        )}

        <img
          src={search_icon}
          alt="Search"
          className="cursor-pointer w-6 h-6 -ml-[35px]"
          onClick={handleSearchClick}
        />
      </div>

      <div className="2xl:w-[50%] lg:w-[60%] flex sm:flex-row flex-col sm:gap-0 gap-4 items-center justify-between">
        <SelectOption
          options={credentialOption}
          onChange={(option) => {}}
          placeholder="Filer by Credentials & Insignias"
        />

        <SelectOption
          options={credentialOption}
          onChange={(option) => {}}
          placeholder="Filter By Category"
        />

        <SelectOption
          options={credentialOption}
          onChange={(option) => {}}
          placeholder="Filter By style"
        />
      </div>
    </div>
  );
};

export default FilterSection;
