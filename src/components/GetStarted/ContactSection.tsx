import CommonComponent from "./CommonComponent";
import image from "../../assets/color.png";
const ContactSection = () => {
  return (
    <div className="bg-[#102030] py-16">
      <CommonComponent
        className="text-white"
        image={image}
        paragraph="If you are an artist and want to be part of our community, contact us. Take advantage now, all our services at no cost!"
        button="Contact us"
        buttonClassName="!bg-[#F16E5B]"
      />
    </div>
  );
};

export default ContactSection;
