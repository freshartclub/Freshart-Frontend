import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import arrow from "../../assets/Vector.png";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import { useAppSelector } from "../../store/typedReduxHooks";

const ArtistHeader = ({ data }) => {
  const dark = useAppSelector((state) => state.theme.mode);
  const name = (val: {
    artistName: string;
    artistSurname1: string;
    artistSurname2: string;
  }) => {
    let fullName = val?.artistName || "";

    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <div className={`lg:w-[80%] w-[90%] m-auto ${dark ? "dark" : ""}`}>
      <ul className={`flex p-2 mt-5 mb-0 lg:mb-5 gap-4 text-xl items-center ${
        dark ? "text-gray-300" : "text-[#2E4053]"
      }`}>
        <li>
          <Link to="/" className="rounded-md transition-all flex gap-1">
            <img 
              src={home} 
              alt="Home icon" 
              className={`w-[14px] h-[14px] ${dark ? "filter invert" : ""}`} 
            />
            <P
              variant={{ size: "small", theme: dark ? "light" : "dark", weight: "semiBold" }}
              className={dark ? "text-[#FF8A9B]" : "text-[#FF536B]"}
            >
              Home
            </P>
          </Link>
        </li>

        <img 
          src={arrow} 
          alt="Arrow icon" 
          className={`w-[4px] h-[6px] ${dark ? "filter invert" : ""}`} 
        />

        <li>
          <Link
            to="/all_artist"
            className={`cursor-pointer rounded-md transition-all duration-300 ${
              dark ? "hover:bg-gray-700" : "hover:bg-[#E8DAEF]"
            }`}
          >
            <P
              variant={{ size: "small", theme: dark ? "light" : "dark", weight: "semiBold" }}
              className={dark ? "text-[#FF8A9B]" : "text-[#FF536B]"}
            >
              Artists
            </P>
          </Link>
        </li>

        <img 
          src={arrow} 
          alt="Arrow icon" 
          className={`w-[4px] h-[6px] ${dark ? "filter invert" : ""}`} 
        />

        <li className="whitespace-nowrap w-full max-w-full overflow-x-auto scrollbar">
          <P
            variant={{ size: "small", theme: dark ? "light" : "dark", weight: "semiBold" }}
            className={dark ? "text-gray-300" : "text-[#203F58]"}
          >
            {name(data)}
          </P>
        </li>
      </ul>

      <div className="relative w-full lg:py-10 py-5 max-w-3xl mx-auto">
        {data?.profile?.mainVideo ? (
          <video
            src={`${imageUrl}/videos/${data?.profile?.mainVideo}`}
            className="w-full h-[60vh] rounded-lg"
            controls
          />
        ) : (
          <img
            src={`${imageUrl}/users/${data?.profile?.mainImage}`}
            alt="Main Media"
            className="w-full h-[60vh] object-contain rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ArtistHeader;