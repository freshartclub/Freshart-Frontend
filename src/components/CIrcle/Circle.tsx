import { BsDot } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { useGetCircle } from "./https/useGetCircle";
import Loader from "../ui/Loader";
import AllCircle from "./AllCircle";
import ArtistPrivateCircle from "./ArtistPrivateCircle";
import ArtistPublicCircle from "./ArtistPublicCircle";
import { useTranslation } from "react-i18next";

interface Circle {
  title?: string;
  type: string;
  categories?: string[];
  [key: string]: any;
}

interface CircleResponse {
  data: Circle[];
  [key: string]: any;
}

const Circle = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading } = useGetCircle() as {
    data: CircleResponse | undefined;
    isLoading: boolean;
  };

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const publicCircles: Circle[] =
    data?.data?.filter((circle) => circle?.type !== "Private") || [];
  const privateCircles: Circle[] =
    data?.data?.filter((circle) => circle?.type === "Private") || [];

  const filteredData: CircleResponse | undefined = data && {
    ...data,
    data: data.data.filter((item: Circle) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(searchLower);
      const categoryMatch = item.categories?.some((category) =>
        category.toLowerCase().includes(searchLower)
      );
      return titleMatch || categoryMatch;
    }),
  };

  const filteredPrivateData: any = {
    ...privateCircles,
    data: privateCircles.filter((item: Circle) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(searchLower);
      const categoryMatch = item.categories?.some((category) =>
        category.toLowerCase().includes(searchLower)
      );
      return titleMatch || categoryMatch;
    }),
  };

  const filteredPublicData: any = {
    ...publicCircles,
    data: publicCircles.filter((item: Circle) => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(searchLower);
      const categoryMatch = item.categories?.some((category) =>
        category.toLowerCase().includes(searchLower)
      );
      return titleMatch || categoryMatch;
    }),
  };

  const tabCounts: Record<string, number | undefined> = {
    All: data?.data?.length,
    Public: publicCircles?.length,
    Private: privateCircles?.length,
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-3">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        {t("Circle List")}
      </h1>

      <div className="mt-5 relative">
        {searchQuery === "" && (
          <FiSearch
            className="absolute top-2.5 left-2 text-gray-400"
            size={20}
          />
        )}
        <input
          className="p-2 pl-8 border border-zinc-400 outline-none rounded-lg w-full"
          placeholder={t("Search by Circle Title or Category")}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="tab-filter mt-4 border rounded-t-lg bg-gray-200 p-2 scrollbar flex gap-4 w-full max-w-full overflow-x-auto md:gap-8 text-sm font-medium items-center">
        {Object.keys(tabCounts).map((tab: string) => (
          <div
            key={tab}
            className={`tab-item p-2 rounded flex items-center w-max flex-shrink-0 ${
              activeTab === tab ? "bg-[#102030] text-white" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            <span>{tab}</span>
            <span className="count ml-2 font-semibold border-black white">
              ({tabCounts[tab]})
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "All" && <AllCircle data={filteredData} />}
        {activeTab === "Public" && (
          <ArtistPublicCircle data={filteredPublicData} />
        )}
        {activeTab === "Private" && (
          <ArtistPrivateCircle data={filteredPrivateData} />
        )}
      </div>
    </div>
  );
};

export default Circle;
