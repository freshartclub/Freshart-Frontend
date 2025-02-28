import { FaShareAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { RiUserFollowFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";
import { useAppSelector } from "../../store/typedReduxHooks";
import toast from "react-hot-toast";

const AssignedCircle = ({ data }) => {
  const navigate = useNavigate();

  const id = useAppSelector((state) => state.user.user?._id);

  const showAssignedTab = data
    ?.map((item) => item?.managers?.find((_id) => _id === id))
    .filter(Boolean);

  const isAssigned = showAssignedTab.includes(id);

  const handleCircle = (id, type) => {
    if (isAssigned) {
      navigate(`/circlepage?id=${encodeURIComponent(id)}`);
      return;
    }

    if (type === "Private") {
      toast("You can't access private circles.");
      return;
    }

    navigate(`/circlepage?id=${encodeURIComponent(id)}`);
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 my-3 sm:gap-4">
      {data && data.length > 0 ? (
        data?.map((circle, i: number) => (
          <div
            key={i}
            onClick={() => handleCircle(circle?._id, circle?.type)}
            className={`flex lg:h-[11rem] justify-between items-center lg:flex-row flex-col gap-2 shadow border border-zinc-300 p-2 rounded-md bg-white cursor-pointer`}
          >
            <div className="flex flex-col justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {circle?.title?.length > 15
                    ? circle?.title?.slice(0, 15) + "..."
                    : circle?.title}
                </span>
                <p className="bg-[#00B8D929] px-2 text-[#006C9C] text-[10px] font-semibold rounded-full">
                  {circle?.status}
                </p>

                <p className="bg-red-500 px-2 text-white text-[10px] font-semibold rounded-full">
                  {circle?.type}
                </p>
              </div>
              <p className="bg-[#00B8D929] w-max text-[#10009c] rounded-full font-semibold px-2 text-[11px]">
                {circle?.categories?.length > 3
                  ? circle?.categories?.join(" | ").slice(0, 20) + "..."
                  : circle?.categories?.join(" | ")}
              </p>

              <div className="font-sm text-gray-600 font-medium text-[14px]">
                {circle?.description
                  ? circle.description.split(" ").slice(0, 25).join(" ") +
                    (circle.description.split(" ").length > 25 ? " ..." : "")
                  : ""}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <IoEye />
                  <p className="text-sm">
                    {formatNumber(circle?.viewCount || 0)}
                  </p>
                </div>
                <span className="flex items-center gap-1">
                  <RiUserFollowFill />
                  <p className="text-sm font-semibold">
                    {circle?.followerCount}
                  </p>
                </span>
                <div className="flex items-center gap-1">
                  <FaShareAlt />
                  <p className="text-sm">5</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:p-0">
              {isAssigned && (
                <span className="font-semibold border text-center bg-green-600 py-2 px-8 rounded-md  text-white">
                  Manager
                </span>
              )}

              <img
                className="lg:w-[20rem] w-full h-[7rem] rounded-md object-cover"
                src={`${imageUrl}/users/${circle?.mainImage}`}
                alt={circle?.title}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="">No Circle Is Assigned</div>
      )}
    </div>
  );
};

export default AssignedCircle;
