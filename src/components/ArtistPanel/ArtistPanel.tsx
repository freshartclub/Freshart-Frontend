import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Artwork from "../ArtistDetail/Artwork";
import CirclePage from "../CirclePage/CirclePage";
import ArtistNavBar from "../NavBar/ArtistNavBar";
import NewTicket from "../NewTicket/NewTicket";
import TicketHistory from "../NewTicket/ticket history/TicketHistory";
import SingleTicket from "../NewTicket/ticket history/ticketDetail";
import Faq from "../pages/Faq";
import KbDatabase from "../pages/KbDatabase";
import KbDetails from "../pages/KbDetails";
import Support from "../pages/Support";
import AddArtwork from "./AddArtwork/AddArtwork";
import ArtworkReview from "./AddArtwork/ArtworkReview";
import Dashboard from "./ArtistDashboard/Dashboard";
import ArtistProfile from "./ArtistEditProfile/ArtistProfile";
import Settings from "./ArtistEditProfile/Settings";
import OrderApprove from "./OrderApprove/OrderApprove";
import OrdersDetail from "./Orderdetail/OrderDetails";
import Orders from "./Orders";
import Sidebar from "./Sidebar";

const ArtistPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <ArtistNavBar setSidebarOpen={setSidebarOpen} />
      <div className=" flex w-full overflow-hidden mt-[12vh] ">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <div
          className={`flex-1 ml-0 sm:px-6 lg:px-3 bg-zinc-100 overflow-auto ${
            isOpen ? "lg:ml-64" : "lg:ml-14 md:ml-14 xl:ml-14"
          }  `}
        >
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="artdashboard" element={<Dashboard />} />
            <Route path="artwork" element={<Artwork />} />
            {/* <Route path="artwork/details" element={<ArtworkDetails />} /> */}
            <Route path="order" element={<Orders />} />
            <Route path="order/orderDetail" element={<OrdersDetail />} />
            <Route path="order/approve-order" element={<OrderApprove />} />
            <Route path="artwork/add" element={<AddArtwork />} />
            <Route path="edit-artistprofile" element={<ArtistProfile />} />
            <Route path="user/settings" element={<Settings />} />
            <Route path="circle" element={<CirclePage />} />

            <Route path="ticket/tickets" element={<TicketHistory />} />
            <Route path="/ticket" element={<Support />} />
            <Route path="/new_ticket" element={<NewTicket />} />
            <Route path="/kb-database" element={<KbDatabase />} />
            <Route path="/kb-details" element={<KbDetails />} />
            <Route path="/faq" element={<Faq />} />

            <Route path="/ticket_detail" element={<SingleTicket />} />
            <Route path="artwork/preview" element={<ArtworkReview />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default ArtistPanel;
