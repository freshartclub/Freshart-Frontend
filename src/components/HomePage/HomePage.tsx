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
import ArtCard from "./ArtCard";

const HomePage = () => {
  const navigate = useNavigate();

  const profile = localStorage.getItem("profile");

  if (profile === "artist") {
    return navigate("/artist-panel");
  }

  const { data, isLoading } = useGetHomeData();

  console.log("this from", data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-hidden ">
      <BannerSection />
      <SecondSection />
      <ArtCard data={data?.newAdded} tittle={"New Artwork"} />
      <ArtCard data={data?.trending} tittle={"Trending Artwork"} />
      <ArtCard data={data?.commingSoon} tittle={"Coming Soon"} />
      <ArtCard data={data?.highlighted} tittle={"Highlighted Artwork"} />

      {/* <HighlightSection data={data} /> */}
      {/* <TrendingSection /> */}
      {/* <ArtWork data={data} /> */}
      <HelpSection />
      <ArtistPortfolio data={data} />
      <RecentSection data={data} />
      <FreshArt />
    </div>
  );
};

export default HomePage;
