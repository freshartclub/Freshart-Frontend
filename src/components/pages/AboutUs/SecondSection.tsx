import Header from "../../../components/ui/Header";
import P from "../../../components/ui/P";

const SecondSection = () => {
  return (
    <div className="bg-[#F9F9F9] py-[30px]">
      <div className="px-5">
        <div className="w-[80%] m-auto">
          <div className="xl:w-[45%] lg:w-[61%] w-full mx-auto">
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="text-[#333333] text-md md:leading-10 leading-6 text-center"
            >
              At FreshArt Club, we make it our mission to help you discover
              and buy from the best emerging artists around the world.
            </P>
          </div>
          <div className="md:my-[50px] mt-6 flex md:flex-row flex-col justify-center xl:w-[70%] lg:w-[90%] md:w-full mx-auto">
            <div className="xl:px-10 lg:px-5 md:border-r-2 border-black md:w-[33.33%] mb-6 md:mb-0 text-center">
              <Header
                variant={{ theme: "dark", size: "lg", weight: "normal" }}
                className="text-2xl font-noto"
              >
                1.4M
              </Header>
              <P
                variant={{ size: "base", theme: "dark", weight: "normal" }}
                className="xl:text-[18px] lg:text-[15px] uppercase mt-2"
              >
                Original Artworks
              </P>
            </div>

            <div className="xl:px-10 lg:px-5 md:border-r-2 border-black md:w-[33.33%] mb-6 md:mb-0 text-center">
              <Header
                variant={{ theme: "dark", size: "lg", weight: "normal" }}
                className="text-2xl font-noto"
              >
                0.2K
              </Header>
              <P
                variant={{ size: "base", theme: "dark", weight: "normal" }}
                className="xl:text-[18px] lg:text-[15px] uppercase mt-2"
              >
                Emerging Artists
              </P>
            </div>

            <div className="xl:px-10 lg:px-5 md:w-[33.33%] text-center">
              <Header
                variant={{ theme: "dark", size: "lg", weight: "normal" }}
                className="text-2xl font-noto"
              >
                25+
              </Header>
              <P
                variant={{ size: "base", theme: "dark", weight: "normal" }}
                className="xl:text-[18px] lg:text-[15px] uppercase mt-2"
              >
                Countries Represented
              </P>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
