import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdKeyboardArrowDown,
  MdOutlineCancel,
  MdOutlineFilterList,
} from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTechnic } from "../ArtistPanel/AddArtwork/http/useGetTechnic";
import { useGetTheme } from "../ArtistPanel/AddArtwork/http/useGetTheme";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import { useGetStyle } from "../pages/http/useGetStyle";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import { RenderAllPicklist } from "../utils/RenderAllPicklist";
import useClickOutside from "../utils/useClickOutside";
import { useDebounce } from "../utils/useDebounce";
import CardSection from "./CardSection";
import { useGetHoveredData } from "./http/useGetHoveredData";
import { useGetPurchaseArtwork } from "./http/useGetPurchaseArtwork";
import SelectOption from "../ui/SelectOption";

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

  const { data: hoverData, isLoading: hoverLoding } = useGetHoveredData();

  useEffect(() => {
    if (hoverData && !allHoverData) {
      setAllHoverData(hoverData.data);
    }
  }, [hoverData, allHoverData]);

  const filteredHoverData =
    allHoverData?.disData?.find(
      (item) => item.discipline === hoveredDiscipline?.disciplineName
    ) || null;

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
    exclusive: "",
    purchaseOption: "",
    newIn: "",
    bigDiscount: "",
    insig: "",
  });

  const [keywords, setKeywords] = useState({
    tag: "",
    name: "",
  });
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
  const debounceTag = useDebounce(keywords.tag, 800);
  const debounceArtist = useDebounce(keywords.name, 800);

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
    debounceArtist,
    options.currPage,
    options.cursor,
    options.direction,
    options.limit,
    moreOptions.exclusive,
    moreOptions.newIn,
    moreOptions.bigDiscount,
    moreOptions.insig
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
    if (selectedOption) {
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

  const matchesSelectedDisciplines = (item) => {
    if (!selectedOption.length) return true;
    const disciplineNames = item.discipline?.map((d) => d.disciplineName) || [];
    return selectedOption.every((option) => disciplineNames.includes(option));
  };

  const filteredTechnicData =
    techData?.data
      ?.filter((item) => item?.isMain && matchesSelectedDisciplines(item))
      .map((item) => item.technicName) || [];

  const filteredThemeData =
    theData?.data
      ?.filter((item) => item?.isMain && matchesSelectedDisciplines(item))
      .map((item) => item.themeName) || [];

  const filteredStyleData =
    stData?.data
      ?.filter((item) => item?.isMain && matchesSelectedDisciplines(item))
      .map((item) => item.styleName) || [];

  const handleClear = async () => {
    setSelectedOption([]);
    setSelectedTechnic([]);
    setSelectedTheme([]);
    setSelectedStyle([]);
    setKeywords({
      tag: "",
      name: "",
    });
    setOptions({ cursor: "", direction: "", limit: 10, currPage: 1 });
    setMoreOptions({
      orientation: "",
      color: "",
      comingSoon: "",
      discount: "",
      purchase: "",
      purchaseOption: "",
      exclusive: "",
      newIn: "",
      bigDiscount: "",
      insig: "",
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

  const commercialOptions = [
    { key: "exclusive", label: "Exclusive" },
    { key: "newIn", label: "New In" },
    { key: "comingSoon", label: "Coming Soon" },
  ];

  if (type == "purchase") {
    commercialOptions.push({
      key: "bigDiscount",
      label: "Big Discount",
    });
  }

  const handleOptions = [
    { key: "selectedOption", label: "Discipline", handler: handleOptionSelect },
    { key: "selectedTechnic", label: "Technic", handler: handleTechnicSelect },
    { key: "selectedTheme", label: "Theme", handler: handleThemeSelect },
    { key: "selectedStyle", label: "Style", handler: handleStyleSelect },
  ];

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
    const dataToShow = showAllTechnic ? technicData : filteredTechnicData;

    return (
      <div
        id="dropdownDivider"
        className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
      >
        {dataToShow?.map((item: string, index: number) => (
          <span
            className={`cursor-pointer ${
              selectedTechnic.includes(item)
                ? "bg-gray-300 text-black px-1 rounded"
                : ""
            }`}
            onClick={() => handleTechnicSelect(item)}
            key={index}
          >
            {item}
          </span>
        ))}
        {technicData?.length > filteredTechnicData.length && (
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
    const dataToShow = showAllTheme ? themeData : filteredThemeData;
    return (
      <div
        id="dropdownDivider"
        className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
      >
        {dataToShow?.map((item: string, index: number) => (
          <span
            className={`cursor-pointer ${
              selectedTheme.includes(item)
                ? "bg-gray-300 text-black px-1 rounded"
                : ""
            }`}
            onClick={() => handleThemeSelect(item)}
            key={index}
          >
            {item}
          </span>
        ))}
        {themeData?.length > filteredThemeData.length && (
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
    const dataToShow = showAllStyle ? styleData : filteredStyleData;
    return (
      <div
        id="dropdownDivider"
        className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
      >
        {dataToShow?.map((item: string, index: number) => (
          <span
            className={`cursor-pointer ${
              selectedStyle.includes(item)
                ? "bg-gray-300 text-black px-1 rounded"
                : ""
            }`}
            onClick={() => handleStyleSelect(item)}
            key={index}
          >
            {item}
          </span>
        ))}
        {styleData?.length > filteredStyleData.length && (
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
              {disciplineData?.data?.map((item, index: number) => (
                <div key={index}>
                  <div
                    className="relative group"
                    onMouseEnter={() => setHoveredDiscipline(item)}
                    // onMouseLeave={() => setHoveredDiscipline(null)}
                  >
                    <span className="text-white font-semibold px-3 cursor-pointer transition-all duration-200 ease-in-out group-hover:text-blue-700 rounded-md">
                      {item.disciplineName}
                    </span>
                  </div>

                  {hoveredDiscipline?.disciplineName ===
                    item.disciplineName && (
                    <>
                      {hoverLoding ? (
                        <p className="text-gray-400 text-sm animate-pulse"></p>
                      ) : (
                        <div
                          className="absolute border-t -left-[60px] top-[42px] w-[99.1vw] bg-[#6C7680] text-gray-800 z-30 pt-3 pb-6 flex items-start justify-between gap-6 transform transition-all duration-300 ease-in-out overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                          onMouseEnter={() => setHoveredDiscipline(item)}
                          onMouseLeave={() => setHoveredDiscipline(null)}
                        >
                          <div className="flex flex-wrap items-start justify-center gap-10 flex-grow">
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
                                        className="text-sm text-black hover:text-blue-700 transition-colors duration-150 cursor-pointer"
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
                                        className="text-sm text-black hover:text-blue-700 transition-colors duration-150 cursor-pointer"
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
                                {commercialOptions.map((key, i: number) => (
                                  <li
                                    key={i}
                                    onClick={() =>
                                      setMoreOptions((prev) => ({
                                        ...prev,
                                        [key.key]:
                                          prev[key.key] === "Yes" ? "" : "Yes",
                                      }))
                                    }
                                    className={`${
                                      moreOptions[key.key] === "Yes"
                                        ? "bg-gray-300 text-black px-1 rounded"
                                        : "text-white"
                                    } text-sm hover:text-blue-700 transition-colors duration-150 cursor-pointer`}
                                  >
                                    {key.label}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="min-w-[120px]">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Artists
                              </h3>
                              <ul className="space-y-2">
                                {allHoverData?.insignia &&
                                  allHoverData.insignia.map(
                                    (key, i: number) => (
                                      <li
                                        key={i}
                                        onClick={() =>
                                          setMoreOptions((prev) => ({
                                            ...prev,
                                            insig:
                                              prev.insig === key._id
                                                ? ""
                                                : key._id,
                                          }))
                                        }
                                        className={`${
                                          moreOptions.insig === key._id
                                            ? "bg-gray-300 text-black px-1 rounded"
                                            : "text-white"
                                        } text-sm hover:text-blue-700 transition-colors duration-150 cursor-pointer`}
                                      >
                                        {key.credentialName}
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>

                            {/* Promoted Artworks Section */}
                            <div className="min-w-[200px]">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Highlight
                              </h3>
                              <ul className="flex gap-4 flex-shrink-0">
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
                                          <button className="mt-2 w-[20vh] place-content-center bg-blue-700 text-white text-md font-semibold py-3 px-3 rounded-2xl hover:bg-blue-800 transition-colors duration-150 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
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
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
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
            {handleOptions.map(({ key, label, handler }) => {
              const items = eval(key);

              return (
                items.length > 0 && (
                  <div key={key} className="flex gap-1.5">
                    <span className="text-[13px] whitespace-nowrap font-semibold">
                      {label} :
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {items.map((item: string, i: number) => (
                        <span
                          key={i}
                          className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]"
                        >
                          {item}
                          <MdOutlineCancel
                            onClick={() => handler(item)}
                            className="cursor-pointer"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )
              );
            })}
          </div>
        ) : null}
        <div className="flex bg-[#102031] text-white p-2 pt-0 flex-col gap-2">
          {moreOptions.comingSoon && (
            <div className="flex gap-1.5">
              <span className="text-[13px] whitespace-nowrap font-semibold">
                Comming Soon :
              </span>

              <span className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]">
                {moreOptions.comingSoon}
                <MdOutlineCancel
                  onClick={() =>
                    setMoreOptions((prev) => ({
                      ...prev,
                      comingSoon: "",
                    }))
                  }
                  className="cursor-pointer"
                />
              </span>
            </div>
          )}
          {moreOptions.exclusive && (
            <div className="flex gap-1.5">
              <span className="text-[13px] whitespace-nowrap font-semibold">
                Exclusive Artwork :
              </span>

              <span className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]">
                {moreOptions.exclusive}
                <MdOutlineCancel
                  onClick={() =>
                    setMoreOptions((prev) => ({
                      ...prev,
                      exclusive: "",
                    }))
                  }
                  className="cursor-pointer"
                />
              </span>
            </div>
          )}

          {moreOptions.discount && (
            <div className="flex gap-1.5">
              <span className="text-[13px] whitespace-nowrap font-semibold">
                Discount Available :
              </span>

              <span className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]">
                {moreOptions.discount}
                <MdOutlineCancel
                  onClick={() =>
                    setMoreOptions((prev) => ({
                      ...prev,
                      discount: "",
                    }))
                  }
                  className="cursor-pointer"
                />
              </span>
            </div>
          )}
          {moreOptions.bigDiscount && (
            <div className="flex gap-1.5">
              <span className="text-[13px] whitespace-nowrap font-semibold">
                Big Discount :
              </span>

              <span className="text-[11px] text-black flex gap-1 items-center px-1 rounded-full bg-[#c3c3c3]">
                {moreOptions.bigDiscount}
                <MdOutlineCancel
                  onClick={() =>
                    setMoreOptions((prev) => ({
                      ...prev,
                      bigDiscount: "",
                    }))
                  }
                  className="cursor-pointer"
                />
              </span>
            </div>
          )}
        </div>

        <div
          className={`flex p-4 ${
            selectedOption.length > 0 ? "pt-0" : "pt-2"
          } flex-col gap-2`}
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

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={moreOptions.comingSoon === "Yes"}
                onChange={(e) =>
                  setMoreOptions((prev) => ({
                    ...prev,
                    comingSoon: e.target.checked ? "Yes" : "",
                  }))
                }
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-gray-200 rounded-full peer-checked:bg-black transition-all relative">
                <div
                  className="absolute top-1 left-1 bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform duration-200"
                  style={{
                    transform:
                      moreOptions.comingSoon === "Yes"
                        ? "translateX(20px)"
                        : "translateX(0px)",
                  }}
                ></div>
              </div>
            </label>
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
              New In
            </Button>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={moreOptions.newIn === "Yes"}
                onChange={(e) =>
                  setMoreOptions((prev) => ({
                    ...prev,
                    newIn: e.target.checked ? "Yes" : "",
                  }))
                }
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-gray-200 rounded-full peer-checked:bg-black transition-all relative">
                <div
                  className="absolute top-1 left-1 bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform duration-200"
                  style={{
                    transform:
                      moreOptions.newIn === "Yes"
                        ? "translateX(20px)"
                        : "translateX(0px)",
                  }}
                ></div>
              </div>
            </label>
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
              External Tags
            </Button>
            <input
              type="text"
              placeholder="Search By Keywords/External Tags"
              onChange={(e) =>
                setKeywords((prev) => ({
                  ...prev,
                  tag: e.target.value,
                }))
              }
              className="w-full border p-2 rounded"
            />
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
              Search By Artist
            </Button>
            <input
              type="text"
              placeholder="Search By Artist Name"
              onChange={(e) =>
                setKeywords((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
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
              Exclusive Artwork
            </Button>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={moreOptions.exclusive === "Yes"}
                onChange={(e) =>
                  setMoreOptions((prev) => ({
                    ...prev,
                    exclusive: e.target.checked ? "Yes" : "",
                  }))
                }
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-gray-200 rounded-full peer-checked:bg-black transition-all relative">
                <div
                  className="absolute top-1 left-1 bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform duration-200"
                  style={{
                    transform:
                      moreOptions.exclusive === "Yes"
                        ? "translateX(20px)"
                        : "translateX(0px)",
                  }}
                ></div>
              </div>
            </label>
          </div>

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

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={moreOptions.discount === "Yes"}
                    onChange={(e) =>
                      setMoreOptions((prev) => ({
                        ...prev,
                        discount: e.target.checked ? "Yes" : "",
                      }))
                    }
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-gray-200 rounded-full peer-checked:bg-black transition-all relative">
                    <div
                      className="absolute top-1 left-1 bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform duration-200"
                      style={{
                        transform:
                          moreOptions.discount === "Yes"
                            ? "translateX(20px)"
                            : "translateX(0px)",
                      }}
                    ></div>
                  </div>
                </label>
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
                  <option value="">All</option>

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

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={moreOptions.purchaseOption === "Yes"}
                  onChange={(e) =>
                    setMoreOptions((prev) => ({
                      ...prev,
                      purchaseOption: e.target.checked ? "Yes" : "",
                    }))
                  }
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-gray-200 rounded-full peer-checked:bg-black transition-all relative">
                  <div
                    className="absolute top-1 left-1 bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform duration-200"
                    style={{
                      transform:
                        moreOptions.purchaseOption === "Yes"
                          ? "translateX(20px)"
                          : "translateX(0px)",
                    }}
                  ></div>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="flex sm:flex-row flex-col items-center justify-between w-full gap-3 mt-10 mb-6">
            <div className="flex w-full whitespace-nowrap gap-2 items-center">
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
            <div className="flex w-full sm:justify-end justify-between items-center gap-2">
              <div className="relative flex items-center rounded-full border border-gray-300">
                <input
                  type="text"
                  placeholder="Search by Artwork Name..."
                  className="w-full py-2 pl-10 rounded-full outline-none"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />

                <FaSearch className="w-5 h-5 left-3 absolute" />
              </div>
              <SelectOption
                value={
                  moreOptions.comingSoon === "Yes"
                    ? { value: "Coming Soon", label: "Coming Soon" }
                    : { value: "All", label: "Show" }
                }
                options={["All", "Coming Soon"].map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={(e) => {
                  setMoreOptions((prev) => ({
                    ...prev,
                    comingSoon: e?.value === "Coming Soon" ? "Yes" : "",
                  }));
                }}
                placeholder="Show"
              />
            </div>
          </div>

          <CardSection data={data?.data} type={type} />

          <div className="flex max-[410px]:flex-col max-[440px]:gap-5 items-center my-10 justify-between">
            <div className="bg-[#102031] text-white rounded-full flex items-center gap-0.5 px-4 py-2">
              <span className="text-[14px] font-medium">Rows per page :</span>
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
