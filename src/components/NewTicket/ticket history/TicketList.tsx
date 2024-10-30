import React, { FC } from "react";
import orange from "../ticket history/assets/orange.png";
import blue from "../ticket history/assets/blue.png";
import green from "../ticket history/assets/green.png";
import { useNavigate } from "react-router-dom";
import artistImg from "../ticket history/assets/People.png";
import Loader from "../../ui/Loader";
import dayjs from "dayjs";
import { useAppSelector } from "../../../store/typedReduxHooks";

const TicketsList: FC<{
  tickets: any[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  isLoading: any;
  onPageChange: (page: number) => void;
}> = ({ tickets, currentPage, totalPages, onPageChange, isLoading }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/ticket_detail/${id}`);
  };

  console.log("this is from ticket list page", tickets);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      {tickets?.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        tickets?.map((ticket) => {
          let imageSrc;
          switch (ticket.status) {
            case "New Tickets":
              imageSrc = blue;
              break;
            case "On-Going Tickets":
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
              className="border p-2 sm:p-4 rounded-lg mb-4 bg-[#FEFEFE] cursor-pointer"
              onClick={() => handleClick(ticket._id)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 w-[100%]">
                <div className="flex items-center mb-2 sm:mb-0 w-[100%]">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={`${ticket.status} icon`}
                      className="rounded-full h-4 w-4 mr-2"
                    />
                  )}
                  <div className="flex sm:flex-row flex-col justify-between w-[100%]">
                    <h3
                      className="text-sm sm:text-sm font-bold"
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
              </div>
              <div className="text-[16px] ml-[7px] font-semibold mt-[2px] mb-[3px]">
                {ticket.subject}
              </div>
              <div className="text-xs sm:text-sm mb-4 w-[90%] px-2">
                {ticket.message}
              </div>
              <hr />
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <img
                    // src={`http://localhost:5000/uploads/ticketsImg/${ticket.ticketImg}`}
                    src={artistImg}
                    alt="user"
                    className="rounded-full h-6 w-6 mr-2"
                  />
                  <span className="font-bold text-xs sm:text-sm">
                    {ticket.name}
                  </span>
                </div>
                <button className="font-bold mt-2 border-b-[1px] border-[#102030] text-xs sm:text-sm">
                  Open Ticket
                </button>
              </div>
            </div>
          );
        })
      )}

      <div className="flex justify-end mt-4 ">
        <button
          className={`mr-2 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ display: tickets?.length === 0 ? "none" : "block" }}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`mx-1 px-2 py-1 rounded w-[45px] ${
              currentPage === index + 1
                ? "bg-blue-950 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => onPageChange(index + 1)}
            style={{ display: tickets.length === 0 ? "none" : "block" }}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`ml-2 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ display: tickets?.length === 0 ? "none" : "block" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketsList;
