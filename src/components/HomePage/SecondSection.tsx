import card1 from "../../assets/Image (3).png";
import card2 from "../../assets/Image (4).png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";

const SecondSection = () => {
  const dark = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const redirectToPurchasePage = () => {
    navigate("/all-artworks?type=purchase");
    window.scrollTo(0, 0);
  };

  const redirectToSubscriptionPage = () => {
    navigate("/all-artworks?type=subscription");
    window.scrollTo(0, 0);
  };

  return (
    <div className={`container mx-auto md:px-6 px-3 ${dark ? "bg-gray-900" : "bg-white"}`}>
      <div className="flex flex-col sm:flex-row justify-between mt-10">
        <div className="w-full relative md:mr-4">
          <img src={card1} alt="" className="w-full rounded-lg" />
          <div className="absolute xl:top-24 lg:top-8 md:top-8 top-4 lg:left-14 left-5 xl:w-[40%] lg:w-[50%] md:w-full w-[85%] text-white">
            <p className="uppercase text-[14px] xl:mb-2 mb-0 animate-fadeIn">Lending ARTWORKS</p>

            <h1 className="lg:text-[36px] md:text-[30px] text-[25px] font-semibold">Subscribe artwork.</h1>

            <Button
              variant={{
                rounded: "full",
                fontWeight: "500",
                thickness: "thick",
                fontSize: "base",
              }}
              className={`mt-3 uppercase !bg-[#F16E5B] hover:!bg-[#e05a48]`}
              onClick={redirectToSubscriptionPage}
            >
              Subscribe now
            </Button>
          </div>
        </div>

        <div className="w-full relative sm:ml-2 md:ml-4 mt-6 sm:mt-0">
          <img src={card2} alt="" className="w-full rounded-lg" />
          <div className="absolute xl:top-24 lg:top-8 md:top-8 top-4 lg:left-14 left-5 xl:w-[40%] lg:w-[50%] md:w-full w-[85%] text-white">
            <p className="uppercase text-[14px] xl:mb-2 mb-0">BECOME OWNER</p>
            <h1 className="lg:text-[36px] md:text-[30px] text-[25px] font-semibold">Purchase Artwork.</h1>
            <Button
              variant={{
                rounded: "full",
                fontWeight: "500",
                thickness: "thick",
                fontSize: "base",
              }}
              className={`mt-3 uppercase !bg-[#35637C] hover:!bg-[#2a5167]`}
              onClick={redirectToPurchasePage}
            >
              Get It Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
