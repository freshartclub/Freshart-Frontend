import React, { useEffect, useState } from "react";
import ArtworkHeader from "./ArtworkHeader";
import Header from "../ui/Header";

import ProductTabs from "./ProductTabs";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";
import { useSearchParams } from "react-router-dom";
import { useGetArtWorkList } from "../../../ArtistDetail/http/getArtWorkList";
import Loader from "../../../ui/Loader";

const ArtworkDetails = () => {
  const [artWork, setArtWork] = useState(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetArtWorkList();

  useEffect(() => {
    if (data) {
      const artwork = data?.find((work) => work._id === id);
      setArtWork(artwork);
    }
  }, []);

  if (!data) {
    return <Loader />;
  }
  return (
    <div className="container p-4 mx-auto">
      <ArtworkHeader artwork={artWork} />

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
