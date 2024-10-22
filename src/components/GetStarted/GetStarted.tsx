import { useAppSelector } from "../../store/typedReduxHooks";
import BannerSection from "./BannerSection";
import ContactSection from "./ContactSection";
import DiscoverSection from "./DiscoverSection";
import ExploreSection from "./ExploreSection";
import FaqSection from "./FaqSection";
import FifthSection from "./FifthSection";
import LearnMoreSection from "./LearnMoreSection";
import ThirdSection from "./ThirdSection";

const GetStarted = () => {
  const user = useAppSelector((state) => state.user);
  console.log(user);
  return (
    <>
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
    </>
  );
};

export default GetStarted;
