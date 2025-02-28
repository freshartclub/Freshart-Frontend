import { useState, ChangeEvent } from "react";
import { useAppSelector } from "../../store/typedReduxHooks";
import BannerSection from "../AllArtist/BannerSection";
import Loader from "../ui/Loader";
import AssignedCircle from "./AssignedCircle";
import { useGetAllCircleList } from "./https/useGetAllCircleList";
import UserAllCircle from "./UserAllCircle";
import UserJoinedCircle from "./UserJoinedCircle";
import UserRequestedCircle from "./UserRequestedCircle";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface Circle {
  _id: string;
  title: string;
  categories: string[];
  managers: string[];
  [key: string]: any;
}

interface FollowRequest {
  circle: string;
  [key: string]: any;
}

interface CircleResponse {
  data: Circle[];
  follow?: {
    circle: string[];
  };
  followRequset?: FollowRequest[];
  [key: string]: any;
}

const UserCircleList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { t } = useTranslation();

  const id = useAppSelector((state) => state.user.user?._id) as
    | string
    | undefined;

  const { data, isLoading } = useGetAllCircleList() as {
    data: CircleResponse | undefined;
    isLoading: boolean;
  };

  const showAssignedTab: string[] | undefined = data?.data
    ?.map((item) => item?.managers?.find((_id) => _id === id))
    .filter(Boolean);

  const assignedCircleName: Circle[] | undefined = data?.data?.filter((item) =>
    item.managers.some((managerId) => showAssignedTab?.includes(managerId))
  );

  const followedCircles: Circle[] | undefined = data?.data?.filter((item) =>
    data?.follow?.circle?.includes(item?._id)
  );

  const requestedCircles: Circle[] | undefined = data?.data?.filter((item) => {
    const matchingRequests = data?.followRequset?.filter(
      (request) => request?.circle === item?._id
    );
    return matchingRequests?.length > 0;
  });

  const tabCounts: Record<string, number | undefined> = {
    All: data?.data?.length,
    Joined: followedCircles?.length,
    Requested: requestedCircles?.length,
  };

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

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

  if (isLoading) return <Loader />;

  return (
    <>
      <BannerSection title={"Circles"} secondTitle={"All Circles"} />
      <div className="sm:px-10 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-5 gap-2 mt-8">
          <div className="relative w-full">
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

          <div className="flex items-center gap-3">
            <span className="text-nowrap">Sort By: </span>
            <select className="p-2 border rounded-lg">
              <option>Featured</option>
              <option>Recent</option>
            </select>
          </div>
        </div>

        <div className="tab-filter mt-4 border rounded-t-lg bg-gray-200 p-2 scrollbar flex gap-4 w-full max-w-full overflow-x-auto md:gap-8 text-sm font-medium items-center">
          {Object.keys(tabCounts).map((tab) => (
            <div
              key={tab}
              className={`tab-item cursor-pointer p-2 rounded flex items-center w-max flex-shrink-0 ${
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

          {showAssignedTab && (
            <div
              className={`tab-item p-2 cursor-pointer rounded flex items-center w-max flex-shrink-0 ${
                activeTab === "Assigned" ? "bg-[#102030] text-white" : ""
              }`}
              onClick={() => handleTabClick("Assigned")}
            >
              <span>Assigned Circle</span>
              <span className="count ml-2 font-semibold border-black white">
                ({assignedCircleName?.length})
              </span>
            </div>
          )}
        </div>

        <div className="mt-6">
          {activeTab === "All" && <UserAllCircle data={filteredData} />}
          {activeTab === "Joined" && (
            <UserJoinedCircle data={followedCircles} />
          )}
          {activeTab === "Requested" && (
            <UserRequestedCircle data={requestedCircles} />
          )}
          {activeTab === "Assigned" && (
            <AssignedCircle data={assignedCircleName} />
          )}
        </div>
      </div>
    </>
  );
};

export default UserCircleList;
