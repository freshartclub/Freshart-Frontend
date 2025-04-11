import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdArrowBackIosNew, MdArrowForwardIos, MdKeyboardArrowDown, MdOutlineFilterList } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTechnic } from "../ArtistPanel/AddArtwork/http/useGetTechnic";
import { useGetTheme } from "../ArtistPanel/AddArtwork/http/useGetTheme";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import { useGetStyle } from "../pages/http/useGetStyle";
import Badge from "../ui/Badge";
import Loader from "../ui/Loader";
import SelectOption from "../ui/SelectOption";
import { imageUrl } from "../utils/baseUrls";
import { RenderAllPicklist } from "../utils/RenderAllPicklist";
import useClickOutside from "../utils/useClickOutside";
import { useDebounce } from "../utils/useDebounce";
import CardSection from "./CardSection";
import { useGetHoveredData } from "./http/useGetHoveredData";
import { useGetPurchaseArtwork } from "./http/useGetPurchaseArtwork";
import { useAppSelector } from "../../store/typedReduxHooks";

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

  const dark = useAppSelector((state) => state.theme.mode);

  const defaultRanges = {
    height: { min: 0, max: 300, step: 10 },
    width: { min: 0, max: 300, step: 10 },
    depth: { min: 0, max: 300, step: 10 },
    price: { min: 0, max: 10000, step: 10 },
  };

  const [allHoverData, setAllHoverData] = useState(null);
  const [hoveredDiscipline, setHoveredDiscipline] = useState(null);

  const [sliderData, setSliderData] = useState({
    height: [0, defaultRanges.height.max],
    width: [0, defaultRanges.width.max],
    depth: [0, defaultRanges.depth.max],
    price: [0, defaultRanges.price.max],
  });

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

  const { data: hoverData, isLoading: hoverLoading } = useGetHoveredData();
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
    if (hoverData && !allHoverData) {
      setAllHoverData(hoverData.data);
    }
  }, [hoverData, allHoverData]);

  const filteredHoverData = allHoverData?.disData?.find((item) => item.discipline === hoveredDiscipline?.disciplineName) || null;

  const handleSliderChange = (key, value) => {
    setSliderData((prev) => ({
      ...prev,
      [key]: [...value],
    }));
  };

  const filteredDisciplineData = disciplineData?.data?.filter((item) => item?.isMain) || [];

  const matchesSelectedDisciplines = (item) => {
    if (!selectedOption.length) return true;
    const disciplineNames = item.discipline?.map((d) => d.disciplineName) || [];
    return selectedOption.every((option) => disciplineNames.includes(option));
  };

  const filteredTechnicData =
    techData?.data?.filter((item) => item?.isMain && matchesSelectedDisciplines(item)).map((item) => item.technicName) || [];

  const filteredThemeData = theData?.data?.filter((item) => item?.isMain && matchesSelectedDisciplines(item)).map((item) => item.themeName) || [];

  const filteredStyleData = stData?.data?.filter((item) => item?.isMain && matchesSelectedDisciplines(item)).map((item) => item.styleName) || [];

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
    setSelectedOption((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme((prev) => (prev.includes(theme) ? prev.filter((item) => item !== theme) : [...prev, theme]));
  };

  const handleTechnicSelect = (theme: string) => {
    setSelectedTechnic((prev) => (prev.includes(theme) ? prev.filter((item) => item !== theme) : [...prev, theme]));
  };

  const handleStyleSelect = (theme: string) => {
    setSelectedStyle((prev) => (prev.includes(theme) ? prev.filter((item) => item !== theme) : [...prev, theme]));
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
    const dataToShow = showAllDiscipline ? disciplineData?.data : filteredDisciplineData;

    return (
      <div
        className={`z-10 border flex flex-col p-2 gap-2 ${
          dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-gray-200"
        } rounded-lg shadow-md`}
      >
        {dataToShow?.map((item, index: number) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedOption.includes(item.disciplineName)}
              onChange={() => handleOptionSelect(item.disciplineName)}
              className={`form-checkbox h-4 w-4 rounded ${dark ? "text-blue-400 bg-gray-700 border-gray-600" : "text-blue-600"}`}
            />
            <span className="text-sm">{item.disciplineName}</span>
          </label>
        ))}
        {disciplineData?.data?.length > filteredDisciplineData.length && (
          <button
            className={`text-sm ${dark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} mt-2`}
            onClick={() => setShowAllDiscipline(!showAllDiscipline)}
          >
            {showAllDiscipline ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    );
  };

  const renderTechnicOptions = () => {
    const dataToShow = showAllTechnic ? technicData : filteredTechnicData;

    return (
      <div
        className={`z-10 border flex flex-col p-2 gap-2 ${
          dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-gray-200"
        } rounded-lg shadow-md`}
      >
        {dataToShow?.map((item: string, index: number) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTechnic.includes(item)}
              onChange={() => handleTechnicSelect(item)}
              className={`form-checkbox h-4 w-4 rounded ${dark ? "text-blue-400 bg-gray-700 border-gray-600" : "text-blue-600"}`}
            />
            <span className="text-sm">{item}</span>
          </label>
        ))}
        {technicData?.length > filteredTechnicData.length && (
          <button
            className={`text-sm ${dark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} mt-2`}
            onClick={() => setShowAllTechnic(!showAllTechnic)}
          >
            {showAllTechnic ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    );
  };

  const renderThemeOptions = () => {
    const dataToShow = showAllTheme ? themeData : filteredThemeData;
    return (
      <div
        className={`z-10 border flex flex-col p-2 gap-2 ${
          dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-gray-200"
        } rounded-lg shadow-md`}
      >
        {dataToShow?.map((item: string, index: number) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTheme.includes(item)}
              onChange={() => handleThemeSelect(item)}
              className={`form-checkbox h-4 w-4 rounded ${dark ? "text-blue-400 bg-gray-700 border-gray-600" : "text-blue-600"}`}
            />
            <span className="text-sm">{item}</span>
          </label>
        ))}
        {themeData?.length > filteredThemeData.length && (
          <button
            className={`text-sm ${dark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} mt-2`}
            onClick={() => setShowAllTheme(!showAllTheme)}
          >
            {showAllTheme ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    );
  };

  const renderStyleOptions = () => {
    const dataToShow = showAllStyle ? styleData : filteredStyleData;
    return (
      <div
        className={`z-10 border flex flex-col p-2 gap-2 ${
          dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-gray-200"
        } rounded-lg shadow-md`}
      >
        {dataToShow?.map((item: string, index: number) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStyle.includes(item)}
              onChange={() => handleStyleSelect(item)}
              className={`form-checkbox h-4 w-4 rounded ${dark ? "text-blue-400 bg-gray-700 border-gray-600" : "text-blue-600"}`}
            />
            <span className="text-sm">{item}</span>
          </label>
        ))}
        {styleData?.length > filteredStyleData.length && (
          <button
            className={`text-sm ${dark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} mt-2`}
            onClick={() => setShowAllStyle(!showAllStyle)}
          >
            {showAllStyle ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    );
  };

  const activeFiltersCount = [
    ...selectedOption,
    ...selectedTechnic,
    ...selectedTheme,
    ...selectedStyle,
    ...Object.values(moreOptions).filter((val) => val && val !== ""),
    ...Object.values(sliderData).flatMap((range) =>
      range[0] !== 0 || range[1] !== defaultRanges[Object.keys(sliderData).find((key) => sliderData[key] === range)].max ? [true] : []
    ),
    keywords.tag ? true : false,
    keywords.name ? true : false,
    query ? true : false,
  ].filter(Boolean).length;

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className={`px-4 shadow-md sticky top-0 z-20 ${dark ? "bg-gray-800 border-b border-gray-700" : "bg-white"} sm:px-6 md:px-10 lg:px-14`}>
        <div className="flex justify-between py-3 items-center">
          <div className="relative w-full">
            <button
              className={`lg:hidden p-2 ${dark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <FaBars size={24} />
            </button>

            <div
              className={`${isOpen ? "block" : "hidden"} lg:flex flex-col lg:flex-row items-start lg:items-center mt-3 lg:mt-0
           space-y-2 lg:space-y-0 lg:space-x-4 absolute lg:relative z-10 md:w-[40%] sm:w-[50%]
            lg:w-auto shadow-lg lg:shadow-none p-4 lg:p-0 ${dark ? "bg-gray-800" : "bg-white"} lg:bg-transparent rounded-lg lg:rounded-none`}
            >
              {disciplineData?.data?.map((item, index: number) => (
                <div key={index}>
                  <div className="relative group" onMouseEnter={() => setHoveredDiscipline(item)}>
                    <span
                      className={`${
                        dark ? "text-gray-300" : "text-gray-700"
                      } font-semibold px-3 cursor-pointer group-hover:text-[#EE1D52] transition-all duration-200 ease-in-out rounded-md`}
                    >
                      {item.disciplineName}
                    </span>
                  </div>

                  {hoveredDiscipline?.disciplineName === item.disciplineName && (
                    <>
                      {hoverLoading ? (
                        <p className={`${dark ? "text-gray-400" : "text-gray-400"} text-sm animate-pulse`}></p>
                      ) : (
                        <div
                          className={`absolute border-t -left-[60px] top-[42px] w-[99.1vw] ${
                            dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-800"
                          } z-30 pt-3 pb-6 flex items-start justify-between gap-6 transform transition-all duration-300 ease-in-out overflow-x-auto scrollbar-thin shadow-xl`}
                          onMouseEnter={() => setHoveredDiscipline(item)}
                          onMouseLeave={() => setHoveredDiscipline(null)}
                        >
                          <div className="flex flex-wrap items-start justify-center gap-10 flex-grow">
                            <div className="min-w-[120px]">
                              <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"} mb-2`}>Style</h3>
                              <ul className="space-y-2">
                                {filteredHoverData?.style?.length > 0 ? (
                                  filteredHoverData?.style.map((styleItem, styleIndex: number) => (
                                    <li
                                      onClick={() => {
                                        handleOptionSelect(hoveredDiscipline?.disciplineName);
                                        handleStyleSelect(styleItem?.styleName);
                                        setHoveredDiscipline(null);
                                      }}
                                      key={styleIndex}
                                      className={`text-sm ${
                                        dark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                                      } transition-colors duration-150 cursor-pointer`}
                                    >
                                      {styleItem.styleName}
                                    </li>
                                  ))
                                ) : (
                                  <li className={`text-sm ${dark ? "text-gray-500" : "text-gray-500"} italic`}>N/A</li>
                                )}
                              </ul>
                            </div>

                            <div className="min-w-[120px]">
                              <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"} mb-2`}>Theme</h3>
                              <ul className="space-y-2">
                                {filteredHoverData?.theme?.length > 0 ? (
                                  filteredHoverData?.theme.map((themeItem, themeIndex: number) => (
                                    <li
                                      key={themeIndex}
                                      className={`text-sm ${
                                        dark ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                                      } transition-colors duration-150 cursor-pointer`}
                                      onClick={() => {
                                        handleOptionSelect(hoveredDiscipline?.disciplineName);
                                        handleThemeSelect(themeItem?.themeName);
                                        setHoveredDiscipline(null);
                                      }}
                                    >
                                      {themeItem.themeName}
                                    </li>
                                  ))
                                ) : (
                                  <li className={`text-sm ${dark ? "text-gray-500" : "text-gray-500"} italic`}>N/A</li>
                                )}
                              </ul>
                            </div>

                            <div className="min-w-[120px]">
                              <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"} mb-2`}>Commercial</h3>
                              <ul className="space-y-2">
                                {commercialOptions.map((key, i: number) => (
                                  <li
                                    key={i}
                                    onClick={() =>
                                      setMoreOptions((prev) => ({
                                        ...prev,
                                        [key.key]: prev[key.key] === "Yes" ? "" : "Yes",
                                      }))
                                    }
                                    className={`${
                                      moreOptions[key.key] === "Yes"
                                        ? `${dark ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"} px-2 rounded`
                                        : dark
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    } text-sm hover:text-blue-600 transition-colors duration-150 cursor-pointer`}
                                  >
                                    {key.label}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="min-w-[120px]">
                              <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"} mb-2`}>Artists</h3>
                              <ul className="space-y-2">
                                {allHoverData?.insignia &&
                                  allHoverData.insignia.map((key, i: number) => (
                                    <li
                                      key={i}
                                      onClick={() =>
                                        setMoreOptions((prev) => ({
                                          ...prev,
                                          insig: prev.insig === key._id ? "" : key._id,
                                        }))
                                      }
                                      className={`${
                                        moreOptions.insig === key._id
                                          ? `${dark ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"} px-2 rounded`
                                          : dark
                                          ? "text-gray-300"
                                          : "text-gray-700"
                                      } text-sm hover:text-blue-600 transition-colors duration-150 cursor-pointer`}
                                    >
                                      {key.credentialName}
                                    </li>
                                  ))}
                              </ul>
                            </div>

                            {/* Promoted Artworks Section */}
                            <div className="min-w-[200px]">
                              <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"} mb-2`}>Highlight</h3>
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
                                            {allHoverData?.collection[0].collectionName || "Untitled"}
                                          </p>
                                          <button className="mt-2 w-[20vh] place-content-center bg-blue-600 text-white text-md font-semibold py-3 px-3 rounded-2xl hover:bg-blue-700 transition-colors duration-150 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            Discover
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  ) : (
                                    <li className={`text-sm ${dark ? "text-gray-500" : "text-gray-500"} italic`}>No collection available</li>
                                  )}

                                  {allHoverData?.artists?.length > 0 ? (
                                    <li
                                      className="relative rounded-lg overflow-hidden w-[15vw] min-w-[120px] shadow-md hover:shadow-lg transition-all duration-200 group"
                                      style={{
                                        backgroundImage: `url(${
                                          allHoverData?.artists[0].profile?.mainImage
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
                                          {allHoverData?.artists[0].artistName || "Untitled"}
                                        </p>
                                      </div>
                                    </li>
                                  ) : (
                                    <li className={`text-sm ${dark ? "text-gray-500" : "text-gray-500"} italic`}>No artist available</li>
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
            <button
              className="rounded-full bg-[#EE1D52] py-2 px-4 text-white font-medium cursor-pointer hover:bg-[#FF3A6E] transition-colors duration-200 shadow-md"
              onClick={() => navigate("/explore")}
            >
              Explore
            </button>
            <button
              className="rounded-full bg-[#EE1D52] py-2 px-4 text-white font-medium cursor-pointer hover:bg-[#FF3A6E] transition-colors duration-200 shadow-md"
              onClick={() => navigate("/collections")}
            >
              Discovery
            </button>
          </div>
        </div>
      </div>

      <div
        ref={openRef}
        className={`fixed border-r shadow-xl top-0 left-0 h-screen overflow-y-auto w-80 transform ${
          isOpenSidePanel ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-30 ${dark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white text-gray-800"}`}
      >
        <div className={`flex items-center justify-between border-b px-4 py-3`}>
          <div className="flex items-center gap-2">
            <GiHamburgerMenu className="cursor-pointer" size="1.5em" onClick={() => setIsOpenSidePanel((prev) => !prev)} />
            <span className="font-semibold">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge color={dark ? "blue" : "yellow"} className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>

          <button className={`text-sm bg-[#FF3A6E] text-white rounded-full py-1 px-3 hover:bg-[#FF3A6E] transition-colors`} onClick={handleClear}>
            Clear All
          </button>
        </div>

        {activeFiltersCount > 0 && (
          <div className={`p-3 border-b ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
            <div className="flex flex-wrap gap-2">
              {handleOptions.map(({ key, label }) => {
                const selectedItemsMap = {
                  selectedOption,
                  selectedTechnic,
                  selectedTheme,
                  selectedStyle,
                };

                const items = selectedItemsMap[key as keyof typeof selectedItemsMap];

                return (
                  items.length > 0 &&
                  items.map((item: string, i: number) => (
                    <Badge key={`${key}-${i}`} color="blue" onRemove={() => handleOptions.find((o) => o.key === key)?.handler(item)}>
                      {label}: {item}
                    </Badge>
                  ))
                );
              })}

              {Object.entries(moreOptions).map(([key, value]) => {
                if (!value || value === "") return null;

                const labelMap = {
                  orientation: "Orientation",
                  color: "Color",
                  comingSoon: "Coming Soon",
                  discount: "Discount",
                  purchase: "Purchase Type",
                  exclusive: "Exclusive",
                  purchaseOption: "Purchase Option",
                  newIn: "New In",
                  bigDiscount: "Big Discount",
                  insig: "Artist",
                };

                return (
                  <Badge key={key} color="blue" onRemove={() => setMoreOptions((prev) => ({ ...prev, [key]: "" }))}>
                    {labelMap[key]}: {value}
                  </Badge>
                );
              })}

              {Object.entries(sliderData).map(([key, [min, max]]) => {
                const defaultRange = defaultRanges[key];
                if (min === defaultRange.min && max === defaultRange.max) return null;

                const labelMap = {
                  height: "Height",
                  width: "Width",
                  depth: "Depth",
                  price: "Price",
                };

                return (
                  <Badge key={key} color="blue" onRemove={() => handleSliderChange(key, [defaultRange.min, defaultRange.max])}>
                    {labelMap[key]}: {min}-{max}
                    {key === "price" ? "" : "cm"}
                  </Badge>
                );
              })}

              {keywords.tag && (
                <Badge color="blue" onRemove={() => setKeywords((prev) => ({ ...prev, tag: "" }))}>
                  Tag: {keywords.tag}
                </Badge>
              )}

              {keywords.name && (
                <Badge color="blue" onRemove={() => setKeywords((prev) => ({ ...prev, name: "" }))}>
                  Artist: {keywords.name}
                </Badge>
              )}

              {query && (
                <Badge color="blue" onRemove={() => setQuery("")}>
                  Search: {query}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="p-4 space-y-6">
          {/* Search Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-2 ${dark ? "text-gray-100" : "text-gray-800"}`}>Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search artworks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  dark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                }`}
              />
              <FaSearch className={`absolute left-3 top-3 ${dark ? "text-gray-400" : "text-gray-400"}`} />
            </div>
          </div>
          {/* Discipline Filter */}
          <div className="space-y-2">
            <button
              onClick={() =>
                setOptionOpen((prev) => ({
                  ...prev,
                  discipline: !prev.discipline,
                }))
              }
              className={`flex justify-between items-center w-full text-left font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}
            >
              <span>Discipline</span>
              <MdKeyboardArrowDown size={20} className={`transition-transform ${optionOpen.discipline ? "rotate-180" : ""}`} />
            </button>
            {optionOpen.discipline && renderDisciplineOptions()}
          </div>

          {selectedOption.length > 0 && (
            <div className="space-y-2">
              <button
                onClick={() =>
                  setOptionOpen((prev) => ({
                    ...prev,
                    theme: !prev.theme,
                  }))
                }
                className={`flex justify-between items-center w-full text-left font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}
              >
                <span>Theme</span>
                <MdKeyboardArrowDown size={20} className={`transition-transform ${optionOpen.theme ? "rotate-180" : ""}`} />
              </button>
              {optionOpen.theme && renderThemeOptions()}
            </div>
          )}
          {/* Technic Filter (only shown when disciplines are selected) */}
          {selectedOption.length > 0 && (
            <div className="space-y-2">
              <button
                onClick={() =>
                  setOptionOpen((prev) => ({
                    ...prev,
                    technic: !prev.technic,
                  }))
                }
                className={`flex justify-between items-center w-full text-left font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}
              >
                <span>Technic</span>
                <MdKeyboardArrowDown size={20} className={`transition-transform ${optionOpen.technic ? "rotate-180" : ""}`} />
              </button>
              {optionOpen.technic && renderTechnicOptions()}
            </div>
          )}
          {/* Style Filter (only shown when disciplines are selected) */}
          {selectedOption.length > 0 && (
            <div className="space-y-2">
              <button
                onClick={() =>
                  setOptionOpen((prev) => ({
                    ...prev,
                    style: !prev.style,
                  }))
                }
                className={`flex justify-between items-center w-full text-left font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}
              >
                <span>Style</span>
                <MdKeyboardArrowDown size={20} className={`transition-transform ${optionOpen.style ? "rotate-180" : ""}`} />
              </button>
              {optionOpen.style && renderStyleOptions()}
            </div>
          )}
          {/* Orientation Filter */}
          <div className="space-y-2">
            <h3 className={`font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>Orientation</h3>
            <div className="flex gap-4">
              {[
                { value: "Vertical", icon: "↕", width: "w-8" },
                { value: "Neutral", icon: "⚪", width: "w-12" },
                { value: "Horizontal", icon: "↔", width: "w-12" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() =>
                    setMoreOptions((prev) => ({
                      ...prev,
                      orientation: prev.orientation === item.value ? "" : item.value,
                    }))
                  }
                  className={`${item.width} h-12 flex items-center justify-center rounded-lg border-2 ${
                    moreOptions.orientation === item.value
                      ? dark
                        ? "border-blue-500 bg-blue-900"
                        : "border-blue-500 bg-blue-50"
                      : dark
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-gray-200 hover:border-gray-300"
                  } transition-colors`}
                >
                  <span className="text-xl">{item.icon}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Color Filter */}
          <div className="space-y-2">
            <h3 className={`font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>Color</h3>
            <select
              value={moreOptions.color}
              onChange={(e) => setMoreOptions((prev) => ({ ...prev, color: e.target.value }))}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                dark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
              }`}
            >
              <option value="">Select Color</option>
              {colors?.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <h3 className={`font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>Commercial Options</h3>
            <div className="space-y-2">
              {commercialOptions.map((option) => (
                <label key={option.key} className="flex items-center justify-between">
                  <span className={dark ? "text-gray-300" : "text-gray-700"}>{option.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={moreOptions[option.key] === "Yes"}
                      onChange={(e) =>
                        setMoreOptions((prev) => ({
                          ...prev,
                          [option.key]: e.target.checked ? "Yes" : "",
                        }))
                      }
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer peer-focus:ring-4 ${
                        dark
                          ? "peer-focus:ring-blue-800 bg-gray-600 peer-checked:bg-blue-600"
                          : "peer-focus:ring-blue-300 bg-gray-200 peer-checked:bg-blue-600"
                      } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                    ></div>
                  </label>
                </label>
              ))}
            </div>
          </div>

          {/* Dimensions Filters */}
          <div className="space-y-4">
            {Object.entries(defaultRanges).map(([key, range]) => {
              if (selectedOption != "Sculpture" && key == "depth") return null;
              if (type != "purchase" && key == "price") return null;

              const labelMap = {
                height: "Height (cm)",
                width: "Width (cm)",
                depth: "Depth (cm)",
                price: "Price (EUR)",
              };

              return (
                <div key={key} className="space-y-2">
                  <h3 className={`font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>{labelMap[key]}</h3>
                  <div className={`flex justify-between text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                    <span>{sliderData[key][0]}</span>
                    <span>{sliderData[key][1]}</span>
                  </div>
                  <Slider
                    range
                    min={range.min}
                    max={range.max}
                    step={range.step}
                    value={sliderData[key]}
                    onChange={(value) => handleSliderChange(key, value)}
                    trackStyle={[{ backgroundColor: dark ? "#60A5FA" : "#3B82F6" }]}
                    handleStyle={[
                      {
                        backgroundColor: dark ? "#60A5FA" : "#3B82F6",
                        borderColor: dark ? "#60A5FA" : "#3B82F6",
                        opacity: 1,
                      },
                      {
                        backgroundColor: dark ? "#60A5FA" : "#3B82F6",
                        borderColor: dark ? "#60A5FA" : "#3B82F6",
                        opacity: 1,
                      },
                    ]}
                    railStyle={{
                      backgroundColor: dark ? "#374151" : "#E5E7EB",
                    }}
                    className="mt-2"
                  />
                </div>
              );
            })}
          </div>
          {/* Additional Filters */}
          <div className="space-y-2">
            <h3 className={`font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>Additional Filters</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={dark ? "text-gray-300" : "text-gray-700"}>Exclusive Artwork</span>
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
                  <div
                    className={`w-11 h-6 rounded-full peer peer-focus:ring-4 ${
                      dark
                        ? "peer-focus:ring-blue-800 bg-gray-600 peer-checked:bg-blue-600"
                        : "peer-focus:ring-blue-300 bg-gray-200 peer-checked:bg-blue-600"
                    } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                  ></div>
                </label>
              </div>

              {type === "purchase" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className={dark ? "text-gray-300" : "text-gray-700"}>Discount Available</span>
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
                      <div
                        className={`w-11 h-6 rounded-full peer peer-focus:ring-4 ${
                          dark
                            ? "peer-focus:ring-blue-800 bg-gray-600 peer-checked:bg-blue-600"
                            : "peer-focus:ring-blue-300 bg-gray-200 peer-checked:bg-blue-600"
                        } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                      ></div>
                    </label>
                  </div>

                  <div className="space-y-1">
                    <h3 className={`font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>Purchase Type</h3>
                    <select
                      value={moreOptions.purchase}
                      onChange={(e) =>
                        setMoreOptions((prev) => ({
                          ...prev,
                          purchase: e.target.value,
                        }))
                      }
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                        dark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"
                      }`}
                    >
                      <option value="">All</option>
                      {commOptions?.map((item, i) => (
                        <option key={i} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {type !== "purchase" && (
                <div className="flex items-center justify-between">
                  <span className={dark ? "text-gray-300" : "text-gray-700"}>Purchase Option</span>
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
                    <div
                      className={`w-11 h-6 rounded-full peer peer-focus:ring-4 ${
                        dark
                          ? "peer-focus:ring-blue-800 bg-gray-600 peer-checked:bg-blue-600"
                          : "peer-focus:ring-blue-300 bg-gray-200 peer-checked:bg-blue-600"
                      } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                    ></div>
                  </label>
                </div>
              )}
            </div>
          </div>
          {/* Keywords Filter */}
          <div className="space-y-2">
            <h3 className={`font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>Keywords</h3>
            <input
              type="text"
              placeholder="Search by tags..."
              value={keywords.tag}
              onChange={(e) =>
                setKeywords((prev) => ({
                  ...prev,
                  tag: e.target.value,
                }))
              }
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                dark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
              }`}
            />
          </div>
          {/* Artist Filter */}
          <div className="space-y-2">
            <h3 className={`font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>Artist</h3>
            <input
              type="text"
              placeholder="Search by artist..."
              value={keywords.name}
              onChange={(e) =>
                setKeywords((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                dark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
              }`}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={`flex justify-center items-center h-[60vh] ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
          <Loader />
        </div>
      ) : (
        <div className={`px-4 sm:px-6 md:px-10 lg:px-14 py-6 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-md transition-colors ${
                  dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => setIsOpenSidePanel((prev) => !prev)}
              >
                <MdOutlineFilterList size={20} />
                <span className="font-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge color={dark ? "blue" : "blue"} className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </button>
              <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                Showing {data?.data?.length || 0} of {data?.totalCount || 0} results
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search artworks..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                    dark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                  }`}
                />
                <FaSearch className={`absolute left-3 top-3 ${dark ? "text-gray-400" : "text-gray-400"}`} />
              </div>
              <SelectOption
                value={moreOptions.comingSoon === "Yes" ? { value: "Coming Soon", label: "Coming Soon" } : { value: "All", label: "Show" }}
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
                dark={dark}
              />
            </div>
          </div>

          <CardSection data={data?.data} type={type} darkMode={dark} />

          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page:</span>
              <select
                value={options.limit}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    cursor: "",
                    currPage: 1,
                    limit: Number(e.target.value),
                  })
                }
                className={`border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  dark ? "bg-gray-700 border-gray-600" : "border-gray-300"
                }`}
              >
                {[5, 10, 25].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm">
                {Math.min((options.currPage - 1) * options.limit + 1, data?.totalCount)}-
                {Math.min(options.currPage * options.limit, data?.totalCount)} of {data?.totalCount}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setOptions({
                      ...options,
                      cursor: prevCursor,
                      direction: "prev",
                      currPage: options.currPage === 1 ? 1 : options.currPage - 1,
                    });
                  }}
                  disabled={!prevCursor || isLoading}
                  className={`p-2 rounded-full border ${
                    !prevCursor || isLoading
                      ? dark
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : dark
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MdArrowBackIosNew size={18} />
                </button>
                <button
                  onClick={() => {
                    setOptions({
                      ...options,
                      cursor: nextCursor,
                      direction: "next",
                      currPage: options.currPage + 1,
                    });
                  }}
                  disabled={!nextCursor || isLoading}
                  className={`p-2 rounded-full border ${
                    !nextCursor || isLoading
                      ? dark
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : dark
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MdArrowForwardIos size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
