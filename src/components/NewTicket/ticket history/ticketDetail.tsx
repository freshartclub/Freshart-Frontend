import { useState } from "react";
import { FaRegUserCircle, FaArrowLeft, FaFilePdf, FaFileExcel, FaFileImage, FaPaperclip, FaTimes, FaCheck } from "react-icons/fa";
import { IoDocumentTextOutline, IoTimeOutline, IoCalendarOutline } from "react-icons/io5";
import { BiSolidFileDoc, BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../store/typedReduxHooks";
import Loader from "../../ui/Loader";
import { useGetTicketDetails } from "./http/useGetTicketDetails";
import usePatchFeedbackMutation from "./http/usePatchFeedback";
import useGetPostArtistTicketReplyMutation from "./http/usePostReply";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { imageUrl } from "../../utils/baseUrls";
import { GiGooeyImpact } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";

const SingleTicket = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [reply, setReply] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [fileName, setFileName] = useState("");
  const [yesOrNo, setYesOrNo] = useState<boolean | null>(null);

  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);
  const dark = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const { data, isLoading } = useGetTicketDetails(id || "");
  const { mutateAsync, isPending } = useGetPostArtistTicketReplyMutation();
  const { mutateAsync: sendFeedback, isPending: isFeedbackLoading } = usePatchFeedbackMutation();

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleReply = (ticket: any) => {
    if (!reply) return toast.error(t("Please write your reply"));

    const formData = new FormData();
    formData.append("id", ticket._id);
    formData.append("message", reply);
    formData.append("ticketType", ticket.ticketType);
    formData.append("status", ticket.status);
    if (file) formData.append("ticketImg", file);

    mutateAsync(formData).then(() => {
      setReply("");
      setFile(null);
      setFileName("");
    });
  };

  const handleOpenFile = (file: string, type: "image" | "document") => {
    const path = type === "image" ? `${imageUrl}/users/${file}` : `${imageUrl}/documents/${file}`;
    window.open(path, "_blank");
  };

  const handleFeedBack = (ticketId: string) => {
    if (yesOrNo === null) return toast.error(t("Please select feedback type"));
    if (!feedback) return toast.error(t("Please enter your feedback"));

    sendFeedback({
      id: ticketId,
      message: feedback,
      isLiked: yesOrNo,
    }).then(() => {
      setIsModalOpen(false);
      if (yesOrNo) navigate("/artist-panel/ticket/tickets");
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`container mx-auto px-4 py-6 ${dark ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className={`p-2 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <FaArrowLeft className={dark ? "text-white" : "text-gray-800"} />
        </button>

        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${dark ? "bg-yellow-400" : "bg-yellow-500"}`}></span>
          <h1 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{data?.data?.ticketId}</h1>
          <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>({t(data?.data?.ticketType)})</span>
        </div>
      </div>

      <div className={`p-4 border rounded-lg ${dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"} shadow-sm mb-6`}>
        <div className="flex flex-wrap overflow-x-auto scrollbar w-full justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IoTimeOutline className={dark ? "text-gray-400" : "text-gray-500"} />
              <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
                {t("Urgency")}: <span className="font-medium">{t(data?.data?.urgency)}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <GiGooeyImpact className={dark ? "text-gray-400" : "text-gray-500"} />
              <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
                {t("Impact")}: <span className="font-medium">{t(data?.data?.impact)}</span>
              </span>
            </div>

            <div className="flex whitespace-nowrap items-center gap-2">
              <IoCalendarOutline className={dark ? "text-gray-400" : "text-gray-500"} />
              <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-700"}`}>
                {formatDate(data?.data?.createdAt)} ({formatTime(data?.data?.createdAt)})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${dark ? "bg-yellow-400" : "bg-yellow-500"}`}></span>
            <span className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{t(data?.data?.status)}</span>
          </div>
        </div>
      </div>

      <div className={`rounded-lg border ${dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"} shadow-sm p-4 mb-6`}>
        <h2 className={`text-lg font-bold mb-3 ${dark ? "text-white" : "text-gray-800"}`}>{data?.data?.subject}</h2>
        <p className={`mb-4 ${dark ? "text-gray-300" : "text-gray-600"}`}>{data?.data?.message}</p>

        {data?.data?.ticketImg && (
          <button
            onClick={() => handleOpenFile(data?.data?.ticketImg, "image")}
            className="flex items-center gap-2 text-blue-500 hover:text-[#EE1D52]"
          >
            <IoDocumentTextOutline size="1.5em" />
            <span>{t("View Attachment")}</span>
          </button>
        )}
      </div>

      {data?.reply && data?.reply?.length > 0 && (
        <div
          className={`rounded-lg border ${
            dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"
          } shadow-sm p-4 mb-6 max-h-[60vh] overflow-y-auto`}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>{t("All Replies")}</h2>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
          {data?.reply?.map((item, i: number) => (
            <div
              key={i}
              className={`mb-4 p-3 rounded-lg ${
                item.userType === "user" ? (dark ? "bg-gray-700" : "bg-gray-100") : dark ? "bg-gray-900" : "bg-white"
              } border ${dark ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <FaRegUserCircle className={dark ? "text-gray-400" : "text-gray-500"} />
                  <span className={`font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    {item.userType === "user" ? `${user?.artistName} (${user?.email})` : t("Admin")}
                  </span>
                </div>

                <div className={`flex items-center gap-2 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  <span>{formatDate(item.createdAt)}</span>
                  <span>{formatTime(item.createdAt)}</span>
                </div>
              </div>

              <p className={`mb-1 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{item.message}</p>

              {item.ticketImg && (
                <div className={`flex items-center p-2 rounded-lg ${dark ? "bg-gray-800" : "bg-gray-200"} gap-2`}>
                  <span className={`text-sm ${dark ? "text-gray-400" : "text-black"}`}>{t("View Attachment")}:</span>
                  {item.ticketImg.includes(".pdf") ? (
                    <FaFilePdf onClick={() => handleOpenFile(item.ticketImg, "document")} className="text-red-700 cursor-pointer text-lg" />
                  ) : item.ticketImg.includes(".docx") ? (
                    <BiSolidFileDoc onClick={() => handleOpenFile(item.ticketImg, "document")} className="text-blue-700 cursor-pointer text-lg" />
                  ) : item.ticketImg.includes(".xlsx") ? (
                    <FaFileExcel onClick={() => handleOpenFile(item.ticketImg, "document")} className="text-green-700 cursor-pointer text-lg" />
                  ) : (
                    <FaFileImage onClick={() => handleOpenFile(item.ticketImg, "image")} className="text-purple-700 cursor-pointer text-lg" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className={`rounded-lg border ${dark ? "bg-gray-800 border-gray-600" : "bg-white border-zinc-300"} shadow-sm p-4`}>
        <h3
          className={`text-lg font-bold mb-4 ${dark ? "text-white" : "text-gray-800"} border-b ${dark ? "border-gray-700" : "border-gray-200"} pb-2`}
        >
          {data?.data?.status === "Technical Finish" || data?.data?.status === "Closed" ? t("Your Feedback") : t("Reply to Ticket")}
        </h3>

        {data?.data?.status === "Technical Finish" || data?.data?.status === "Closed" ? (
          data?.data?.ticketFeedback ? (
            <div className={`p-3 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{t("Feedback")}:</span>
                <span className={`font-medium flex items-center ${data?.data?.ticketFeedback?.isLiked ? "text-green-500" : "text-red-500"}`}>
                  {data?.data?.ticketFeedback?.isLiked ? t("Helpful") : t("Not Helpful")}
                  {data?.data?.ticketFeedback?.isLiked ? <BiSolidLike className="inline ml-1" /> : <BiSolidDislike className="inline ml-1" />}
                </span>
              </div>
              {data?.data?.ticketFeedback?.message && (
                <div>
                  <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{t("Comment")}:</span>
                  <p className={dark ? "text-white" : "text-gray-800"}>{data?.data?.ticketFeedback?.message}</p>
                </div>
              )}
            </div>
          ) : data?.data?.status === "Technical Finish" ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setYesOrNo(true);
                  setIsModalOpen(true);
                }}
                className={`p-2 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              >
                <BiLike className="text-green-500 text-2xl" />
              </button>
              <button
                onClick={() => {
                  setYesOrNo(false);
                  setIsModalOpen(true);
                }}
                className={`p-2 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              >
                <BiDislike className="text-red-500 text-2xl" />
              </button>
            </div>
          ) : null
        ) : (
          <div className="space-y-4">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder={t("Enter your message here...")}
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none ${
                dark
                  ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                  : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-800"
              }`}
              rows={4}
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {file ? (
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-md text-sm truncate max-w-xs ${
                        dark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {fileName}
                    </span>
                    <button
                      onClick={() => {
                        setFile(null);
                        setFileName("");
                      }}
                      className={`p-1.5 rounded-full ${dark ? "text-red-400 hover:bg-gray-700" : "text-red-500 hover:bg-gray-200"}`}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <label
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer ${
                      dark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FaPaperclip />
                    <span>{t("Choose File")}</span>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                )}
              </div>

              <button
                onClick={() => handleReply(data?.data)}
                disabled={isPending}
                className={`px-4 py-2 rounded-lg font-medium bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white disabled:opacity-70`}
              >
                {isPending ? t("Submitting...") : t("Submit")}
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
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
              <h3 className={`text-lg font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>{t("We'd love your feedback!")}</h3>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setYesOrNo(true)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border ${
                    yesOrNo === true
                      ? "border-green-700 bg-green-500/10 text-green-700"
                      : dark
                      ? "border-gray-600 hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <BiSolidLike className="text-xl" />
                  {t("Helpful")}
                </button>
                <button
                  onClick={() => setYesOrNo(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border ${
                    yesOrNo === false
                      ? "border-red-500 bg-red-500/10 text-red-500"
                      : dark
                      ? "border-gray-600 hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <BiSolidDislike className="text-xl" />
                  {t("Not Helpful")}
                </button>
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t("Please leave your feedback...")}
                className={`w-full p-3 rounded-lg border mb-4 focus:ring-2 focus:outline-none ${
                  dark
                    ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                    : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-800"
                }`}
                rows={4}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setYesOrNo(false);
                    setIsModalOpen(false);
                  }}
                  className={`flex-1 py-2 rounded-lg font-medium ${
                    dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={() => handleFeedBack(data?.data?._id)}
                  disabled={isFeedbackLoading || yesOrNo === null}
                  className={`flex-1 py-2 rounded-lg font-medium ${
                    dark ? "bg-[#EE1D52] hover:bg-blue-700 text-white" : "bg-[#EE1D52] hover:bg-[#EE1D52] text-white"
                  } disabled:opacity-70`}
                >
                  {isFeedbackLoading ? t("Submitting...") : t("Submit")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SingleTicket;
