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

// Define interfaces based on usage
interface Circle {
  _id: string;
  title: string;
  categories: string[];
  managers: string[];
  [key: string]: any; // For additional properties
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

  console.log(data);

  if (isLoading) return <Loader />;

  return (
    <div className="">
      <div>
        {/* Header Section */}
        <BannerSection title={"Circles"} secondTitle={"All Circles"} />

        {/* Search and Sort Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-8 px-10">
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

          <div className="flex items-center gap-3">
            <span>Sort By: </span>
            <select className="p-2 border rounded-lg">
              <option>Featured</option>
              <option>Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tab Filter Section */}
      <div className="tab-filter mt-8 px-10">
        {Object.keys(tabCounts).map((tab) => (
          <div
            key={tab}
            className={`tab-item f ${
              activeTab === tab ? "active" : ""
            } inline-block px-4 py-2 cursor-pointer ${
              activeTab === tab
                ? "border-2 rounded-md bg-black text-white border-black font-semibold text-md transition-none"
                : " text-black"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            <span>{tab}</span>
            <span className="count ml-2 text-gray-500">({tabCounts[tab]})</span>
          </div>
        ))}

        {showAssignedTab && (
          <div
            className={`inline-block px-4 py-2 cursor-pointer ${
              activeTab === "Assigned"
                ? "border-2 rounded-md bg-black text-white border-black font-semibold text-md transition-none"
                : "text-black"
            }`}
            onClick={() => handleTabClick("Assigned")}
          >
            <span>Assigned Circle</span>
            <span className="count ml-2 text-gray-500">
              ({assignedCircleName?.length})
            </span>
          </div>
        )}
      </div>

      <div className="mt-6">
        {activeTab === "All" && <UserAllCircle data={filteredData} />}
        {activeTab === "Joined" && <UserJoinedCircle data={followedCircles} />}
        {activeTab === "Requested" && (
          <UserRequestedCircle data={requestedCircles} />
        )}
        {activeTab === "Assigned" && (
          <AssignedCircle data={assignedCircleName} />
        )}
      </div>
    </div>
  );
};

export default UserCircleList;
