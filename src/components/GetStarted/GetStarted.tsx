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
import { useGetRootPageData } from "./https/useGetRootPageData";
import Loader from "../ui/Loader";

import icon1 from "../../assets/file.png";
import icon2 from "../../assets/expertus-icon 1.png";
import icon3 from "../../assets/eruditus 1.png";
import icon4 from "../../assets/aisthetes 1.png";
import CenteredSection from "./DiscoverSection";

const GetStarted = () => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const profile = localStorage.getItem("profile");
  const { data, isLoading } = useGetRootPageData();

  useEffect(() => {
    if (isAuthorized && currentPath === "/" && profile === "user") {
      navigate("/home", { replace: true });
    } else if (isAuthorized && currentPath === "/" && profile === "artist") {
      navigate("/artist-panel", { replace: true });
    }
  }, [isAuthorized, currentPath, navigate]);

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* <UnderConstruction /> */}
      <BannerSection data={data?.data?.carousel} />
      <CenteredSection
        title="Discover the different plans to join our community"
        imageSrc={[icon1, icon2, icon3, icon4]}
        buttonText="Compare our plans"
        buttonLink="/priceandplans"
        backgroundColor="#F5F2EB"
        titleColor="#102030"
        imageSize="150px"
      />
      {/* firstsection */}
      <ThirdSection data={data?.data?.carousel} />

      <ExploreSection />
      {/* second section */}
      <FifthSection data={data?.data?.carousel} />
      {/* third section */}
      <LearnMoreSection data={data?.data?.carousel} />
      {/* fouth section */}
      <ContactSection data={data?.data?.carousel} />
      {/* Faq Section */}
      <FaqSection data={data?.data?.faqList} />
    </div>
  );
};

export default GetStarted;
