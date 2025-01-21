import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./ArtistDashboard/Dashboard";
import Artwork from "../ArtistDetail/Artwork";
import Orders from "./Orders";
import OrdersDetail from "./Orderdetail/OrderDetails";
import ArtistProfile from "./ArtistEditProfile/ArtistProfile";
import TicketHistory from "../NewTicket/ticket history/TicketHistory";
import SingleTicket from "../NewTicket/ticket history/ticketDetail";
import ArtworkDetails from "./Artwork/artworkDetails/ArtworkDetails";
import ArtworkReview from "./AddArtwork/ArtworkReview";
import ArtistNavBar from "../NavBar/ArtistNavBar";
import Support from "../pages/Support";
import NewTicket from "../NewTicket/NewTicket";
import Settings from "./ArtistEditProfile/Settings";
import OrderApprove from "./OrderApprove/OrderApprove";
import { useState } from "react";
import KbDatabase from "../pages/KbDatabase";
import Faq from "../pages/Faq";
import AddArtwork2 from "./AddArtwork/AddArtwork2";
import AddArtwork from "./AddArtwork/AddArtwork";
import KbDetiails from "../pages/KbDetails";
import KbDetails from "../pages/KbDetails";
import Circle from "../CIrcle/Circle";
import CirclePage from "../CirclePage/CirclePage";

const ArtistPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);


  return (
    <>
      <ArtistNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className=" flex w-full overflow-hidden mt-[12vh] ">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <div
          className={`flex-1 ml-0 sm:px-6 lg:px-3 bg-zinc-100 overflow-auto ${
            isOpen ? "lg:ml-64 " : "lg:ml-14 md:ml-14 xl:ml-14"
          }  `}
        >
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="artdashboard" element={<Dashboard />} />
            <Route path="artwork" element={<Artwork />} />
            <Route path="artwork/details" element={<ArtworkDetails />} />
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
