import { useEffect, useState } from "react";
import ArtworkHeader from "./ArtworkHeader";
import { useSearchParams } from "react-router-dom";
import { useGetArtWorkList } from "../../../ArtistDetail/http/getArtWorkList";
import Loader from "../../../ui/Loader";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

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

  if (!data) return <Loader />;

  return (
    <div className="container p-4 mx-auto">
      <ArtworkHeader />

      <div className="flex flex-col lg:flex-row mt-10">
        <div className="lg:w-1/2">
          <ProductImage />
        </div>

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
