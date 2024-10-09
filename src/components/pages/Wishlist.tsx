import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import P from "../ui/P";
import img1 from "../../assets/Trending1.png";
import img3 from "../../assets/Trending3.png";
import wishlist_like from "../../assets/whishlist_like.png";
import Header from "../ui/Header";
import arrow_bread from "../../assets/arrow_bread.png";

const trendingData = [
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65",
  },
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65",
  },
  {
    image: img3,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65",
  },
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65",
  },
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65",
  },
  {
    image: img1,
    title: "Illustrator, painting",
    heading: "Nineteenth-Century Pastel Portraits",
    para: "Andrews meson",
    size: "70 x 32 ",
    price: "$65",
  },
];

const Wishlist = () => {
  return (
    <div className="container mx-auto md:px-6 px-3 my-10">
      <ul className="flex p-2 gap-3 text-xl text-[#2E4053] items-center">
        <li>
          <Link to="/" className="rounded-md transition-all flex">
            <img
              src={home}
              alt="Home icon"
              className="w-[14px] h-[14px] mr-2"
            />
            <P
              variant={{ size: "small", theme: "dark", weight: "normal" }}
              className="text-[#FF536B]"
            >
              Home
            </P>
          </Link>
        </li>
        <img
          src={arrow_bread}
          alt="Home icon"
          className="w-[4px] h-[6px] mr-2"
        />
        <li>
          <Link
            to="/products"
            className="cursor-pointer hover:bg-[#E8DAEF] rounded-md transition-all duration-300"
          >
            <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
              Order
            </P>
          </Link>
        </li>
      </ul>

      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="my-4"
      >
        Most Loved Artworks
      </Header>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between gap-4 mt-4">
        {trendingData.map((item, index) => (
          <div
            key={index}
            className="sm:px-3 px-0 border-none outline-none relative"
          >
            <img src={item.image} alt="image" className="w-full" />
            <button className="absolute top-2 right-[28px]  cursor-pointer">
              <img src={wishlist_like} alt="like" className="" />
            </button>
            <div className="mt-3">
              <P
                variant={{ size: "base", weight: "normal" }}
                className="text-[#696868]"
              >
                {item.title}
              </P>
              <div className="flex justify-between items-center">
                <Header
                  variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
                  className="text-[#333333] xl:w-[80%] lg:w-[70%] w-[80%] line-clamp-2"
                >
                  {item.heading}
                </Header>

                <P
                  variant={{ size: "base", weight: "normal" }}
                  className="text-[#696868]"
                >
                  {item.size}
                </P>
              </div>
              <P
                variant={{ size: "base", weight: "normal" }}
                className="text-[#696868]"
              >
                {item.para}
              </P>

              <P variant={{ size: "base", weight: "medium" }}>{item.price}</P>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
