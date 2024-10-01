import { useState } from "react";
import Header from "../ui/Header";
import P from "../ui/P";
import ExploreFilterSection from "./ExploreFilterSection";
import ExploreImages from "./ExploreImages";

const ExplorePage = () => {
  const [columnsCount, setColumnsCount] = useState(7);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="container mx-auto px-6 sm:px-3 py-14">
      <div>
        <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
          Browse Paintings for Sale: Originals and Prints with Visual Search
        </Header>
        <P variant={{ size: "base", theme: "dark", weight: "medium" }}>
          Select an artwork you like and see its most similar matches
        </P>
      </div>

      <ExploreFilterSection
        setColumnsCount={setColumnsCount}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <ExploreImages columnsCount={columnsCount} selectedSize={selectedSize} />
    </div>
  );
};

export default ExplorePage;
