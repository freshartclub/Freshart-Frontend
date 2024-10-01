import ArtWork from "./ArtWork";
import banner from "./assets/banner.png";
import CardSection from "./CardSection";
import ProfileDescription from "./ProfileDescription";

const ArtistPortfolioPage = () => {
  return (
    <div>
      <img src={banner} alt="banner" className="w-full" />
      <div className="container mx-auto md:px-6 sm:px-3 flex sm:flex-row flex-col justify-between">
        <CardSection />
        <ProfileDescription />
      </div>
      <div className="container mx-auto sm:px-6 px-3 ">
        <ArtWork />
      </div>
    </div>
  );
};

export default ArtistPortfolioPage;
