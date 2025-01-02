import React, { FC, useState } from "react";
import orange from "../ticket history/assets/orange.png";
import blue from "../ticket history/assets/blue.png";
import green from "../ticket history/assets/green.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import artistImg from "../ticket history/assets/People.png";
import Loader from "../../ui/Loader";
import dayjs from "dayjs";
import { useAppSelector } from "../../../store/typedReduxHooks";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import usePatchFeedbackMutation from "./http/usePatchFeedback";

const TicketsList: FC<{
  tickets: any[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  isLoading: any;
  onPageChange: (page: number) => void;
}> = ({ tickets, currentPage, totalPages, onPageChange, isLoading }) => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState<{
    [key: string]: { feedback: string; isLiked: boolean };
  }>({});
  const [openTicketId, setOpenTicketId] = useState<string | null>(null);

  const isArtist = useAppSelector((state) => state.user.isArtist);
  const location = useLocation();
  const isArtistProfile = location.pathname.includes("/artist-panel");
  const { mutateAsync, isPending } = usePatchFeedbackMutation();

  const handleClick = (id: string) => {
    const SingleTicketLink = isArtistProfile
      ? `/artist-panel/ticket_detail?id=${id}`
      : `/ticket_detail?id=${id}`;
    navigate(SingleTicketLink);
  };

  const handleLike = (ticketId: string) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [ticketId]: { ...prevData[ticketId], isLiked: true },
    }));
    setOpenTicketId(ticketId);
  };

  const handleDisLike = (ticketId: string) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [ticketId]: { ...prevData[ticketId], isLiked: false },
    }));
    setOpenTicketId(ticketId);
  };

  const handleFeedBack = (ticketId: string) => {
    const data = {
      id: ticketId,
      message: feedbackData[ticketId].feedback,
      isLiked: feedbackData[ticketId].isLiked,
    };
    mutateAsync(data).then(() => {
      setOpenTicketId(null);
    });
  };

  const handleCloseModal = () => {
    setOpenTicketId(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {tickets?.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        tickets?.map((ticket) => {
          let imageSrc;
          switch (ticket.status) {
            case "Requested":
              imageSrc = blue;
              break;
            case "Dispatched":
              imageSrc = orange;
              break;
            case "Resolved Tickets":
              imageSrc = green;
              break;
            default:
              imageSrc = null;
          }

          return (
            <div
              key={ticket._id}
              className="border p-2 sm:p-4 rounded-lg mb-4 bg-[#FEFEFE]"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 w-[100%]">
                <div className="flex items-center mb-2 sm:mb-0 w-[100%]">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={`${ticket.status} icon`}
                      className="rounded-full h-4 w-4 mr-2"
                    />
                  )}
                  <div className="flex sm:flex-row flex-col justify-between w-[100%]">
                    <h3
                      className="text-sm sm:text-sm font-bold"
                      style={{ color: "#2E2C34" }}
                    >
                      {ticket?.ticketId}
                    </h3>
                    <h2
                      className="text-[13px] font-semibold"
                      style={{ color: "#212529" }}
                    >
                      {dayjs(ticket?.createdAt).format("MMMM D, YYYY")}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="text-[16px] flex justify-between ml-[7px] font-semibold mt-[2px] mb-[3px]">
                {ticket.subject}

                <div className="flex justify-end items-center gap-2">
                  <span
                    className={`border px-3 py-1 rounded-md  ${
                      ticket?.status === "Finalise"
                        ? "border-red-300"
                        : ticket?.status === "Created"
                        ? "border-zinc-300"
                        : "border-green-300"
                    }`}
                  >
                    {ticket?.status}
                  </span>

                  <span className={`border px-3 py-1 rounded-md`}>
                    {ticket?.impact}
                  </span>
                  <span className={`border px-3 py-1 rounded-md`}>
                    {ticket?.urgency}
                  </span>
                </div>
              </div>
              <div className="text-xs sm:text-sm mb-4 w-[90%] px-2">
                {ticket.message}
              </div>
              <hr />
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <img
                    src={artistImg}
                    alt="user"
                    className="rounded-full h-6 w-6 mr-2"
                  />
                  <span className="font-bold text-xs sm:text-sm">
                    {ticket.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {ticket.status === "Finalise" ? (
                    <div className="flex items-center gap-2">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleLike(ticket._id)}
                      >
                        <AiFillLike
                          size="1.5em"
                          color={
                            feedbackData[ticket._id]?.isLiked === true ||
                            ticket?.ticketFeedback?.isLiked === true
                              ? "green"
                              : "gray"
                          }
                        />
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleDisLike(ticket._id)}
                      >
                        <AiFillDislike
                          size="1.5em"
                          color={
                            feedbackData[ticket._id]?.isLiked === false ||
                            ticket?.ticketFeedback?.isLiked === false
                              ? "red"
                              : "gray"
                          }
                        />
                      </span>
                    </div>
                  ) : null}

                  {openTicketId === ticket._id && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-lg lg:w-1/3">
                        <h2 className="  xl:text-xl mb-4">
                          We'd love your feedback!
                        </h2>
                        <textarea
                          value={feedbackData[ticket._id]?.feedback || ""}
                          onChange={(e) =>
                            setFeedbackData((prevData) => ({
                              ...prevData,
                              [ticket._id]: {
                                ...prevData[ticket._id],
                                feedback: e.target.value,
                              },
                            }))
                          }
                          className="text-sm w-full h-20 border rounded-lg p-2"
                          placeholder="Please leave your feedback..."
                        />
                        <div className="mt-4 flex flex-col md:flex-row justify-center gap-4">
                          <button
                            onClick={handleCloseModal}
                            className="bg-gray-300 p-2 rounded"
                          >
                            Close
                          </button>
                          <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => handleFeedBack(ticket._id)}
                          >
                            {isPending ? "Submiting..." : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleClick(ticket?._id)}
                    className="font-bold mt-2 border-b-[1px] border-[#102030] text-xs sm:text-sm"
                  >
                    Open Ticket
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Pagination code remains unchanged */}
    </div>
  );
};

export default TicketsList;
