import CommonComponent from "./CommonComponent";
import image from "../../assets/Images-cuate 1.png";

const LearnMoreSection = ({ data }) => {
  const getContent = data?.find((item, i) => item?.type === "Main-Third");

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

export default LearnMoreSection;
