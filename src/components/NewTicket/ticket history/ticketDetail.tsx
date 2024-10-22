import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import artistImg from "../ticket history/assets/People.png";

interface Ticket {
  ticketId: string;
  ticketType: string;
  subject: string;
  message: string;
  ticketDate: string;
}

const SingleTicket = () => {
  const { id } = useParams();  
  const [ticket, setTicket] = useState<Ticket | null>(null); 

  const getTicketDetail = async () => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:5000/api/artist/ticket/${id}`
      );
      console.log("API Response:", response.data);
      setTicket(response.data.data);  
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  useEffect(() => {
    getTicketDetail();
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="container mx-auto sm:px-6 px-3 mt-[2rem] mb-[2rem]">
      <div className="flex justify-between items-center w-full p-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#F8A53499] rounded-full"></span>
          <span className="font-semibold text-gray-800">
            {ticket.ticketId}
          </span>
          <span className="text-[#84818A]">({ticket.ticketType})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#F8A53499] rounded-full"></span>
          <span className="text-[#84818A]">Ongoing</span>
          <div className="text-gray-400 text-sm">
            {`Posted at ${new Date(ticket.ticketDate).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}`}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img src={artistImg} alt="People" className="w-10 h-10 object-cover" />
        <span className="text-[#84818A] font-semibold">testname</span>
      </div>

      <div className="mt-10">
        <h1 className="w-[406px] h-[23px] top-2 font-montserrat text-[18px] font-semibold leading-[14px] text-left text-[#2E2C34]">
          {ticket.subject}
        </h1>
        <p className="text-[#84818A] font-montserrat text-sm font-medium leading-[17.07px] text-left mb-6">
          {ticket.message}
        </p>
      </div>

      <div className="bg-[#919EAB29] p-4">
        <h1 className="font-montserrat text-[18px] font-semibold leading-[14px] text-left text-[#2E2C34] mb-2 ml-4">
          Replied By Admin
        </h1>
        <div className="flex items-center mb-4 ml-4">
          <span className="ml-3 text-[#84818A] font-semibold">John Snow</span>
        </div>

        <p className="text-[#84818A] font-montserrat text-sm font-medium leading-[17.07px] text-left mb-6 ml-6 pr-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </div>

      <div className="p-4">
        <h2 className="font-montserrat text-lg font-semibold mb-2 ml-2 mt-4">
          Reply to Ticket
        </h2>
        <div className="flex items-center rounded-lg p-4 bg-gray-50">
          <textarea
            className="border border-gray-300 rounded-lg p-2 w-full mr-2"
            placeholder="Enter Your Message here..."
            rows={4}
          ></textarea>
          <button className="bg-black text-white rounded-lg px-4 py-2">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
