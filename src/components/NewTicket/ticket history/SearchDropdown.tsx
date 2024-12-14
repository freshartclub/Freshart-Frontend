import React, { FC } from "react";
import search from "../ticket history/assets/search.png";
import new_Ticket from "../ticket history/assets/new_Ticket.png";
import { Link } from "react-router-dom";

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
}) => {
  const handlePriorityDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterPriority(e.target.value);
  };

  const handleTimeframeDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterTimeframe(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center sm:p-4 py-2 sm:mx-4">
      {/* Search Input */}
      <div className="relative w-full md:w-[30%] mb-4 md:mb-0">
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
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full md:w-auto">
        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={handlePriorityDropdownChange}
          className="border p-3 sm:p-4 rounded-lg text-sm font-bold text-[#203F58] w-full sm:w-auto outline-none"
        >
          <option value="All Tickets">Select Priority</option>
          <option value="New Tickets">Requested Ticket</option>
          <option value="On-Going Tickets">Dispatched Ticket</option>
          <option value="Resolved Tickets">Resolved Tickets</option>
        </select>

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
