import Header from "../ui/Header";
import recent1 from "./assets/recent1.png";
import recent2 from "./assets/recent2.png";
import recent3 from "./assets/recent3.png";
import recent4 from "./assets/recentblog4.png";
import recent5 from "./assets/recentblog5.png";
import recent6 from "./assets/recentblog6.png";
import arrow from "./assets/arrow-up-right.png";
import P from "../ui/P";
import { useState } from "react";
import { Pagination } from "../ui/Pagination";

const recentData = [
  {
    image: recent1,
    date: "Alec Whitten • 1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    para: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
  },
  {
    image: recent2,
    date: "Demi Wilkinson • 1 Jan 2023",
    title: "PM mental models",
    para: "Mental models are simple expressions of complex processes or relationships.",
    tags: ["Product", "Research", "Frameworks"],
  },
  {
    image: recent3,
    date: "Candice Wu • 1 Jan 2023",
    title: "What is Wireframing?",
    para: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: ["Design", "Research"],
  },
  {
    image: recent4,
    date: "Natali Craig • 1 Jan 2023",
    title: "How collaboration makes us better designers",
    para: "Collaboration can make our teams stronger, and our individual designs better.",
    tags: ["Design", "Research"],
  },
  {
    image: recent5,
    date: "Drew Cano • 1 Jan 2023",
    title: "Our top 10 Javascript frameworks to use",
    para: "JavaScript frameworks make development easy with extensive features and functionalities.",
    tags: ["Software Development", "Tools", "SaaS"],
  },
  {
    image: recent6,
    date: "Orlando Diggs • 1 Jan 2023",
    title: "Podcast: Creating a better CX Community",
    para: "Starting a community doesn’t need to be complicated, but how do you get started?",
    tags: ["Podcasts", "Customer Success"],
  },
  {
    image: recent1,
    date: "Alec Whitten • 1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    para: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
  },
  {
    image: recent2,
    date: "Demi Wilkinson • 1 Jan 2023",
    title: "PM mental models",
    para: "Mental models are simple expressions of complex processes or relationships.",
    tags: ["Product", "Research", "Frameworks"],
  },
  {
    image: recent3,
    date: "Candice Wu • 1 Jan 2023",
    title: "What is Wireframing?",
    para: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: ["Design", "Research"],
  },
  {
    image: recent1,
    date: "Alec Whitten • 1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    para: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
  },
  {
    image: recent2,
    date: "Demi Wilkinson • 1 Jan 2023",
    title: "PM mental models",
    para: "Mental models are simple expressions of complex processes or relationships.",
    tags: ["Product", "Research", "Frameworks"],
  },
  {
    image: recent3,
    date: "Candice Wu • 1 Jan 2023",
    title: "What is Wireframing?",
    para: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: ["Design", "Research"],
  },
  {
    image: recent1,
    date: "Alec Whitten • 1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    para: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
  },
  {
    image: recent2,
    date: "Demi Wilkinson • 1 Jan 2023",
    title: "PM mental models",
    para: "Mental models are simple expressions of complex processes or relationships.",
    tags: ["Product", "Research", "Frameworks"],
  },
  {
    image: recent3,
    date: "Candice Wu • 1 Jan 2023",
    title: "What is Wireframing?",
    para: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: ["Design", "Research"],
  },
  {
    image: recent1,
    date: "Alec Whitten • 1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    para: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
  },
  {
    image: recent2,
    date: "Demi Wilkinson • 1 Jan 2023",
    title: "PM mental models",
    para: "Mental models are simple expressions of complex processes or relationships.",
    tags: ["Product", "Research", "Frameworks"],
  },
  {
    image: recent3,
    date: "Candice Wu • 1 Jan 2023",
    title: "What is Wireframing?",
    para: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: ["Design", "Research"],
  },
  {
    image: recent1,
    date: "Alec Whitten • 1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    para: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
  },
  {
    image: recent2,
    date: "Demi Wilkinson • 1 Jan 2023",
    title: "PM mental models",
    para: "Mental models are simple expressions of complex processes or relationships.",
    tags: ["Product", "Research", "Frameworks"],
  },
  {
    image: recent3,
    date: "Candice Wu • 1 Jan 2023",
    title: "What is Wireframing?",
    para: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: ["Design", "Research"],
  },
];

const AllBlogPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  if (!recentData || recentData.length === 0) {
    return <div>No blog posts available.</div>;
  }

  const handleChangePage = ({ pageNumber }: any) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(recentData.length / itemsPerPage);
  const currentItems = recentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto sm:px-6 px-3 mt-20">
      <Header variant={{ size: "xl", theme: "dark", weight: "bold" }}>
        All blog posts
      </Header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="border border-[#FF536B] rounded-lg p-6 bg-white shadow-md"
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="text-[#35637C] mb-2"
            >
              {item.date}
            </P>
            <div className="flex justify-between items-center mb-4">
              <Header variant={{ size: "lg", theme: "dark", weight: "bold" }}>
                {item.title}
              </Header>
              <img src={arrow} alt="arrow" className="w-6 h-6 ml-2" />
            </div>
            <P
              variant={{ size: "base", theme: "dark", weight: "normal" }}
              className="min-h-20 mb-4"
            >
              {item.para}
            </P>
            <div className="flex flex-wrap">
              {item.tags.map((tag, tagIndex) => (
                <P
                  key={tagIndex}
                  variant={{ size: "small", theme: "dark", weight: "medium" }}
                  className="bg-[#F8F9FC] text-[#6941C6] px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {tag}
                </P>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={handleChangePage}
      />
    </div>
  );
};

export default AllBlogPost;
