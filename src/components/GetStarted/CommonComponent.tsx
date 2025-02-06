import arrow from "../../assets/arrow.png";
import Button from "../ui/Button";
import { imageUrl } from "../utils/baseUrls";

const CommonComponent = ({
  paragraph,
  button,
  image,
  className,
  buttonClassName,
}: any) => {
  const stripHtmlTags = (text) => {
    return text.replace(/<[^>]*>/g, "");
  };
  return (
    <div
      className={`container mx-auto md:px-6 px-3 flex md:flex-row flex-col ${className} justify-between`}
    >
      <div className="flex flex-col justify-center md:text-left md:items-start items-center text-center lg:w-[47%]">
        <p className="md:text-[24px] text-[18px]">{stripHtmlTags(paragraph)}</p>
        <div className="w-48">
          <Button
            variant={{
              theme: "dark",
              rounded: "full",
              fontWeight: "500",
              thickness: "thick",
              fontSize: "base",
            }}
            className={`mt-10 flex justify-center items-center ${buttonClassName}`}
          >
            <p>{button}</p>
            <img src={arrow} alt="arrow" className="ml-2 mt-1" />
          </Button>
        </div>
      </div>

      <div className="mt-10 lg:mt-0">
        <img
          src={`${imageUrl}/users/${image}`}
          alt="illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CommonComponent;
