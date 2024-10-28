import React, { FC } from "react";
import search from "../ticket history/assets/search.png";
import new_Ticket from "../ticket history/assets/new_Ticket.png";
import { Link } from "react-router-dom";

interface SearchDropdownProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const SearchDropdown: FC<SearchDropdownProps> = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
}) => {
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
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
        <select
          value={filter}
          onChange={handleDropdownChange}
          className="border p-3 sm:p-4 rounded-lg text-sm font-bold text-[#203F58] w-full sm:w-auto"
        >
          <option value="All Tickets">Select Priority</option>
          <option value="New Tickets">New Tickets</option>
          <option value="On-Going Tickets">On-Going Tickets</option>
          <option value="Resolved Tickets">Resolved Tickets</option>
        </select>

        <select
          value={filter}
          onChange={handleDropdownChange}
          className="border p-3 sm:p-4 rounded-lg text-sm font-bold text-[#203F58] w-full sm:w-auto"
        >
          <option value="All Tickets">This Week</option>
          <option value="New Tickets">This Month</option>
        </select>

        <Link to="/new_ticket">
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
