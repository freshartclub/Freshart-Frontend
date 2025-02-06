import CommonComponent from "./CommonComponent";
import image from "../../assets/circles-il 1.png";

const FifthSection = ({ data }) => {
  const getContent = data?.find((item, i) => item?.type === "Main-Second");

  return (
    <div className="py-20">
      <CommonComponent
        paragraph={getContent?.content}
        button={getContent?.link?.text}
        image={getContent?.carouselImg}
      />
    </div>
  );
};

export default FifthSection;
