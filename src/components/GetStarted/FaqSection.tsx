import Accordion from "./Accordion";
import side from "../../assets/painting with strokes.png";


const FaqSection = ({ data }) => {
  return (
    <div className="bg-[#F5F2EB]">
      <img src={side} alt="" className="-mt-6" />
      <div className="container mx-auto md:px-6 px-3">
        <div className="py-10 w-[70%] m-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h1>
          {data?.map((faq, index) => (
            <Accordion key={index} title={faq.faqQues} content={faq.faqAns} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
