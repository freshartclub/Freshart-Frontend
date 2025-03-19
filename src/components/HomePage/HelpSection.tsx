import arrow from "../../assets/arrow.png";
import bg_banner from "../../assets/Frame 409.png";
import Button from "../ui/Button";

const HelpSection = () => {
  return (
    <div
      className="mt-12 bg-cover bg-no-repeat bg-fixed flex items-center justify-center"
      style={{ backgroundImage: `url(${bg_banner})` }}
    >
      <div className="container mx-auto md:px-6 px-3">
        <div className="text-white w-full md:w-[60%] text-center mx-auto flex flex-col items-center justify-center py-10">
          <p className="uppercase mb-3 text-sm sm:text-base">
            Explore Custom art
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Looking for custom orders? We help you!
          </h1>
          <div className="">
            <Button
              variant={{
                rounded: "full",
                fontWeight: "500",
                thickness: "thick",
                fontSize: "base",
              }}
              className={`mt-3 uppercase bg-[#FF725E] flex items-center justify-between`}
            >
              Order Now
              <img src={arrow} alt="arrow" className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
