import Header from "../ui/Header";
import img1 from "../../assets/Overlay+Shadow (1).png";
import img2 from "../../assets/oiloncanvasofalittlegirl.jpg.png";
import img3 from "../../assets/Frame 1000009408.png";
import "../../App.css";
import like from "../../assets/like.png";
import { useGetArtWorkList } from "./http/getArtWorkList";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";

const highlightData = [
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img2,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img3,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
  {
    image: img2,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
  },
];

const Artwork = () => {
  const { data, isLoading } = useGetArtWorkList();
  console.log(data);
  // const data = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const handleRedirectToDescription = () => {
    navigate("/discover_more");
    window.scroll(0, 0);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4"
      >
        Artworks
      </Header>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        {data &&
          data.length > 0 &&
          data.map((item: any, index: any) => (
            <div
              key={index}
              className="sm:px-3 px-0 border-none outline-none flex flex-col justify-center relative"
            >
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/uploads/users/${
                  item.media.mainImage
                }`}
                alt="image"
                className="w-full cursor-pointer"
                onClick={handleRedirectToDescription}
              />

              <button className="absolute top-2 right-[28px] border border-[#FFD9DE] rounded-full px-3 py-3 bg-white cursor-pointer">
                <img src={like} alt="" className="w-[20px] h-[20px]" />
              </button>

              <div className="mt-3">
                <p className="text-[14px] text-[#696868]">
                  {item.additionalInfo.artworkTechnic}
                </p>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[20px] text-[#333333]  xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2">
                    {item.artworkName}
                  </h1>
                  <div>
                    <p className="text-[14px] text-[#696868]">
                      {item?.additionalInfo.height}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] text-[#696868]">
                  {item?.productDescription}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Artwork;
