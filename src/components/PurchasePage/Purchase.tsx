import { useEffect, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTechnic } from "../ArtistPanel/AddArtwork/http/useGetTechnic";
import { useGetTheme } from "../ArtistPanel/AddArtwork/http/useGetTheme";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import Button from "../ui/Button";
import Header from "../ui/Header";
import P from "../ui/P";
import { useDebounce } from "../utils/useDebounce";
import filter from "./assets/filter.png";
import CardSection from "./CardSection";
import { useGetPurchaseArtwork } from "./http/useGetPurchaseArtwork";

const Purchase = () => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedTechnic, setSelectedTechnic] = useState("");
  const [technicData, setTechnicData] = useState([]);
  const [themeData, setThemeData] = useState([]);
  const [isOpenSidePanel, setIsOpenSidePanel] = useState(false);
  const [optionOpen, setOptionOpen] = useState({
    theme: true,
    discipline: true,
    technic: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [options, setOptions] = useState({
    cursor: "",
    direction: "",
    limit: 10,
    currPage: 1,
  });

  const { data: disciplineData } = useGetDiscipline();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "subscription";

  const debounceQuery = useDebounce(query, 800);

  const { data, isLoading } = useGetPurchaseArtwork(
    type,
    debounceQuery,
    selectedTheme,
    selectedTechnic,
    selectedOption,
    options.currPage,
    options.cursor,
    options.direction,
    options.limit
  );

  const { data: techData } = useGetTechnic();
  const { data: theData } = useGetTheme();

  useEffect(() => {
    if (selectedOption) {
      const newTechnic = techData?.data
        ?.filter(
          (item) =>
            item.discipline &&
            item.discipline.some((newItem) =>
              newItem.disciplineName.includes(selectedOption)
            )
        )
        .map((item) => item.technicName);

      const newTheme = theData?.data
        ?.filter(
          (item) =>
            item.discipline &&
            item.discipline.some((newItem) =>
              newItem.disciplineName.includes(selectedOption)
            )
        )
        .map((item) => item.themeName);

      setTechnicData(newTechnic || []);
      setThemeData(newTheme || []);
    }
  }, [selectedOption, techData, theData]);

  useEffect(() => {
    if (data) {
      setNextCursor(data.nextCursor || "");
      setPrevCursor(data.prevCursor || "");
    }
  }, [data]);

  return (
    <>
      <div className="container mx-auto sm:px-6 px-3">
        <div className="flex justify-between my-4 items-center">
          <div className="relative w-full">
            <button
              className="lg:hidden p-2"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <FaBars size={24} />
            </button>

            <div
              className={`${
                isOpen ? "block" : "hidden"
              } lg:flex flex-col lg:flex-row items-start lg:items-center mt-3 lg:mt-0
               space-y-2 lg:space-y-0 lg:space-x-4 bg-white absolute lg:relative z-0 md:w-[40%] sm:w-[50%]
                lg:w-auto shadow-lg lg:shadow-none p-4 lg:p-0`}
            >
              {disciplineData &&
                disciplineData?.data?.map((item, index: number) => (
                  <span
                    onClick={() => setSelectedOption(item.disciplineName)}
                    key={index}
                    className="group font-semibold text-black cursor-pointer"
                  >
                    <div className="relative inline-block xl:px-2 lg:px-1">
                      {item.disciplineName}
                    </div>
                  </span>
                ))}
            </div>
          </div>

          <div className="flex gap-4 ">
            <Button
              variant={{
                fontSize: "md",
                theme: "dark",
                fontWeight: "500",
                rounded: "full",
              }}
              onClick={() => navigate("/explore")}
            >
              Explore
            </Button>

            <Button
              variant={{
                fontSize: "md",
                theme: "dark",
                fontWeight: "500",
                rounded: "full",
              }}
              onClick={() => navigate("/discovery_art")}
            >
              Discovery
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto sm:px-6 px-3">
        <div
          className={`fixed top-0 left-0 h-screen overflow-y-auto bg-white text-black w-80 transform ${
            isOpenSidePanel ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-20`}
        >
          <div className="flex items-center justify-between border-b border-gray-400 px-4 py-3">
            <GiHamburgerMenu
              className="cursor-pointer block"
              size="2em"
              onClick={() => setIsOpenSidePanel((prev) => !prev)}
            />

            <span className="uppercase cursor-pointer bg-[#102031] text-white rounded py-1 px-3">
              Clear
            </span>
          </div>

          <div className="flex p-4 pt-2 flex-col gap-3">
            <div className="">
              <Button
                id="dropdownDividerButton"
                onClick={() =>
                  setOptionOpen((prev) => ({
                    ...prev,
                    discipline: !prev.discipline,
                  }))
                }
                className="flex justify-between w-full items-center"
                type="button"
                variant={{
                  fontSize: "base",
                  theme: "black",
                  fontWeight: "600",
                }}
              >
                Discipline
                <MdKeyboardArrowDown size={20} />
              </Button>

              {optionOpen.discipline ? (
                <div
                  id="dropdownDivider"
                  className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
                >
                  {disciplineData &&
                    disciplineData?.data?.map((item, index: number) => (
                      <span
                        className={`cursor-pointer ${
                          selectedOption == item?.disciplineName
                            ? "bg-gray-300 text-black px-1 rounded"
                            : ""
                        }`}
                        onClick={() => setSelectedOption(item.disciplineName)}
                        key={index}
                      >
                        {item.disciplineName}
                      </span>
                    ))}
                </div>
              ) : null}
            </div>

            {selectedOption ? (
              <>
                <div className="">
                  <Button
                    id="dropdownDividerButton"
                    onClick={() =>
                      setOptionOpen((prev) => ({
                        ...prev,
                        theme: !prev.theme,
                      }))
                    }
                    className="flex justify-between w-full items-center"
                    type="button"
                    variant={{
                      fontSize: "base",
                      theme: "black",
                      fontWeight: "600",
                    }}
                  >
                    Theme
                    <MdKeyboardArrowDown size={20} />
                  </Button>

                  {optionOpen.theme ? (
                    <div
                      id="dropdownDivider"
                      className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
                    >
                      {themeData && themeData.length > 0 ? (
                        themeData.map((item, i: number) => (
                          <span
                            className={`cursor-pointer ${
                              selectedTheme == item
                                ? "bg-gray-300 text-black px-1 rounded"
                                : ""
                            }`}
                            key={i}
                            onClick={() => setSelectedTheme(item)}
                          >
                            {item}
                          </span>
                        ))
                      ) : (
                        <span>No Theme Found</span>
                      )}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <Button
                    id="dropdownDividerButton"
                    onClick={() =>
                      setOptionOpen((prev) => ({
                        ...prev,
                        technic: !prev.technic,
                      }))
                    }
                    className="flex justify-between w-full items-center"
                    type="button"
                    variant={{
                      fontSize: "base",
                      theme: "black",
                      fontWeight: "600",
                    }}
                  >
                    Technic
                    <MdKeyboardArrowDown size={20} />
                  </Button>

                  {optionOpen.technic ? (
                    <div
                      id="dropdownDivider"
                      className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
                    >
                      {technicData && technicData.length > 0 ? (
                        technicData.map((item, i: number) => (
                          <span
                            className={`cursor-pointer ${
                              selectedTechnic == item
                                ? "bg-gray-300 text-black px-1 rounded"
                                : ""
                            }`}
                            key={i}
                            onClick={() => setSelectedTechnic(item)}
                          >
                            {item}
                          </span>
                        ))
                      ) : (
                        <span>No Technic Found</span>
                      )}
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}

            <div className="mb-6 lg:px-4 px-1">
              <Header
                variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                className="lg:py-3 py-3"
              >
                Size
              </Header>
              <div className="flex">
                <P variant={{ size: "small", theme: "dark", weight: "light" }}>
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

        <div className="flex items-center justify-between flex-wrap w-full gap-6 my-10">
          <div className="flex xl:flex-row flex-col xl:w-[25%] lg:w-[20%] gap-2 items-center">
            <span
              className="flex gap-2 bg-[#102031] text-white rounded-full cursor-pointer px-4 py-2"
              onClick={() => setIsOpenSidePanel((prev) => !prev)}
            >
              <img src={filter} alt="filter" />
              <P variant={{ size: "base", theme: "light", weight: "normal" }}>
                Filter
              </P>
            </span>
            <P variant={{ theme: "dark", weight: "medium", size: "small" }}>
              Showing{" "}
              {`${(options.currPage - 1) * options.limit + 1} - ${Math.min(
                options.currPage * options.limit,
                data?.totalCount
              )} of ${data?.totalCount}`}{" "}
              results
            </P>
          </div>
          <div className=" relative flex items-center justify-end rounded-full border border-zinc-300 ">
            <input
              type="text"
              placeholder="Search by Artwork & Artistname"
              className="xl:pl-10 pl-4 pr-4 py-2 w-full rounded-full outline-none"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <span
              className="absolute  left-3 cursor-pointer"
              // onClick={() => search({ target: { value: query } })}
            >
              <FaSearch className="w-5 h-5" />
            </span>
          </div>
          <div className="flex flex-wrap lg:gap-2 gap-4 item-center">
            <select
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setSelectedTechnic("");
                setSelectedTheme("");
              }}
              value={selectedOption}
              className="border outline-none border-[#f78494] rounded-full flex justify-between items-center py-2 px-4 text-center cursor-pointer bg-white hover:border-[#f78494]"
            >
              <option value="">Select Discipline</option>
              {disciplineData?.data &&
                disciplineData?.data.length > 0 &&
                disciplineData?.data.map((item, i: number) => (
                  <option key={i} value={item.disciplineName}>
                    {item.disciplineName}
                  </option>
                ))}
            </select>

            <select
              onChange={(e) => setSelectedTechnic(e.target.value)}
              value={selectedTechnic}
              className="border outline-none border-[#f78494] rounded-full flex justify-between items-center py-2 px-4 text-center cursor-pointer bg-white hover:border-[#f78494]"
            >
              <option value="">Select Technic</option>
              {technicData &&
                technicData.length > 0 &&
                technicData.map((item, i: number) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
            </select>

            <select
              onChange={(e) => setSelectedTheme(e.target.value)}
              value={selectedTheme}
              className="border outline-none border-[#f78494] rounded-full flex justify-between items-center py-2 px-4 text-center cursor-pointer bg-white hover:border-[#f78494]"
            >
              <option value="">Select Theme</option>
              {themeData &&
                themeData.length > 0 &&
                themeData.map((item, i: number) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <CardSection data={data} isLoading={isLoading} />

        <div className="flex my-5 container md:px-10 px-3 justify-between">
          <div>
            <span className="text-[14px] font-medium">Rows per page:</span>
            <select
              className="outline-none"
              onChange={(e) =>
                setOptions({
                  ...options,
                  cursor: "",
                  currPage: 1,
                  limit: e.target.value,
                })
              }
              value={options.limit}
            >
              {[5, 10, 25].map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[14px] font-medium">
              {`${(options.currPage - 1) * options.limit + 1} - ${Math.min(
                options.currPage * options.limit,
                data?.totalCount
              )} of ${data?.totalCount}`}
            </span>
            <span className="flex gap-2 items-center">
              <MdArrowBackIosNew
                className={`cursor-pointer bg-slate-200 rounded-full p-2 text-[2rem] ${
                  !prevCursor || isLoading
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  setOptions({
                    ...options,
                    cursor: prevCursor,
                    direction: "prev",
                    currPage: options.currPage === 1 ? 1 : options.currPage - 1,
                  });
                }}
              />
              <MdArrowForwardIos
                className={`cursor-pointer bg-slate-200 rounded-full p-2 text-[2rem] ${
                  !nextCursor || isLoading
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  setOptions({
                    ...options,
                    cursor: nextCursor,
                    direction: "next",
                    currPage: options.currPage + 1,
                  });
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchase;
