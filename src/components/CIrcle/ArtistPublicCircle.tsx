import { useNavigate } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";
import { RiUserFollowFill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";

const ArtistPublicCircle = ({ data }) => {
  const navigate = useNavigate();

  const handleCircle = (id) => {
    navigate(`/artist-panel/circle/circlepage?id=${encodeURIComponent(id)}`);
  };

  console.log(data);

  return (
    <div className="sm:px-10 ">
      <div className="grid grid-cols-1 px-3 sm:grid-cols-2 lg:grid-cols-2 gap-2 py-5 sm:gap-4  ">
        {data?.data?.length > 0 ? (
          data?.data?.map((circle, index) => (
            <div
              key={index}
              onClick={() => handleCircle(circle?._id)}
              className=" flex justify-between sm:flex-row gap-4 2xl:gap-2 sm:items-center shadow-xl py-3 rounded-md bg-white cursor-pointer"
            >
              <div className="content  p-6 sm:py-2 sm:px-4 sm:space-y-6 xl:space-y-3">
                <div className="flex flex-col  sm:flex-row justify-between gap-4 lg:gap-20 2xl:gap-2  sm:items-center">
                  <div className="flex items-center gap-3">
                    <p className="bg-[#00B8D929] text-[#006C9C] text-xs font-semibold rounded-lg p-1 inline-block">
                      {circle?.status}
                    </p>

                    <p className="bg-red-500 text-white  text-xs font-semibold rounded-lg p-1 inline-block">
                      {circle?.type}
                    </p>
                  </div>
                  {/* <div className="flex  gap-2 text-xs  font- text-gray-400 sm:justify-center ">
                  <div>{circle.date}</div>
                  <div>{circle.time}</div>
                </div> */}
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

                <div className="flex justify-end items-center mt-4 sm:mb-0 mb-4 sm:mt-0">
                  {/* <img src={more} alt="More" /> */}

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <IoEye />
                      <p className="text-sm">5</p>
                    </div>
                    <span className="flex items-center gap-1">
                      {" "}
                      <RiUserFollowFill />
                      <p className="text-sm">5</p>
                    </span>
                    <div className="flex items-center gap-1">
                      <FaShareAlt />

                      <p className="text-sm">5</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="img px-3">
                <img
                  className=" min-w-[30vw] lg:min-w-[10vw] h-[40vh] object-cover rounded-lg"
                  src={`${imageUrl}/users/${circle?.mainImage}`}
                ></img>
              </div>
            </div>
          ))
        ) : (
          <div className="shadow-md rounded-lg border p-6 text-center text-gray-600 font-medium">
            No Circle Assigned
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistPublicCircle;
