import { useSearchParams } from "react-router-dom";
import ArtistDescription from "./ArtistDescription";
import ArtistHeader from "./ArtistHeader";
import Artwork from "./Artwork";
import ArtworkSeries from "./ArtworkSeries";
import { useGetArtistDetails } from "./http/useGetArtistDetails";
import ArtistProtfolioArtwork from "./ArtistProtfolioArtwork";
import Loader from "../ui/Loader";

const ArtistDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetArtistDetails(id);
  console.log("this is from dsd", data?.artist);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto md:px-6 px-3">
      <div className="flex lg:flex-row flex-col xl:gap-10 gap-6 mb-10">
        <div className="bg-gray-100 lg:w-[48%] w-full mx-auto h-fit">
          <ArtistHeader data={data} />
        </div>
        <div className="lg:w-[48%] w-full">
          <ArtistDescription data={data} />
        </div>
      </div>
      <ArtistProtfolioArtwork data={data} />
      <ArtworkSeries />
    </div>
  );
};

export default ArtistDetail;
