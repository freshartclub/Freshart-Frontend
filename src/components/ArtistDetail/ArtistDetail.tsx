import { useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import ArtistDescription from "./ArtistDescription";
import ArtistHeader from "./ArtistHeader";
import ArtistProtfolioArtwork from "./ArtistProtfolioArtwork";
import ArtworkSeries from "./ArtworkSeries";
import { useGetArtistDetails } from "./http/useGetArtistDetails";

const ArtistDetail = () => {
  const id = useParams().id as string;
  const { data, isLoading } = useGetArtistDetails(id);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto md:px-6 px-3">
      <div className="flex lg:flex-row flex-col 2xl:gap-10 gap-6 mb-10">
        <div className="bg-gray-100 lg:w-[50%] w-full mx-auto h-fit">
          <ArtistHeader data={data?.artist} />
        </div>
        <div className="lg:w-[50%] w-full">
          <ArtistDescription data={data} />
        </div>
      </div>
      <ArtistProtfolioArtwork data={data} />
      <ArtworkSeries />
    </div>
  );
};

export default ArtistDetail;
