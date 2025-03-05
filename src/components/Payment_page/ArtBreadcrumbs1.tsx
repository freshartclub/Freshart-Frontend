import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import P from "../ui/P";
// import image from "assets/Image.png";
// import image2 from "assets/Image1.png";
import arrow from "../../assets/arrow_22.png";

const ArtBreadcrumbs = () => {
  const breadcrumbs = [
    {
      label: "Home",
      link: "/",
      isLast: false,
      img: home,
    },
    {
      label: "Cart",
      link: "/purchase_cart",
      isLast: false,
      img: arrow,
    },
    {
      label: "Checkout",
      link: "",
      isLast: true,
      img: arrow,
    },
  ];

  return (
    <div className="flex gap-2 items-start">
      <ul className="flex p-2 gap-4 text-xl text-[#2E4053] items-center">
        {breadcrumbs.map((item, i) => (
          <div key={i}>
            <Link
              to={item?.link}
              className={`rounded-md transition-all flex items-center ${
                item?.link === ""
                  ? "cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            >
              <img
                src={item.img}
                alt="Home icon"
                className={`${
                  item?.label === "Home"
                    ? "w-[14px] h-[14px] mr-2"
                    : " w-[6px] h-[8px] mr-1"
                }`}
              />
              <P
                variant={{ size: "small", theme: "dark", weight: "medium" }}
                className={`${
                  item?.label === "Home" ? "text-[#FF536B]" : ""
                } ml-2`}
              >
                {item?.label}
              </P>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ArtBreadcrumbs;
