import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RenderAllPicklists } from "../../utils/RenderAllPicklist";
import new_Ticket from "../ticket history/assets/new_Ticket.png";
import search from "../ticket history/assets/search.png";
import { useTranslation } from "react-i18next";

interface SearchDropdownProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterTimeframe: string;
  setFilterTimeframe: (filter: string) => void;
  status: string;
  setStatus: (status: string) => void;
}

const SearchDropdown: FC<SearchDropdownProps> = ({
  searchQuery,
  setSearchQuery,
  filterTimeframe,
  setFilterTimeframe,
  setStatus,
  status,
}) => {
  const { t } = useTranslation();
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
    <div className="flex flex-col lg:flex-row justify-between items-center py-2">
      <div className="relative w-full rounded lg:w-[30%] mb-4 lg:mb-0">
        <img
          src={search}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
        <input
          type="text"
          placeholder={t("Search for Ticket")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-sm p-4 w-full pl-10 bg-[#FBFBFB] py-2 outline-none focus:border-gray-400"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full lg:w-auto">
        <select
          value={status}
          onChange={handleStatusDropdownChange}
          className="border p-3 rounded text-sm font-bold text-[#203F58] w-full lg:w-auto outline-none"
        >
          <option value="">{t("Select Status")}</option>
          {ticketStatus && ticketStatus
            ? ticketStatus.map((item, i) => (
                <option key={i} value={item?.value}>
                  {t(item?.value)}
                </option>
              ))
            : null}
        </select>

        <select
          value={filterTimeframe}
          onChange={handleTimeframeDropdownChange}
          className="border p-3 rounded text-sm font-bold text-[#203F58] w-full lg:w-auto outline-none"
        >
          <option value="">{t("Select Timeframe")}</option>
          <option value="thisWeek">{t("This Week")}</option>
          <option value="thisMonth">{t("This Month")}</option>
        </select>

        <Link
          to="/artist-panel/new_ticket"
          className="text-white font-semibold bg-black p-2 rounded flex justify-center items-center gap-1 w-full lg:w-auto"
        >
          <img className="bg-[#102030]" src={new_Ticket} alt="New Ticket" />
          {t("New Ticket")}
        </Link>
      </div>
    </div>
  );
};

export default SearchDropdown;
