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

export interface Circle {
  _id: string;
  type: string;
  title: string;
  categories: string[];
  description?: string;
  mainImage: string;
  managers: string[];
  [key: string]: any;
}

interface FollowRequest {
  circle: string;
  [key: string]: any;
}

export interface CircleResponse {
  data: Circle[];
  follow?: {
    user: string;
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
    data: CircleResponse;
    isLoading: boolean;
  };

  const dark = useAppSelector((state) => state.theme.mode);

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

  const filteredData: CircleResponse = data && {
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

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <BannerSection title={"Circles"} secondTitle={"All Circles"} />

      <div className="sm:px-10 px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-5 gap-4 mb-8">
          <div className="relative w-full max-w-2xl">
            <div
              className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <FiSearch size={20} />
            </div>
            <input
              className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-[#EE1D52] focus:border-[#EE1D52] outline-none transition-all`}
              placeholder={t("Search by Circle Title or Category")}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span
              className={`whitespace-nowrap ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Sort By:
            </span>
            <select
              className={`p-2.5 rounded-lg border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            >
              <option>Featured</option>
              <option>Recent</option>
              <option>Popular</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div
              className={`mb-6 rounded-lg ${
                dark ? "bg-gray-800" : "bg-gray-100"
              } p-1 overflow-x-auto`}
            >
              <nav className="flex space-x-4" aria-label="Tabs">
                {Object.keys(tabCounts).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-md flex items-center ${
                      activeTab === tab
                        ? dark
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-900 shadow"
                        : dark
                        ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                    } transition-colors duration-200`}
                  >
                    {tab}
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        activeTab === tab
                          ? dark
                            ? "bg-gray-600 text-white"
                            : "bg-gray-100 text-gray-800"
                          : dark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tabCounts[tab]}
                    </span>
                  </button>
                ))}

                {showAssignedTab && (
                  <button
                    onClick={() => handleTabClick("Assigned")}
                    className={`px-4 py-2.5 text-sm font-medium rounded-md flex items-center ${
                      activeTab === "Assigned"
                        ? dark
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-900 shadow"
                        : dark
                        ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                    } transition-colors duration-200`}
                  >
                    Assigned
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        activeTab === "Assigned"
                          ? dark
                            ? "bg-gray-600 text-white"
                            : "bg-gray-100 text-gray-800"
                          : dark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {assignedCircleName?.length}
                    </span>
                  </button>
                )}
              </nav>
            </div>
            {activeTab === "All" && (
              <UserAllCircle data={filteredData} dark={dark} />
            )}
            {activeTab === "Joined" && (
              <UserJoinedCircle data={followedCircles} dark={dark} />
            )}
            {activeTab === "Requested" && (
              <UserRequestedCircle data={requestedCircles} dark={dark} />
            )}
            {activeTab === "Assigned" && (
              <AssignedCircle data={assignedCircleName} dark={dark} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserCircleList;
