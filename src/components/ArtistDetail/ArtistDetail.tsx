import { useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import ArtistDescription from "./ArtistDescription";
import ArtistHeader from "./ArtistHeader";
import ArtistProtfolioArtwork from "./ArtistProtfolioArtwork";
import ArtworkSeries from "./ArtworkSeries";
import { useGetArtistDetails } from "./http/useGetArtistDetails";
import { useAppSelector } from "../../store/typedReduxHooks";

const ArtistDetail = () => {
  const id = useParams().id as string;
  const userId = useAppSelector((state)=> state.user.user?._id)

  const values  = {
    id,
    userId
  }

  console.log(userId)

  const { data, isLoading } = useGetArtistDetails(values);
  const dark = useAppSelector((state) => state.theme.mode);

  if (isLoading) return <Loader />;

  return (
    <div className={`px-4 py-6 transition-colors duration-300 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <div className={`lg:w-1/2 w-full rounded-xl ${dark ? "bg-gray-800" : "bg-white"} shadow-md p-4`}>
          <ArtistHeader data={data?.artist} dark={dark} />
        </div>
        <div className="lg:w-1/2 w-full">
          <ArtistDescription data={data} dark={dark} />
        </div>
      </div>

      <ArtistProtfolioArtwork data={data} dark={dark} />

      <ArtworkSeries dark={dark} />
    </div>
  );
};

export default ArtistDetail;
