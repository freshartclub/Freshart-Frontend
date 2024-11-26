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
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const { data, isLoading } = useGetTicketDetails(id);
  const { mutate, isPending } = useGetPostArtistTicketReplyMutation();

  const handleReply = (ticket) => {
    const newData = {
      id: ticket._id,
      message: reply,
      ticketType: ticket.ticketType,
      status: ticket.status,
    };
    const formData = new FormData();
    for (const key in newData) {
      formData.append(key, newData[key]);
    }
    mutate(formData);
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  console.log("datadata",data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto sm:px-6 px-3 mt-[2rem] mb-[2rem]">
      <FaArrowLeftLong onClick={handleNavigate} className="cursor-pointer" />
      <div className="flex  justify-between items-center w-full p-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#F8A53499] rounded-full"></span>
          <span className="font-semibold text-gray-800">
            {data?.data?.ticketId}
          </span>
          <span className="text-[#84818A]">({data?.data?.ticketType})</span>
        </div>

        <div className="flex  items-center gap-2">
          <span
            className={`${
              data?.data?.status === "In progress"
                ? "w-2.5 h-2.5  bg-[#3bf834] rounded-full"
                : data?.data?.status === "Created"
                ? "w-2.5 h-2.5 bg-[#F8A53499] rounded-full"
                : "w-2.5 h-2.5 bg-[#fe4323fd] rounded-full"
            }`}
          ></span>
          <span className="text-[#84818A]">{data?.status}</span>
          <div className="text-gray-400 text-sm">
            {dayjs(data?.data?.createdAt).format("MMMM D, YYYY")}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img src={artistImg} alt="People" className="w-10 object-cover" />
        <span className="text-[#84818A] font-semibold">{user.artistName}</span>
      </div>

      <div className="mt-10">
        <h1 className="w-[406px] h-[23px] top-2 font-montserrat text-[18px] font-semibold leading-[14px] text-left text-[#2E2C34]">
          {data?.data?.subject}
        </h1>
        <p className="text-[#84818A] font-montserrat text-sm font-medium leading-[17.07px] text-left mb-6">
          {data?.data?.message}
        </p>
      </div>

      <div className="  flex flex-col gap-2 ">
        {data?.reply &&
          data?.reply?.length &&
          data?.reply.map((item, i) => (
            <div
              key={i}
              className={` p-3 ${
                item.userType === "user" ? "bg-zinc-200" : " bg-white"
              }`}
            >
              <div className="flex items-center gap-2 ">
              <span><FaRegUserCircle /></span>
              <span className=" text-sm font-semibold  ">
                {item.userType === "user" ? `${user.artistName}` : `(admin) :`}
              </span>
              </div>
              
              <p className=" font-montserrat  text-sm font-medium  text-left  py-2 px-4">
                {item.message}
              </p>
            </div>
          ))}
      </div>

      <div className="py-2 ">
        <h2 className="font-montserrat text-lg font-semibold mt-4">
          Reply to Ticket
        </h2>
        <div className="flex flex-col gap-2 items-end rounded-md py-3  ">
          <textarea
            className="border border-gray-300 rounded-lg p-2 w-full "
            placeholder="Enter Your Message here..."
            onChange={(e) => setReply(e.target.value)}
            rows={4}
          />
          <button
            onClick={() => handleReply(data.data)}
            className="bg-black text-white rounded-lg px-4 py-2"
          >
            {isPending ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
