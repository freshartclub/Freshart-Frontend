import { useEffect, useState } from "react";
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
import Circle from "../CIrcle/Circle";
import CustomOrder from "./Orders/CustomOrder";

const ArtistPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [smallWidth, setSmallWidth] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSmallWidth(true);
      } else {
        setSmallWidth(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ArtistNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isOpen={isOpen} setIsOpen={setIsOpen} />

        <div
          className={`flex-1 mt-[4.8rem] transition-all duration-300 bg-zinc-100 overflow-auto ${smallWidth ? "ml-0" : isOpen ? "ml-72" : "ml-14"}`}
        >
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="artdashboard" element={<Dashboard />} />
            <Route path="artwork" element={<Artwork />} />
            <Route path="order" element={<Orders />} />
            <Route path="order/custom" element={<CustomOrder />} />

            <Route path="order/orderDetail" element={<OrdersDetail />} />
            <Route path="order/approve-order" element={<OrderApprove />} />
            <Route path="artwork/add" element={<AddArtwork />} />
            <Route path="edit-artistprofile" element={<ArtistProfile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="circle" element={<Circle />} />
            <Route path="circle/circlepage" element={<CirclePage />} />

            <Route path="ticket/tickets" element={<TicketHistory />} />
            <Route path="/ticket" element={<Support />} />
            <Route path="/new_ticket" element={<NewTicket />} />
            <Route path="/kb-database" element={<KbDatabase />} />
            <Route path="/kb-details" element={<KbDetails />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/ticket_detail" element={<SingleTicket />} />
            <Route path="artwork/preview/:id" element={<ArtworkReview />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default ArtistPanel;
