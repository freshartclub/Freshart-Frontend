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
    ? new Date(data.data.createdAt).toLocaleDateString()
    : null;

  const newTime = data?.data?.createdAt
    ? new Date(data.data.createdAt).toLocaleTimeString()
    : null;

  const handleReply = (ticket) => {
    if (!reply) return toast.error("Please write your reply");
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
      <FaArrowLeftLong onClick={handleNavigate} className="cursor-pointer" />
      <div className="flex flex-col md:flex-row justify-between items-center w-full p-2 ">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <div className="flex gap-3 items-center">
            <span className="w-5 h-5 bg-[#F8A53499] rounded-full"></span>
            <span className="font-semibold text-gray-800">
              {data?.data?.ticketId}
            </span>
            <span className="text-[#84818A]">({t(data?.data?.ticketType)})</span>
            <span className="font-semibold">{newDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm">{t("Urgency")}:</h4>
              <span className="text-sm font-semibold text-gray-800">
                {t(data?.data?.urgency)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h4 className="text-sm">Impact:</h4>
              <span className="text-sm font-semibold text-gray-800">
                {t(data?.data?.impact)}
              </span>
            </div>
          </div>
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

      <div className="mt-8 mb-8">
        <h1 className="w-[406px] h-[23px] top-2 font-montserrat text-[18px] font-bold leading-[14px] text-left text-[#2E2C34] ">
          {data?.data?.subject}
        </h1>
      </div>

      <div className=" flex flex-col gap-2  w-full md:w-2/3  cursor-pointer ">
        <div className="flex items-center">
          <div className="p-3 flex flex-col w-full bg-zinc-200">
            <div className="flex  sm:flex-row justify-between">
              <div className="flex items-center  gap-2 ">
                <span>
                  <FaRegUserCircle />
                </span>
                <span className=" text-sm font-semibold  ">
                  {user?.artistName}
                </span>
              </div>

              <div className="flex gap-3 text-xs">
                <div className="font-semibold">{newDate} </div>
                <div className="font-semibold">{newTime}</div>
              </div>
            </div>

            <div>
              <p className="font-montserrat text-sm font-medium  text-left  py-2 px-4 break-words ml-2 ">
                {data?.data?.message}
              </p>
            </div>
          </div>
          {data?.data?.ticketImg ? (
            <span onClick={() => handleOpenPdf(data?.data?.ticketImg)}>
              <IoDocumentTextOutline size="3em" />
            </span>
          ) : null}
        </div>

        {data?.reply &&
          data?.reply?.length > 0 &&
          data?.reply.map((item, i) => (
            <div className="flex items-center">
              <div
                key={i}
                className={` p-3 flex flex-col w-full ${
                  item.userType === "user" ? "bg-zinc-200" : " bg-white"
                }`}
              >
                <div className="flex  sm:flex-row justify-between">
                  <div className="flex items-center  gap-2 ">
                    <span>
                      <FaRegUserCircle />
                    </span>
                    <span className=" text-sm font-semibold  ">
                      {item?.userType === "user"
                        ? `${user?.artistName} (${user?.email})`
                        : `${t("Admin wrote (admin)")} :`}
                    </span>
                  </div>

                  <div className="flex gap-3 text-xs">
                    <div className="font-semibold">
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : null}
                    </div>
                    <div className="font-semibold">
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleTimeString()
                        : null}
                    </div>
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

      <div className="py-2  w-full md:w-2/3">
        <h2 className="font-montserrat text-lg font-semibold mt-4">
          {data?.data?.status === "Technical Finish" ||
          data?.data?.status === "Closed"
            ? t("Send Your Feedback")
            : t("Reply to Ticket")}
        </h2>

        <div className="flex items-center gap-3 mt-3">
          {data?.data?.status === "Technical Finish" ||
          data?.data?.status === "Closed" ? (
            <div className="flex items-center gap-10">
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

              {data?.data?.ticketFeedback?.message ? (
                <textarea className="font-montserrat text-sm font-medium bg-white border rounded-md  border-zinc-200  text-left  py-2 px-8 break-words ml-2 ">
                  {data?.data?.ticketFeedback?.message}
                </textarea>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-end rounded-md py-3 w-full">
              <textarea
                className="border border-gray-300 rounded-lg p-2 w-full "
                placeholder={t("Enter Your Message here...")}
                onChange={(e) => setReply(e.target.value)}
                rows={4}
                value={reply}
              />
              <div className="flex justify-end gap-3 items-center">
                <div className="relative">
                  {file ? null : (
                    <>
                      <input
                        type="file"
                        id="file-upload"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(val) => handleFileChange(val)}
                      />
                      <label
                        htmlFor="file-upload"
                        className={`inline-block px-6 py-3 font-semibold rounded-md cursor-pointer border shadow-lg transition duration-300 ${
                          file
                            ? "bg-gray-200 border-gray-300"
                            : "bg-white border-red-300"
                        }`}
                      >
                        {t("Choose File")}
                      </label>
                    </>
                  )}
                </div>

                {file && (
                  <div className="flex items-center gap-4">
                    <span className="truncate px-4 py-2 bg-gray-100 border rounded-md">
                      {fileName}
                    </span>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-500 font-semibold border border-red-500 px-4 py-2 rounded-md hover:bg-red-100 transition duration-300"
                    >
                      {t("Remove")}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleReply(data?.data)}
                  className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition duration-300"
                >
                  {isPending ? t("Loading...") : t("Submit")}
                </button>
              </div>
            </div>
          )}

          {isModalOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
              <div className="bg-white p-6 rounded-lg lg:w-1/3">
                <h2 className="  xl:text-xl mb-4">
                  {t("We'd love your feedback!")}
                </h2>
                <textarea
                  value={feedback}
                  onChange={(val) => setFeedback(val.target.value)}
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
