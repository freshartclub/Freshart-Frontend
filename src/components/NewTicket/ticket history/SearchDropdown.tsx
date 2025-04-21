import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RenderAllPicklists } from "../../utils/RenderAllPicklist";

interface SearchDropdownProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterTimeframe: string;
  setFilterTimeframe: (filter: string) => void;
  status: string;
  setStatus: (status: string) => void;
  dark?: boolean;
}

const SearchDropdown: FC<SearchDropdownProps> = ({ searchQuery, setSearchQuery, filterTimeframe, setFilterTimeframe, setStatus, status, dark }) => {
  const { t } = useTranslation();

  const handleStatusDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleTimeframeDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTimeframe(e.target.value);
  };

  const picklist = RenderAllPicklists(["Ticket Status"]);
  const picklistMap = picklist.reduce((acc: Record<string, any>, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const ticketStatus = picklistMap["Ticket Status"];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 py-3">
      {/* Search Input */}
      <div className={`relative w-full lg:w-[40%] rounded-lg transition-colors ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className={`${dark ? "text-gray-400" : "text-gray-500"} h-5 w-5`} />
        </div>
        <input
          type="text"
          placeholder={t("Search for Ticket")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
            dark
              ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white placeholder-gray-400"
              : "bg-gray-50 border-gray-200 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-900 placeholder-gray-500"
          }`}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-3 w-full lg:w-auto">
        <div className="w-full sm:w-auto">
          <select
            value={status}
            onChange={handleStatusDropdownChange}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
              dark
                ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-900"
            }`}
          >
            <option value="">{t("All Statuses")}</option>
            {ticketStatus?.map((item, i: number) => (
              <option key={i} value={item?.value}>
                {t(item?.value)}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={filterTimeframe}
            onChange={handleTimeframeDropdownChange}
            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
              dark
                ? "bg-gray-700 border-gray-600 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-white"
                : "bg-white border-gray-300 focus:border-[#EE1D52] focus:ring-[#EE1D52]/30 text-gray-900"
            }`}
          >
            <option value="">{t("All Time")}</option>
            <option value="thisWeek">{t("This Week")}</option>
            <option value="thisMonth">{t("This Month")}</option>
          </select>
        </div>

        <Link
          to="/artist-panel/new_ticket"
          className={`w-full whitespace-nowrap sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white shadow-lg`}
        >
          <FiPlusCircle className="h-5 w-5" />
          <span>{t("New Ticket")}</span>
        </Link>
      </div>
    </div>
  );
};

export default SearchDropdown;
