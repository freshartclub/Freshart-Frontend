import { useState } from "react";
import AplhaFilter from "./AplhaFilter";
import BannerSection from "./BannerSection";
import FilterSection from "./FilterSection";
import { useGetAllArtist } from "./https/useGetAllArtist";
import Loader from "../ui/Loader";

const AllArtist = () => {
  const [query, setQuery] = useState("");

  const search = (e: any) => {
    setQuery(e.target.value);
  };

  const { data, isLoading } = useGetAllArtist();

  if (isLoading) return <Loader />;

  return (
    <div>
      <BannerSection />
      <div className="container mx-auto sm:px-6 px-3 ">
        <FilterSection query={query} search={search} />
        <AplhaFilter query={query} data={data} />
      </div>
    </div>
  );
};

export default AllArtist;
