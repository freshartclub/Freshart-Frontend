import CommonComponent from "./CommonComponent";
import image from "../../assets/proces1-il 1.png";

const ThirdSection = ({ data }) => {
  const getContent = data?.find((item, i) => item?.type === "Main-First");

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

export default ThirdSection;
