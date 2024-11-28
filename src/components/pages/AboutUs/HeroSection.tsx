import Header from "../../../components/ui/Header";
import P from "../../../components/ui/P";
import banner1 from "./assets/banner.webp";
const HeroSection = () => {
  return (
    <>
      <div className="relative h-full w-full">
        <img
          src={banner1}
          alt="image 2"
          className="min-h-screen w-full object-cover"
        />

        <div className="absolute 2xl:top-[30%] xl:top-[20%] lg:top-[10%] md:top-[10%] top-[10%] text-white 2xl:w-[40%] xl:w-[50%] lg:w-[60%] md:w-[70%] w-full md:text-left text-center md:ml-[50px]">
          <P
            variant={{ size: "base", theme: "dark", weight: "normal" }}
            className="text-[18px] text-[#fff]"
          >
            FreshArt Club.
          </P>
          <Header
            variant={{ theme: "light", size: "lg", weight: "bold" }}
            className="2xl:text-[62px] lg:text-[60px] md:text-[50px] text-[40px] sm:leading-[45px] md:leading-[60px] leading-[50px] lg:my-4 md:mt-2"
          >
            Welcome to FreshArt Club.
          </Header>
          <P
            variant={{ size: "base", theme: "dark", weight: "normal" }}
            className="text-[22px] text-white hidden md:block"
          >
            FreshArt Club is a social impact marketplace inspired by Goal #10 of the
            17 United Nations Sustainable Development Goals which is to reduce
            inequality within and among countries.
          </P>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
