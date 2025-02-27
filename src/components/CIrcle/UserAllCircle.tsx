import React, { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShareAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { RiUserFollowFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import { imageUrl } from "../utils/baseUrls";
import more from "./assets/more.png";
import usePostFollowMutation from "./https/usePostFollowMutation";

interface Circle {
  _id: string;
  type: string;
  title: string;
  categories: string[];
  description?: string;
  mainImage: string;
  managers: string[];
}

interface FollowRequest {
  circle: string;
  [key: string]: any;
}

interface CircleData {
  data: Circle[];
  follow?: {
    user: string;
    circle: string[];
  };
  followRequset?: FollowRequest[];
  [key: string]: any;
}

interface UserAllCircleProps {
  data: CircleData;
}

const UserAllCircle: React.FC<UserAllCircleProps> = ({ data }) => {
  const navigate = useNavigate();
  const profile = localStorage.getItem("profile") as "user" | "artist" | null;

  const [followStates, setFollowStates] = useState<Record<string, string>>(
    () => {
      const initialStates: Record<string, string> = {};
      data?.data?.forEach((circle) => {
        initialStates[circle?._id] =
          circle?.type === "Private" ? "Request" : "Follow";
      });
      return initialStates;
    }
  );

  const { mutateAsync } = usePostFollowMutation() as {
    mutateAsync: (id: string) => Promise<any>;
    isPending: boolean;
  };
  const userId = useAppSelector((state) => state.user.user._id) as string;

  const [pendingCircles, setPendingCircles] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (data?.follow?.user === userId && data?.follow?.circle) {
      const followedCircleIds = data.follow.circle;
      const requestedCircleIds =
        data.followRequset?.map((req) => req.circle) || [];

      setFollowStates((prev) => {
        const newStates = { ...prev };
        data?.data?.forEach((circle) => {
          if (followedCircleIds.includes(circle?._id)) {
            newStates[circle?._id] = "Following";
          } else if (
            circle?.type === "Private" &&
            requestedCircleIds.includes(circle?._id)
          ) {
            newStates[circle?._id] = "Requested";
          }
        });
        return newStates;
      });
    }
  }, [data, userId]);

  const publicCircles: Circle[] =
    data?.data?.filter((circle) => circle?.type !== "Private") || [];
  const privateCircles: Circle[] =
    data?.data?.filter((circle) => circle?.type === "Private") || [];

  const handleCircle = (id: string, type: string): void => {
    if (profile === "user") {
      if (type === "Private") {
        if (followStates[id] === "Following") {
          navigate(`/circlepage?id=${encodeURIComponent(id)}&isViewed=see`);
        } else {
          toast("You can't access private circles.");
          return;
        }
      }

      navigate(`/circlepage?id=${encodeURIComponent(id)}&isViewed=see`);
    } else if (profile === "artist") {
      if (type === "Private") {
        toast("You can't access private circles.");
        return;
      }
      navigate(`/circlepage?id=${encodeURIComponent(id)}`);
    }
  };

  const handleFollow = async (
    e: MouseEvent<HTMLSpanElement>,
    id: string
  ): Promise<void> => {
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

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  };

  const PublicCircleCard: React.FC<{ circle: Circle }> = ({ circle }) => {
    const isManager = circle?.managers?.includes(userId);
    const isCirclePending = pendingCircles[circle?._id] || false;

    return (
      <div className="flex gap-2 sm:flex-row sm:p-2 shadow-md rounded-lg border items-center bg-white">
        <div
          onClick={() => handleCircle(circle?._id, circle?.type)}
          className="content p-6 sm:py-2 sm:px-4 sm:space-y-6 xl:space-y-3 cursor-pointer"
        >
          <div className="flex justify-between sm:flex-row gap-4 2xl:gap-2 sm:items-center">
            <p className="bg-[#00B8D929] text-[#006C9C] text-xs font-semibold p-1 inline-block">
              {circle?.type || "Public"}
            </p>
          </div>

          <div className="font-semibold text-sm mt-4 sm:mt-0">
            {circle?.title}
          </div>

          <p className="bg-[#00B8D929] text-[#10009c] text-xs font-semibold rounded-lg p-1 inline-block">
            Categories: {circle?.categories?.map((item) => item).join(" | ")}
          </p>

          <div className="font-sm text-gray-600 font-medium mt-4 sm:mt-0">
            {circle?.description
              ? circle.description.split(" ").slice(0, 25).join(" ") +
                (circle.description.split(" ").length > 25 ? " ..." : "")
              : ""}
          </div>

          <div className="flex justify-between items-center mt-4 sm:mb-0 mb-4 sm:mt-0">
            <img src={more} alt="More" />

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <IoEye />
                <p className="text-sm">
                  {formatNumber(circle?.viewCount || 0)}
                </p>
              </div>
              <span className="flex items-center gap-1">
                <RiUserFollowFill />
                <p className="text-sm font-semibold">{circle?.followerCount}</p>
              </span>
              <div className="flex items-center gap-1">
                <FaShareAlt />
                <p className="text-sm">5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="img p-4 flex flex-col gap-5 sm:p-0">
          {profile === "user" && !isManager && (
            <span
              onClick={(e) => handleFollow(e, circle?._id)}
              className={`border-2 py-2 px-3 rounded-md text-center ${
                followStates[circle?._id] === "Following"
                  ? "bg-white text-black"
                  : "bg-black text-white"
              } border-black font-semibold cursor-pointer text-md`}
            >
              {isCirclePending ? "Loading..." : followStates[circle?._id]}
            </span>
          )}

          {isManager && (
            <span className="font-semibold border bg-green-600 py-2 px-8 rounded-md text-white">
              Manager
            </span>
          )}
          <img
            className="object-cover rounded-lg w-[80vh] h-[25vh]"
            src={`${imageUrl}/users/${circle?.mainImage}`}
            alt={circle?.title}
          />
        </div>
      </div>
    );
  };

  const PrivateCircleCard: React.FC<{ circle: Circle }> = ({ circle }) => {
    const isManager = circle?.managers?.includes(userId);

    return (
      <div className="flex gap-2 sm:flex-row sm:p-2 shadow-md rounded-lg border items-center bg-gray-100">
        <div
          onClick={() => handleCircle(circle?._id, circle?.type)}
          className={`content p-6 sm:py-2 sm:px-4 sm:space-y-6 xl:space-y-3 ${
            followStates[circle?._id] === "Following"
              ? "cursor-pointer"
              : "cursor-not-allowed"
          }`}
        >
          <div className="flex justify-between sm:flex-row gap-4 2xl:gap-2 sm:items-center">
            <p className="bg-[#FF000029] text-[#9C0000] text-xs font-semibold p-1 inline-block">
              Private
            </p>
          </div>

          <div className="font-semibold text-sm mt-4 sm:mt-0">
            {circle?.title}
          </div>

          <p className="bg-[#00B8D929] text-[#10009c] text-xs font-semibold rounded-lg p-1 inline-block">
            Categories: {circle?.categories?.map((item) => item).join(" | ")}
          </p>

          <div className="font-sm text-gray-600 font-medium mt-4 sm:mt-0">
            {circle?.description}
          </div>
          <div className="flex justify-between items-center mt-4 sm:mb-0 mb-4 sm:mt-0">
            <img src={more} alt="More" />

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <IoEye />
                <p className="text-sm">
                  {formatNumber(circle?.viewCount || 0)}
                </p>
              </div>
              <span className="flex items-center gap-1">
                <RiUserFollowFill />
                <p className="text-sm font-semibold">{circle?.followerCount}</p>
              </span>
              <div className="flex items-center gap-1">
                <FaShareAlt />
                <p className="text-sm">5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="img p-4 flex flex-col gap-5 sm:p-0">
          {profile === "user" && !isManager && (
            <span
              onClick={(e) => handleFollow(e, circle?._id)}
              className={`border-2 py-2 px-3 rounded-md text-center ${
                followStates[circle?._id] === "Requested" || "Following"
                  ? "bg-white text-black"
                  : "bg-black text-white"
              } border-black font-semibold cursor-pointer text-md`}
            >
              {followStates[circle?._id]}
            </span>
          )}

          {isManager && (
            <span className="font-semibold border bg-green-600 py-2 px-8 rounded-md text-white">
              Manager
            </span>
          )}
          <img
            className="object-cover rounded-lg w-[80vh] h-[25vh]"
            src={`${imageUrl}/users/${circle?.mainImage}`}
            alt={circle?.title}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="sm:px-10 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {publicCircles.map((circle) => (
          <PublicCircleCard key={circle?._id} circle={circle} />
        ))}
        {privateCircles.map((circle) => (
          <PrivateCircleCard key={circle?._id} circle={circle} />
        ))}
      </div>
    </div>
  );
};

export default UserAllCircle;
