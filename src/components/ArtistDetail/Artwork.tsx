import Header from "../ui/Header";
import img1 from "../../assets/Overlay+Shadow (1).png";
import img2 from "../../assets/oiloncanvasofalittlegirl.jpg.png";
import img3 from "../../assets/Frame 1000009408.png";
import "../../App.css";
import like from "../../assets/like.png";

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
  return (
    <div>
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-4"
      >
        Artworks
      </Header>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {highlightData.map((item, index) => (
          <div
            key={index}
            className="sm:px-3 px-0 border-none outline-none flex flex-col justify-center "
          >
            <img src={item.image} alt="image" className="w-full" />
            <div className="mt-3">
              <p className="text-[14px] text-[#696868]">{item.title}</p>
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-[20px] text-[#333333]">
                  {item.heading}
                </h1>
                <div className="border border-[#FFD9DE] rounded-full px-3 py-3">
                  <img src={like} alt="" className="w-[20px] h-[20px]" />
                </div>
              </div>
              <p className="text-[14px] text-[#696868]">{item.para}</p>
              <p className="text-[14px] text-[#696868]">{item.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artwork;
