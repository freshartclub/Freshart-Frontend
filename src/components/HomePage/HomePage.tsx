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
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { useGetHomeData } from "./http/useGetHomeData";

const HomePage = () => {
  const navigate = useNavigate();

  const profile = localStorage.getItem("profile");

  if (profile === "artist") {
    return navigate("/artist-panel");
  }

  const { data, isLoading } = useGetHomeData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-hidden ">
      <BannerSection />
      <SecondSection />
      <HighlightSection data={data} />
      <TrendingSection />
      <ArtWork data={data} />
      <HelpSection />
      <ArtistPortfolio data={data} />
      <RecentSection data={data} />
      <FreshArt />
    </div>
  );
};

export default HomePage;
