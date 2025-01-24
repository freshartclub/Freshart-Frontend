import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import { RenderAllPicklists } from "../../utils/RenderAllPicklist";
import SearchDropdown from "../ticket history/SearchDropdown";
import Resolved from "../ticket history/assets//resolved.png";
import allTicket from "../ticket history/assets/allTicket.png";
import newTicket from "../ticket history/assets/newTicket.png";
import TicketsList from "./TicketList";
import { useGetTicket } from "./http/useGetTicket";
import { useTranslation } from "react-i18next";

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
  const [filterTimeframe, setFilterTimeframe] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [ticketsdata, setTickets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const { t } = useTranslation();
  const now = dayjs();

  const { data = [], isLoading } = useGetTicket();

  const picklist = RenderAllPicklists(["Ticket Status"]);

  const picklistMap = picklist?.reduce((acc, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const statusPicklist = picklistMap["Ticket Status"];
  const getStatusValue = statusPicklist?.map((item: any) => item.value);
  const filteredStatuses = getStatusValue?.filter(
    (status) => status !== "Closed" && status !== "Created"
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const inProgressTicket = data?.filter((ticket) => {
    const ticketStatus = ticket?.status?.toString().toLowerCase();

    return filteredStatuses?.some((status) =>
      ticketStatus.includes(status.toLowerCase())
    );
  });

  const onGoingTicket = data?.filter((ticket) => {
    return ticket?.status?.includes("In progress");
  });

  const solvedTicket = data?.filter((ticket) => {
    return ticket?.status?.includes("Closed");
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

    if (filterTimeframe === "thisWeek") {
      filteredTickets = filteredTickets.filter((ticket) =>
        dayjs(ticket.createdAt).isAfter(now.startOf("week"))
      );
    } else if (filterTimeframe === "thisMonth") {
      filteredTickets = filteredTickets.filter((ticket) =>
        dayjs(ticket.createdAt).isAfter(now.startOf("month"))
      );
    }

    if (status) {
      filteredTickets = filteredTickets.filter((ticket) => {
        return ticket.status.includes(status);
      });
    }

    setTickets(filteredTickets);
  };

  useEffect(() => {
    filterTickets();
  }, [filterTimeframe, searchQuery, data, status]);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto sm:px-6 px-3 mb-[3rem]">
      <h1 className="font-bold text-xl sm:p-4 py-2">{t("Tickets")}</h1>
      <SearchDropdown
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterTimeframe={filterTimeframe}
        status={status}
        setStatus={setStatus}
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
                {t("All Tickets")}
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
                {t("In Progress")}
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
                {t("Resolved(Closed)")}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <TabPanel activeTab={activeTab} tabKey="all">
            <TicketsList tickets={ticketsdata} isLoading={isLoading} />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabKey="new">
            <TicketsList tickets={inProgressTicket} isLoading={isLoading} />
          </TabPanel>

          <TabPanel activeTab={activeTab} tabKey="On-Going">
            <TicketsList tickets={onGoingTicket} isLoading={isLoading} />
          </TabPanel>

          <TabPanel activeTab={activeTab} tabKey="Resolved">
            <TicketsList tickets={solvedTicket} isLoading={isLoading} />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default TicketHistory;
