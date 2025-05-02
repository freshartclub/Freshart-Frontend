import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetCollections } from "./http/useGetCollections";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../utils/useDebounce";
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "react-icons/io5";

const MotionDiv = motion.div;

const ViewSection = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState(300);
  const [search, setSearch] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [expanded, setExpanded] = useState({});

  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading } = useGetCollections(debounceSearch, currPage);

  useEffect(() => {
    if (data) setCurrPage(data.currentPage || 1);
  }, [search, data]);

  useEffect(() => {
    const handleResize = () => {
      setLength(window.innerWidth <= 966 ? 250 : 300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateHTML = (html, maxLength) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    let currentLength = 0;
    let truncatedHTML = "";
    const stack = [];

    for (const node of tempDiv.childNodes) {
      if (currentLength >= maxLength) break;

      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent || "";
        if (currentLength + textContent.length > maxLength) {
          truncatedHTML +=
            textContent.slice(0, maxLength - currentLength) + "...";
          break;
        } else {
          truncatedHTML += textContent;
          currentLength += textContent.length;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        const tagName = element.tagName.toLowerCase();

        truncatedHTML += `<${tagName}`;
        for (const attr of element.attributes) {
          truncatedHTML += ` ${attr.name}="${attr.value}"`;
        }
        truncatedHTML += ">";
        stack.push(tagName);

        const innerText = element.innerText;
        if (currentLength + innerText.length > maxLength) {
          truncatedHTML +=
            innerText.slice(0, maxLength - currentLength) + "...";
          break;
        } else {
          truncatedHTML += innerText;
          currentLength += innerText.length;
        }
      }
    }

    while (stack.length) {
      truncatedHTML += `</${stack.pop()}>`;
    }

    return truncatedHTML;
  };

  const renderTags = (tags) => {
    if (!tags?.length) return null;
    return tags.map((tag, index) => (
      <span className="text-gray-500 text-xs" key={index}>
        {tag}
        {index < tags.length - 1 && " | "}
      </span>
    ));
  };

  return (
    <div className="2xl:w-[70%] xl:w-[80%] w-full mx-auto my-10 px-4">
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col  justify-center gap-6">
          {data?.data?.length > 0 ? (
            data.data.map((item, i) => {
              const isExpanded = expanded[item._id];
              const sanitizedHTML = DOMPurify.sanitize(item.collectionDesc);
              const truncatedHTML = truncateHTML(sanitizedHTML, length);

              return (
                <MotionDiv
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  onClick={() => navigate(`/collections/${item._id}`)}
                  className={`w-full  md:flex ${
                    i % 2 !== 0 ? "md:flex-row-reverse" : ""
                  } overflow-hidden border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <img
                    src={`${imageUrl}/users/${item.collectionFile}`}
                    alt="collection"
                    className="md:w-[55%] md:h-[23rem] h-[15rem] object-cover"
                  />

                  <div className="md:w-[45%] p-5">
                    <Header
                      variant={{ size: "xl", weight: "bold", theme: "dark" }}
                      className="text-lg uppercase mb-4 leading-tight"
                    >
                      {item.collectionName}
                    </Header>

                    <div className="text-gray-700 text-sm">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: isExpanded ? sanitizedHTML : truncatedHTML,
                        }}
                      />
                      {sanitizedHTML.length > 1000 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(item._id);
                          }}
                          className="text-blue-500 mt-2 hover:underline text-xs"
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>

                    <div className="flex items-center mt-6 gap-3">
                      <img
                        src={`${imageUrl}/users/${item?.expertDetails?.expertImg}`}
                        alt="curator"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <span className="text-sm text-gray-700">
                          Curated by <span className="font-semibold">{item?.expertDetails?.createdBy}</span>
                        </span>
                        <div className="mt-1 text-xs">{renderTags(item.collectionTags)}</div>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              );
            })
          ) : (
            <p className="text-gray-500 text-center w-full">No collections found.</p>
          )}
        </div>
      )}

      <div className="flex justify-center items-center mt-10 gap-2">
        <button
          onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
          disabled={data?.currentPage === 1}
          className={`p-2 border rounded-full transition-all duration-200 ${
            data?.currentPage === 1
              ? "border-gray-300 opacity-50 cursor-not-allowed"
              : "bg-[#102031] text-white hover:bg-[#1a3a5f]"
          }`}
        >
          <IoChevronBackOutline />
        </button>

        {[...Array(data?.totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isEdge =
            pageNumber === 1 ||
            pageNumber === data.totalPages ||
            Math.abs(currPage - pageNumber) <= 2;

          if (isEdge) {
            return (
              <button
                key={index}
                onClick={() => setCurrPage(pageNumber)}
                className={`px-3 py-1 rounded-full transition-all text-sm font-medium ${
                  currPage === pageNumber
                    ? "bg-[#ff725e] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            (pageNumber === currPage - 3 && currPage > 4) ||
            (pageNumber === currPage + 3 && currPage < data.totalPages - 3)
          ) {
            return <span key={index}>...</span>;
          }
          return null;
        })}

        <button
          onClick={() =>
            setCurrPage((prev) => Math.min(prev + 1, data.totalPages))
          }
          disabled={data?.currentPage === data?.totalPages}
          className={`p-2 border rounded-full transition-all duration-200 ${
            data?.currentPage === data?.totalPages
              ? "border-gray-300 opacity-50 cursor-not-allowed"
              : "bg-[#102031] text-white hover:bg-[#1a3a5f]"
          }`}
        >
          <IoChevronForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default ViewSection;