import React, { FC } from "react";
import search from "../ticket history/assets/search.png";
import new_Ticket from "../ticket history/assets/new_Ticket.png";
import { Link } from "react-router-dom";
import { RenderAllPicklists } from "../../utils/RenderAllPicklist";
import { PiNutFill } from "react-icons/pi";

interface SearchDropdownProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterPriority: string;
  setFilterPriority: (filter: string) => void;
  filterTimeframe: string;
  setFilterTimeframe: (filter: string) => void;
}

const SearchDropdown: FC<SearchDropdownProps> = ({
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
  filterTimeframe,
  setFilterTimeframe,
  setFilterBy,
  filterBy,
  setStatus,
  status,
}) => {
  const handlePriorityDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterPriority(e.target.value);
  };

  const handleFilterDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterBy(e.target.value);
  };

  const handleStatusDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatus(e.target.value);
  };

  const handleTimeframeDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterTimeframe(e.target.value);
  };

  const picklist = RenderAllPicklists(["Ticket Status"]);

  const picklistMap = picklist.reduce((acc, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const ticketStatus = picklistMap["Ticket Status"];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center sm:p-4 py-2 sm:mx-4">
      {/* Search Input */}
      <div className="relative w-full lg:w-[30%] mb-4 lg:mb-0">
        <img
          src={search}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search for ticket"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-sm p-4 w-full pl-10 bg-[#FBFBFB] sm:py-2"
        />
      </div>

      {/* Filters and Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full lg:w-auto">
        {/* Priority Filter */}
        <select
          value={filterBy}
          onChange={handleFilterDropdownChange}
          className="border p-3 sm:p-4 rounded-lg text-sm font-bold text-[#203F58] w-full sm:w-auto outline-none"
        >
          <option value="">Filter By</option>
          {/* <option value="All">All</option> */}
          <option value="Ticket Urgency">Ticket Urgency</option>
          {/* <option value="Ticket Priority">Ticket Priority</option> */}

          <option value="Ticket Impact">Ticket Impact</option>

          <option value="Ticket Type">Ticket Type</option>
        </select>

        <select
          value={status}
          onChange={handleStatusDropdownChange}
          className="border p-5 sm:p-4 rounded-lg text-sm font-bold text-[#203F58] w-full sm:w-auto outline-none"
        >
          <option value="">Select Status</option>
          {ticketStatus && ticketStatus
            ? ticketStatus.map((item, i) => (
                <option value={item?.value}>{item?.value}</option>
              ))
            : null}
        </select>

        {/* <select
          value={filterPriority}
          onChange={handlePriorityDropdownChange}
          className="border p-3 sm:p-4 rounded-lg text-sm font-bold text-[#203F58] w-full sm:w-auto outline-none"
        >
          <option value="All Tickets">Select Priority</option>
          <option value="New Tickets">Requested Ticket</option>
          <option value="On-Going Tickets">Dispatched Ticket</option>
          <option value="Resolved Tickets">Resolved Tickets</option>
        </select> */}

        {/* Timeframe Filter */}
        <select
          value={filterTimeframe}
          onChange={handleTimeframeDropdownChange}
          className="border p-3 sm:p-4 rounded-lg text-sm font-bold text-[#203F58] w-full sm:w-auto outline-none"
        >
          <option value="">Select Timeframe</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>

        {/* New Ticket Button */}
        <Link to="/artist-panel/new_ticket">
          <button className="text-white bg-black p-4 rounded-md flex justify-center items-center gap-1 w-full sm:w-auto">
            <img className="bg-[#102030]" src={new_Ticket} alt="New Ticket" />
            New Ticket
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchDropdown;
