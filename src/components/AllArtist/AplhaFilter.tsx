import img1 from "./assets/product1.png";
import img2 from "./assets/product2.png";
import img3 from "./assets/product3.png";
import img4 from "./assets/product4.png";
import img5 from "./assets/product5.png";
import img6 from "./assets/product6.png";
import img7 from "./assets/product7.png";
import img8 from "./assets/product8.png";
import img9 from "./assets/product9.png";
import img10 from "./assets/product10.png";
import img11 from "./assets/product11.png";
import profile1 from "./assets/Frame 1000009410.png";
import profile2 from "./assets/frame11.png";
import profile3 from "./assets/Frame1.png";
import profile4 from "./assets/frame2.png";
import profile5 from "./assets/frame3.png";
import profile6 from "./assets/frame4.png";
import profile7 from "./assets/frame5.png";
import profile8 from "./assets/frame6.png";
import profile9 from "./assets/frame7.png";
import profile10 from "./assets/frame10.png";
import { useState } from "react";
import P from "../ui/P";
import { useNavigate } from "react-router-dom";

const filterData = [
  {
    data: "A",
  },
  {
    data: "B",
  },
  {
    data: "C",
  },
  {
    data: "D",
  },
  {
    data: "E",
  },
  {
    data: "F",
  },
  {
    data: "G",
  },
  {
    data: "H",
  },
  {
    data: "I",
  },
  {
    data: "J",
  },
  {
    data: "K",
  },
  {
    data: "L",
  },
  {
    data: "M",
  },
  {
    data: "N",
  },
  {
    data: "O",
  },
  {
    data: "P",
  },
  {
    data: "Q",
  },
  {
    data: "R",
  },
  {
    data: "S",
  },
  {
    data: "T",
  },
  {
    data: "U",
  },
  {
    data: "V",
  },
  {
    data: "W",
  },
  {
    data: "X",
  },
  {
    data: "Y",
  },
  {
    data: "Z",
  },
  {
    data: "0-9",
  },
];

const artistData = [
  {
    profile: profile1,
    name: "Anne Baasley",
    profession: "artist | painter | sculpter",
    image: img1,
  },
  {
    profile: profile2,
    name: "Bella Baasley",
    profession: "artist | painter | sculpter",
    image: img2,
  },
  {
    profile: profile3,
    name: "CZara Baasley",
    profession: "artist | painter | sculpter",
    image: img3,
  },
  {
    profile: profile4,
    name: "DZara Baasley",
    profession: "artist | painter | sculpter",
    image: img4,
  },
  {
    profile: profile5,
    name: "EZara Baasley",
    profession: "artist | painter | sculpter",
    image: img5,
  },
  {
    profile: profile6,
    name: "HZara Baasley",
    profession: "artist | painter | sculpter",
    image: img6,
  },
  {
    profile: profile7,
    name: "JZara Baasley",
    profession: "artist | painter | sculpter",
    image: img7,
  },
  {
    profile: profile8,
    name: "Lauren Baasley",
    profession: "artist | painter | sculpter",
    image: img8,
  },
  {
    profile: profile9,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img9,
  },
  {
    profile: profile10,
    name: "Michelle Baasley",
    profession: "artist | painter | sculpter",
    image: img10,
  },
  {
    profile: profile5,
    name: "Olivia Baasley",
    profession: "artist | painter | sculpter",
    image: img11,
  },
  {
    profile: profile1,
    name: "Katherine Baasley",
    profession: "artist | painter | sculpter",
    image: img1,
  },
  {
    profile: profile1,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img1,
  },
  {
    profile: profile2,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img2,
  },
  {
    profile: profile3,
    name: "Andrew Baasley",
    profession: "artist | painter | sculpter",
    image: img3,
  },
  {
    profile: profile4,
    name: "Victoria Baasley",
    profession: "artist | painter | sculpter",
    image: img4,
  },
  {
    profile: profile5,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img5,
  },
  {
    profile: profile6,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img6,
  },
  {
    profile: profile7,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img7,
  },
  {
    profile: profile8,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img8,
  },
  {
    profile: profile9,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img9,
  },
  {
    profile: profile10,
    name: "Zara Baasley",
    profession: "artist | painter | sculpter",
    image: img10,
  },
];

const ITEMS_PER_PAGE = 8;

const AplhaFilter = ({ query }: any) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredArtists = selectedLetter
    ? artistData.filter((artist) =>
        artist.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
      )
    : artistData;
  const totalPages = Math.ceil(filteredArtists.length / ITEMS_PER_PAGE);

  const currentItems = filteredArtists.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const filteredItems = currentItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLetterClick = (letter: string) => {
    const matchingArtists = artistData.filter((artist) =>
      artist.name.toLowerCase().startsWith(letter.toLowerCase())
    );

    if (matchingArtists.length === 0) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
    }
    setCurrentPage(1);
  };

  const handleAllClick = () => {
    setSelectedLetter(null);
    setCurrentPage(1);
  };

  const handleArtistDetail = () => {
    navigate("/artist_detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex gap-5 my-10 flex-wrap">
        <P
          onClick={handleAllClick}
          variant={{ size: "base", theme: "dark", weight: "semiBold" }}
        >
          All
        </P>
        {filterData.map((item, index) => (
          <div key={index}>
            <P
              onClick={() => handleLetterClick(item.data)}
              variant={{ size: "base", theme: "dark", weight: "semiBold" }}
            >
              {item.data}
            </P>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        {filteredItems.map((item, index) => (
          <div key={index} className=" text-center">
            <div
              className="mt-14 rounded-lg border border-[#FF536B] flex flex-col items-center"
              onClick={handleArtistDetail}
            >
              <img src={item.profile} alt="profile" className="-mt-10" />
              <h1 className="text-xl my-1">{item.name}</h1>
              <p className="text-sm mb-2">{item.profession}</p>
              <img src={item.image} alt="Artwork" className="p-4 w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {filteredArtists.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center my-5">
          <button
            className="mx-2 px-4 py-2 bg-gray-300 rounded-lg"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Pre
          </button>
          <span className="mx-2 px-4 py-2 bg-gray-200 rounded-lg">
            {currentPage}
          </span>
          <button
            className="mx-2 px-4 py-2 bg-gray-300 rounded-lg"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default AplhaFilter;
