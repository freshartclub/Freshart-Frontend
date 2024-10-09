import ArtDetail from "./ArtDetail";
import ArtistTable from "./ArtistTable";
import BannerSection from "./BannerSection";
import TrendingAtwork from "./TrendingAtwork";

const ArtistDashboard = () => {
  return (
    <div>
      <BannerSection />
      <ArtDetail />
      <ArtistTable />
      <TrendingAtwork />
    </div>
  );
};

export default ArtistDashboard;
