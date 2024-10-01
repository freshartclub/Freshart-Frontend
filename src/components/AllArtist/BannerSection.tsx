import { Link } from "react-router-dom";
import Header from "../ui/Header";
import banner from "./assets/Rectangle 5330.png";
import arrow from "./assets/arrow.png";

const BannerSection = () => {
  return (
    <div className="relative">
      <img src={banner} alt="purchase banner" className="w-full" />
      <div className="container mx-auto sm:px-6 px-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-52 text-center">
            <Header variant={{ size: "3xl", theme: "light", weight: "bold" }}>
              Artist
            </Header>
            <div className="flex items-center justify-center">
              <Link to="/" className="mt-3 text-white block">
                <div className="relative text-sm">HomePage</div>
              </Link>
              <img
                src={arrow}
                alt="arrow"
                className="w-[5px] h-[6px] mt-[13px] ml-[8px]"
              />
              <Link to="/" className="mt-3 text-white block">
                <div className="relative text-sm px-2">All Artists</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
