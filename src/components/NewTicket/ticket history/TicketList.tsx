import dayjs from "dayjs";
import { FC, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import blue from "../ticket history/assets/blue.png";
import green from "../ticket history/assets/green.png";
import orange from "../ticket history/assets/orange.png";
import artistImg from "../ticket history/assets/People.png";
import usePatchFeedbackMutation from "./http/usePatchFeedback";
import { useTranslation } from "react-i18next";
import { GiGooeyImpact } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
import { TbUrgent } from "react-icons/tb";

const TicketsList: FC<{
  tickets: any[];
  isLoading: any;
}> = ({ tickets, isLoading }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [feedbackData, setFeedbackData] = useState<{
    [key: string]: { feedback: string; isLiked: boolean };
  }>({});
  const [openTicketId, setOpenTicketId] = useState<string | null>(null);

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

  if (isLoading) return <Loader />;

  return (
    <div className="h-[90vh] max-h-[90vh] scrollbar2 overflow-y-auto border p-2 rounded-b-lg bg-[#FEFEFE]">
      {tickets?.length === 0 ? (
        <p className="bg-[#FEFEFE] text-center text-[16px] font-semibold rounded-b-lg border p-4">
          {t("No Tickets Found")}
        </p>
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
              className={`shadow border p-2 rounded mb-4  ${
                ticket.isRead ? "bg-zinc-200 " : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-[100%]">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={`${ticket.status} icon`}
                    className="rounded-full h-4 w-4 mr-2"
                  />
                )}
                <div className="flex sm:flex-row flex-col justify-between w-[100%]">
                  <h3
                    className="text-sm font-bold"
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
              <div className="text-[16px] flex justify-between font-semibold mt-[2px] mb-[3px]">
                {ticket.subject}
              </div>
              <div className="text-xs sm:text-sm my-2 w-[90%]">
                {ticket?.message.length < 200 ? ticket.message : ticket.message?.slice(0, 200) + "..."}
              </div>
              <div className="bg-[#F5F5F5] w-full max-w-full overflow-x-auto scrollbar text-sm p-2 flex border items-center gap-3">
                <span
                  className={`flex w-max flex-shrink-0 p-2 rounded items-center hover:cursor-pointer hover:bg-[#e6e6e6] gap-1  ${
                    ticket?.status === "Closed"
                      ? "bg-red-300"
                      : ticket?.status === "Created"
                      ? "bg-green-300"
                      : "bg-zinc-300"
                  }`}
                >
                  <GrStatusGood /> {t("Status")} ({t(ticket?.status)})
                </span>

                <span
                  className={`flex w-max flex-shrink-0 p-2 rounded hover:cursor-pointer hover:bg-[#e6e6e6] items-center gap-1`}
                >
                  <GiGooeyImpact /> {t("Imapct")} ({t(ticket?.impact)})
                </span>
                <span
                  className={`flex w-max flex-shrink-0 p-2 rounded hover:cursor-pointer hover:bg-[#e6e6e6] items-center gap-1`}
                >
                  <TbUrgent /> {t("Urgency")} ({t(ticket?.urgency)})
                </span>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <div className="flex items-center gap-3">
                  {ticket.status === "Technical Finish" ||
                  ticket.status === "Closed" ? (
                    <div className="flex items-center gap-2 ">
                      <p className="font-bold border px-2 rounded-md border-zinc-200 ">
                        {ticket?.ticketFeedback?.message}
                      </p>

                      <span
                        className={`${
                          ticket.status === "Closed"
                            ? "pointer-events-none"
                            : "cursor-pointer"
                        }`}
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
                        className={`${
                          ticket.status === "Closed"
                            ? "pointer-events-none"
                            : "cursor-pointer"
                        }`}
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
                          {t("We'd love your feedback!")}
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
                          placeholder={t("Please leave your feedback...")}
                        />
                        <div className="mt-4 flex flex-col md:flex-row justify-center gap-4">
                          <button
                            onClick={handleCloseModal}
                            className="bg-gray-300 p-2 rounded"
                          >
                            {t("Close")}
                          </button>
                          <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => handleFeedBack(ticket._id)}
                          >
                            {isPending ? t("Submiting...") : t("Submit")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleClick(ticket?._id)}
                    className="font-bold bg-[#102030] text-sm text-white p-2 rounded"
                  >
                    {t("Open Ticket")}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TicketsList;
