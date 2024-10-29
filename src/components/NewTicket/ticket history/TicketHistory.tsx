import React, { useEffect, useState } from "react";
import SearchDropdown from "../ticket history/SearchDropdown";
import axiosInstance from "../../utils/axios";
import allTicket from "../ticket history/assets/allTicket.png";
import newTicket from "../ticket history/assets/newTicket.png";
import onGoingTicket from "../ticket history/assets/on-going.png";
import Resolved from "../ticket history/assets//resolved.png";
import TicketsList from "./TicketList";
import { useGetTicket } from "./http/useGetTicket";
import { useAppSelector } from "../../../store/typedReduxHooks";

interface TabPanelProps {
  children?: React.ReactNode;
  activeTab: string;
  tabKey: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, activeTab, tabKey }) => {
  return activeTab === tabKey ? <div>{children}</div> : null;
};

const TicketHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("All Tickets");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsdata, setTickets] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const ticketsPerPage = 10;

  const { data, isLoading } = useGetTicket();

  console.log(data);
  // console.log(data);
  // const tickets = useAppSelector((state) => state.user.ticket);
  // console.log(tickets);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (query: string) => {
    console.log("search query", query);
    setSearchQuery(query.trim());
    if (query) {
      const filteredTickets = data.filter((item) =>
        item.subject.includes(query)
      );
      setTickets(filteredTickets);
      setTotalPages(Math.ceil(filteredTickets.length / ticketsPerPage));
    }

    setCurrentPage(1);
  };

  console.log("itmes", ticketsdata);

  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto sm:px-6 px-3 mb-[3rem]">
      <h1 className="font-bold text-xl sm:p-4 py-2">Tickets</h1>
      <SearchDropdown
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <div className="sm:mx-6">
        <div
          className="mb-4 md:mt-4 flex flex-col md:flex-row items-start md:items-center border-b gap-4"
          style={{ borderColor: "#8080807a" }}
        >
          <ul
            className="flex flex-wrap md:flex-row gap-4 md:gap-16 text-sm font-medium "
            role="tablist"
          >
            <li className="flex items-center" role="presentation">
              <img src={allTicket} alt="All Tickets" className="h-6 w-6" />
              <button
                className={`inline-block p-2 rounded-sm ${
                  activeTab === "all" ? "border-b-2 border-[#102030]" : ""
                }`}
                onClick={() => handleTabChange("all")}
                role="tab"
                aria-selected={activeTab === "all"}
              >
                All Tickets
              </button>
            </li>
            <li className="flex items-center" role="presentation">
              <img src={newTicket} alt="new Tickets" className="h-6 w-6" />
              <button
                className={`inline-block p-2 rounded-sm ${
                  activeTab === "new" ? "border-b-2 border-[#102030]" : ""
                }`}
                onClick={() => handleTabChange("new")}
                role="tab"
                aria-selected={activeTab === "new"}
              >
                new
              </button>
            </li>
            <li className="flex items-center" role="presentation">
              <img src={onGoingTicket} alt="On-Going" className="h-6 w-6" />
              <button
                className={`inline-block p-2 rounded-sm ${
                  activeTab === "On-Going" ? "border-b-2 border-[#102030]" : ""
                }`}
                onClick={() => handleTabChange("On-Going")}
                role="tab"
                aria-selected={activeTab === "On-Going"}
              >
                On-Going
              </button>
            </li>
            <li className="flex items-center" role="presentation">
              <img src={Resolved} alt="Resolved" className="h-6 w-6" />
              <button
                className={`inline-block p-2 rounded-sm ${
                  activeTab === "Resolved" ? "border-b-2 border-[#102030]" : ""
                }`}
                onClick={() => handleTabChange("Resolved")}
                role="tab"
                aria-selected={activeTab === "Resolved"}
              >
                Resolved
              </button>
            </li>
          </ul>
        </div>

        <div>
          <TabPanel activeTab={activeTab} tabKey="all">
            <TicketsList
              tickets={searchQuery ? ticketsdata : data}
              isLoading={isLoading}
              searchQuery={searchQuery}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default TicketHistory;
