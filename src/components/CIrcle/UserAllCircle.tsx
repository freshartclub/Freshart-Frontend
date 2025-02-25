import React, { useState, useEffect } from "react";
import more from "./assets/more.png";
import message from "./assets/message.png";
import view from "./assets/view.png";
import share from "./assets/share.png";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";
import { useAppSelector } from "../../store/typedReduxHooks";
import toast from "react-hot-toast";
import usePostFollowMutation from "./https/usePostFollowMutation";

const UserAllCircle = ({ data }) => {
  const navigate = useNavigate();
  const profile = localStorage.getItem("profile");

  const [followStates, setFollowStates] = useState(() => {
    const initialStates = {};
    data?.data?.forEach((circle) => {
      initialStates[circle?._id] =
        circle?.type === "Private" ? "Request" : "Follow";
    });
    return initialStates;
  });

  const { mutateAsync, isPending } = usePostFollowMutation();
  const userId = useAppSelector((state) => state.user.user._id);

  useEffect(() => {
    if (data?.follow?.user === userId && data?.follow?.circle) {
      const followedCircleIds = data.follow.circle; // Array of circle IDs the user follows
      setFollowStates((prev) => {
        const newStates = { ...prev };
        data?.data?.forEach((circle) => {
          if (
            circle?.type !== "Private" &&
            followedCircleIds.includes(circle?._id)
          ) {
            newStates[circle?._id] = "Following";
          }
        });
        return newStates;
      });
    }
  }, [data, userId]);

  const publicCircles =
    data?.data?.filter((circle) => circle?.type !== "Private") || [];
  const privateCircles =
    data?.data?.filter((circle) => circle?.type === "Private") || [];

  const handleCircle = (id, type) => {
    if (profile === "user") {
      if (type === "Private") {
        toast("You can't access private circles.");
        return;
      }
      navigate(`/circlepage?id=${encodeURIComponent(id)}`);
    } else if (profile === "artist") {
      if (type === "Private") {
        toast("You can't access private circles.");
        return;
      }
      navigate(`/artist-panel/circle/circlepage?id=${encodeURIComponent(id)}`);
    }
  };

  const handleFollow = async (e, id) => {
    e.stopPropagation();
    const circle = data?.data?.find((circle) => circle?._id === id);

    if (circle?.type === "Private") {
      toast("Your request has been Sent");
      setFollowStates((prev) => ({
        ...prev,
        [id]: "Requested",
      }));
    }

    try {
      await mutateAsync(id);

      setFollowStates((prev) => ({
        ...prev,
        [id]: "Following",
      }));
    } catch (error) {
      console.error("Follow error:", error);
      toast.error("Failed to follow circle");
    }
  };

  console.log("circlePage", data);

  const PublicCircleCard = ({ circle }) => (
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
          {circle?.description}
        </div>

        <div className="flex justify-between items-center mt-4 sm:mb-0 mb-4 sm:mt-0">
          <img src={more} alt="More" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <img src={message} alt="Message" />
              <p className="text-sm">5</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={view} alt="View" />
              <p className="text-sm">5</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={share} alt="Share" />
              <p className="text-sm">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="img p-4 flex flex-col gap-5 sm:p-0">
        {profile === "user" && (
          <span
            onClick={(e) => handleFollow(e, circle?._id)}
            className={`border-2 py-2 px-3 rounded-md text-center ${
              followStates[circle?._id] === "Following"
                ? "bg-white text-black"
                : "bg-black text-white"
            }  border-black font-semibold cursor-pointer text-md`}
          >
            {isPending ? "Loading" : followStates[circle?._id]}
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

  const PrivateCircleCard = ({ circle }) => (
    <div className="flex gap-2 sm:flex-row sm:p-2 shadow-md rounded-lg border items-center bg-gray-100 ">
      <div
        onClick={() => handleCircle(circle?._id, circle?.type)}
        className="content p-6 sm:py-2 sm:px-4 sm:space-y-6 xl:space-y-3 cursor-not-allowed"
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
      </div>

      <div className="img p-4 flex flex-col gap-5 sm:p-0">
        {profile === "user" && (
          <span
            onClick={(e) => handleFollow(e, circle?._id)}
            className={`border-2 py-2 px-3 rounded-md text-center  ${
              followStates[circle?._id] === "Requested"
                ? "bg-white text-black"
                : "bg-black text-white"
            }  border-black font-semibold cursor-pointer text-md`}
          >
            {followStates[circle?._id]}
          </span>
        )}
        <img
          className="object-cover rounded-lg w-[80vh] h-[25vh] "
          src={`${imageUrl}/users/${circle?.mainImage}`}
          alt={circle?.title}
        />
      </div>
    </div>
  );

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
