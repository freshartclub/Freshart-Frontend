import { useNavigate } from "react-router-dom";
import banner from "../../assets/Rectangle 89.png";
import Button from "../ui/Button";
const BannerSection = () => {
  const navigate = useNavigate();
  const handleProceed = () => {
    navigate("/signup");
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="container mx-auto sm:px-6 px-3">
        <div className="xl:w-[60%] lg:w-[70%] mx-auto pt-[0px] text-white text-center">
          <h1 className="md:text-[80px] text-[50px] capitalize font-semibold">
            Enjoy art as you never did before.
          </h1>
          <p className="text-[18px] sm:mx-10 sm:mb-6 mb-2">
            Join the first worldwide art subscription-based platform.
          </p>
          <p className="mb-4">
            Access our large and exclusive catalog of artworks for subscription
            or purchase
          </p>
          <div className="bg-white flex justify-between sm:mx-24 px-2 py-1 rounded-full ">
            <input
              type="text"
              placeholder="email,phone or invite code"
              className="ml-2 text-black w-full"
            ></input>
            <Button
              onClick={handleProceed}
              className="px-6 py-2 rounded-full bg-[#FF536B] text-white"
            >
              Process
            </Button>
          </div>

          <Button
            variant={{
              theme: "dark",
              rounded: "full",
              fontWeight: "500",
              thickness: "moderate",
              fontSize: "base",
            }}
            className="mt-10"
          >
            Let me take a look, Guest Access!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
