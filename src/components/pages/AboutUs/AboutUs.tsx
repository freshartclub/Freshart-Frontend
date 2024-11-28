import Visual from "./Visual";
import ArtistSection from "./ArtistSection";
import HeroSection from "./HeroSection";
import ReadSection from "./ReadSection";
import SecondSection from "./SecondSection";

const AboutUs = () => {
  return (
    <>
      <HeroSection />
      <SecondSection />
      <div className="px-5">
        <ArtistSection />
        <ReadSection />
        <Visual />
      </div>
    </>
  );
};

export default AboutUs;
