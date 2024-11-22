import Header from "../ui/Header";
import img1 from "../../assets/Overlay+Shadow (1).png";
import img2 from "../../assets/oiloncanvasofalittlegirl.jpg.png";
import img3 from "../../assets/Frame 1000009408.png";
import "../../App.css";
import like from "../../assets/like.png";
import { useGetArtWorkList } from "./http/getArtWorkList";
import Loader from "../ui/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import edit from "../ArtistDetail/assets/edit.png";
import deleteimg from "../ArtistDetail/assets/Container (2).png";

//   {
//     image: img1,
//     title: "Illustrator, painting",
//     heading: "Nineteenth-Century Pastel Portraits",
//     para: "Andrews meson",
//     size: "70 x 32 ",
//   },
//   {
//     image: img2,
//     title: "Illustrator, painting",
//     heading: "Nineteenth-Century Pastel Portraits",
//     para: "Andrews meson",
//     size: "70 x 32 ",
//   },
//   {
//     image: img3,
//     title: "Illustrator, painting",
//     heading: "Nineteenth-Century Pastel Portraits",
//     para: "Andrews meson",
//     size: "70 x 32 ",
//   },
//   {
//     image: img2,
//     title: "Illustrator, painting",
//     heading: "Nineteenth-Century Pastel Portraits",
//     para: "Andrews meson",
//     size: "70 x 32 ",
//   },
// ];

const ArtistProtfolioArtwork = ({ data }) => {
  console.log(data);

  const navigate = useNavigate();
  const handleRedirectToDescription = (id) => {
    navigate(`/discover_more?id=${id}`);
    window.scroll(0, 0);
  };
  return (
    <div>
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4"
      >
        Artworks
      </Header>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        {data?.artworks &&
          data?.artworks?.length > 0 &&
          data.artworks.map((item: any, index: any) => (
            <div
              key={index}
              className="sm:px-3 px-0 border-none outline-none flex flex-col pb-5 justify-center relative"
            >
              <img
                src={`${data.url}/users/${item.media.mainImage}`}
                alt="image"
                className="w-[40vw] h-[50vh] object-cover cursor-pointer "
                onClick={() => handleRedirectToDescription(item._id)}
              />
              {/* 
              {profile === "artist" ? (
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[#D9D9D9] bg-fixed flex gap-10 items-center justify-center opacity-0 transition duration-300 ease-in-out hover:opacity-[0.7] hover:cursor-pointer">
                  <div className="flex gap-5 ">
                    <NavLink to={`/artist-panel/artwork/add?id=${item._id}`}>
                      <img src={edit} className="" alt="" />
                    </NavLink>
                    <img src={deleteimg} className="" alt="" />
                  </div>
                </div>
              ) : null} */}

              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">
                  {item.discipline?.artworkDiscipline}
                </p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333]  xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                    {item.artworkName}
                  </h1>
                  <div>
                    <p className="text-[14px] text-[#696868]">
                      {item?.additionalInfo?.height} x{" "}
                      {item?.additionalInfo?.width}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] text-[#696868]">
                  {data?.artist?.artistName +
                    " " +
                    data?.artist?.artistSurname1}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArtistProtfolioArtwork;
