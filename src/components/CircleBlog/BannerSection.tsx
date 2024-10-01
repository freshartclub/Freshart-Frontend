import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import circle from "./assets/circle.png";
import arrow from "../../assets/arrow.png";

const BannerSection = () => {
  return (
    <div className="bg-[#F4F0F8] pb-10 sm:pb-0">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 container mx-auto sm:px-6 px-3 items-center">
        <div className="flex flex-col justify-center">
          <P
            variant={{ size: "base", theme: "dark", weight: "normal" }}
            className="uppercase mt-10 lg:mt-0"
          >
            Featured Post
          </P>
          <Header
            variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}
            className="my-2"
          >
            Step-by-step guide to choosing great font pairs
          </Header>
          <P
            variant={{ size: "small", theme: "dark", weight: "semiBold" }}
            className="my-3"
          >
            By <span className="text-[#592EA9]"> John Doe </span> | May 23, 2022
          </P>
          <P variant={{ size: "base", theme: "dark" }} className="my-3">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </P>

          <Button
            variant={{
              theme: "pink",
              rounded: "small",
              fontWeight: "500",
              thickness: "thick",
              fontSize: "sm",
            }}
            className="mt-4 px-4 py-4 flex justify-center items-center w-40"
          >
            <p>Read More</p>
            <img src={arrow} alt="arrow" className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <div className="flex justify-center items-center mt-10 md:mt-0">
          <img src={circle} alt="circle" className="w-[612px] h-[446px]" />
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
