import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import ArtCard from "./ArtCard";
import ArtistPortfolio from "./ArtistPortfolio";
import BannerSection from "./BannerSection";
import FreshArt from "./FreshArt";
import HelpSection from "./HelpSection";
import { useGetHomeData } from "./http/useGetHomeData";
import RecentSection from "./RecentSection";
import SecondSection from "./SecondSection";
import { useEffect } from "react";

const HomePage = () => {
  const dark = useAppSelector((state) => state.theme.mode);
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  const navigate = useNavigate();

  const profile = localStorage.getItem("profile");
  const { data, isLoading } = useGetHomeData();

  useEffect(() => {
    if (profile === "artist") {
      navigate("/artist-panel");
    }
  }, [profile, navigate]);

  if (profile === "artist") return null;

  return (
    <div className={`overflow-x-hidden ${dark ? "bg-gray-900" : "bg-white"}`}>
      <BannerSection />
      <SecondSection />
      <ArtCard data={data?.newAdded} title={"New Artwork"} viewType="new" loading={isLoading} />
      <ArtCard data={data?.trending} title={"Trending Artwork"} viewType="trending" loading={isLoading} />
      <ArtCard data={data?.commingSoon} title={"Coming Soon"} viewType="comingSoon" loading={isLoading} />
      <ArtCard data={data?.highlighted} title={"Highlighted Artwork"} viewType="highlight" loading={isLoading} />

      <HelpSection />
      <ArtistPortfolio data={data} />
      {isAuthorized ? <RecentSection /> : null}

      <FreshArt />
    </div>
  );
};

export default HomePage;
