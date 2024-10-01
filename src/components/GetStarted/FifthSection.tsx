import CommonComponent from "./CommonComponent";
import image from "../../assets/circles-il 1.png";

const FifthSection = () => {
  return (
    <div className="py-10">
      <CommonComponent
        className="md:!flex-row-reverse"
        image={image}
        paragraph="Connect with other art lovers, discover new talents, expand your knowledge and feel part of the community through public or private circles"
        button="Discover now"
      />
    </div>
  );
};

export default FifthSection;
