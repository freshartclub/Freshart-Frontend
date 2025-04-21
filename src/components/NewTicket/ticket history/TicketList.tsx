import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { GiGooeyImpact } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
import { TbUrgent } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import usePatchFeedbackMutation from "./http/usePatchFeedback";

interface TicketsListProps {
  tickets: any[];
  isLoading: boolean;
  dark: boolean;
}

const TicketsList: FC<TicketsListProps> = ({ tickets, isLoading, dark }) => {
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
    const SingleTicketLink = isArtistProfile ? `/artist-panel/ticket_detail?id=${id}` : `/ticket_detail?id=${id}`;
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
      message: feedbackData[ticketId]?.feedback || "",
      isLiked: feedbackData[ticketId]?.isLiked || false,
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
    <div className={`h-[90vh] max-h-[90vh] scrollbar2 overflow-y-auto ${dark ? "bg-gray-900" : "bg-white"}`}>
      {tickets?.length === 0 ? (
        <div className={`text-center p-8 ${dark ? "text-gray-300" : "text-gray-600"}`}>
          <p className="text-lg font-medium">{t("No Tickets Found")}</p>
        </div>
      ) : (
        <div className="space-y-3 py-3">
          {tickets?.map((ticket) => {
            const statusColor =
              ticket.status === "Requested"
                ? `${dark ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"}`
                : ticket.status === "Dispatched" || ticket.status == "In Progress"
                ? `${dark ? "bg-orange-900 text-orange-200" : "bg-orange-100 text-orange-800"}`
                : ticket.status === "Closed"
                ? `${dark ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"}`
                : ticket.status === "Technical Finish"
                ? `${dark ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"}`
                : `${dark ? "bg-gray-900 text-gray-200" : "bg-gray-300 text-gray-800"}`;

            return (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`rounded-lg shadow-sm border ${dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} p-4`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>{ticket.status}</span>
                    <h3 className={`text-sm font-bold ${dark ? "text-white" : "text-gray-800"}`}>{ticket?.ticketId}</h3>
                  </div>
                  <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{dayjs(ticket?.createdAt).format("MMMM D, YYYY")}</span>
                </div>

                <h2 className={`text-base font-semibold mt-2 ${dark ? "text-white" : "text-gray-800"}`}>{ticket.subject}</h2>

                <p className={`text-sm my-2 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                  {ticket?.message.length < 200 ? ticket.message : ticket.message?.slice(0, 200) + "..."}
                </p>

                {ticket?.ticketFeedback && (
                  <div className={`p-3 rounded-lg mb-3 ${dark ? "bg-gray-600" : "bg-gray-100"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{t("Feedback")}:</span>
                      <span
                        className={`font-medium ${
                          ticket?.ticketFeedback?.isLiked ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {ticket?.ticketFeedback?.isLiked ? t("Helpful") : t("Not Helpful")}
                      </span>
                    </div>
                    {ticket?.ticketFeedback?.message && (
                      <div className="mt-1">
                        <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{t("Comment")}:</span>
                        <p className={`text-sm ${dark ? "text-white" : "text-gray-800"}`}>{ticket?.ticketFeedback?.message}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className={`flex flex-wrap gap-2 p-2 border rounded-lg ${dark ? "bg-gray-700 border-gray-600" : "bg-gray-100"}`}>
                  <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-600"}`}>
                    <GrStatusGood className={dark ? "text-white" : "text-gray-600"} />
                    {t("Status")}: {t(ticket?.status)}
                  </span>
                  <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-600"}`}>
                    <GiGooeyImpact className={dark ? "text-white" : "text-gray-600"} />
                    {t("Impact")}: {t(ticket?.impact)}
                  </span>
                  <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-600"}`}>
                    <TbUrgent className={dark ? "text-white" : "text-gray-600"} />
                    {t("Urgency")}: {t(ticket?.urgency)}
                  </span>
                </div>

                <div className="flex mt-3 items-center justify-between">
                  <button
                    onClick={() => handleClick(ticket?._id)}
                    className={`text-sm px-4 py-2 rounded-lg font-medium bg-blue-700 hover:bg-blue-700/80 text-white`}
                  >
                    {t("Open Ticket")}
                  </button>

                  {(ticket.status === "Technical Finish" || ticket.status === "Closed") && !ticket?.ticketFeedback && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(ticket._id)}
                        className={`p-2 rounded-full ${
                          feedbackData[ticket._id]?.isLiked === true
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                            : dark
                            ? "bg-gray-600 hover:bg-gray-500"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        <AiFillLike size="1.2em" />
                      </button>
                      <button
                        onClick={() => handleDisLike(ticket._id)}
                        className={`p-2 rounded-full ${
                          feedbackData[ticket._id]?.isLiked === false
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                            : dark
                            ? "bg-gray-600 hover:bg-gray-500"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        <AiFillDislike size="1.2em" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {openTicketId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-md mx-4 p-6 rounded-lg shadow-lg ${dark ? "bg-gray-800" : "bg-white"}`}
            >
              <h2 className={`text-xl font-semibold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>{t("We'd love your feedback!")}</h2>
              <textarea
                value={feedbackData[openTicketId]?.feedback || ""}
                onChange={(e) =>
                  setFeedbackData((prevData) => ({
                    ...prevData,
                    [openTicketId]: {
                      ...prevData[openTicketId],
                      feedback: e.target.value,
                    },
                  }))
                }
                className={`w-full h-32 p-3 rounded-lg border ${
                  dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                }`}
                placeholder={t("Please leave your feedback...")}
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className={`px-4 py-2 rounded-lg ${
                    dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  {t("Close")}
                </button>
                <button
                  onClick={() => handleFeedBack(openTicketId)}
                  className={`px-4 py-2 rounded-lg text-white ${dark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
                  disabled={isPending}
                >
                  {isPending ? t("Submitting...") : t("Submit")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketsList;
