// src/App.tsx
import React, { useState, Suspense, lazy, useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import useCheckIsAuthorized from "./http/auth/useGetAuhtorizedUser";
import { AuthProvider } from "./jwt/auth-provider";
import FooterSection from "./components/HomePage/FooterSection";
import AuthGuard from "./components/AuthGuard";
import { setup } from "./components/utils/axios";
import ArtistPanel from "./components/ArtistPanel/ArtistPanel";
import Dashboard from "./components/ArtistPanel/ArtistDashboard/Dashboard";
import Artwork from "./components/ArtistDetail/Artwork";
import Orders from "./components/ArtistPanel/Orders";
import AddArtwork from "./components/ArtistPanel/AddArtwork/AddArtwork";
import ArtistProfile from "./components/ArtistPanel/ArtistEditProfile/ArtistProfile";
import Loader from "./components/ui/Loader";
import TicketHistory from "./components/NewTicket/ticket history/TicketHistory";
import SingleTicket from "./components/NewTicket/ticket history/ticketDetail";
import { I18nProvider } from "./components/utils/i18n-provider.tsx";
import { useTranslation } from "react-i18next";
import "./components/utils/i18n.ts";

// import "./i18n";

const queryClient = new QueryClient();

// Lazy loading the components
import GetStarted from "./components/GetStarted/GetStarted";
import LoginPage from "./components/pages/Login";
import HomePage from "./components/HomePage/HomePage";
import { useAppSelector } from "./store/typedReduxHooks";
import ArtistGuard from "./components/ArtistGuard";
import NotFoundPage from "./components/pages/NotFoundPage";
import ArtworkDetails from "./components/ArtistPanel/Artwork/artworkDetails/ArtworkDetails";
import OrderApprove from "./components/ArtistPanel/OrderApprove/OrderApprove";
import PaymentPage from "./components/Payment_page/PaymentPage";
import Faq from "./components/pages/Faq";
import FaqDetails from "./components/FaqDetails/FaqDetails";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import KbDatabase from "./components/pages/KbDatabase.tsx";
import Circle from "./components/CIrcle/Circle.tsx";
import Invoice from "./components/ArtistPanel/ArtistEditProfile/Invoice.tsx";
import InvoicePdf from "./components/pages/InvoicePdf.tsx";
const SignUp = lazy(() => import("./components/pages/SignUp"));
const ForgetPassword = lazy(() => import("./components/pages/ForgetPassword"));
const ChangePassword = lazy(() => import("./components/pages/ChangePassword"));
const OtpPage = lazy(() => import("./components/pages/OtpPage"));
const PaymentSuccessfull = lazy(
  () => import("./components/pages/PaymentSuccessfull")
);
const ThankYou = lazy(() => import("./components/pages/ThankYou"));
const ErrorPage = lazy(() => import("./components/pages/ErrorPage"));
const BlogAndNews = lazy(() => import("./components/BlogAndNews/BlogAndNews"));
const CircleBlog = lazy(() => import("./components/CircleBlog/CircleBlog"));
const CompleteProfileForm = lazy(
  () => import("./components/pages/RegistrationProcess")
);
const BecomeArtist = lazy(() => import("./components/pages/BecomeArtist"));
const CardSuccessPage = lazy(
  () => import("./components/pages/CardSuccessPage")
);
const DiscoveryArt = lazy(
  () => import("./components/DiscoveryArt/DiscoveryArt")
);
const Support = lazy(() => import("./components/pages/Support"));
const OrderPage = lazy(() => import("./components/pages/OrderPage"));
const TermAndCondition = lazy(
  () => import("./components/pages/TermAndCondition")
);
const PaymentPremium = lazy(
  () => import("./components/PaymentPremium/PaymentPremium")
);
const Wishlist = lazy(() => import("./components/pages/Wishlist"));
const PriceAndPlan = lazy(
  () => import("./components/PriceAndPlans/PriceAndPlan")
);
const ArtistPortfolioPage = lazy(
  () => import("./components/ArtistPortfolioPage/ArtistPortfolioPage")
);
const DiscoverMore = lazy(
  () => import("./components/DiscoverMore/DiscoverMore")
);
const Purchase = lazy(() => import("./components/PurchasePage/Purchase"));
const PurchaseCart = lazy(
  () => import("./components/PurchasePage/PurchaseCart")
);
const ExplorePage = lazy(() => import("./components/Explore/ExplorePage"));
const ArtistDetail = lazy(
  () => import("./components/ArtistDetail/ArtistDetail")
);
const NewTicket = lazy(() => import("./components/NewTicket/NewTicket"));
const CartSuccess = lazy(() => import("./components/pages/CartSuccess"));
const UserProfile = lazy(() => import("./components/UserProfile/UserProfile"));
const CirclePage = lazy(() => import("./components/CirclePage/CirclePage"));
const Followers = lazy(() => import("./components/Followers/Followers"));
const AllArtist = lazy(() => import("./components/AllArtist/AllArtist"));
const DiscoveryMore = lazy(
  () => import("./components/DiscoveryMore/DiscoveryMore")
);
const ArtworkGroup = lazy(
  () => import("./components/PurchasePage/ArtworkGroup")
);
const CreateInvite = lazy(
  () => import("./components/CreateInvite/CreateInvite")
);
const OrderTracking = lazy(
  () => import("./components/OrderTracking/OrderTracking")
);
const AccountSetting = lazy(
  () => import("./components/AccountSetting/AccountSetting")
);
const Blogs = lazy(() => import("./components/Blogs/Blogs"));
const EditProfile = lazy(() => import("./components/EditProfile/EditProfile"));
const ArtistDashboard = lazy(
  () => import("./components/ArtistDashboard/ArtistDashboard")
);
const SignUpOtp = lazy(() => import("./components/pages/SignUpOtp"));

const OrderDetail = lazy(
  () => import("./components/ArtistPanel/Orderdetail/OrderDetails")
);

const App: React.FC = () => {
  setup();
  const { isLoading } = useCheckIsAuthorized();
  const [isAuthenticated] = useState<boolean>(false);
  const data = useAppSelector((state) => state.user.user);

  // useEffect(() => {
  //   console.log(t("welcome"));
  //   console.log(i18n.language);

  //   i18n.changeLanguage("nl");
  // }, []);

  if (isLoading) return <Loader />;

  return (
    <AuthProvider>
      <Layout isAuthenticated={isAuthenticated}>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Routes */}

            <Route path="/" element={<GetStarted />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ChangePassword />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/sign-up-otp" element={<SignUpOtp />} />
            <Route path="/terms" element={<TermAndCondition />} />
            <Route path="/become_artist" element={<BecomeArtist />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/kb-database" element={<KbDatabase />} />
            <Route path="/about-us" element={<AboutUs />} />

            <Route
              path="/invoice-pdf*"
              element={
                <AuthGuard>
                  <ArtistGuard>
                    <InvoicePdf />
                  </ArtistGuard>
                </AuthGuard>
              }
            />
            <Route
              path="/order-approve*"
              element={
                <AuthGuard>
                  <ArtistGuard>
                    <OrderApprove />
                  </ArtistGuard>
                </AuthGuard>
              }
            />

            <Route
              path="/artist-panel/*"
              element={
                <AuthGuard>
                  <ArtistGuard>
                    <ArtistPanel />
                  </ArtistGuard>
                </AuthGuard>
              }
            />

            <Route
              path="/tickets"
              element={
                <AuthGuard>
                  <TicketHistory />
                </AuthGuard>
              }
            ></Route>
            <Route
              path="/ticket_detail"
              element={
                <AuthGuard>
                  <SingleTicket />{" "}
                </AuthGuard>
              }
            />
            <Route
              path="/new_ticket"
              element={
                <AuthGuard>
                  {" "}
                  <NewTicket />{" "}
                </AuthGuard>
              }
            />

            {/* <Route path="/artdashboard" element={<Dashboard />} />
            <Route path="/artwork" element={<Artwork />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/addartwork" element={<AddArtwork />} />
            <Route path="/edit-artistprofile" element={<ArtistProfile />} /> */}

            {/* Protected Routes */}
            <Route
              path="/home/"
              element={
                <AuthGuard>
                  <HomePage />
                </AuthGuard>
              }
            />
            <Route
              path="/payment_successful"
              element={
                <AuthGuard>
                  <PaymentSuccessfull />
                </AuthGuard>
              }
            />
            <Route
              path="/thankyou"
              element={
                <AuthGuard>
                  <ThankYou />
                </AuthGuard>
              }
            />
            <Route
              path="/error"
              element={
                <AuthGuard>
                  <ErrorPage />
                </AuthGuard>
              }
            />
            <Route
              path="/blog"
              element={
                <AuthGuard>
                  <BlogAndNews />
                </AuthGuard>
              }
            />
            <Route
              path="/circleblog"
              element={
                <AuthGuard>
                  <CircleBlog />
                </AuthGuard>
              }
            />
            <Route
              path="/registration_process"
              element={
                <AuthGuard>
                  <CompleteProfileForm />
                </AuthGuard>
              }
            />

            <Route
              path="/card_success"
              element={
                <AuthGuard>
                  <CardSuccessPage />
                </AuthGuard>
              }
            />
            <Route
              path="/discovery_art"
              element={
                <AuthGuard>
                  <DiscoveryArt />
                </AuthGuard>
              }
            />
            <Route
              path="/priceandplans"
              element={
                <AuthGuard>
                  <PriceAndPlan />
                </AuthGuard>
              }
            />
            <Route
              path="/support"
              element={
                <AuthGuard>
                  <Support />
                </AuthGuard>
              }
            />
            <Route
              path="/order"
              element={
                <AuthGuard>
                  <OrderPage />
                </AuthGuard>
              }
            />
            <Route
              path="/orderDetail"
              element={
                <AuthGuard>
                  <OrderDetail />
                </AuthGuard>
              }
            />
            <Route
              path="/terms"
              element={
                <AuthGuard>
                  <TermAndCondition />
                </AuthGuard>
              }
            />
            <Route
              path="/wishlist"
              element={
                <AuthGuard>
                  <Wishlist />
                </AuthGuard>
              }
            />
            <Route
              path="/premium_payment"
              element={
                <AuthGuard>
                  <PaymentPremium />
                </AuthGuard>
              }
            />
            <Route
              path="/artist_portfolio_page"
              element={
                <AuthGuard>
                  <ArtistPortfolioPage />
                </AuthGuard>
              }
            />
            <Route
              path="/discover_more"
              element={
                <AuthGuard>
                  <DiscoverMore />
                </AuthGuard>
              }
            />
            <Route
              path="/purchase"
              element={
                <AuthGuard>
                  <Purchase />
                </AuthGuard>
              }
            />
            <Route
              path="/purchase_cart"
              element={
                <AuthGuard>
                  <PurchaseCart />
                </AuthGuard>
              }
            />
            <Route
              path="/explore"
              element={
                <AuthGuard>
                  <ExplorePage />
                </AuthGuard>
              }
            />
            <Route
              path="/artist_detail"
              element={
                <AuthGuard>
                  <ArtistDetail />
                </AuthGuard>
              }
            />

            <Route
              path="/cart_success_page"
              element={
                <AuthGuard>
                  <CartSuccess />
                </AuthGuard>
              }
            />
            <Route
              path="/user_profile"
              element={
                <AuthGuard>
                  <UserProfile />
                </AuthGuard>
              }
            />
            <Route
              path="/circle"
              element={
                <AuthGuard>
                  <CirclePage />
                </AuthGuard>
              }
            />
            <Route
              path="/circle"
              element={
                <AuthGuard>
                  <Circle />
                </AuthGuard>
              }
            />
            <Route
              path="/followers"
              element={
                <AuthGuard>
                  <Followers />
                </AuthGuard>
              }
            />
            <Route
              path="/all_artist"
              element={
                <AuthGuard>
                  <AllArtist />
                </AuthGuard>
              }
            />
            <Route
              path="/more_discovery"
              element={
                <AuthGuard>
                  <DiscoveryMore />
                </AuthGuard>
              }
            />
            <Route
              path="/artwork_group"
              element={
                <AuthGuard>
                  <ArtworkGroup />
                </AuthGuard>
              }
            />

            <Route
              path="/create_invite"
              element={
                <AuthGuard>
                  <CreateInvite />
                </AuthGuard>
              }
            />
            <Route
              path="/order_tracking"
              element={
                <AuthGuard>
                  <OrderTracking />
                </AuthGuard>
              }
            />
            <Route
              path="/account_setting"
              element={
                <AuthGuard>
                  <AccountSetting />
                </AuthGuard>
              }
            />
            <Route
              path="/blogs"
              element={
                <AuthGuard>
                  <Blogs />
                </AuthGuard>
              }
            />
            <Route
              path="/edit_profile"
              element={
                <AuthGuard>
                  <EditProfile />
                </AuthGuard>
              }
            />
            <Route
              path="/artist_dashboard"
              element={
                <AuthGuard>
                  <ArtistDashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/payment_page"
              element={
                <AuthGuard>
                  <PaymentPage />
                </AuthGuard>
              }
            />
            {/* Artist Dashboard Routes */}

            {/* <Route path="/table_page" element={<TablePage />} /> */}
          </Routes>
        </Suspense>
        <FooterSection />
      </Layout>
    </AuthProvider>
  );
};

export default App;
