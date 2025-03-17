import CommonComponent from "./CommonComponent";
import image from "../../assets/circles-il 1.png";

const FifthSection = ({ data }) => {
  const getContent = data?.find((item, i) => item?.type === "Main-Second");
  const imageSide = "left";

  return (
    <div className="py-20">
      <CommonComponent
        paragraph={getContent?.content}
        button={getContent?.link?.text}
        image={getContent?.carouselImg}
        imageSide={imageSide}
      />
    </div>
  );
};

export default FifthSection;
