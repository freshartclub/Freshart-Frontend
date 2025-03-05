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

const Purchase = () => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedTechnic, setSelectedTechnic] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const defaultRanges = {
    height: { min: 0, max: 300, step: 10 },
    width: { min: 0, max: 300, step: 10 },
    depth: { min: 0, max: 300, step: 10 },
    price: { min: 0, max: 10000, step: 10 },
  };

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

      const newStyle = stData?.data
        ?.filter(
          (item) =>
            item.discipline &&
            item.discipline.some((newItem) =>
              newItem.disciplineName.includes(selectedOption)
            )
        )
        .map((item) => item.styleName);

      setTechnicData(newTechnic || []);
      setThemeData(newTheme || []);
      setStyleData(newStyle || []);
    }
  }, [selectedOption, techData, theData, stData]);

  const handleClear = async () => {
    setSelectedOption("");
    setSelectedTechnic("");
    setSelectedTheme("");
    setSelectedStyle("");
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
               space-y-2 lg:space-y-0 lg:space-x-4 absolute lg:relative z-0 md:w-[40%] sm:w-[50%]
                lg:w-auto shadow-lg lg:shadow-none p-4 lg:p-0`}
            >
              {disciplineData &&
                disciplineData?.data?.map((item, index: number) => (
                  <span
                    onClick={() => setSelectedOption(item.disciplineName)}
                    key={index}
                    className="group text-white font-semibold px-2 cursor-pointer"
                  >
                    {item.disciplineName}
                  </span>
                ))}
            </div>
          </div>

          <div className="flex gap-4 ">
            <span
              className="rounded-full bg-[#102031] py-2 px-3 text-white font-medium cursor-pointer"
              onClick={() => navigate("/explore")}
            >
              Explore
            </span>

            <span
              className="rounded-full bg-[#102031] py-2 px-3 text-white font-medium cursor-pointer"
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
            Clear Filter
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

                {optionOpen.style ? (
                  <div
                    id="dropdownDivider"
                    className="z-10 border flex flex-col p-2 gap-2 bg-[#102031] text-white rounded-lg dark:bg-gray-700 dark:divide-gray-600"
                  >
                    {styleData && styleData.length > 0 ? (
                      styleData.map((item, i: number) => (
                        <span
                          className={`cursor-pointer ${
                            selectedStyle == item
                              ? "bg-gray-300 text-black px-1 rounded"
                              : ""
                          }`}
                          key={i}
                          onClick={() => setSelectedStyle(item)}
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span>No Style Found</span>
                    )}
                  </div>
                ) : null}
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
