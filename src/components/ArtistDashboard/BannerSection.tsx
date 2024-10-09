import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import hand from "./assets/WelcomebackFabiana.png";
import side_image from "./assets/illustration-seo.png";

const BannerSection = () => {
  return (
    <div className="relative bg-bg_artist bg-no-repeat w-full h-full bg-cover py-[50px]">
      <div className="container mx-auto sm:px-6 px-3">
        <div className=" flex sm:flex-row flex-col items-center justify-between">
          <div>
            <div className="flex items-center">
              <Header
                variant={{ size: "xl", theme: "light", weight: "semiBold" }}
              >
                Welcome back
              </Header>
              <img src={hand} alt="hand image" className="ml-2" />
            </div>
            <Header
              variant={{ size: "xl", theme: "light", weight: "semiBold" }}
            >
              Hudosn Alvarez
            </Header>

            <P
              variant={{ size: "base", theme: "light", weight: "normal" }}
              className="mt-4 md:w-[60%] w-full"
            >
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything
            </P>
            <Button
              variant={{ fontSize: "base", fontWeight: "500" }}
              className="bg-green-500 text-white mt-4"
            >
              Go now
            </Button>
          </div>
          <img src={side_image} alt="sideImage" />
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
