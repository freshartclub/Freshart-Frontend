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
import UnderConstruction from "./UnderConstruction";

const GetStarted = () => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const profile = localStorage.getItem("profile");

  useEffect(() => {
    if (isAuthorized && currentPath === "/" && profile === "user") {
      navigate("/home", { replace: true });
    } else if (isAuthorized && currentPath === "/" && profile === "artist") {
      navigate("/artist-panel", { replace: true });
    }
  }, [isAuthorized, currentPath, navigate]);

  return (
    <div>
      {/* <UnderConstruction /> */}
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
