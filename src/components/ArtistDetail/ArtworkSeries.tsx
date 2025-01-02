import Slider from "react-slick";
import img1 from "./assets/Pic.png";
import img2 from "./assets/Pic1.png";
import img3 from "./assets/Pic2.png";
import Header from "../ui/Header";
import { useGetArtWorkList } from "./http/getArtWorkList";
import { useState } from "react";
import Loader from "../ui/Loader";

const artwork_data = [
  {
    image: img1,
  },
  {
    image: img2,
  },
  {
    image: img3,
  },
  {
    image: img2,
  },
];

const ArtworkSeries = () => {
  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrow: false,
    // autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrow: false,
          slidesToScroll: 1,
          // infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrow: false,
          slidesToScroll: 1,
          // infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrow: false,
          slidesToScroll: 1,
          // infinite: true,
          dots: false,
        },
      },
    ],
  };

  const [selectedArtwork, setSelectedArtwork] = useState("series");

  const { data, isLoading, refetch, isRefetching } =
    useGetArtWorkList(selectedArtwork);

  console.log(data);

  if (isLoading || isRefetching) {
    return <Loader />;
  }
  return (
    <div className="mt-8 series_artwork">
      <Header variant={{ size: "xl", theme: "dark", weight: "semiBold" }}>
        Series of Artwork
      </Header>

      {/* <Slider {...settings}> */}
      <div className=" flex flex-row  items-center gap-3 py-5   w-full px-3 h-[45vh]">
        {data?.data &&
          data?.data?.map((group, index) => (
            <div
              key={index}
              className="group-container w-full h-full border border-zinc-300"
            >
              <div className="artworks-container">
                {group?.artworks && group?.artworks?.length === 2 ? (
                  <div className="flex  items-center gap-2 overflow-hidden p-2">
                    {group?.artworks?.map((artwork, idx) => (
                      <img
                        key={idx}
                        src={`${data?.url}/users/${artwork?.media}`}
                        alt={`Artwork ${idx + 1}`}
                        className="object-cover w-[50%] h-[32vh]"
                      />
                    ))}
                  </div>
                ) : group?.artworks && group?.artworks?.length > 2 ? (
                  <div className="flex gap-2 p-2">
                    {/* Upper part with the main image */}
                    <div className="row-span-1">
                      <img
                        src={`${data?.url}/users/${group.artworks[0].media}`}
                        alt="Main Artwork"
                        className="object-cover w-full h-[32vh]"
                      />
                    </div>
                    {/* Lower part with additional images */}
                    <div className="flex flex-col gap-2 items-center bg-red-100">
                      <div className="w-full h-full">
                        <img
                          src={`${data?.url}/users/${group.artworks[1].media}`}
                          alt="Artwork 2"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div
                        style={{
                          backgroundImage: `url(${data?.url}/users/${group.artworks[2].media})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          height: "100%",
                          width: "100%",
                        }}
                        className="relative cursor-pointer flex items-center justify-center text-center font-semibold text-white"
                      >
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <span className="relative  font-bold drop-shadow-lg">
                          See All
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-2">
                    {group?.artworks &&
                      group?.artworks?.map((artwork, idx) => (
                        <img
                          key={idx}
                          src={`${data?.url}/users/${artwork?.media}`}
                          alt={`Artwork ${idx + 1}`}
                          className="object-cover w-full h-[32vh]"
                        />
                      ))}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <h3 className="group-name font-medium text-md  mb-4 p-2 ">
                  {group?.groupName}
                </h3>

                <h3 className="group-name text-md mb-4 p-2">
                  Artworks : {group?.artworks?.length}
                </h3>
              </div>
            </div>
          ))}
      </div>
      {/* </Slider> */}
    </div>
  );
};

export default ArtworkSeries;
