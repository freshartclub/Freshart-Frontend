import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/typedReduxHooks";
import Loader from "../../ui/Loader";
import { RenderAllPicklists } from "../../utils/RenderAllPicklist";
import SearchDropdown from "../ticket history/SearchDropdown";
import TicketsList from "./TicketList";
import { useGetTicket } from "./http/useGetTicket";
import { TbCheckbox, TbProgress, TbTicket } from "react-icons/tb";

interface TabPanelProps {
  children?: React.ReactNode;
  activeTab: string;
  tabKey: string;
  dark: boolean;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, activeTab, tabKey, dark }) => {
  return activeTab === tabKey ? <div className={`rounded-b-lg ${dark ? "bg-gray-900" : "bg-white"} shadow-sm`}>{children}</div> : null;
};

const TicketHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTimeframe, setFilterTimeframe] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [ticketsdata, setTickets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const dark = useAppSelector((state) => state.theme.mode);

  const { t } = useTranslation();
  const now = dayjs();

  const { data = [], isLoading } = useGetTicket();

  const picklist = RenderAllPicklists(["Ticket Status"]);

  const picklistMap = picklist?.reduce((acc: Record<string, any>, item: any) => {
    acc[item?.fieldName] = item?.picklist;
    return acc;
  }, {});

  const statusPicklist = picklistMap["Ticket Status"];
  const getStatusValue = statusPicklist?.map((item: any) => item.value);
  const filteredStatuses = getStatusValue?.filter((status) => status !== "Closed" && status !== "Created");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const inProgressTicket = data?.filter((ticket) => {
    const ticketStatus = ticket?.status?.toString().toLowerCase();
    return filteredStatuses?.some((status) => ticketStatus.includes(status.toLowerCase()));
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
        (item) => item.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) || item.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterTimeframe === "thisWeek") {
      filteredTickets = filteredTickets.filter((ticket) => dayjs(ticket.createdAt).isAfter(now.startOf("week")));
    } else if (filterTimeframe === "thisMonth") {
      filteredTickets = filteredTickets.filter((ticket) => dayjs(ticket.createdAt).isAfter(now.startOf("month")));
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
    <div className={`container mx-auto px-3 py-4 ${dark ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`font-bold text-2xl ${dark ? "text-white" : "text-gray-800"}`}>{t("All Tickets")}</h1>
        <p className={`text-sm mb-4 ${dark ? "text-gray-400" : "text-gray-600"}`}>{t("View/Update Status of your tickets")}</p>

        <SearchDropdown
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterTimeframe={filterTimeframe}
          status={status}
          setStatus={setStatus}
          setFilterTimeframe={setFilterTimeframe}
          dark={dark}
        />

        <div className={`mt-4 rounded-xl border shadow-sm ${dark ? "bg-gray-800 border-gray-600" : "bg-gray-100"} p-1`}>
          <ul className="flex gap-1 px-1 py-1 w-full overflow-x-auto scrollbar-hide">
            {[
              {
                key: "all",
                icon: <TbTicket className="w-5 h-5" />,
                label: t("All Tickets"),
                activeColor: "bg-black",
                inactiveColor: dark ? "text-gray-400" : "text-gray-500",
              },
              {
                key: "new",
                icon: <TbProgress className="w-5 h-5" />,
                label: t("In Progress"),
                activeColor: "bg-orange-500",
                inactiveColor: dark ? "text-gray-400" : "text-gray-500",
              },
              {
                key: "Resolved",
                icon: <TbCheckbox className="w-5 h-5" />,
                label: t("Resolved (Closed)"),
                activeColor: "bg-green-700",
                inactiveColor: dark ? "text-gray-400" : "text-gray-500",
              },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              const activeStyles = `text-white ${tab.activeColor} shadow-sm`;
              const inactiveStyles = `${tab.inactiveColor} hover:bg-opacity-10 ${dark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`;

              return (
                <li key={tab.key} className={`flex-shrink-0 rounded-lg transition-all duration-200 ${isActive ? activeStyles : inactiveStyles}`}>
                  <button
                    onClick={() => handleTabChange(tab.key)}
                    className={`flex items-center px-4 py-2.5 gap-2 focus:outline-none rounded-lg transition-colors ${
                      isActive ? "" : "hover:scale-[1.02]"
                    }`}
                    aria-selected={isActive}
                  >
                    <span className={`transition-colors ${isActive ? "text-white" : tab.inactiveColor}`}>{tab.icon}</span>
                    <span className={`text-sm font-medium whitespace-nowrap ${isActive ? "font-semibold" : ""}`}>{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-b-lg overflow-hidden">
          <TabPanel activeTab={activeTab} tabKey="all" dark={dark}>
            <TicketsList tickets={ticketsdata} isLoading={isLoading} dark={dark} />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabKey="new" dark={dark}>
            <TicketsList tickets={inProgressTicket} isLoading={isLoading} dark={dark} />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabKey="On-Going" dark={dark}>
            <TicketsList tickets={onGoingTicket} isLoading={isLoading} dark={dark} />
          </TabPanel>
          <TabPanel activeTab={activeTab} tabKey="Resolved" dark={dark}>
            <TicketsList tickets={solvedTicket} isLoading={isLoading} dark={dark} />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default TicketHistory;
