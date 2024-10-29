import React from "react";
import ArtworkHeader from "./ArtworkHeader";
import Header from "../ui/Header";

import ProductTabs from "./ProductTabs";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";

const ArtworkDetails = () => {
  return (
    <div className="container p-4 mx-auto">
      <ArtworkHeader />

      <div className="flex flex-col lg:flex-row mt-10">
        {/* Left Side: Image and thumbnails */}
        <div className="lg:w-1/2">
          <ProductImage />
        </div>

        {/* Right Side: Product Info */}
        <div className="lg:w-1/2">
          <ProductInfo />
        </div>
      </div>

      <div className="mt-8">
        <ProductTabs />
      </div>
    </div>
  );
};

export default ArtworkDetails;
