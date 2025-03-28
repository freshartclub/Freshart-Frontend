import { useNavigate } from "react-router-dom";
import banner from "../../assets/Rectangle 89.png";
import Button from "../ui/Button";
import { imageUrl } from "../utils/baseUrls";
const BannerSection = ({ data }) => {
  const navigate = useNavigate();
  const handleProceed = () => {
    navigate("/signup");
  };

  const getContent = data.find((item, i) => item?.type === "Main-Banner");

  const stripHtmlTags = (text) => {
    const paragraphs = text
      .split(/<\/?p>/g)
      .filter((part) => part.trim() !== "");
    return paragraphs;
  };

  const paragraphs = stripHtmlTags(getContent?.content);

  const handleGuestAcess = () => {
    navigate("/home");
  };

  return (
    <div
      className="h-screen bg-cover bg-black bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url("${imageUrl}/users/${getContent?.carouselImg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto sm:px-6 px-3">
        <div className="xl:w-[60%] lg:w-[70%] mx-auto pt-[0px] text-white text-center">
          <h1 className="md:text-[80px] text-[50px] capitalize font-semibold">
            {getContent?.title}
          </h1>
          <h1 className="md:text-[80px] text-[50px] capitalize font-semibold">
            {getContent?.subtitle}
          </h1>

          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[18px] sm:mx-10 sm:mb-6 mb-2">
              {paragraph}
            </p>
          ))}

          <div className="bg-white flex justify-between sm:mx-24 px-2 py-1 rounded-full ">
            <input
              type="text"
              placeholder="email,phone or invite code"
              className="ml-2 text-black w-full"
            />
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
            onClick={handleGuestAcess}
            className="mt-10"
          >
            {getContent?.link?.text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
