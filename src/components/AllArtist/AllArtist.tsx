import { useEffect, useState } from "react";
import { useGetDiscipline } from "../pages/http/useGetDiscipline";
import { useGetStyle } from "../pages/http/useGetStyle";
import Loader from "../ui/Loader";
import { useDebounce } from "../utils/useDebounce";
import AplhaFilter from "./AplhaFilter";
import BannerSection from "./BannerSection";
import FilterSection from "./FilterSection";
import { useGetAllArtist } from "./https/useGetAllArtist";
import { useGetInsignia } from "./https/useGetInsignia";

const AllArtist = () => {
  const [letter, setLetter] = useState("");
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedInsignia, setSelectedInsignia] = useState("");
  const [sort, setSort] = useState("A-Z");
  const [currPage, setCurrPage] = useState(1);

  const { data: disciplineData } = useGetDiscipline();
  const { data: stData } = useGetStyle();
  const { data: cred } = useGetInsignia();
  const debounceSearch = useDebounce(query, 800);

  const [styleData, setStyleData] = useState([]);

  const { data, isLoading, isFetching, refetch } = useGetAllArtist(
    debounceSearch,
    selectedStyle,
    selectedInsignia,
    sort,
    selectedOption,
    letter,
    currPage
  );

  useEffect(() => {
    if (selectedOption) {
      const newStyle = stData?.data
        ?.filter(
          (item) =>
            item.discipline &&
            item.discipline.some((newItem) =>
              newItem.disciplineName.includes(selectedOption)
            )
        )
        .map((item) => item.styleName);

      setStyleData(newStyle || []);
    }
  }, [stData, selectedOption]);

  useEffect(() => {
    if (data) {
      setCurrPage(data?.currentPage || 1);
    }
  }, [query, data]);

  const handleClear = async () => {
    if (
      !selectedOption &&
      !selectedStyle &&
      !selectedInsignia &&
      !query &&
      !letter
    ) {
      return;
    }

    setStyleData([]);
    setQuery("");
    setSelectedOption("");
    setSelectedStyle("");
    setSelectedInsignia("");
    setLetter("");
    setSort("A-Z");
    setCurrPage(1);

    await refetch();
  };

  return (
    <div>
      <BannerSection title={"Artist"} secondTitle={"All Artist"} />
      <div className="container mx-auto sm:px-6 px-3 ">
        <FilterSection
          setSort={setSort}
          discipline={disciplineData?.data}
          setSelectedOption={setSelectedOption}
          setSelectedStyle={setSelectedStyle}
          setSelectedInsignia={setSelectedInsignia}
          cred={cred}
          styleData={styleData}
          query={query}
          setQuery={setQuery}
          selectedOption={selectedOption}
          selectedStyle={selectedStyle}
          selectedInsignia={selectedInsignia}
          sort={sort}
          letter={letter}
          handleClear={handleClear}
        />
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <AplhaFilter
            setLetter={setLetter}
            setCurrPage={setCurrPage}
            currPage={currPage}
            data={data?.artists}
            totalPages={data?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default AllArtist;
