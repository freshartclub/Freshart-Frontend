import { useNavigate } from "react-router-dom";
import ArtCard from "./ArtCard";
import ArtistPortfolio from "./ArtistPortfolio";
import BannerSection from "./BannerSection";
import FreshArt from "./FreshArt";
import HelpSection from "./HelpSection";
import { useGetHomeData } from "./http/useGetHomeData";
import RecentSection from "./RecentSection";
import SecondSection from "./SecondSection";

const HomePage = () => {
  const navigate = useNavigate();

  const profile = localStorage.getItem("profile");
  const { data, isLoading } = useGetHomeData();

  const token = localStorage.getItem("auth_token");
  if (profile === "artist") return navigate("/artist-panel");

  return (
    <div className="overflow-x-hidden">
      <BannerSection />
      <SecondSection />
      <ArtCard
        data={data?.newAdded}
        title={"New Artwork"}
        viewType="new"
        loading={isLoading}
      />
      <ArtCard
        data={data?.trending}
        title={"Trending Artwork"}
        viewType="new"
        loading={isLoading}
      />
      <ArtCard
        data={data?.commingSoon}
        title={"Coming Soon"}
        viewType="new"
        loading={isLoading}
      />
      <ArtCard
        data={data?.highlighted}
        title={"Highlighted Artwork"}
        viewType="new"
        loading={isLoading}
      />

      <HelpSection />
      <ArtistPortfolio data={data} />
      {token ? <RecentSection /> : null}

      <FreshArt />
    </div>
  );
};

export default HomePage;
