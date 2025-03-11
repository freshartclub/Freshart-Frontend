import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import { imageUrl } from "../utils/baseUrls";
import { useGetCollections } from "./http/useGetCollections";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../utils/useDebounce";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

const ViewSection = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState(300);
  const [search, setSearch] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading } = useGetCollections(debounceSearch, currPage);

  useEffect(() => {
    if (data) {
      setCurrPage(data?.currentPage || 1);
    }
  }, [search, data]);

  useEffect(() => {
    const handleResize = () => {
      setLength(window.innerWidth <= 966 ? 250 : 300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateHTML = (html: string, maxLength: number) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    let currentLength = 0;
    let truncatedHTML = "";
    const stack: string[] = [];

    for (const node of tempDiv.childNodes) {
      if (currentLength >= maxLength) break;

      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent || "";
        if (currentLength + textContent.length > maxLength) {
          truncatedHTML +=
            textContent.slice(0, maxLength - currentLength) + "...";
          currentLength = maxLength;
          break;
        } else {
          truncatedHTML += textContent;
          currentLength += textContent.length;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        truncatedHTML += `<${tagName}${element.attributes.length ? " " : ""}`;
        for (const attr of element.attributes) {
          truncatedHTML += `${attr.name}="${attr.value}" `;
        }
        truncatedHTML += ">";
        stack.push(tagName);

        const innerText = element.innerText;
        if (currentLength + innerText.length > maxLength) {
          truncatedHTML +=
            innerText.slice(0, maxLength - currentLength) + "...";
          currentLength = maxLength;
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

  const renderTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return null;

    return tags.map((tag, index) => (
      <span className="text-gray-500 text-xs" key={index}>
        {tag}
        {index < tags.length - 1 && " | "}
      </span>
    ));
  };

  return (
    <>
      <div className="2xl:w-[70%] xl:w-[80%] md:px-5 justify-center w-full my-10 mt-7 mx-auto">
        <div className="mb-6 relative md:mx-0 mx-4">
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="md:gap-10 gap-5 flex md:flex-col md:flex-nowrap justify-center flex-wrap">
            {data?.data && data?.data.length > 0 ? (
              data?.data.map((item, i: number) => {
                const isExpanded = expanded[item._id];
                const sanitizedHTML = DOMPurify.sanitize(item?.collectionDesc);
                const truncatedHTML = truncateHTML(sanitizedHTML, length);

                return (
                  <div
                    onClick={() => navigate(`/collections/${item._id}`)}
                    key={i}
                    className={`flex md:w-full sm:w-[46%] w-[20rem] flex-col md:flex-row gap-5 ${
                      i % 2 !== 0 ? "md:flex-row-reverse" : ""
                    } border border-zinc-300 shadow`}
                  >
                    <img
                      src={`${imageUrl}/users/${item?.collectionFile}`}
                      alt="collection"
                      className="md:w-[55%] md:h-[23rem] h-[15rem] object-cover"
                    />

                    <div className="md:w-[45%] p-5 md:pt-5 pt-0">
                      <Header
                        variant={{ size: "xl", weight: "bold", theme: "dark" }}
                        className="text-lg uppercase mb-4 leading-tight"
                      >
                        {item?.collectionName}
                      </Header>

                      <div className="text-gray-700 leading-relaxed">
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
                            className="text-blue-500 mt-2 hover:underline"
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </div>

                      <div className="flex items-center mt-6 gap-2">
                        <img
                          src={`${imageUrl}/users/${item?.expertDetails?.expertImg}`}
                          alt="curator"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col gap-0">
                          <span className="flex gap-2 items-center">
                            Curated by
                            <span className="font-semibold">
                              {item?.expertDetails?.createdBy}
                            </span>
                          </span>
                          <p className="mt-[-4px]">
                            {renderTags(item?.collectionTags)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center w-full">
                No collections found.
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mb-8 mt-0 gap-2">
        <button
          onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
          disabled={data?.currentPage === 1}
          className={`p-2 border rounded-full mr-3 ${
            data?.currentPage === 1
              ? "border border-zinc-300 opacity-50 cursor-not-allowed"
              : "bg-[#102031] text-white"
          }`}
        >
          <IoChevronBackOutline />
        </button>

        {[...Array(data?.totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isFirst = pageNumber === 1;
          const isLast = pageNumber === data?.totalPages;
          const isNearCurrent =
            Math.abs(currPage - pageNumber) <= 2 || isFirst || isLast;

          if (isNearCurrent) {
            return (
              <button
                key={index}
                onClick={() => setCurrPage(pageNumber)}
                className={`p-1 px-3 border rounded-full ${
                  currPage === pageNumber
                    ? "bg-[#ff725e] text-white"
                    : "bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            (pageNumber === currPage - 3 && currPage > 4) ||
            (pageNumber === currPage + 3 && currPage < data?.totalPages - 3)
          ) {
            return <span key={index}>...</span>;
          }
          return null;
        })}

        <button
          onClick={() =>
            setCurrPage((prev) => Math.min(prev + 1, data?.totalPages))
          }
          disabled={data?.currentPage === data?.totalPages}
          className={`p-2 border rounded-full ml-3 ${
            data?.currentPage === data?.totalPages
              ? "border border-zinc-300 opacity-50 cursor-not-allowed"
              : "bg-[#102031] text-white"
          }`}
        >
          <IoChevronForwardOutline />
        </button>
      </div>
    </>
  );
};

export default ViewSection;
