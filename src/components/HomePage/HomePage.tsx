import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { useGetArtistDetails } from "../UserProfile/http/useGetDetails";
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
  const { data: artistData } = useGetArtistDetails();

  const token = localStorage.getItem("auth_token");
  if (profile === "artist") return navigate("/artist-panel");

  return (
    <div className="overflow-x-hidden">
      <BannerSection />
      <SecondSection />
      <ArtCard
        data={data?.newAdded}
        tittle={"New Artwork"}
        artistData={artistData?.data.artist}
        viewType="new"
        loading={isLoading}
      />
      <ArtCard
        data={data?.trending}
        tittle={"Trending Artwork"}
        artistData={artistData?.data.artist}
        viewType="new"
        loading={isLoading}
      />
      <ArtCard
        data={data?.commingSoon}
        tittle={"Coming Soon"}
        artistData={artistData?.data.artist}
        viewType="new"
        loading={isLoading}
      />
      <ArtCard
        data={data?.highlighted}
        tittle={"Highlighted Artwork"}
        artistData={artistData?.data.artist}
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
