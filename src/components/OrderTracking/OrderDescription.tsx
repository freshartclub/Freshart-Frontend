import { useState } from "react";
import Header from "../ui/Header";
import P from "../ui/P";
import ArtWork from "./ArtWork";
import plus from "./assets/Plus.png";
import BillingSection from "./BillingSection";
import OrderHistory from "./OrderHistory";
import Progressbar from "./Progressbar";
import ReviewPopup from "./ReviewPopup";
import { FcRating } from "react-icons/fc";

const OrderDescription = ({ data }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const openReviewPopup = () => setIsReviewOpen(true);
  const closeReviewPopup = () => setIsReviewOpen(false);

  const rating = data?.foundArt?.items?.rating;

  return (
    <div className="bg-white border border-[#E4E7E9]">
      <div className="flex justify-between p-4 border-b">
        <P
          variant={{ size: "small", theme: "dark", weight: "medium" }}
          className="uppercase"
        >
          Order Detail
        </P>

        <div className="flex justify-end">
          {data?.foundArt?.items?.other?.rating ? (
            Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 cursor-pointer flex ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 17.077l-4.917 3.275 1.266-5.99L3 9.495l5.081-.434L12 3l2.919 5.061L20 9.495l-5.349 4.867 1.266 5.99L12 17.077z"
                />
              </svg>
            ))
          ) : (
            <div
              onClick={openReviewPopup}
              className="flex cursor-pointer gap-2 items-center"
            >
              <P
                variant={{ size: "small", theme: "dark", weight: "medium" }}
                className="text-[#FF536B]"
              >
                Leave a Rating
              </P>
              <FcRating />
            </div>
          )}
        </div>
      </div>

      <ReviewPopup
        isOpen={isReviewOpen}
        onClose={closeReviewPopup}
        data={data?.foundArt}
      />
      {/* ----------------- */}
      <div className="md:p-5 p-2">
        <div className=" flex justify-between">
          <div className="bg-[#FFD9DE54] border border-[#FFD9DE] sm:p-5 p-2 flex sm:flex-row flex-col justify-between sm:items-center w-full">
            <div>
              <Header
                variant={{ size: "lg", theme: "dark", weight: "semiBold" }}
              >
                #{data?.foundArt?.orderId}
              </Header>
              <div className="flex sm:flex-row flex-col gap-2 mt-2">
                <P
                  variant={{ size: "small", weight: "medium" }}
                  className="text-[#475156]"
                >
                  {data?.otherArt?.length + 1}{" "}
                  {data?.otherArt?.length + 1 > 1 ? "Artworks" : "Artwork"}
                </P>
                <P
                  variant={{ size: "small", weight: "normal" }}
                  className="text-[#475156]"
                >
                  Order Placed on{" "}
                  {new Date(data?.foundArt?.createdAt).toLocaleString()}
                </P>
              </div>
            </div>
            <div>
              <Header
                variant={{ size: "xl", weight: "bold" }}
                className="text-[#FF536B]"
              >
                € {data?.foundArt?.total}
              </Header>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <P variant={{ size: "base", theme: "dark", weight: "normal" }}>
            Order expected arrival
            <span className="font-semibold">23 Jan,2021</span>
          </P>
        </div>

        <Progressbar />
        <OrderHistory />

        <ArtWork data={data?.foundArt} otherArt={data?.otherArt} />
        <BillingSection data={data} />
      </div>
    </div>
  );
};

export default OrderDescription;
