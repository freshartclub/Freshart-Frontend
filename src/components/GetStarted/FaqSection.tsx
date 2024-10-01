import Accordion from "./Accordion";
import side from "../../assets/painting with strokes.png";

const faqs = [
  {
    title: "What is FRESH ART CLUB?",
    content:
      "Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.",
  },
  {
    title: "Who can use FRESH ART CLUB?",
    content:
      "You can install Tailwind CSS via npm or yarn. Follow the installation guide on the official website.",
  },
  {
    title: "Can I use FRESH ART CLUB in my platform?",
    content:
      "Yes, Tailwind CSS can be used with React and many other frameworks.",
  },
  {
    title: "Could I gift Fresh Art Club services or products?",
    content:
      "Yes, Tailwind CSS can be used with React and many other frameworks.",
  },
  {
    title: "How much it cost FRESH ART CLUB?",
    content:
      "Yes, Tailwind CSS can be used with React and many other frameworks.",
  },
  {
    title: "How can I access FRESH ART CLUB?",
    content:
      "Yes, Tailwind CSS can be used with React and many other frameworks.",
  },
  {
    title: "What is included on FRESH ART CLUB subscription plans?",
    content:
      "Yes, Tailwind CSS can be used with React and many other frameworks.",
  },
  {
    title: "Whats is art based subscription?",
    content:
      "Yes, Tailwind CSS can be used with React and many other frameworks.",
  },
  {
    title: "How I can cancel my FRESH ART CLUB subscription?",
    content:
      "Yes, Tailwind CSS can be used with React and many other frameworks.",
  },
];

const FaqSection = () => {
  return (
    <div className="bg-[#F5F2EB]">
      <img src={side} alt="" className="-mt-6" />
      <div className="container mx-auto md:px-6 px-3">
        <div className="py-10 w-[70%] m-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h1>
          {faqs.map((faq, index) => (
            <Accordion key={index} title={faq.title} content={faq.content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
