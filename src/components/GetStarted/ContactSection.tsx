import CommonComponent from "./CommonComponent";
import image from "../../assets/color.png";
const ContactSection = ({ data }) => {
  const getContent = data?.find((item, i) => item?.type === "Main-Fourth");

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

export default ContactSection;
