import { useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../store/typedReduxHooks";
import Loader from "../../ui/Loader";
import { useGetTicketDetails } from "./http/useGetTicketDetails";
import usePatchFeedbackMutation from "./http/usePatchFeedback";
import useGetPostArtistTicketReplyMutation from "./http/usePostReply";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const SingleTicket = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [reply, setReply] = useState("");
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [fileName, setFileName] = useState("Attach File");
  const [yesOrNo, setYesOrNo] = useState(null);

  const { t } = useTranslation();

  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const { data, isFetching } = useGetTicketDetails(id);
  const { mutateAsync, isPending } = useGetPostArtistTicketReplyMutation();
  const { mutateAsync: sendFeedback, isPending: isFeedbackLoading } =
    usePatchFeedbackMutation();

  const newDate = data?.data?.createdAt
    ? new Date(data.data.createdAt)
        .toUTCString()
        .split(" ")
        .slice(0, 4)
        .join(" ")
    : null;

  const newTime = data?.data?.createdAt
    ? new Date(data.data.createdAt).toLocaleTimeString()
    : null;

  const handleReply = (ticket) => {
    if (!reply) return toast.error(t("Please write your reply"));
    const newData = {
      id: ticket._id,
      message: reply,
      ticketType: ticket.ticketType,
      status: ticket.status,
    };

    const formData = new FormData();

    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
        formData.append(key, newData[key]);
      }
    }

    if (file) {
      formData.append("ticketImg", file);
    }

    mutateAsync(formData).then(() => {
      setReply("");
      setFile(null);
      setFileName("Attach File");
    });
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleOpenPdf = (file) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    const fileExtension = file?.toLowerCase().split(".").pop();

    if (imageExtensions.includes(`.${fileExtension}`)) {
      window.open(`${data?.url}/users/${file}`, "_blank");
    } else if (fileExtension === "pdf") {
      window.open(`${data?.url}/documents/${file}`, "_blank");
    } else {
      console.log("Unsupported file type");
    }
  };

  const handleFeedBack = (ticketId: string) => {
    const data = {
      id: ticketId,
      message: feedback,
      isLiked: yesOrNo,
    };
    sendFeedback(data).then(() => {
      if (yesOrNo) {
        navigate("/artist-panel/ticket/tickets");
      }
      setFile(null);
      setIsModalOpen(false);
    });
  };

  const handleDisLike = () => {
    setIsModalOpen(true);
    setYesOrNo(false);
  };

  const handleLike = () => {
    setIsModalOpen(true);
    setYesOrNo(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setFile(null);
  };

  if (isFetching) return <Loader />;

  return (
    <div className="container mx-auto sm:px-6 px-3 mt-[2rem] mb-[2rem]">
      <div className="flex gap-3 flex-wrap items-center">
        <FaArrowLeftLong
          onClick={handleNavigate}
          className="cursor-pointer sm:block hidden"
        />
        <span className="w-5 h-5 bg-[#F8A53499] rounded-full"></span>
        <span className="font-semibold text-gray-800">
          {data?.data?.ticketId}
        </span>
        <span className="text-[#84818A]">({t(data?.data?.ticketType)})</span>
      </div>
      <div className="flex lg:justify-between items-center w-full p-2">
        <div className="flex sm:gap-4 gap-2 max-w-full scrollbar bg-white border px-2 py-1 rounded overflow-auto w-full items-center sm:ml-5">
          <span className="text-[12px] font-semibold text-gray-800 flex-shrink-0">
            {t("Urgency")}: {t(data?.data?.urgency)}
          </span>

          <span className="text-[12px] font-semibold text-gray-800 flex-shrink-0">
            {t("Impact")}: {t(data?.data?.impact)}
          </span>
          <span className="text-[12px] font-semibold text-gray-800 flex-shrink-0">
            {t("Posted At")}: {newDate} ({newTime})
          </span>
        </div>

        <div className="w-full md:w-1/3 flex justify-end items-center">
          <div className="flex items-center gap-1">
            <div className="w-[16px] h-[16px] bg-[#F8A53499] rounded-full"></div>
            <span className="text-xs font-semibold text-gray-800">
              {t(data?.data?.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-md p-2 mt-3">
        <div className="flex flex-col gap-2 p-2">
          <h1 className="text-md font-semibold">{data?.data?.subject}</h1>
          <p className="text-sm text-[#84818A]">{data?.data?.message}</p>
          {data?.data?.ticketImg ? (
            <span onClick={() => handleOpenPdf(data?.data?.ticketImg)}>
              <IoDocumentTextOutline size="3em" />
            </span>
          ) : null}
        </div>

        <div className="flex mt-2 flex-col gap-2 w-full cursor-pointer max-h-[60vh] scrollbar2 overflow-y-scroll">
          {data?.reply &&
            data?.reply?.length > 0 &&
            data?.reply.map((item, i) => (
              <div className="flex items-center">
                <div
                  key={i}
                  className={`p-3 rounded-md shadow flex flex-col w-full border ${
                    item.userType === "user" ? "bg-[#dadada99]" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col md:flex-row sm:justify-between">
                    <div className="flex items-center gap-2">
                      <FaRegUserCircle />

                      <span className="text-sm flex items-center gap-2 font-semibold">
                        {item?.userType === "user" ? (
                          <>
                            <span>{user?.artistName}</span>
                            <span className="sm:block hidden">
                              ({user?.email})
                            </span>
                          </>
                        ) : (
                          `${t("Admin wrote (admin)")} :`
                        )}
                      </span>
                    </div>

                    <div className="flex max-[300px]:flex-col md:ml-0 ml-6 max-[300px]:gap-1 gap-3 text-xs">
                      <span>{newDate}</span>
                      <span>{newTime}</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-montserrat text-sm font-medium  text-left  py-2 px-4 break-words ml-2 ">
                      {item.message}
                    </p>
                  </div>
                </div>

                {item?.ticketImg ? (
                  <span onClick={() => handleOpenPdf(item?.ticketImg)}>
                    <IoDocumentTextOutline size="3em" />
                  </span>
                ) : null}
              </div>
            ))}
        </div>
      </div>

      <div className="p-2 border mt-4 w-full bg-white rounded-md">
        <h2 className="font-montserrat text-md font-semibold border-b px-2 pb-2">
          {data?.data?.status === "Technical Finish"
            ? t("Send Your Feedback")
            : data?.data?.status === "Closed"
            ? t("Your Feedback")
            : t("Reply to Ticket")}
        </h2>

        <div className="flex items-center gap-3 mt-3">
          {data?.data?.status === "Technical Finish" ||
          data?.data?.status === "Closed" ? (
            <div className="flex items-center">
              {data?.data?.ticketFeedback?.message ? (
                <div className="text-sm px-2 flex flex-col gap-1">
                  <span className="text-[14px] text-[#84818A]">
                    Feedback -{" "}
                    <span className="font-semibold text-[#000000]">
                      {data?.data?.ticketFeedback?.isLiked
                        ? "Helpfull"
                        : "Not Helpfull"}{" "}
                      {data?.data?.ticketFeedback?.isLiked ? "👍" : "👎"}
                    </span>
                  </span>
                  <span className="text-[14px] text-[#84818A]">
                    Comment -{" "}
                    <span className="font-semibold text-[#000000]">
                      {data?.data?.ticketFeedback?.message
                        ? data?.data?.ticketFeedback?.message
                        : "N/A"}
                    </span>
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      data?.data?.status === "Closed"
                        ? "pointer-events-none"
                        : "cursor-pointer"
                    }`}
                    onClick={() => handleLike()}
                  >
                    <AiFillLike
                      size="1.5em"
                      color={
                        data?.data?.ticketFeedback?.isLiked === true
                          ? "green"
                          : "gray"
                      }
                    />
                  </span>
                  <span
                    className={`${
                      data?.data?.status === "Closed"
                        ? "pointer-events-none"
                        : "cursor-pointer"
                    }`}
                    onClick={() => handleDisLike()}
                  >
                    <AiFillDislike
                      size="1.5em"
                      color={
                        data?.data?.ticketFeedback?.isLiked === false
                          ? "red"
                          : "gray"
                      }
                    />
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-end rounded-md px-2 w-full">
              <textarea
                className="border border-gray-300 rounded-lg p-2 w-full "
                placeholder={t("Enter Your Message here...")}
                onChange={(e) => setReply(e.target.value)}
                rows={4}
                value={reply}
              />
              <div className="flex max-[355px]:w-full max-[355px]:flex-col justify-end gap-3 items-center">
                {file ? null : (
                  <div className="relative px-2 max-[355px]:w-full text-center font-semibold rounded cursor-pointer border-2 py-1 transition duration-300 bg-red-500 text-white hover:bg-white hover:text-red-500 border-red-500">
                    <input
                      type="file"
                      id="file-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(val) => handleFileChange(val)}
                    />
                    <label htmlFor="file-upload">{t("Choose File")}</label>
                  </div>
                )}

                {file && (
                  <div className="flex items-center max-[355px]:flex-col max-[355px]:w-full gap-4">
                    <span className="truncate text-center px-4 max-[355px]:w-full py-2 bg-gray-100 border rounded-md">
                      {fileName}
                    </span>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-500 text-center max-[355px]:w-full font-semibold border-2 border-red-500 px-4 py-2 rounded-md hover:bg-red-100 transition duration-300"
                    >
                      {t("Remove")}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleReply(data?.data)}
                  className="bg-black font-semibold max-[355px]:w-full text-white rounded-md px-2 py-1 hover:bg-white hover:text-black border-2 border-black transition duration-300"
                >
                  {isPending ? t("Submitting...") : t("Submit")}
                </button>
              </div>
            </div>
          )}

          {isModalOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
              <div className="bg-white p-4 rounded-lg lg:w-1/3">
                <h2 className="text-lg font-semibold mb-4">
                  {t("We'd love your feedback!")}
                </h2>
                <textarea
                  value={feedback}
                  onChange={(val) => setFeedback(val.target.value)}
                  className="text-sm w-full h-20 border rounded border-black p-2 outline-none"
                  placeholder={t("Please leave your feedback...")}
                />
                <div className="mt-2 flex font-semibold flex-col md:flex-row justify-center gap-4">
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-300 w-full p-2 rounded"
                  >
                    {t("Close")}
                  </button>
                  <button
                    className="bg-black w-full text-white p-2 rounded"
                    onClick={() => handleFeedBack(data?.data?._id)}
                  >
                    {isFeedbackLoading ? t("Submiting...") : t("Submit")}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
