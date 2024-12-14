import React, { useState } from "react";
import { useGetFaq } from "./http/useGetFaq";
import Loader from "../ui/Loader";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const navigate = useNavigate();
  const { data, isLoading } = useGetFaq();

  const faqData = [
    {
      question: "How do I create an artwork listing?",
      answer:
        "To create an artwork listing, navigate to the 'Artwork Management' section from the dashboard. Click 'Add New', fill in the required details like title, description, and price, and upload high-quality images.",
    },
    {
      question: "What payment methods does FreshArt support?",
      answer:
        "FreshArt supports all major payment methods, including credit/debit cards, PayPal, and bank transfers. Payments are securely processed through industry-standard gateways.",
    },
    {
      question: "Can I manage my subscription plan?",
      answer:
        "Yes, you can manage your subscription plan from the 'Subscription Plan' section. Here you can upgrade, downgrade, or cancel your plan anytime.",
    },
    {
      question: "How do I track orders?",
      answer:
        "Orders can be tracked via the 'Subscription Order' or 'Purchase Order' sections on the dashboard. You can view order status, details, and updates here.",
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes, FreshArt offers 24/7 customer support. You can reach out via the 'Help & Support' section on the dashboard for any assistance.",
    },
    {
      question: "How do I track orders?",
      answer:
        "Orders can be tracked via the 'Subscription Order' or 'Purchase Order' sections on the dashboard. You can view order status, details, and updates here.",
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes, FreshArt offers 24/7 customer support. You can reach out via the 'Help & Support' section on the dashboard for any assistance.",
    },
    {
      question: "How do I track orders?",
      answer:
        "Orders can be tracked via the 'Subscription Order' or 'Purchase Order' sections on the dashboard. You can view order status, details, and updates here.",
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes, FreshArt offers 24/7 customer support. You can reach out via the 'Help & Support' section on the dashboard for any assistance.",
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative">
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
