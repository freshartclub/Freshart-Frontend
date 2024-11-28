import React, { useState } from 'react'

const KbDatabase = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const data = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions.",
    },
    {
      question: "How can I update my payment method?",
      answer: "Navigate to the 'Billing' section under your account settings to update payment details.",
    },
    {
      question: "Does the platform support multiple users?",
      answer: "Yes, you can add multiple users in the 'User Management' section of your account.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach customer support via chat or email at support@example.com.",
    },
    {
      question: "How can I update my payment method?",
      answer: "Navigate to the 'Billing' section under your account settings to update payment details.",
    },
    {
      question: "Does the platform support multiple users?",
      answer: "Yes, you can add multiple users in the 'User Management' section of your account.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach customer support via chat or email at support@example.com.",
    },
  ];
  
  return (
    <div className="container mx-auto p-5 max-w-3xl">
      <h1 className="text-lg md:text-2xl font-bold mb-6">KB Database</h1>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 hover:text-gray-900 "
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <span className="ml-2">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 font-medium text-gray-600">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KbDatabase