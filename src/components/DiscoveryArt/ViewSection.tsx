import share from "./assets/share.png";
import image1 from "./assets/Image+Shadow.png";
import image2 from "./assets/Image+Shadow (1).png";
import image3 from "./assets/Image+Shadow (2).png";
import image4 from "./assets/Image+Shadow (3).png";
import image5 from "./assets/Image+Shadow (4).png";
import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import like from "./assets/like.png";
import { useNavigate } from "react-router-dom";

const ViewSection = () => {
  const viewData = [
    {
      image: image2,
      date: "August 18",
      heading: "Peasant Scenes And Landscapes",
      para: "The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.",
      btn: "View Collection",
      img1: like,
      img2: share,
    },
    {
      image: image1,
      date: "August 18",
      heading: "Rojo Y Negro - Latin American Art",
      para: "The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.",
      btn: "View Collection",
      img1: like,
      img2: share,
    },
    {
      image: image3,
      date: "August 18",
      heading: "Naive Painting Of The 19th Century",
      para: "The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.",
      btn: "View Collection",
      img1: like,
      img2: share,
    },
    {
      image: image5,
      date: "August 18",
      heading: "Rojo Y Negro - Latin American Art",
      para: "The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.",
      btn: "View Collection",
      img1: like,
      img2: share,
    },
    {
      image: image4,
      date: "August 18",
      heading: "Naive Painting Of The 19th Century",
      para: "The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.",
      btn: "View Collection",
      img1: like,
      img2: share,
    },
    {
      image: image5,
      date: "August 18",
      heading: "Rojo Y Negro - Latin American Art",
      para: "The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.",
      btn: "View Collection",
      img1: like,
      img2: share,
    },
  ];

  const navigate = useNavigate();

  const redirectToMoreDiscovery = () => {
    navigate("/more_discovery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto sm:px-6 px-3">
      {viewData.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row justify-between p-4 gap-4 ${
            index % 2 === 0 ? "" : "md:flex-row-reverse"
          }`}
        >
          <img
            src={item.image}
            alt=""
            className="w-full md:w-[50%] h-auto object-cover"
          />
          <div className="flex flex-col justify-center w-full md:w-[40%] p-4">
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="uppercase tracking-wide text-pink text-md mb-2"
            >
              {item.date}
            </P>
            <Header
              variant={{ size: "xl", weight: "bold", theme: "dark" }}
              className="text-2xl mb-4"
            >
              {item.heading}
            </Header>
            <P
              variant={{ size: "md", theme: "dark", weight: "normal" }}
              className="mb-6"
            >
              {item.para}
            </P>
            <div
              className="flex items-center space-x-4"
              onClick={redirectToMoreDiscovery}
            >
              <Button
                variant={{
                  fontSize: "sm",
                  theme: "light",
                  fontWeight: "600",
                  rounded: "full",
                  thickness: "thick",
                }}
                className="border border-[#FF536B80]"
              >
                {item.btn}
              </Button>
              <img src={like} alt="like btn" className="w-[39px] h-[40px]" />
              <img src={share} alt="share btn" className="w-[39px] h-[40px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewSection;
