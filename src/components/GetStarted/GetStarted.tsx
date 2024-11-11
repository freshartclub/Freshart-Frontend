import { useEffect } from "react";
import { useAppSelector } from "../../store/typedReduxHooks";
import BannerSection from "./BannerSection";
import ContactSection from "./ContactSection";
import DiscoverSection from "./DiscoverSection";
import ExploreSection from "./ExploreSection";
import FaqSection from "./FaqSection";
import FifthSection from "./FifthSection";
import LearnMoreSection from "./LearnMoreSection";
import ThirdSection from "./ThirdSection";
import { useNavigate, useLocation } from "react-router-dom";

const GetStarted = () => {
  const isAuthorized = useAppSelector((state) => state.user.isArtist);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  useEffect(() => {
    if (isAuthorized && currentPath === "/") {
      navigate("/home", { replace: true });
    }
  }, [isAuthorized, currentPath, navigate]);

  return (
    <div>
      <BannerSection />
      <DiscoverSection />
      <ThirdSection />
      <ExploreSection />
      <FifthSection />
      <LearnMoreSection />
      <ContactSection />
      <FaqSection />
    </div>
  );
};

export default GetStarted;
