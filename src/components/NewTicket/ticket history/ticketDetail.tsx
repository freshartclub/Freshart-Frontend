import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import { useAppSelector } from "../../../store/typedReduxHooks";
import axiosInstance from "../../utils/axios";
import artistImg from "../ticket history/assets/People.png";
import useGetPostArtistTicketReplyMutation from "./http/usePostReply";
import { FaArrowLeftLong } from "react-icons/fa6";

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

  const getTicketDetail = async () => {
    try {
      const response = await axiosInstance.get(
        `${ARTTIST_ENDPOINTS.GetArtistTicketsDetails}/${id}`
      );
      setTicket(response.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  const { mutate, isPending } = useGetPostArtistTicketReplyMutation();

  useEffect(() => {
    getTicketDetail();
  }, [id]);

  const handleReply = (ticket) => {
    const newData = {
      id: ticket.data._id,
      message: reply,
      ticketType: ticket.data.ticketType,
      status: ticket.data.status,
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

  console.log(ticket);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto sm:px-6 px-3 mt-[2rem] mb-[2rem]">
      <FaArrowLeftLong onClick={handleNavigate} className="cursor-pointer" />
      <div className="flex justify-between items-center w-full p-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#F8A53499] rounded-full"></span>
          <span className="font-semibold text-gray-800">
            {ticket?.data?.ticketId}
          </span>
          <span className="text-[#84818A]">({ticket.data?.ticketType})</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`${
              ticket.data?.status === "In progress"
                ? "w-2.5 h-2.5  bg-[#3bf834] rounded-full"
                : ticket.data?.status === "Created"
                ? "w-2.5 h-2.5 bg-[#F8A53499] rounded-full"
                : "w-2.5 h-2.5 bg-[#fe4323fd] rounded-full"
            }`}
          ></span>
          <span className="text-[#84818A]">{ticket.data?.status}</span>
          <div className="text-gray-400 text-sm">
            {dayjs(ticket?.data?.createdAt).format("MMMM D, YYYY")}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img src={artistImg} alt="People" className="w-10 h-10 object-cover" />
        <span className="text-[#84818A] font-semibold">{user.artistName}</span>
      </div>

      <div className="mt-10">
        <h1 className="w-[406px] h-[23px] top-2 font-montserrat text-[18px] font-semibold leading-[14px] text-left text-[#2E2C34]">
          {ticket?.data?.subject}
        </h1>
        <p className="text-[#84818A] font-montserrat text-sm font-medium leading-[17.07px] text-left mb-6">
          {ticket?.data?.message}
        </p>
      </div>

      <div className="bg-[#919EAB29] p-2 flex flex-col gap-2">
        {ticket?.reply &&
          ticket?.reply?.length &&
          ticket?.reply.map((item, i) => (
            <div key={i}>
              <span className="ml-3 text-[#84818A] text-[12px]">
                {item.userType === "user" ? "Your Reply" : "Reply By - Admin"}
              </span>
              <p className="text-[#676669] font-montserrat text-sm font-medium leading-[17.07px] text-left ml-5 pr-4 py-2 px-3">
                {item.message}
              </p>
            </div>
          ))}
      </div>

      <div className="py-2">
        <h2 className="font-montserrat text-lg font-semibold mt-4">
          Reply to Ticket
        </h2>
        <div className="flex flex-col gap-2 items-end rounded-md py-3 bg-gray-50">
          <textarea
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter Your Message here..."
            onChange={(e) => setReply(e.target.value)}
            rows={4}
          />
          <button
            onClick={() => handleReply(ticket)}
            className="bg-black text-white rounded-md px-4 py-2"
          >
            {isPending ? "Loading..." : "Reply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
