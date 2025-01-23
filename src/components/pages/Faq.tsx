import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { useGetFaq } from "./http/useGetFaq";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const navigate = useNavigate();
  const { data, isLoading } = useGetFaq();

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative h-[100vh]">
      <span
        onClick={() => handleBack()}
        className="absolute left-10 top-8 cursor-pointer"
      >
        <FaArrowLeft />
      </span>
      <div className="container  mx-auto p-5 max-w-3xl">
        <h1 className="text-lg md:text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {data?.data &&
            data?.data?.length > 0 &&
            data?.data?.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 hover:text-gray-900 "
                  onClick={() => toggleFAQ(index)}
                >
                  {item?.faqQues}
                  <span className="ml-2">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-4 font-medium text-gray-600">
                    {item?.faqAns}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
