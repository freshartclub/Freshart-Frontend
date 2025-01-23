import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { useGetKbDataBase } from "./http/useGetKbDataBase";

const KbDatabase = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const { data, isLoading } = useGetKbDataBase();
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="relative h-[100vh]">
      <span
        onClick={() => navigate(-1)}
        className="absolute left-10 top-8 cursor-pointer"
      >
        <FaArrowLeft />
      </span>
      <div className="container mx-auto p-5 max-w-3xl">
        <h1 className="text-lg md:text-2xl font-bold mb-6">KB Database</h1>
        <div className="space-y-4">
          {data?.data &&
            data?.data?.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 hover:text-gray-900 "
                  onClick={() => toggleFAQ(index)}
                >
                  {item?.kbTitle}
                  <span className="ml-2">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div
                    className="p-4 font-medium text-gray-600"
                    dangerouslySetInnerHTML={{ __html: item?.kbDesc }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KbDatabase;
