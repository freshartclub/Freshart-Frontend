import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardArrowDown,
  MdOutlineFilterList,
  MdOutlineCancel,
} from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTechnic } from "../ArtistPanel/AddArtwork/http/useGetTechnic";
import { useGetTheme } from "../ArtistPanel/AddArtwork/http/useGetTheme";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import { useGetStyle } from "../pages/http/useGetStyle";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { RenderAllPicklist } from "../utils/RenderAllPicklist";
import useClickOutside from "../utils/useClickOutside";
import { useDebounce } from "../utils/useDebounce";
import CardSection from "./CardSection";
import { useGetPurchaseArtwork } from "./http/useGetPurchaseArtwork";
import { useGetHoveredData } from "./http/useGetHoveredData";
import { imageUrl } from "../utils/baseUrls";

const Purchase = () => {
  const [showAllDiscipline, setShowAllDiscipline] = useState(false);
  const [showAllTechnic, setShowAllTechnic] = useState(false);
  const [showAllTheme, setShowAllTheme] = useState(false);
  const [showAllStyle, setShowAllStyle] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string[]>([]);
  const [selectedTechnic, setSelectedTechnic] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const defaultRanges = {
    height: { min: 0, max: 300, step: 10 },
    width: { min: 0, max: 300, step: 10 },
    depth: { min: 0, max: 300, step: 10 },
    price: { min: 0, max: 10000, step: 10 },
  };

  const [allHoverData, setAllHoverData] = useState(null);
  const [hoveredDiscipline, setHoveredDiscipline] = useState(null);

  const { data: hoverData, isLoading: hoverLoding } =
    useGetHoveredData(hoveredDiscipline);

  useEffect(() => {
    if (hoverData && !allHoverData) {
      setAllHoverData(hoverData.data);
    }
  }, [hoverData, allHoverData]);

  const filteredHoverData =
    allHoverData?.disData?.find(
      (item) => item.discipline === hoveredDiscipline?.disciplineName
    ) || null;

  console.log("Filtered Hover Data:", filteredHoverData);

  const [sliderData, setSliderData] = useState({
    height: [0, defaultRanges.height.max],
    width: [0, defaultRanges.width.max],
    depth: [0, defaultRanges.depth.max],
    price: [0, defaultRanges.price.max],
  });

  const handleSliderChange = (key, value) => {
    setSliderData((prev) => ({
      ...prev,
      [key]: [...value],
    }));
  };

  const [moreOptions, setMoreOptions] = useState({
    orientation: "",
    color: "",
    comingSoon: "",
    discount: "",
    purchase: "",
    purchaseOption: "",
  });

  const [tag, setTag] = useState("");
  const [technicData, setTechnicData] = useState([]);
  const [themeData, setThemeData] = useState([]);
  const [styleData, setStyleData] = useState([]);
  const [isOpenSidePanel, setIsOpenSidePanel] = useState(false);
  const [optionOpen, setOptionOpen] = useState({
    theme: true,
    discipline: true,
    technic: true,
    style: true,
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
  const openRef = useRef(null);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "subscription";

  const debounceQuery = useDebounce(query, 800);
  const debounceTag = useDebounce(tag, 800);

  const { data, isLoading, refetch } = useGetPurchaseArtwork(
    type,
    debounceQuery,
    selectedTheme,
    selectedTechnic,
    selectedStyle,
    selectedOption,
    moreOptions.color,
    moreOptions.comingSoon,
    moreOptions.orientation,
    moreOptions.discount,
    moreOptions.purchase,
    moreOptions.purchaseOption,
    sliderData.depth,
    sliderData.height,
    sliderData.width,
    sliderData.price,
    debounceTag,
    options.currPage,
    options.cursor,
    options.direction,
    options.limit
  );

  const { data: techData } = useGetTechnic();
  const { data: theData } = useGetTheme();
  const { data: stData } = useGetStyle();
  const colors = RenderAllPicklist("Colors");
  const commOptions = RenderAllPicklist("Commercialization Options");

  useClickOutside(openRef, () => {
    setIsOpenSidePanel(false);
  });

  useEffect(() => {
    if (selectedOption?.length) {
      const matchesAllSelectedOptions = (item) => {
        const disciplineNames =
          item.discipline?.map((newItem) => newItem.disciplineName) || [];
        return selectedOption.every((option) =>
          disciplineNames.includes(option)
        );
      };

      const newTechnic = techData?.data
        ?.filter(matchesAllSelectedOptions)
        .map((item) => item.technicName);

      const newTheme = theData?.data
        ?.filter(matchesAllSelectedOptions)
        .map((item) => item.themeName);

      const newStyle = stData?.data
        ?.filter(matchesAllSelectedOptions)
        .map((item) => item.styleName);

      setTechnicData(newTechnic || []);
      setThemeData(newTheme || []);
      setStyleData(newStyle || []);
    }
  }, [selectedOption, techData, theData, stData]);

  const filteredDisciplineData =
    disciplineData?.data?.filter((item) => item?.isMain) || [];

  const filteredTechnicData =
    technicData?.data?.filter((item) => item?.isMain) || [];
  const filteredThemeData =
    themeData?.data?.filter((item) => item?.isMain) || [];
  const filteredStyleData =
    styleData?.data?.filter((item) => item?.isMain) || [];

  const handleClear = async () => {
    setSelectedOption([]);
    setSelectedTechnic([]);
    setSelectedTheme([]);
    setSelectedStyle([]);
    setTag("");
    setOptions({ cursor: "", direction: "", limit: 10, currPage: 1 });
    setMoreOptions({
      orientation: "",
      color: "",
      comingSoon: "",
      discount: "",
      purchase: "",
      purchaseOption: "",
    });
    setSliderData({
      depth: [0, defaultRanges.depth.max],
      height: [0, defaultRanges.height.max],
      width: [0, defaultRanges.width.max],
      price: [0, defaultRanges.price.max],
    });
    await refetch();
  };

  useEffect(() => {
    if (data) {
      setNextCursor(data.nextCursor || "");
      setPrevCursor(data.prevCursor || "");
    }
  }, [data]);

  useEffect(() => {
    if (selectedOption.length == 0) {
      setSelectedOption([]);
      setSelectedTechnic([]);
      setSelectedTheme([]);
      setSelectedStyle([]);
    }
  }, [selectedOption.length]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme((prev) =>
      prev.includes(theme)
        ? prev.filter((item) => item !== theme)
        : [...prev, theme]
    );
  };

  const handleTechnicSelect = (theme: string) => {
    setSelectedTechnic((prev) =>
      prev.includes(theme)
        ? prev.filter((item) => item !== theme)
        : [...prev, theme]
    );
  };

  const handleStyleSelect = (theme: string) => {
    setSelectedStyle((prev) =>
      prev.includes(theme)
        ? prev.filter((item) => item !== theme)
        : [...prev, theme]
    );
  };

  const renderDisciplineOptions = () => {
    const dataToShow = showAllDiscipline
      ? disciplineData?.data
      : filteredDisciplineData;

    return (
      <div
        id="dropdownDivider"
        className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
      >
        {dataToShow?.map((item, index: number) => (
          <span
            className={`cursor-pointer ${
              selectedOption.includes(item.disciplineName)
                ? "bg-gray-300 text-black px-1 rounded"
                : ""
            }`}
            onClick={() => handleOptionSelect(item.disciplineName)}
            key={index}
          >
            {item.disciplineName}
          </span>
        ))}
        {disciplineData?.data?.length > filteredDisciplineData.length && (
          <span
            className="cursor-pointer text-sm text-blue-500"
            onClick={() => setShowAllDiscipline(!showAllDiscipline)}
          >
            {showAllDiscipline ? "Show Less" : "Show More"}
          </span>
        )}
      </div>
    );
  };

  const renderTechnicOptions = () => {
    const dataToShow = showAllTechnic ? technicData?.data : filteredTechnicData;
    return (
      <div
        id="dropdownDivider"
        className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
      >
        {dataToShow?.map((item, index: number) => (
          <span
            className={`cursor-pointer ${
              selectedTechnic.includes(item.technicName)
                ? "bg-gray-300 text-black px-1 rounded"
                : ""
            }`}
            onClick={() => handleTechnicSelect(item.technicName)}
            key={index}
          >
            {item.technicName}
          </span>
        ))}
        {techData?.data?.length > filteredTechnicData.length && (
          <span
            className="cursor-pointer text-sm text-blue-500"
            onClick={() => setShowAllTechnic(!showAllTechnic)}
          >
            {showAllTechnic ? "Show Less" : "Show More"}
          </span>
        )}
      </div>
    );
  };

  const renderThemeOptions = () => {
    const dataToShow = showAllTheme ? themeData?.data : filteredThemeData;
    return (
      <div
        id="dropdownDivider"
        className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
      >
        {dataToShow?.map((item, index: number) => (
          <span
            className={`cursor-pointer ${
              selectedTheme.includes(item.themeName)
                ? "bg-gray-300 text-black px-1 rounded"
                : ""
            }`}
            onClick={() => handleThemeSelect(item.themeName)}
            key={index}
          >
            {item.themeName}
          </span>
        ))}
        {theData?.data?.length > filteredThemeData.length && (
          <span
            className="cursor-pointer text-sm text-blue-500"
            onClick={() => setShowAllTheme(!showAllTheme)}
          >
            {showAllTheme ? "Show Less" : "Show More"}
          </span>
        )}
      </div>
    );
  };

  const renderStyleOptions = () => {
    const dataToShow = showAllStyle ? styleData?.data : filteredStyleData;
    return (
      <div
        id="dropdownDivider"
        className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
      >
        {dataToShow?.map((item, index: number) => (
          <span
            className={`cursor-pointer ${
              selectedStyle.includes(item.styleName)
                ? "bg-gray-300 text-black px-1 rounded"
                : ""
            }`}
            onClick={() => handleStyleSelect(item.styleName)}
            key={index}
          >
            {item.styleName}
          </span>
        ))}
        {stData?.data?.length > filteredStyleData.length && (
          <span
            className="cursor-pointer text-sm text-blue-500"
            onClick={() => setShowAllStyle(!showAllStyle)}
          >
            {showAllStyle ? "Show Less" : "Show More"}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="px-4 shadow-[#1020319d] bg-[#1020319d] sm:px-6 md:px-10 lg:px-14">
        <div className="flex justify-between py-3 items-center">
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
           space-y-2 lg:space-y-0 lg:space-x-4 absolute lg:relative z-10 md:w-[40%] sm:w-[50%]
            lg:w-auto shadow-lg lg:shadow-none p-4 lg:p-0 bg-gray-900 lg:bg-transparent`}
            >
              {disciplineData?.data?.map((item, index) => (
                <div key={index}>
                  <div
                    className="relative group"
                    onMouseEnter={() => setHoveredDiscipline(item)}
                    onMouseLeave={() => setHoveredDiscipline(null)}
                  >
                    <span
                      onClick={() => setSelectedOption(item.disciplineName)}
                      className="text-white font-semibold px-3 py-4  cursor-pointer transition-all duration-200 ease-in-out group-hover:text-blue-400 rounded-md"
                    >
                      {item.disciplineName}
                    </span>
                  </div>

                  {/* Render hover content directly tied to the current item */}
                  {hoveredDiscipline?.disciplineName ===
                    item.disciplineName && (
                    <div>
                      {hoverLoding ? (
                        <p className="text-gray-400 text-sm animate-pulse"></p>
                      ) : (
                        <div
                          className="fixed top-[135px] w-[100vw] bg-[#6C7680]  text-gray-800 rounded-xl shadow-2xl z-30 p-6 flex items-start justify-between gap-6 transform transition-all duration-300 ease-in-out scale-95 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                          style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                          onMouseEnter={() => setHoveredDiscipline(item)}
                          onMouseLeave={() => setHoveredDiscipline(null)}
                        >
                          <div className="flex flex-wrap items-start justify-center gap-10 flex-grow">
                            {/* Style Section */}
                            <div className="min-w-[120px]">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Style
                              </h3>
                              <ul className="space-y-2">
                                {filteredHoverData?.style?.length > 0 ? (
                                  filteredHoverData?.style.map(
                                    (styleItem, styleIndex: number) => (
                                      <li
                                        onClick={() => {
                                          handleOptionSelect(
                                            hoveredDiscipline?.disciplineName
                                          );
                                          handleStyleSelect(
                                            styleItem?.styleName
                                          );
                                          setHoveredDiscipline(null);
                                        }}
                                        key={styleIndex}
                                        className="text-sm text-black hover:text-blue-500 transition-colors duration-150 cursor-pointer"
                                      >
                                        {styleItem.styleName}
                                      </li>
                                    )
                                  )
                                ) : (
                                  <li className="text-sm text-gray-500 italic">
                                    N/A
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* Theme Section */}
                            <div className="min-w-[120px]">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Theme
                              </h3>
                              <ul className="space-y-2">
                                {filteredHoverData?.theme?.length > 0 ? (
                                  filteredHoverData?.theme.map(
                                    (themeItem, themeIndex: number) => (
                                      <li
                                        key={themeIndex}
                                        className="text-sm text-black hover:text-blue-500 transition-colors duration-150 cursor-pointer"
                                        onClick={() => {
                                          handleOptionSelect(
                                            hoveredDiscipline?.disciplineName
                                          );
                                          handleThemeSelect(
                                            themeItem?.themeName
                                          );
                                          setHoveredDiscipline(null);
                                        }}
                                      >
                                        {themeItem.themeName}
                                      </li>
                                    )
                                  )
                                ) : (
                                  <li className="text-sm text-gray-500 italic">
                                    N/A
                                  </li>
                                )}
                              </ul>
                            </div>

                            <div className="min-w-[120px]">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Commercial
                              </h3>
                              <ul className="space-y-2">
                                <li className="text-sm text-black hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                                  Exclusive
                                </li>
                                <li className="text-sm text-black hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                                  New
                                </li>
                                <li className="text-sm text-black hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                                  Coming Soon
                                </li>
                                <li className="text-sm text-black hover:text-blue-500 transition-colors duration-150 cursor-pointer">
                                  Big Discount
                                </li>
                              </ul>
                            </div>

                            {/* Artists Section */}
                            <div className="min-w-[120px]">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Artists
                              </h3>
                              <ul className="space-y-2">
                                {allHoverData?.artists?.length > 0 ? (
                                  allHoverData?.artists?.map(
                                    (artist, artistIndex) => (
                                      <li
                                        key={artistIndex}
                                        className="text-sm text-gray-700 hover:text-blue-500 transition-colors duration-150 cursor-pointer"
                                      >
                                        {artist.artistName}
                                      </li>
                                    )
                                  )
                                ) : (
                                  <li className="text-sm text-gray-500 italic">
                                    N/A
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* Promoted Artworks Section */}
                            <div className="min-w-[200px]">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Highlight
                              </h3>
                              <ul className="flex gap-4 flex-shrink-0">
                                {allHoverData?.collection ? (
                                  <>
                                    {allHoverData?.collection ? (
                                      <li
                                        className="relative rounded-lg overflow-hidden w-[15vw] min-w-[120px] shadow-md hover:shadow-lg transition-all duration-200 group"
                                        style={{
                                          backgroundImage: `url(${
                                            allHoverData?.collection
                                              ? `${imageUrl}/users/${allHoverData?.collection[0]?.collectionFile}`
                                              : "https://via.placeholder.com/80"
                                          })`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                          height: "40vh",
                                        }}
                                      >
                                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-gray-900 to-transparent">
                                          <div className="flex flex-col gap-2 items-center">
                                            <p className="text-md text-white text-center truncate font-semibold">
                                              {allHoverData?.collection[0]
                                                .collectionName || "Untitled"}
                                            </p>
                                            <button className="mt-2 w-[20vh] place-content-center bg-blue-500 text-white text-md font-semibold py-3 px-3 rounded-2xl hover:bg-blue-600 transition-colors duration-150 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                              Discover
                                            </button>
                                          </div>
                                        </div>
                                      </li>
                                    ) : (
                                      <li className="text-sm text-gray-500 italic">
                                        No collection available
                                      </li>
                                    )}

                                    {allHoverData?.artists?.length > 0 ? (
                                      <li
                                        className="relative rounded-lg overflow-hidden w-[15vw] min-w-[120px] shadow-md hover:shadow-lg transition-all duration-200 group"
                                        style={{
                                          backgroundImage: `url(${
                                            allHoverData?.artists[0].profile
                                              ?.mainImage
                                              ? `${imageUrl}/users/${allHoverData?.artists[0].profile.mainImage}`
                                              : "https://via.placeholder.com/80"
                                          })`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                          height: "40vh",
                                        }}
                                      >
                                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-gray-900 to-transparent">
                                          <p className="text-md text-white text-center truncate font-medium">
                                            {allHoverData?.artists[0]
                                              .artistName || "Untitled"}
                                          </p>
                                        </div>
                                      </li>
                                    ) : (
                                      <li className="text-sm text-gray-500 italic">
                                        No artist available
                                      </li>
                                    )}
                                  </>
                                ) : (
                                  <li className="text-sm text-gray-500 italic">
                                    No artworks available
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <span
              className="rounded-full bg-[#102031] py-2 px-3 text-white font-medium cursor-pointer hover:bg-[#1a3555] transition-colors duration-200"
              onClick={() => navigate("/explore")}
            >
              Explore
            </span>
            <span
              className="rounded-full bg-[#102031] py-2 px-3 text-white font-medium cursor-pointer hover:bg-[#1a3555] transition-colors duration-200"
              onClick={() => navigate("/collections")}
            >
              Discovery
            </span>
          </div>
        </div>
      </div>

      <div
        ref={openRef}
        className={`fixed border-r shadow-md bg-white top-0 left-0 h-screen overflow-y-auto text-black w-80 transform ${
          isOpenSidePanel ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-10`}
      >
        <div className="flex items-center justify-between border-b border-gray-400 px-4 py-3">
          <GiHamburgerMenu
            className="cursor-pointer block"
            size="2em"
            onClick={() => setIsOpenSidePanel((prev) => !prev)}
          />

          <span
            className="uppercase text-[14px] cursor-pointer bg-[#102031] text-white rounded py-1 px-3"
            onClick={handleClear}
          >
            Clear All
          </span>
        </div>

        {selectedOption.length > 0 ? (
          <div className="flex bg-[#102031] text-white p-2 flex-col gap-2">
            <div className="flex gap-1.5">
              <span className="text-[13px] whitespace-nowrap font-semibold">
                Discipline :
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedOption.map((item: string, i: number) => (
                  <span
                    key={i}
                    className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]"
                  >
                    {item}
                    <MdOutlineCancel
                      onClick={() => handleOptionSelect(item)}
                      className="cursor-pointer"
                    />
                  </span>
                ))}
              </div>
            </div>

            {selectedTechnic.length > 0 && (
              <div className="flex gap-1.5">
                <span className="text-[13px] whitespace-nowrap font-semibold">
                  Technic :
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedTechnic.map((item: string, i: number) => (
                    <span
                      key={i}
                      className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]"
                    >
                      {item}
                      <MdOutlineCancel
                        onClick={() => handleTechnicSelect(item)}
                        className="cursor-pointer"
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedTheme.length > 0 && (
              <div className="flex gap-1.5">
                <span className="text-[13px] whitespace-nowrap font-semibold">
                  Theme :
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedTheme.map((item: string, i: number) => (
                    <span
                      key={i}
                      className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]"
                    >
                      {item}
                      <MdOutlineCancel
                        onClick={() => handleThemeSelect(item)}
                        className="cursor-pointer"
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedStyle.length > 0 && (
              <div className="flex gap-1.5">
                <span className="text-[13px] whitespace-nowrap font-semibold">
                  Style :
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedStyle.map((item: string, i: number) => (
                    <span
                      key={i}
                      className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]"
                    >
                      {item}
                      <MdOutlineCancel
                        onClick={() => handleStyleSelect(item)}
                        className="cursor-pointer"
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}

        <div
          className={`flex p-4 ${
            selectedOption.length > 0 ? "pt-0" : "pt-2"
          } flex-col gap-3`}
        >
          <div className="">
            <Button
              id="dropdownDividerButton"
              onClick={() =>
                setOptionOpen((prev) => ({
                  ...prev,
                  discipline: !prev.discipline,
                }))
              }
              className="flex !px-0 justify-between w-full items-center"
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

            {optionOpen.discipline ? renderDisciplineOptions() : null}
          </div>

          {selectedOption.length > 0 ? (
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
                  className="flex !px-0 justify-between w-full items-center"
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

                {optionOpen.theme ? renderThemeOptions() : null}
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
                  className="flex !px-0 justify-between w-full items-center"
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

                {optionOpen.technic ? renderTechnicOptions() : null}
              </div>

              <div className="">
                <Button
                  id="dropdownDividerButton"
                  onClick={() =>
                    setOptionOpen((prev) => ({
                      ...prev,
                      style: !prev.style,
                    }))
                  }
                  className="flex !px-0 justify-between w-full items-center"
                  type="button"
                  variant={{
                    fontSize: "base",
                    theme: "black",
                    fontWeight: "600",
                  }}
                >
                  Style
                  <MdKeyboardArrowDown size={20} />
                </Button>

                {optionOpen.style ? renderStyleOptions() : null}
              </div>
            </>
          ) : null}

          <div>
            <Button
              id="dropdownDividerButton"
              className="flex !px-0 justify-between w-full items-center"
              type="button"
              variant={{
                fontSize: "base",
                theme: "black",
                fontWeight: "600",
              }}
            >
              Orientation
              <MdKeyboardArrowDown size={20} />
            </Button>

            <div className="flex gap-2 item-center">
              <div
                onClick={() =>
                  setMoreOptions((prev) => ({
                    ...prev,
                    orientation: "Vertical",
                  }))
                }
                className={`${
                  moreOptions.orientation == "Vertical"
                    ? "bg-slate-300"
                    : "bg-[#eaeaea]"
                } w-8 hover:bg-slate-300 cursor-pointer`}
              >
                <P
                  variant={{
                    size: "small",
                    theme: "light",
                    weight: "semiBold",
                  }}
                  className="bg-[#102030] m-2 py-4 px-1 text-center"
                ></P>
              </div>
              <div
                onClick={() =>
                  setMoreOptions((prev) => ({
                    ...prev,
                    orientation: "Neutral",
                  }))
                }
                className={`${
                  moreOptions.orientation == "Neutral"
                    ? "bg-slate-300"
                    : "bg-[#eaeaea]"
                } w-12 hover:bg-slate-300 cursor-pointer`}
              >
                <P
                  variant={{
                    size: "small",
                    theme: "light",
                    weight: "semiBold",
                  }}
                  className="bg-[#102030] m-2 py-4 px-1 text-center"
                ></P>
              </div>
              <div
                onClick={() =>
                  setMoreOptions((prev) => ({
                    ...prev,
                    orientation: "Horizontal",
                  }))
                }
                className={`${
                  moreOptions.orientation == "Horizontal"
                    ? "bg-slate-300"
                    : "bg-[#eaeaea]"
                } w-12 hover:bg-slate-300 cursor-pointer`}
              >
                <P
                  variant={{
                    size: "small",
                    theme: "light",
                    weight: "semiBold",
                  }}
                  className="bg-[#102030] mx-2 my-4 py-2 text-center"
                ></P>
              </div>
            </div>
          </div>

          <div>
            <Button
              id="dropdownDividerButton"
              className="flex !px-0 justify-between w-full items-center"
              type="button"
              variant={{
                fontSize: "base",
                theme: "black",
                fontWeight: "600",
              }}
            >
              Select Color
            </Button>

            <select
              className="w-full border py-2 rounded"
              onChange={(e) =>
                setMoreOptions((prev) => ({ ...prev, color: e.target.value }))
              }
            >
              <option value="">Select Color</option>
              {colors && colors.length > 0 ? (
                colors.map((item, i: number) => (
                  <option value={item.value} key={i}>
                    {item.value}
                  </option>
                ))
              ) : (
                <option disabled>No Options</option>
              )}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Button
              id="dropdownDividerButton"
              className="flex !px-0 justify-between w-full items-center"
              type="button"
              variant={{
                fontSize: "base",
                theme: "black",
                fontWeight: "600",
              }}
            >
              Coming Soon
            </Button>

            <div className="flex items-center gap-2">
              {["Yes", "No"].map((item, i: number) => (
                <span className="flex items-center gap-1" key={i}>
                  <input
                    type="radio"
                    name="comingSoon"
                    value={item}
                    checked={moreOptions.comingSoon === item}
                    onChange={(e) =>
                      setMoreOptions((prev) => ({
                        ...prev,
                        comingSoon: e.target.value,
                      }))
                    }
                  />
                  <label>{item}</label>
                </span>
              ))}
            </div>
          </div>

          <div>
            <Button
              id="dropdownDividerButton"
              className="flex !px-0 justify-between w-full items-center"
              type="button"
              variant={{
                fontSize: "base",
                theme: "black",
                fontWeight: "600",
              }}
            >
              Tags
            </Button>
            <input
              type="text"
              placeholder="Search By Keywords/Tags"
              onChange={(e) => setTag(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {Object.entries(defaultRanges).map(([key, range]) => {
            if (selectedOption != "Sculpture" && key == "depth") return null;
            if (type != "purchase" && key == "price") return null;

            return (
              <div key={key}>
                <Button
                  id="dropdownDividerButton"
                  className="flex capitalize !px-0 justify-between w-full items-center"
                  type="button"
                  variant={{
                    fontSize: "base",
                    theme: "black",
                    fontWeight: "600",
                  }}
                >
                  {key} Range{" "}
                  {key === "weight"
                    ? "(in kg)"
                    : key == "price"
                    ? ""
                    : "(in cm)"}
                </Button>

                <div className="text-gray-600 font-semibold text-[12px] mb-1">
                  {sliderData[key][0]} - {sliderData[key][1]}
                </div>
                <Slider
                  range
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={sliderData[key]}
                  onChange={(value) => handleSliderChange(key, value)}
                  trackStyle={[{ backgroundColor: "#4A90E2" }]}
                  handleStyle={[
                    { backgroundColor: "#4A90E2", borderColor: "#4A90E2" },
                    { backgroundColor: "#4A90E2", borderColor: "#4A90E2" },
                  ]}
                />
              </div>
            );
          })}

          {type == "purchase" ? (
            <>
              <div className="flex items-center justify-between">
                <Button
                  id="dropdownDividerButton"
                  className="flex !px-0 justify-between w-full items-center"
                  type="button"
                  variant={{
                    fontSize: "base",
                    theme: "black",
                    fontWeight: "600",
                  }}
                >
                  Discount Available
                </Button>

                <div className="flex items-center gap-2">
                  {["Yes", "No"].map((item, i: number) => (
                    <span className="flex items-center gap-1" key={i}>
                      <input
                        type="radio"
                        name="discount"
                        value={item}
                        checked={moreOptions.discount === item}
                        onChange={(e) =>
                          setMoreOptions((prev) => ({
                            ...prev,
                            discount: e.target.value,
                          }))
                        }
                      />
                      <label>{item}</label>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Button
                  id="dropdownDividerButton"
                  className="flex !px-0 justify-between w-full items-center"
                  type="button"
                  variant={{
                    fontSize: "base",
                    theme: "black",
                    fontWeight: "600",
                  }}
                >
                  Purchase Type
                </Button>

                <select
                  className="w-full border py-2 rounded"
                  onChange={(e) =>
                    setMoreOptions((prev) => ({
                      ...prev,
                      purchase: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Option</option>

                  {commOptions && commOptions.length > 0 ? (
                    commOptions.map((item, i: number) => (
                      <option value={item.value} key={i}>
                        {item.value}
                      </option>
                    ))
                  ) : (
                    <option disabled>No Options</option>
                  )}
                </select>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <Button
                id="dropdownDividerButton"
                className="flex !px-0 justify-between w-full items-center"
                type="button"
                variant={{
                  fontSize: "base",
                  theme: "black",
                  fontWeight: "600",
                }}
              >
                Purchase Option
              </Button>

              <div className="flex items-center gap-2">
                {["Yes", "No"].map((item, i: number) => (
                  <span className="flex items-center gap-1" key={i}>
                    <input
                      type="radio"
                      name="purchaseOption"
                      value={item}
                      checked={moreOptions.purchaseOption === item}
                      onChange={(e) =>
                        setMoreOptions((prev) => ({
                          ...prev,
                          purchaseOption: e.target.value,
                        }))
                      }
                    />
                    <label>{item}</label>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-between w-full gap-3 mt-10 mb-6">
            <div className="flex w-max gap-2 items-center">
              <span
                className="flex gap-2 bg-[#102031] text-white rounded-full cursor-pointer px-4 py-2"
                onClick={() => setIsOpenSidePanel((prev) => !prev)}
              >
                <MdOutlineFilterList size={20} />
                <P variant={{ size: "base", theme: "light", weight: "medium" }}>
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
            <div className="relative w-[40%] flex items-center justify-end rounded-full border border-gray-300">
              <input
                type="text"
                placeholder="Search by Artwork/Artist Name..."
                className="w-full py-2 pl-10 rounded-full outline-none"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />

              <FaSearch className="w-5 h-5 left-3 absolute" />
            </div>
          </div>

          <CardSection data={data?.data} />

          <div className="flex max-[410px]:flex-col max-[440px]:gap-5 items-center my-10 justify-between">
            <div className="bg-[#102031] text-white rounded-full flex items-center gap-2 px-4 py-2">
              <span className="text-[14px] font-medium">Rows per page:</span>
              <select
                className="outline-none bg-transparent"
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
                  <option
                    className="bg-[#102031] text-white font-medium"
                    key={i}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[14px] font-medium bg-[#102031] text-white rounded-full px-4 py-2">
                {`${(options.currPage - 1) * options.limit + 1} - ${Math.min(
                  options.currPage * options.limit,
                  data?.totalCount
                )} of ${data?.totalCount}`}
              </span>
              <span className="flex gap-2 items-center">
                <MdArrowBackIosNew
                  className={`cursor-pointer border border-[#102031] bg-slate-200 rounded-full p-2 text-[2rem] ${
                    !prevCursor || isLoading
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => {
                    setOptions({
                      ...options,
                      cursor: prevCursor,
                      direction: "prev",
                      currPage:
                        options.currPage === 1 ? 1 : options.currPage - 1,
                    });
                  }}
                />
                <MdArrowForwardIos
                  className={`cursor-pointer border border-[#102031] bg-slate-200 rounded-full p-2 text-[2rem] ${
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
      )}
    </>
  );
};

export default Purchase;
