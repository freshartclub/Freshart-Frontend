import { BsDot } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { useGetCircle } from "./https/useGetCircle";
import Loader from "../ui/Loader";
import AllCircle from "./AllCircle";
import ArtistPrivateCircle from "./ArtistPrivateCircle";
import ArtistPublicCircle from "./ArtistPublicCircle";

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
    <div className="py-7 px-4">
      <div>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="space-y-2">
            <h1 className="font-bold text-[20px] md:text-[24px] text-black">
              Circle
            </h1>
            <div className="flex gap-2 items-center">
              <p className="text-base text-black font-semibold">
                <NavLink to={"/dashboard"}>Dashboard</NavLink>
              </p>
              <BsDot />
              <span className="text-base text-black font-semibold hover:cursor-pointer">
                Circle
              </span>
              <BsDot />
              <span className="text-sm text-gray-400 font-semibold hover:cursor-pointer">
                List
              </span>
            </div>
          </div>
          <div></div>
        </div>

        {/* Search and Sort Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mt-8">
          <div className="relative w-[50vw]">
            <input
              className="p-2 border border-zinc-400 outline-none rounded-lg w-full"
              placeholder="Search by title or category"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery === "" && (
              <FiSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            )}
          </div>
        </div>

        {/* Tab Filter Section */}
        <div className="tab-filter mt-8">
          {Object.keys(tabCounts).map((tab: string) => (
            <div
              key={tab}
              className={`tab-item f ${
                activeTab === tab ? "active" : ""
              } inline-block px-4 py-2 cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 bg-black text-white rounded-md font-semibold border-black "
                  : " text-black"
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
    </div>
  );
};

export default Circle;
