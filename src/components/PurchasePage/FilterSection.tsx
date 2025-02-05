import { useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import CustomSelect from "../utils/CustomSelect";
import filter from "./assets/filter.png";
import CardSection from "./CardSection";

const FilterSection = ({
  query,
  search,
  setSelectedOption,
  selectedOption,
  techData,
  themeData,
  setSelectedTheme,
  selectedTheme,
  selectedTechnic,
  setSelectedTechnic,
  isLoading,
  data,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isThemeOpen, setIsThemeOpen] = useState(true);

  const { data: disciplineData } = useGetDiscipline();

  const columnOptions = disciplineData?.data?.map((discipline) => ({
    value: discipline.disciplineName,
    label: discipline.disciplineName,
  }));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  return (
    <>
      <div className="container mx-auto sm:px-6 px-3">
        <div className="flex">
          <div
            className={`fixed top-0 left-0 h-screen bg-white text-black 2xl:w-[20%] xl:w-[25%] lg:w-[30%] transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-20`}
          >
            <Button
              variant={{ fontSize: "sm", theme: "light", fontWeight: "500" }}
              onClick={toggleSidebar}
              className="absolute top-3 right-4 focus:outline-none"
            >
              {isOpen ? (
                <div className="flex">
                  <FaTimes />
                  <P
                    variant={{ size: "small", theme: "dark", weight: "medium" }}
                    className="ml-2"
                  >
                    Close
                  </P>
                </div>
              ) : (
                <FaBars />
              )}
            </Button>

            <div className="py-5 px-2 border-b border-gray-700">
              <Button
                variant={{
                  fontSize: "sm",
                  theme: "dark",
                  rounded: "full",
                  fontWeight: "500",
                }}
                className="uppercase"
              >
                Clear
              </Button>
            </div>

            <div className="flex-1 p-4">
              <ul>
                <Link to="" className="mb-6">
                  <Button
                    id="dropdownDividerButton"
                    onClick={toggleDropdown}
                    className="text-center flex 3xl:gap-48 gap-36 items-center pl-0"
                    type="button"
                    variant={{
                      fontSize: "base",
                      theme: "black",
                      fontWeight: "600",
                    }}
                  >
                    Categories
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </Button>

                  {isDropdownOpen && (
                    <div
                      id="dropdownDivider"
                      className="z-10 bg-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDividerButton"
                      >
                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            All Art Prints
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Canvas Prints
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Colouring Posters
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Gallery Prints
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Posters
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Uncategorized
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Wall Art
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Wood Prints
                          </a>
                        </Link>
                      </ul>
                    </div>
                  )}
                </Link>

                <Link to="" className="mb-6">
                  <Button
                    id="dropdownDividerButton"
                    onClick={toggleTheme}
                    className="  text-center flex gap-44 items-center pl-0"
                    type="button"
                    variant={{
                      fontSize: "base",
                      theme: "black",
                      fontWeight: "600",
                    }}
                  >
                    Theme
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </Button>

                  {isThemeOpen && (
                    <div
                      id="dropdownDivider"
                      className="z-10 bg-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDividerButton"
                      >
                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Animal
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Architecture
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Black & White
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Fashion
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Food
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Illustration
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Kids
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Kitchen
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Nature
                          </a>
                        </Link>

                        <Link to="">
                          <a
                            href="#"
                            className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Photography
                          </a>
                        </Link>
                      </ul>
                    </div>
                  )}
                </Link>
              </ul>

              <div className="mb-6 lg:px-4 px-1">
                <Header
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  className="lg:py-3 py-3"
                >
                  Size
                </Header>
                <div className="flex">
                  <P
                    variant={{ size: "small", theme: "dark", weight: "light" }}
                  >
                    Width
                  </P>
                  <span className="text-[11px] mt-2">(in Centimeter)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700 mt-4">
                  <div className="bg-[#FF536B] h-1 rounded-full w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap w-full gap-6  my-10">
          <div className="flex xl:flex-row flex-col xl:w-[25%] lg:w-[20%] gap-2 items-center">
            <Button
              variant={{
                fontSize: "md",
                theme: "dark",
                fontWeight: "500",
                rounded: "full",
              }}
              className="flex gap-2 px-4 py-2"
              onClick={toggleSidebar}
            >
              <img src={filter} alt="filter" />
              <P variant={{ size: "base", theme: "light", weight: "normal" }}>
                Filter
              </P>
            </Button>
            <P
              variant={{ theme: "dark", weight: "medium" }}
              className="xl:text-base md:text-sm"
            >
              Showing 1–16 of 32 results
            </P>
          </div>
          <div className=" relative flex items-center justify-end rounded-full border border-zinc-300 ">
            <input
              type="text"
              placeholder="Search by Artwork & Artistname"
              className="xl:pl-10 pl-4 pr-4 py-2 w-full rounded-full outline-none"
              onChange={search}
              value={query}
            />
            <span
              className="absolute  left-3 cursor-pointer"
              onClick={() => search({ target: { value: query } })}
            >
              <FaSearch className="w-5 h-5" />
            </span>
          </div>
          <div className="flex flex-wrap lg:gap-2 gap-4 item-center">
            <div className="">
              <div className="w-full ">
                <CustomSelect
                  options={columnOptions}
                  placeholder="Select Discipline"
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>
            </div>
            <div>
              <CustomSelect
                options={techData}
                placeholder="Select Technic"
                selectedOption={selectedTechnic}
                setSelectedOption={setSelectedTechnic}
              />
            </div>

            <div>
              <CustomSelect
                options={themeData}
                placeholder="Select Theme"
                selectedOption={selectedTheme}
                setSelectedOption={setSelectedTheme}
              />
            </div>
          </div>
        </div>
      </div>

      <CardSection query={query} data={data} isLoading={isLoading} />
    </>
  );
};

export default FilterSection;
