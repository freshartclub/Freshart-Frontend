import ArtistDescription from "./ArtistDescription";
import ArtistHeader from "./ArtistHeader";
import Artwork from "./Artwork";
import ArtworkSeries from "./ArtworkSeries";

const ArtistDetail = () => {
  return (
    <div className="container mx-auto md:px-6 px-3">
      <div className="flex lg:flex-row flex-col xl:gap-10 gap-6 mb-10">
        <div className="bg-gray-100 lg:w-[48%] w-full mx-auto h-fit">
          <ArtistHeader />
        </div>
        <div className="lg:w-[48%] w-full">
          <ArtistDescription />
        </div>
      </div>
      <Artwork />
      <ArtworkSeries />
    </div>
  );
};

export default ArtistDetail;
