import icon1 from "../../assets/file.png";
import icon2 from "../../assets/expertus-icon 1.png";
import icon3 from "../../assets/eruditus 1.png";
import icon4 from "../../assets/aisthetes 1.png";
import Button from "../ui/Button";
import arrow from "../../assets/arrow.png";
import { useNavigate } from "react-router-dom";

const DiscoverSection = () => {
  const navigate = useNavigate();
  const redirectToPricePlane = () => {
    navigate("/priceandplans");
  };

  return (
    <div className="bg-[#F5F2EB] py-20">
      <div className="container mx-auto md:px-6 px-3 text-center">
        <h1 className="md:text-[36px] text-[30px] text-[#102030] font-semibold pb-10">
          Discover the different plans to join our community
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-32">
          <img
            src={icon1}
            alt="icon1"
            className="md:mb-0 mb-4   md:w-[150px] md:h-[150px] sm:w-[100px] sm:h-[100px] w-[150px] h-[150px]"
          />
          <img
            src={icon2}
            alt="icon1"
            className="md:mb-0 mb-4   md:w-[150px] md:h-[150px] sm:w-[100px] sm:h-[100px] w-[150px] h-[150px]"
          />
          <img
            src={icon3}
            alt="icon1"
            className="md:mb-0 mb-4   md:w-[150px] md:h-[150px] sm:w-[100px] sm:h-[100px] w-[150px] h-[150px]"
          />
          <img
            src={icon4}
            alt="icon1"
            className="md:mb-0 mb-4   md:w-[150px] md:h-[150px] sm:w-[100px] sm:h-[100px] w-[150px] h-[150px]"
          />
        </div>
        <div className="flex justify-center items-center mt-10">
          <Button
            variant={{
              theme: "dark",
              // text: "white",
              rounded: "full",
              fontWeight: "500",
              thickness: "thick",
              fontSize: "base",
            }}
            className=" flex justify-center items-center self-center"
            onClick={redirectToPricePlane}
          >
            Compare our plans
            <img src={arrow} alt="arrow" className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;
