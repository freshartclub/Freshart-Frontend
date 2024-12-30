import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import { useAppSelector } from "../../../store/typedReduxHooks";
import axiosInstance from "../../utils/axios";
import artistImg from "../ticket history/assets/People.png";
import useGetPostArtistTicketReplyMutation from "./http/usePostReply";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useGetTicketDetails } from "./http/useGetTicketDetails";
import Loader from "../../ui/Loader";
import { FaRegUserCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import usePatchFeedbackMutation from "./http/usePatchFeedback";

interface Ticket {
  ticketId: string;
  ticketType: string;
  subject: string;
  message: string;
  ticketDate: string;
}

const SingleTicket = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [reply, setReply] = useState("");
  const [feedbackData, setFeedbackData] = useState<{
    [key: string]: { feedback: string; isLiked: string };
  }>({});
  const [openTicketId, setOpenTicketId] = useState<string | null>(null);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [fileName, setFileName] = useState("Attach File");
  const [yesOrNo, setYesOrNo] = useState(null);

  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetTicketDetails(id);
  const { mutateAsync, isPending } = useGetPostArtistTicketReplyMutation();
  const { mutateAsync: sendFeedback, isPending: isFeedbackLoading } =
    usePatchFeedbackMutation();

  const newDate = dayjs(data?.data?.createdAt).format("DD-MM-YYYY");
  const newTime = dayjs(data?.data?.createdAt).format(" hh:mm A");

  const handleReply = (ticket) => {
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
      console.log(file);
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
      setOpenTicketId(null);
      setFile(null);
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

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto sm:px-6 px-3 mt-[2rem] mb-[2rem]">
      <FaArrowLeftLong onClick={handleNavigate} className="cursor-pointer" />
      <div className="flex flex-col md:flex-row justify-between items-center w-full p-2">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <div className="flex gap-3 items-center">
            <span className="w-5 h-5 bg-[#F8A53499] rounded-full"></span>
            <span className="font-semibold text-gray-800">
              {data?.data?.ticketId}
            </span>
            <span className="text-[#84818A]">({data?.data?.ticketType})</span>
            <span className="font-semibold">{newDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm">Urgency:</h4>
              <span className="text-sm font-semibold text-gray-800">
                {data?.data?.urgency}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h4 className="text-sm">Impact:</h4>
              <span className="text-sm font-semibold text-gray-800">
                {data?.data?.impact}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-end items-center">
          <div className="flex items-center gap-1">
            <div className="w-[16px] h-[16px] bg-[#F8A53499] rounded-full"></div>
            <span className="text-xs font-semibold text-gray-800">
              {data?.data?.status}
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
          <div
            className={` p-3 flex flex-col w-full
                 "bg-zinc-200" 
             `}
          >
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
          data?.reply?.length &&
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
                        : `Admin wrote (admin) :`}
                    </span>
                  </div>

                  <div className="flex gap-3 text-xs">
                    <div className="font-semibold">
                      {dayjs(user?.createdAt).format("DD-MM-YYYY")}
                    </div>
                    <div className="font-semibold">
                      {dayjs(user?.createdAt).format(" hh:mm A")}
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
          {data?.data?.status === "Finalise"
            ? "Send Your Feedback"
            : "Reply to Ticket"}
        </h2>

        <div className="flex items-center gap-3 mt-3">
          {data?.data?.status === "Finalise" ? (
            <div className="flex items-center gap-2">
              <span className="cursor-pointer" onClick={() => handleLike()}>
                <AiFillLike
                  size="1.5em"
                  color={
                    data?.data?.ticketFeedback?.isLiked === true
                      ? "green"
                      : "gray"
                  }
                />
              </span>
              <span className="cursor-pointer" onClick={() => handleDisLike()}>
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
          ) : (
            <div className="flex flex-col gap-2 items-end rounded-md py-3 w-full">
              <textarea
                className="border border-gray-300 rounded-lg p-2 w-full "
                placeholder="Enter Your Message here..."
                onChange={(e) => setReply(e.target.value)}
                rows={4}
                value={reply}
              />
              <div className="flex justify-end gap-3">
                <input
                  type="file"
                  id="file-upload"
                  className="opacity-0 inset-0 cursor-pointer"
                  onChange={(val) => handleFileChange(val)}
                />
                <label
                  htmlFor="file-upload"
                  className={`inline-block relative px-6 py-3 font-semibold rounded-md cursor-pointer border border-red-300 shadow-xl transition duration-300 ${
                    file ? "bg-gray-200 pointer-events-none " : "bg-white"
                  }`}
                >
                  {file ? (
                    <>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="absolute top-0 right-0 px-2 font-semibold cursor-pointer text-red-500 z-50"
                      >
                        X
                      </span>
                      <span className={`ml-6 `}>{fileName}</span>
                    </>
                  ) : (
                    "Choose File"
                  )}
                </label>

                <button
                  onClick={() => handleReply(data?.data)}
                  className="bg-black text-white rounded-lg px-4 py-2"
                >
                  {isPending ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          )}

          {isModalOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg lg:w-1/3">
                <h2 className="  xl:text-xl mb-4">We'd love your feedback!</h2>
                <textarea
                  value={feedback}
                  onChange={(val) => setFeedback(val.target.value)}
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
                    onClick={() => handleFeedBack(data?.data?._id)}
                  >
                    {isFeedbackLoading ? "Submiting..." : "Submit"}
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
