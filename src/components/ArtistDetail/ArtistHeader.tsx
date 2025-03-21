import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import arrow from "../../assets/Vector.png";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";

const ArtistHeader = ({ data }) => {
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
    <div className="lg:w-[80%] w-[90%] m-auto">
      <ul className="flex p-2 mt-5 mb-0 lg:mb-5 gap-4 text-xl text-[#2E4053] items-center">
        <li>
          <Link to="/" className="rounded-md transition-all flex gap-1">
            <img src={home} alt="Home icon" className="w-[14px] h-[14px]" />
            <P
              variant={{ size: "small", theme: "dark", weight: "semiBold" }}
              className="text-[#FF536B]"
            >
              Home
            </P>
          </Link>
        </li>

        <img src={arrow} alt="Arrow icon" className="w-[4px] h-[6px]" />

        <li>
          <Link
            to="/all_artist"
            className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
          >
            <P
              variant={{ size: "small", theme: "dark", weight: "semiBold" }}
              className="text-[#FF536B]"
            >
              Artists
            </P>
          </Link>
        </li>

        <img src={arrow} alt="Arrow icon" className="w-[4px] h-[6px]" />

        <li className="whitespace-nowrap w-full max-w-full overflow-x-auto scrollbar">
          <P
            variant={{ size: "small", theme: "dark", weight: "semiBold" }}
            className="text-[#203F58]"
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
