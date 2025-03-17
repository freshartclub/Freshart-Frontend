import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems = [];
  if (data?.profile?.mainImage)
    mediaItems.push({ type: "image", src: data?.profile.mainImage });
  if (data?.profile?.mainVideo)
    mediaItems.push({ type: "video", src: data?.profile.mainVideo });

  if (mediaItems.length === 0) return null;

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );

  return (
    <div className="lg:w-[80%] w-[90%] m-auto">
      <ul className="flex p-2 my-5 gap-4 text-xl text-[#2E4053] items-center">
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

        <img src={arrow} alt="Home icon" className="w-[4px] h-[6px]" />

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

        <img src={arrow} alt="Home icon" className="w-[4px] h-[6px]" />

        <li>
          <P
            variant={{ size: "small", theme: "dark", weight: "semiBold" }}
            className="text-[#203F58]"
          >
            {name(data)}
          </P>
        </li>
      </ul>

      <div className="relative w-full py-5 max-w-3xl mx-auto">
        {mediaItems.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <FaChevronLeft size={24} />
          </button>
        )}

        <div className="flex justify-center">
          {mediaItems[currentIndex].type === "video" ? (
            <video
              src={`${imageUrl}/videos/${mediaItems[currentIndex].src}`}
              className="w-full h-[60vh] rounded-lg"
              controls
            />
          ) : (
            <img
              src={`${imageUrl}/users/${mediaItems[currentIndex].src}`}
              alt="Main Media"
              className="w-full h-[60vh] object-contain rounded-lg"
            />
          )}
        </div>

        {mediaItems.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <FaChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtistHeader;
