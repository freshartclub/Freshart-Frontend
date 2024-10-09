import CommonComponent from "./CommonComponent";
import image from "../../assets/Images-cuate 1.png";

const LearnMoreSection = () => {
  return (
    <div className="py-6">
      <CommonComponent
        className="!md:flex-row"
        paragraph="Are you a collector, buyer or investor? Acquire the best artworks without commissions."
        button="Learn More"
        image={image}
      />
    </div>
  );
};

export default LearnMoreSection;
