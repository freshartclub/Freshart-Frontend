import SearchSection from "./SearchSection";
import CategorySection from "./CategorySection";
import { useState } from "react";

const LeftSection = () => {
  const [searchVal, setSearchVal] = useState("");
  return (
    <>
      <div className="md:w-[30%] w-full">
        <SearchSection
          className="lg:mb-0 mb-4"
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          onSearch={() => {
            return {};
          }}
        />
        <CategorySection />
      </div>
    </>
  );
};

export default LeftSection;
