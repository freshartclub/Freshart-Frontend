import { useNavigate } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";
import { RiUserFollowFill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";

const ArtistPrivateCircle = ({ data }) => {
  const navigate = useNavigate();

  const handleCircle = (id: string) => {
    navigate(`/artist-panel/circle/circlepage?id=${encodeURIComponent(id)}`);
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

  const renderTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return null;

    return (
      <div className="flex gap-2 overflow-x-auto scrollbar">
        {tags.map((tag, index) => (
          <span key={index} className="whitespace-nowrap">
            #{tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 my-3 sm:gap-4">
      {data?.data?.length > 0 ? (
        data?.data?.map((circle, index: number) => (
          <div
            key={index}
            onClick={() => handleCircle(circle?._id)}
            className="flex lg:h-[10rem] justify-between items-center lg:flex-row flex-col gap-2 shadow border py-2 pl-3 lg:pr-0 pr-3 rounded-md bg-white cursor-pointer"
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
              <div className="overflow-x-auto flex max-w-[200px] w-max scrollbar-hide bg-[#00B8D929] text-[#10009c] rounded-full font-semibold px-2 text-[11px]">
                {renderTags(circle?.categories)}
              </div>

              <div className="font-sm text-gray-600 font-medium text-[14px]">
                {circle?.description
                  ? circle.description.split(" ").slice(0, 17).join(" ") +
                    (circle.description.split(" ").length > 17 ? " ..." : "")
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

            <img
              className="lg:w-[10rem] w-full h-[10rem] object-cover lg:rounded-r-lg lg:rounded-l-none rounded-l-lg"
              src={`${imageUrl}/users/${circle?.mainImage}`}
            />
          </div>
        ))
      ) : (
        <div className="shadow-md rounded-lg border p-6 text-center text-gray-600 font-medium">
          No Circle Assigned
        </div>
      )}
    </div>
  );
};

export default ArtistPrivateCircle;
