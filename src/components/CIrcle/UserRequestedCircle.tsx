import { FaShareAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { RiUserFollowFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";
import { useAppSelector } from "../../store/typedReduxHooks";
import toast from "react-hot-toast";
import { Circle, CircleResponse } from "./UserCircleList";

interface UserAllCircleProps {
  data: CircleResponse;
  dark: boolean;
}

const UserRequestedCircle: React.FC<UserAllCircleProps> = ({ data, dark }) => {
  const navigate = useNavigate();

  const handleCircle = (id: string, type: string) => {
    if (type === "Private") {
      toast("You can't access private circles.");
      return;
    }

    navigate(`/circlepage?id=${encodeURIComponent(id)}`);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  };

  const renderTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return null;

    return (
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`whitespace-nowrap text-xs px-2 py-1 rounded-full ${
              dark
                ? "bg-gray-700 text-[#f84773c9]"
                : "bg-[#fdedf1] text-[#EE1D52]"
            }`}
          >
            #{tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {data && data.length > 0 ? (
        data?.map((circle: Circle, i: number) => (
          <div
            key={i}
            onClick={() => handleCircle(circle?._id, circle?.type)}
            className={`flex flex-col lg:flex-row justify-between border gap-4 p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${
              dark
                ? "bg-gray-800 border-gray-700 hover:shadow-lg"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={`text-lg font-semibold ${
                    dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {circle?.title}
                </h3>

                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    circle?.status === "Active"
                      ? dark
                        ? "bg-green-900 text-green-300"
                        : "bg-green-100 text-green-800"
                      : dark
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {circle?.status || "Unknown"}
                </span>

                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    circle?.type === "Private"
                      ? dark
                        ? "bg-red-900 text-red-300"
                        : "bg-red-100 text-red-800"
                      : dark
                      ? "bg-blue-900 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {circle?.type}
                </span>
              </div>

              {renderTags(circle?.categories)}

              <p
                className={`text-sm ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {circle?.description
                  ? circle.description.split(" ").slice(0, 25).join(" ") +
                    (circle.description.split(" ").length > 25 ? "..." : "")
                  : "No description available"}
              </p>

              <div className="flex items-center gap-4 mt-2">
                <div
                  className={`flex items-center gap-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <IoEye className="text-lg" />
                  <span className="text-sm">
                    {formatNumber(circle?.viewCount || 0)}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <RiUserFollowFill className="text-lg" />
                  <span className="text-sm">
                    {formatNumber(circle?.followerCount || 0)}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <FaShareAlt className="text-lg" />
                  <span className="text-sm">5</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-48 h-32 rounded-md overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={`${imageUrl}/users/${circle?.mainImage}`}
                alt={circle?.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/200";
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <div
          className={`text-center py-12 rounded-lg ${
            dark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`text-lg font-medium ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No circles found
          </h3>
        </div>
      )}
    </div>
  );
};

export default UserRequestedCircle;
