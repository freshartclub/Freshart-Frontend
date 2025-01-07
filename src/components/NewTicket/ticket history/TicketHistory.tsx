import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import SearchDropdown from "../ticket history/SearchDropdown";
import Resolved from "../ticket history/assets//resolved.png";
import allTicket from "../ticket history/assets/allTicket.png";
import newTicket from "../ticket history/assets/newTicket.png";
import onGoingTicketImg from "../ticket history/assets/on-going.png";
import TicketsList from "./TicketList";
import { useGetTicket } from "./http/useGetTicket";

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
  const [filterPriority, setFilterPriority] = useState<string>("All Tickets");
  const [filterTimeframe, setFilterTimeframe] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsdata, setTickets] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("all");
  const now = dayjs();

  const ticketsPerPage = 10;

  const { data = [], isLoading } = useGetTicket();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const newTickets = data
    ? data?.filter((ticket) =>
        dayjs(ticket.createdAt).isAfter(now.subtract(3, "day"))
      )
    : null;

  const onGoingTicket = data?.filter((ticket) => {
    return ticket?.status?.includes("In progress");
  });

  const solvedTicket = data?.filter((ticket) => {
    return ticket?.status?.includes("Finalise");
  });

  const filterTickets = () => {
    let filteredTickets = [...data];

    if (searchQuery) {
      filteredTickets = filteredTickets.filter(
        (item) =>
          item.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterPriority === "New Tickets") {
      filteredTickets = filteredTickets.filter((ticket) =>
        dayjs(ticket.createdAt).isAfter(now.subtract(3, "day"))
      );
    } else if (filterPriority === "On-Going Tickets") {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.status.includes("In progress")
      );
    } else if (filterPriority === "Resolved Tickets") {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.status.includes("Finalise")
      );
    }

    if (filterTimeframe === "thisWeek") {
      filteredTickets = filteredTickets.filter((ticket) =>
        dayjs(ticket.createdAt).isAfter(now.startOf("week"))
      );
    } else if (filterTimeframe === "thisMonth") {
      filteredTickets = filteredTickets.filter((ticket) =>
        dayjs(ticket.createdAt).isAfter(now.startOf("month"))
      );
    }

    setTickets(filteredTickets);
    setTotalPages(Math.ceil(filteredTickets.length / ticketsPerPage));
  };
  useEffect(() => {
    filterTickets();
  }, [filterPriority, filterTimeframe, searchQuery, data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto sm:px-6 px-3 mb-[3rem]">
      <h1 className="font-bold text-xl sm:p-4 py-2">Tickets</h1>
      <SearchDropdown
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterTimeframe={filterTimeframe}
        setFilterTimeframe={setFilterTimeframe}
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
                Requested
              </button>
            </li>
            <li className="flex items-center" role="presentation">
              <img src={onGoingTicketImg} alt="On-Going" className="h-6 w-6" />
              <button
                className={`inline-block p-2 rounded-sm ${
                  activeTab === "On-Going" ? "border-b-2 border-[#102030]" : ""
                }`}
                onClick={() => handleTabChange("On-Going")}
                role="tab"
                aria-selected={activeTab === "On-Going"}
              >
                Dispatched
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
              tickets={ticketsdata}
              isLoading={isLoading}
              searchQuery={searchQuery}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabKey="new">
            <TicketsList
              tickets={newTickets}
              isLoading={isLoading}
              searchQuery={searchQuery}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </TabPanel>

          <TabPanel activeTab={activeTab} tabKey="On-Going">
            <TicketsList
              tickets={onGoingTicket}
              isLoading={isLoading}
              searchQuery={searchQuery}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </TabPanel>

          <TabPanel activeTab={activeTab} tabKey="Resolved">
            <TicketsList
              tickets={solvedTicket}
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
