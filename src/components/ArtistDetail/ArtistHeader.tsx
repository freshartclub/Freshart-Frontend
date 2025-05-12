import { imageUrl } from "../utils/baseUrls";

const ArtistHeader = ({ data, dark }) => {
  return (
    <div className="lg:w-[90%] py-6 w-full mx-auto">
      {data?.profile?.mainVideo ? (
        <video src={`${imageUrl}/videos/${data?.profile?.mainVideo}`} className="w-full h-[60vh] rounded-lg shadow-lg" />
      ) : (
        <img src={`${imageUrl}/users/${data?.profile?.mainImage}`} alt="Main Media" className="w-full h-[60vh] object-contain rounded-lg" />
      )}
    </div>
  );
};

export default ArtistHeader;
