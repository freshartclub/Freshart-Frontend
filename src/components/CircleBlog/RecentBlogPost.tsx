import Header from "../ui/Header";
import P from "../ui/P";
import recent1 from "./assets/recentblog3.png";
import recent4 from "./assets/recent4.png";
import recent3 from "./assets/recentblog1.png";
import recent2 from "./assets/recentblog2.png";

const RecentBlogPost = () => {
  return (
    <div className="container mx-auto sm:px-6 px-3 md:mt-20 mt-10">
      <Header
        variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
        className="mb-10"
      >
        Recent blog posts
      </Header>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <img src={recent1} alt="recent1" className="" />
          <div className="mt-7">
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="text-[#35637C]"
            >
              Olivia Rhye • 1 Jan 2023
            </P>
            <Header
              variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
              className="mt-2"
            >
              UX review presentations
            </Header>
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="my-4"
            >
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </P>
            <div className="flex">
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="bg-[#F8F9FC] text-[#6941C6] px-3 py-1 rounded-full mr-2 mb-2"
              >
                Design
              </P>
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="bg-[#F8F9FC] text-[#6941C6] px-3 py-1 rounded-full mr-2 mb-2"
              >
                Research
              </P>
              <P
                variant={{ size: "base", theme: "dark", weight: "medium" }}
                className="bg-[#F8F9FC] text-[#6941C6] px-3 py-1 rounded-full mr-2 mb-2"
              >
                Presentation
              </P>
            </div>
          </div>
        </div>

        <div className="">
          <div className="grid sm:grid-cols-2 grid-cols-1 md:justify-between justify-center items-center">
            <img src={recent3} alt="" className="object-cover" />
            <div className="sm:ml-4 ml-0 mt-4 md:mt-0">
              <P
                variant={{ size: "small", theme: "dark", weight: "medium" }}
                className="text-[#35637C]"
              >
                Phoenix Baker • 1 Jan 2023
              </P>
              <P
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="mt-2 mb-3"
              >
                Migrating to Linear 101
              </P>
              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                Linear helps streamline software projects, sprints, tasks, and
                bug tracking. Here’s how to get...
              </P>
              <div className="flex">
                <div className="flex mt-5">
                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="bg-[#F8F9FC] text-[#6941C6] px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    Design
                  </P>
                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="bg-[#FDF2FA] text-[#C11574] px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    Research
                  </P>
                </div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 md:justify-between justify-center items-center mt-5">
            <img
              src={recent2}
              alt="sdsdsdsdasdsdsdsdasd"
              className="object-cover"
            />
            <div className="sm:ml-4 ml-0 mt-4 md:mt-0">
              <P
                variant={{ size: "small", theme: "dark", weight: "medium" }}
                className="text-[#35637C]"
              >
                Lana Steiner • 1 Jan 2023
              </P>
              <P
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="mt-2 mb-3"
              >
                Building your API Stack
              </P>
              <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
                The rise of RESTful APIs has been met by a rise in tools for
                creating, testing, and manag...
              </P>
              <div className="flex">
                <div className="flex mt-5">
                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="bg-[#F8F9FC] text-[#6941C6] px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    Design
                  </P>
                  <P
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="bg-[#FDF2FA] text-[#C11574] px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    Research
                  </P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-4 mt-10">
        <img src={recent4} alt="recent1" className="" />
        <div>
          <P
            variant={{ size: "small", theme: "dark", weight: "medium" }}
            className="text-[#35637C]"
          >
            Olivia Rhye • 1 Jan 2023
          </P>
          <Header
            variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
            className="my-2"
          >
            Grid system for better Design User Interface
          </Header>
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            A grid system is a design tool used to arrange content on a webpage.
            It is a series of vertical and horizontal lines that create a matrix
            of intersecting points, which can be used to align and organize page
            elements. Grid systems are used to create a consistent look and feel
            across a website, and can help to make the layout more visually
            appealing and easier to navigate.
          </P>
          <div className="flex">
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="bg-[#F8F9FC] text-[#6941C6] px-3 py-1 rounded-full mr-2 mt-3"
            >
              Design
            </P>
            <P
              variant={{ size: "base", theme: "dark", weight: "medium" }}
              className="bg-[#FDF2FA] text-[#C11574] px-3 py-1 rounded-full mr-2 mt-3"
            >
              Interface
            </P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogPost;
