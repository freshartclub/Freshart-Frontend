import Button from "../../../components/ui/Button";
import Header from "../../../components/ui/Header";
import P from "../../../components/ui/P";
import artist4 from "./assets/artist1.webp";
import artist3 from "./assets/artist2.webp";
import artist2 from "./assets/artist3.webp";
import artist1 from "./assets/artist4.webp";

const ArtistSection = () => {
  return (
    <div className="w-[100%] container m-auto mt-[80px] lg:pb-[80px] md:flex justify-between block">
      <div className="md:w-[54%] xl:w-[50%] grid grid-cols-2 xl:mr-5 mr-0">
        <img src={artist2} alt="" className="m-[5px] w-[95%]" />
        <img src={artist3} alt="" className="m-[5px] w-[95%]" />
        <img src={artist4} alt="" className="m-[5px] w-[95%]" />
        <img src={artist1} alt="" className="m-[5px] w-[95%] " />

      </div>

      <div className="xl:w-[45%] md:w-[45%] md:mt-0 mt-10">
        <Header
          variant={{ theme: "dark", size: "lg", weight: "normal" }}
          className="xl:text-2xl lg:text-xl md:text-xl text-2xl font-noto xl:mb-[50px] lg:mb-[20px] mb-[10px]"
        >
          We Make Unknown Artists Known.
        </Header>

        <P
          variant={{ size: "base", theme: "dark", weight: "normal" }}
          className="xl:text-[20px] lg:text-[18px] md:text-[15px] text-[20px] xl:mb-[50px] lg:mb-[10px] mb-[50px] md:hidden lg:block"
        >
          FreshArt Club’s Mission is to reduce this income inequality by supporting
          talented artists who are struggling to succeed due to being
          under-represented or under-resourced.
        </P>

        <ul className="lg:mt-[15px] md:mt-[15px] ml-[30px] list-decimal">
          <li className="xl:text-[20px] lg:text-[18px] md:text-[15px] text-[20px] mb-[25px] lg:mb-[20px] md:mb-[10px]">
            {" "}
            Providing a visibility platform to showcase artwork with the goal of
            providing, both artists and other platform users (buyers) with
            business leads.
          </li>
          <li className="xl:text-[20px] lg:text-[18px] md:text-[15px] text-[20px] mb-[25px] lg:mb-[20px] md:mb-[10px] ">
            {" "}
            Creating a synergistic relationship between the business community
            (financial and non-financial institutions, governmental agencies and
            non-profits) and local artists.
          </li>
        </ul>

        <Button
          variant={{
            theme: "secondary",
            thickness: "thick",
            fontSize: "md",
          }}
          className="w-[200px] text-[19px] bg-[#FF536B] lg:py-[18px] md:py-[10px] lg:px-[30px] md:px-[10px] lg:mt-[15px] md:mt-[15px] rounded-md text-white"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default ArtistSection;
