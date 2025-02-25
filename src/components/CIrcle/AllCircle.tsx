import React from "react";
import more from "./assets/more.png";
import message from "./assets/message.png";
import view from "./assets/view.png";
import share from "./assets/share.png";
import img from "./assets/img.png";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../utils/baseUrls";
// import { Navigate } from "react-router-dom";

const circle = [
  {
    category: "BlockChain,NFT",
    date: "12 Aug 2022",
    time: "10:00 PM",
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    para: "The ancient ruins stood as a testament to a civilization long gone, their grandeur still awe-inspiring.",
    more: more,
    message: message,
    view: view,
    share: share,
    img: img,
  },
  {
    category: "Published",
    date: "12 Aug 2022",
    time: "10:00 PM",
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    para: "The ancient ruins stood as a testament to a civilization long gone, their grandeur still awe-inspiring.",
    more: more,
    message: message,
    view: view,
    share: share,
    img: img,
  },
  {
    category: "Draft",
    date: "12 Aug 2022",
    time: "10:00 PM",
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    para: "The ancient ruins stood as a testament to a civilization long gone, their grandeur still awe-inspiring.",
    more: more,
    message: message,
    view: view,
    share: share,
    img: img,
  },
  {
    category: "Published",
    date: "12 Aug 2022",
    time: "10:00 PM",
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    para: "The ancient ruins stood as a testament to a civilization long gone, their grandeur still awe-inspiring.",
    more: more,
    message: message,
    view: view,
    share: share,
    img: img,
  },
  {
    category: "Draft",
    date: "12 Aug 2022",
    time: "10:00 PM",
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    para: "The ancient ruins stood as a testament to a civilization long gone, their grandeur still awe-inspiring.",
    more: more,
    message: message,
    view: view,
    share: share,
    img: img,
  },
  {
    category: "Published",
    date: "12 Aug 2022",
    time: "10:00 PM",
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    para: "The ancient ruins stood as a testament to a civilization long gone, their grandeur still awe-inspiring.",
    more: more,
    message: message,
    view: view,
    share: share,
    img: img,
  },
  {
    category: "Published",
    date: "12 Aug 2022",
    time: "10:00 PM",
    title:
      "Mental Health in the Digital Age: Navigating Social Media and Well-being",
    para: "The ancient ruins stood as a testament to a civilization long gone, their grandeur still awe-inspiring.",
    more: more,
    message: message,
    view: view,
    share: share,
    img: img,
  },
];

const AllCircle = ({ data }) => {
  const navigate = useNavigate();

  const handleCircle = (id) => {
    navigate(`/artist-panel/circle/circlepage?id=${encodeURIComponent(id)}`);
  };

  return (
    <div className="sm:px-10 py-8">
      <div className="grid grid-cols1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 ">
        {data?.data?.length > 0 ? (
          data?.data?.map((circle) => (
            <div
              onClick={() => handleCircle(circle?._id)}
              className="flex flex-col sm:flex-row sm:p-2 mb-20 sm:mb-0 shadow-md rounded-lg border items-center cursor-pointer"
            >
              <div className="content  p-6 sm:py-2 sm:px-4 sm:space-y-6 xl:space-y-3">
                <div className="flex flex-col  sm:flex-row justify-between gap-4 lg:gap-20 2xl:gap-2  sm:items-center">
                  <div>
                    <p className="bg-[#00B8D929] text-[#006C9C] text-xs font-semibold rounded-lg p-1 inline-block">
                      {circle?.status}
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
                  {circle?.description}
                </div>

                {/* <div className="flex  justify-between items-center mt-4 sm:mb-0 mb-4 sm:mt-0">
                <div>
                  <img src={circle.more}></img>
                </div>

                <div className="flex  items-center gap-2 ">
                  <div className="flex items-center gap-1 ">
                    <img src={circle.message}></img>
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={circle.view}></img>
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={circle.share}></img>
                    <p className="text-sm">5</p>
                  </div>
                </div>
              </div> */}
              </div>

              <div className="img p-4 sm:p-0">
                <img
                  className="w-full object-cover rounded-lg"
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

export default AllCircle;
