import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import BannerSection from "./BannerSection";
import FilterSection from "./FilterSection";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import { useGetTechnic } from "../ArtistPanel/AddArtwork/http/useGetTechnic";
import { useGetTheme } from "../ArtistPanel/AddArtwork/http/useGetTheme";
import { useGetPurchaseArtwork } from "./http/useGetPurchaseArtwork";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import Loader from "../ui/Loader";

const Purchase = () => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedTechnic, setSelectedTechnic] = useState(null);

  const [technicData, setTechnicData] = useState([]);
  const [themeData, setThemeData] = useState([]);
  const [selectDiscipline, setSelectDiscipline] = useState(null);

  const navigate = useNavigate();
  const redirectToDiscovery = () => {
    navigate("/discovery_art");
  };

  const { data: disciplineData, isLoading: disciplineLoading } =
    useGetDiscipline();

  console.log(disciplineData);

  const search = (e: any) => {
    setQuery(e.target.value);
  };

  const redirectToExplore = () => {
    navigate("/explore");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { data, isLoading, isFetching } = useGetPurchaseArtwork(
    type,
    query,
    selectedTheme,
    selectedTechnic,
    selectedOption
  );

  const { data: techData, isLoading: technicLoading } = useGetTechnic();
  const { data: theData, isLoading: themeLoading } = useGetTheme();

  useEffect(() => {
    if (selectedOption) {
      // Filter technic data
      const newTechnic = techData?.data
        ?.filter(
          (item) =>
            item.discipline &&
            item.discipline.some((newItem) =>
              newItem.disciplineName.includes(selectedOption.value)
            )
        )
        .map((item) => ({
          label: item.technicName || item.disciplineName,
          value: item._id,
        }));

      // Filter theme data
      const newTheme = theData?.data
        ?.filter(
          (item) =>
            item.discipline &&
            item.discipline.some((newItem) =>
              newItem.disciplineName.includes(selectedOption.value)
            )
        )
        .map((item) => ({
          label: item.themeName || item.disciplineName,
          value: item._id,
        }));

      // Set data
      setTechnicData(newTechnic || []);
      setThemeData(newTheme || []);
    }
  }, [selectedOption, techData, theData]);

  const handleDiscipline = (discipline) => {
    const value = {
      value: discipline,
      label: discipline,
    };
    setSelectedOption(value);
  };

  if (disciplineLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto sm:px-6 px-3">
        <div className="flex justify-between my-4 items-center">
          <div className="relative w-full">
            <button
              className="lg:hidden p-2"
              onClick={toggleMenu}
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
                disciplineData?.data?.map((item, index) => (
                  <span
                    onClick={() => handleDiscipline(item.disciplineName)}
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
              onClick={redirectToExplore}
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
              onClick={redirectToDiscovery}
            >
              Discovery
            </Button>
          </div>
        </div>
      </div>
      {/* <BannerSection /> */}
      <FilterSection
        query={query}
        search={search}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        themeData={themeData}
        techData={technicData}
        setSelectedTheme={setSelectedTheme}
        selectedTheme={selectedTheme}
        selectedTechnic={selectedTechnic}
        setSelectedTechnic={setSelectedTechnic}
        data={data}
        isLoading={isLoading || isFetching}
      />
    </>
  );
};

export default Purchase;
