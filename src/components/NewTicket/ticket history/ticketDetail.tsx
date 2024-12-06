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
  const { mutateAsync, isPending } = useGetPostArtistTicketReplyMutation();

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
    mutateAsync(formData).then(() => {
      setReply("");
    });
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  console.log("datadata", data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto sm:px-6 px-3 mt-[2rem] mb-[2rem]">
      <FaArrowLeftLong onClick={handleNavigate} className="cursor-pointer" />
      <div className="flex  justify-between items-center w-full p-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-[#F8A53499] rounded-full"></span>
          <span className="font-semibold text-gray-800">
            {data?.data?.ticketId}
          </span>
          <span className="text-[#84818A]">({data?.data?.ticketType})</span>
        </div>
      </div>

      <div className="mt-8 mb-8">
        <h1 className="w-[406px] h-[23px] top-2 font-montserrat text-[18px] font-bold leading-[14px] text-left text-[#2E2C34] ">
          {data?.data?.subject}
        </h1>
      </div>

      <div className=" flex flex-col gap-2  w-full md:w-2/3  cursor-pointer ">
        {data?.reply &&
          data?.reply?.length &&
          data?.reply.map((item, i) => (
            <div
              key={i}
              className={` p-3 flex flex-col ${
                item.userType === "user" ? "bg-zinc-200" : " bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex items-center  gap-2 ">
                  <span>
                    <FaRegUserCircle />
                  </span>
                  <span className=" text-sm font-semibold  ">
                    {item.userType === "user"
                      ? `${user.artistName} (abc@gmail.com)`
                      : `Eri Johnson wrote (admin) :`}
                  </span>
                </div>

                <div className="flex gap-3 text-xs">
                  <div className="font-semibold">04/11/2024</div>
                  <div className="font-semibold">08:36 PM</div>
                </div>
              </div>

              <div>
                <p className="font-montserrat text-sm font-medium  text-left  py-2 px-4 break-words ml-2 ">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
      </div>

      <div className="py-2  w-full md:w-2/3">
        <h2 className="font-montserrat text-lg font-semibold mt-4">
          Reply to Ticket
        </h2>
        <div className="flex flex-col gap-2 items-end rounded-md py-3  ">
          <textarea
            className="border border-gray-300 rounded-lg p-2 w-full "
            placeholder="Enter Your Message here..."
            onChange={(e) => setReply(e.target.value)}
            rows={4}
            value={reply}
          />
          <button
            onClick={() => handleReply(data?.data)}
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
