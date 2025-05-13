import React, { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShareAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { RiUserFollowFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import { imageUrl } from "../utils/baseUrls";
import usePostFollowMutation from "./https/usePostFollowMutation";
import { Circle, CircleResponse } from "./UserCircleList";

interface UserAllCircleProps {
  data: CircleResponse;
  dark: boolean;
}

const UserAllCircle: React.FC<UserAllCircleProps> = ({ data, dark }) => {
  const navigate = useNavigate();
  const profile = localStorage.getItem("profile") as "user" | "artist" | null;

  const [followStates, setFollowStates] = useState<Record<string, string>>(() => {
    const initialStates: Record<string, string> = {};
    data?.data?.forEach((circle) => {
      initialStates[circle?._id] = circle?.type === "Private" ? "Request" : "Follow";
    });
    return initialStates;
  });

  const { mutateAsync } = usePostFollowMutation() as {
    mutateAsync: (id: string) => Promise<any>;
    isPending: boolean;
  };
  const userId = useAppSelector((state) => state.user.user._id) as string;

  const [pendingCircles, setPendingCircles] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (data?.follow?.user === userId && data?.follow?.circle) {
      const followedCircleIds = data.follow.circle;
      const requestedCircleIds = data.followRequset?.map((req) => req.circle) || [];

      setFollowStates((prev) => {
        const newStates = { ...prev };
        data?.data?.forEach((circle) => {
          if (followedCircleIds.includes(circle?._id)) {
            newStates[circle?._id] = "Following";
          } else if (circle?.type === "Private" && requestedCircleIds.includes(circle?._id)) {
            newStates[circle?._id] = "Requested";
          }
        });
        return newStates;
      });
    }
  }, [data, userId]);

  const handleCircle = (id: string, type: string, isManager?: boolean): void => {
    if (profile === "user") {
      if (type === "Private") {
        if (followStates[id] === "Following" || isManager) {
          navigate(`/circle/${encodeURIComponent(id)}?isViewed=see`);
        } else {
          toast("You can't access private circles.");
          return;
        }
      }

      navigate(`/circle/${encodeURIComponent(id)}?isViewed=see`);
    } else if (profile === "artist") {
      if (type === "Private") {
        toast("You can't access private circles.");
        return;
      }
      navigate(`/circle/${encodeURIComponent(id)}`);
    }
  };

  const handleFollow = async (e: MouseEvent<HTMLButtonElement>, id: string): Promise<void> => {
    e.stopPropagation();
    const circle = data?.data?.find((circle) => circle?._id === id);

    setPendingCircles((prev) => ({ ...prev, [id]: true }));

    try {
      await mutateAsync(id);

      if (circle?.type === "Private") {
        setFollowStates((prev) => ({
          ...prev,
          [id]: "Requested",
        }));
      } else {
        setFollowStates((prev) => ({
          ...prev,
          [id]: "Following",
        }));
      }
    } catch (error) {
      console.error("Follow error:", error);
    } finally {
      setPendingCircles((prev) => ({ ...prev, [id]: false }));
    }
  };

  const formatNumber = (num: number) => {
    if (!num) return "0";
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num.toString();
    }
  };

  const renderTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return null;

    return (
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`whitespace-nowrap text-xs px-2 py-1 rounded-full ${dark ? "bg-gray-700 text-[#f84773c9]" : "bg-[#fdedf1] text-[#EE1D52]"}`}
          >
            #{tag}
          </span>
        ))}
      </div>
    );
  };

  const CircleCard: React.FC<{ circle: Circle }> = ({ circle }) => {
    const isManager = circle?.managers?.includes(userId);
    const isCirclePending = pendingCircles[circle?._id] || false;
    const isFollowing = followStates[circle?._id] === "Following";
    const isRequested = followStates[circle?._id] === "Requested";

    return (
      <div
        onClick={() => handleCircle(circle?._id, circle?.type, isManager)}
        className={`flex flex-col lg:flex-row justify-between border gap-4 p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${
          dark ? "bg-gray-800 border-gray-700 hover:shadow-lg" : "bg-white border-gray-200"
        } ${circle?.type === "Private" && !isFollowing && !isManager ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{circle?.title}</h3>

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

          <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
            {circle?.description
              ? circle.description.split(" ").slice(0, 25).join(" ") + (circle.description.split(" ").length > 25 ? "..." : "")
              : "No description available"}
          </p>

          <div className="flex items-center gap-4 mt-2">
            <div className={`flex items-center gap-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
              <IoEye className="text-lg" />
              <span className="text-sm">{formatNumber(circle?.viewCount || 0)}</span>
            </div>
            <div className={`flex items-center gap-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
              <RiUserFollowFill className="text-lg" />
              <span className="text-sm">{formatNumber(circle?.followerCount || 0)}</span>
            </div>
            <div className={`flex items-center gap-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
              <FaShareAlt className="text-lg" />
              <span className="text-sm">5</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {profile === "user" && !isManager && (
            <button
              onClick={(e) => handleFollow(e, circle?._id)}
              disabled={isFollowing || isRequested || isCirclePending}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                isFollowing || isRequested
                  ? dark
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-800"
                  : "bg-[#EE1D52] hover:bg-[#ff3265] text-white"
              } ${isCirclePending ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isCirclePending
                ? "Processing..."
                : isFollowing
                ? "Following"
                : isRequested
                ? "Requested"
                : circle?.type === "Private"
                ? "Request"
                : "Follow"}
            </button>
          )}

          {isManager && (
            <span className={`px-4 py-2 rounded-md text-sm font-medium ${dark ? "bg-green-700 text-white" : "bg-green-600 text-white"}`}>
              Manager
            </span>
          )}

          <div className="w-full lg:w-48 h-32 rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`${imageUrl}/users/${circle?.mainImage}`}
              alt={circle?.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/200";
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {data.data.length > 0 && (
        <div className="space-y-4">
          {data.data.map((circle) => (
            <CircleCard key={circle?._id} circle={circle} />
          ))}
        </div>
      )}

      {data.data.length === 0 && (
        <div className={`text-center py-12 rounded-lg ${dark ? "bg-gray-800" : "bg-white"}`}>
          <h3 className={`text-lg font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>No circles found</h3>
        </div>
      )}
    </div>
  );
};

export default UserAllCircle;
