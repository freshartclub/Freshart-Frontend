import { useEffect } from "react";
import useCheckIsAuthorized from "../../http/auth/useGetAuhtorizedUser";
import ArtistPortfolio from "./ArtistPortfolio";
import ArtWork from "./ArtWork";
import BannerSection from "./BannerSection";
import FreshArt from "./FreshArt";
import HelpSection from "./HelpSection";
import HighlightSection from "./HighlightSection";
import RecentSection from "./RecentSection";
import SecondSection from "./SecondSection";
import TrendingSection from "./TrendingSection";

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <BannerSection />
      <SecondSection />
      <HighlightSection />
      <TrendingSection />
      <ArtWork />
      <HelpSection />
      <ArtistPortfolio />
      <RecentSection />
      <FreshArt />
    </div>
  );
};

export default HomePage;
