import React from "react";
import more from "./assets/more.png";
import message from "./assets/message.png";
import view from "./assets/view.png";
import share from "./assets/share.png";
import img from "./assets/img.png";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";
import { useAppSelector } from "../../store/typedReduxHooks";
import toast from "react-hot-toast";

const UserJoinedCircle = ({ data }) => {
  const navigate = useNavigate();
  const profile = localStorage.getItem("profile");

  const id = useAppSelector((state) => state.user.user?._id);

  const showAssignedTab = data
    ?.map((item) => item?.managers?.find((_id) => _id === id))
    .filter(Boolean);

  const isAssigned = showAssignedTab.includes(id);

  const handleCircle = (id, type) => {
    if (isAssigned) {
      console.log("dssaddas", isAssigned);

      navigate(`/circlepage?id=${encodeURIComponent(id)}`);
      return;
    }

    if (type === "Private") {
      toast("You can't access private circles.");
      return;
    }

    navigate(`/circlepage?id=${encodeURIComponent(id)}`);
  };

  const handleFollow = (e, id) => {
    e.stopPropagation();
    console.log("Follow clicked for circle ID:", id);
  };

  return (
    <div className="sm:px-10 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {data ? (
          data?.map((circle, i) => (
            <div
              key={i}
              className="flex gap-2 sm:flex-row sm:p-2 sm:mb-0 shadow-md rounded-lg border items-center"
            >
              <div
                onClick={() => handleCircle(circle?._id, circle?.type)}
                className="content p-6 sm:py-2 sm:px-4 sm:space-y-6 xl:space-y-3 cursor-pointer"
              >
                <div className="flex justify-between sm:flex-row gap-4 2xl:gap-2 sm:items-center">
                  <div>
                    <p className="bg-[#00B8D929] text-[#006C9C] text-xs font-semibold p-1 inline-block">
                      {circle?.type || "Public"}
                    </p>
                  </div>
                  <div></div>
                </div>

                <div className="font-semibold text-sm mt-4 sm:mt-0">
                  {circle?.title}
                </div>

                <p className="bg-[#00B8D929] text-[#10009c] text-xs font-semibold rounded-lg p-1 inline-block">
                  Categories :{" "}
                  {circle?.categories?.map((item) => item).join(" | ")}
                </p>
                <div className="font-sm text-gray-600 font-medium mt-4 sm:mt-0">
                  {circle?.description
                    ? circle.description.split(" ").slice(0, 25).join(" ") +
                      (circle.description.split(" ").length > 25 ? " ..." : "")
                    : ""}
                </div>

                <div className="flex justify-between items-center mt-4 sm:mb-0 mb-4 sm:mt-0">
                  <div>
                    <img src={more} alt="More" />
                  </div>

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

              <div className="flex flex-col gap-3">
                {isAssigned && (
                  <span className=" font-semibold border bg-green-600 py-2 px-8 rounded-md  text-white">
                    Manager
                  </span>
                )}

                <div className="img p-4 flex flex-col gap-5 sm:p-0">
                  <img
                    className="object-cover rounded-lg w-[80vh] h-[25vh]"
                    src={`${imageUrl}/users/${circle?.mainImage}`}
                    alt={circle?.title}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Circle Is Assigned</div>
        )}
      </div>
    </div>
  );
};

export default UserJoinedCircle;
