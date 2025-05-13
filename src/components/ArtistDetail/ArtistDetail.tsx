import { useNavigate, useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import ArtistDescription from "./ArtistDescription";
import ArtistHeader from "./ArtistHeader";
import ArtistProtfolioArtwork from "./ArtistProtfolioArtwork";
import ArtworkSeries from "./ArtworkSeries";
import { useGetArtistDetails } from "./http/useGetArtistDetails";
import { useAppSelector } from "../../store/typedReduxHooks";

const ArtistDetail = () => {
  const id = useParams().id as string;
  const userId = useAppSelector((state) => state.user.user?._id);

  const values = {
    id,
    userId,
  };

  const { data, isLoading } = useGetArtistDetails(values);
  const dark = useAppSelector((state) => state.theme.mode);

  const navigate = useNavigate();
  const name = (val) => {
    let fullName = val?.artistName || "";

    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;
    return fullName.trim();
  };

  if (isLoading) return <Loader theme={dark} />;

  return (
    <div className={`px-4 py-6 transition-colors duration-300 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold mb-1 ${dark ? "text-white" : "text-gray-800"}`}>Artist Detail</h1>
        <div className={`flex items-center text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
          <span className="hover:underline cursor-pointer" onClick={() => navigate("/")}>
            Home
          </span>
          <span className="mx-2">•</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate("/all_artist")}>
            Artists
          </span>
          <span className="mx-2">•</span>
          <span> {name(data?.artist)}</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <div className={`lg:w-1/2 w-full border rounded-xl ${dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"} p-4`}>
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
