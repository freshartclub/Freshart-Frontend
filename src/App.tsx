import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ArtistPanel from "./components/ArtistPanel/ArtistPanel";
import AuthGuard from "./components/AuthGuard";
import FooterSection from "./components/HomePage/FooterSection";
import Layout from "./components/Layout";
import Loader from "./components/ui/Loader";
import { setup } from "./components/utils/axios";
import "./components/utils/i18n.ts";
import useCheckIsAuthorized from "./http/auth/useGetAuhtorizedUser";
import { AuthProvider } from "./jwt/auth-provider";
import { toggleTheme } from "./store/slice/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa6";
import ArtistGuard from "./components/ArtistGuard";
import { useAppDispatch, useAppSelector } from "./store/typedReduxHooks";
import i18n from "./components/utils/i18n.ts";

// Lazy loading the components
const UserCircleList = lazy(() => import("./components/CIrcle/UserCircleList"));
const SingleTicket = lazy(() => import("./components/NewTicket/ticket history/ticketDetail"));
const TicketHistory = lazy(() => import("./components/NewTicket/ticket history/TicketHistory"));
const PaymentPage = lazy(() => import("./components/Payment_page/PaymentPage"));
const GetStarted = lazy(() => import("./components/GetStarted/GetStarted"));
const AboutUs = lazy(() => import("./components/pages/AboutUs/AboutUs"));
const Faq = lazy(() => import("./components/pages/Faq"));
const KbDatabase = lazy(() => import("./components/pages/KbDatabase.tsx"));
const NotFoundPage = lazy(() => import("./components/pages/NotFoundPage"));
const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const LoginPage = lazy(() => import("./components/pages/Login"));
const SignUp = lazy(() => import("./components/pages/SignUp"));
const ForgetPassword = lazy(() => import("./components/pages/ForgetPassword"));
const ChangePassword = lazy(() => import("./components/pages/ChangePassword"));
const OtpPage = lazy(() => import("./components/pages/OtpPage"));
const PaymentSuccessfull = lazy(() => import("./components/pages/PaymentSuccessfull"));
const ThankYou = lazy(() => import("./components/pages/ThankYou"));
const ErrorPage = lazy(() => import("./components/pages/ErrorPage"));
const BlogAndNews = lazy(() => import("./components/BlogAndNews/BlogAndNews"));
const CircleBlog = lazy(() => import("./components/CircleBlog/CircleBlog"));
const CompleteProfileForm = lazy(() => import("./components/pages/RegistrationProcess"));
const BecomeArtist = lazy(() => import("./components/pages/BecomeArtist"));
const CardSuccessPage = lazy(() => import("./components/pages/CardSuccessPage"));
const DiscoveryArt = lazy(() => import("./components/DiscoveryArt/DiscoveryArt"));
const Support = lazy(() => import("./components/pages/Support"));
const OrderPage = lazy(() => import("./components/pages/OrderPage"));
const TermAndCondition = lazy(() => import("./components/pages/TermAndCondition"));
const PaymentPremium = lazy(() => import("./components/PaymentPremium/PaymentPremium"));
const Wishlist = lazy(() => import("./components/pages/Wishlist"));
const PriceAndPlan = lazy(() => import("./components/PriceAndPlans/PriceAndPlan"));
const ArtistPortfolioPage = lazy(() => import("./components/ArtistPortfolioPage/ArtistPortfolioPage"));
const DiscoverMore = lazy(() => import("./components/DiscoverMore/DiscoverMore"));
const Purchase = lazy(() => import("./components/PurchasePage/Purchase"));
const PurchaseCart = lazy(() => import("./components/PurchasePage/PurchaseCart"));
const ExplorePage = lazy(() => import("./components/Explore/ExplorePage"));
const ArtistDetail = lazy(() => import("./components/ArtistDetail/ArtistDetail"));
const NewTicket = lazy(() => import("./components/NewTicket/NewTicket"));
const CartSuccess = lazy(() => import("./components/pages/CartSuccess"));
const UserProfile = lazy(() => import("./components/UserProfile/UserProfile"));
const CirclePage = lazy(() => import("./components/CirclePage/CirclePage"));
const Followers = lazy(() => import("./components/Followers/Followers.tsx"));
const AllArtist = lazy(() => import("./components/AllArtist/AllArtist"));
const DiscoveryMore = lazy(() => import("./components/DiscoveryMore/DiscoveryMore"));
const ArtworkGroup = lazy(() => import("./components/PurchasePage/ArtworkGroup"));
const CreateInvite = lazy(() => import("./components/CreateInvite/CreateInvite"));
const OrderTracking = lazy(() => import("./components/OrderTracking/OrderTracking"));
const AccountSetting = lazy(() => import("./components/AccountSetting/AccountSetting"));
const Blogs = lazy(() => import("./components/Blogs/Blogs"));
const EditProfile = lazy(() => import("./components/EditProfile/EditProfile"));
const ArtistDashboard = lazy(() => import("./components/ArtistDashboard/ArtistDashboard"));
const SignUpOtp = lazy(() => import("./components/pages/SignUpOtp"));
const OrderDetail = lazy(() => import("./components/ArtistPanel/Orderdetail/OrderDetails"));
const MyPlans = lazy(() => import("./components/MyPlans/Myplans.tsx"));

const App: React.FC = () => {
  setup();
  const { isLoading } = useCheckIsAuthorized();
  const theme = useAppSelector((state) => state.theme.mode);
  const lng = useAppSelector((state) => state.user.language);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language.toLocaleLowerCase());
    } else {
      i18n.changeLanguage("english");
    }
  }, [lng]);

  if (isLoading) return <Loader />;

  return (
    <AuthProvider>
      <Layout>
        <Suspense fallback={<Loader />}>
          <div>
            <Routes>
              <Route path="/" element={<GetStarted />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/become_artist" element={<BecomeArtist />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ChangePassword />} />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/sign-up-otp" element={<SignUpOtp />} />
              <Route path="/terms" element={<TermAndCondition />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/kb-database" element={<KbDatabase />} />
              <Route path="/about-us" element={<AboutUs />} />

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
              />
              <Route
                path="/ticket_detail"
                element={
                  <AuthGuard>
                    <SingleTicket />
                  </AuthGuard>
                }
              />
              <Route
                path="/new_ticket"
                element={
                  <AuthGuard>
                    <NewTicket />
                  </AuthGuard>
                }
              />

              <Route path="/home" element={<HomePage />} />
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
                path="/collections"
                element={
                  <AuthGuard>
                    <DiscoveryArt />
                  </AuthGuard>
                }
              />
              <Route
                path="/collections/:id"
                element={
                  <AuthGuard>
                    <DiscoveryMore />
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
                path="/my_plans"
                element={
                  <AuthGuard>
                    <MyPlans />
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
                path="/discover_more/:id"
                element={
                  // <AuthGuard>
                  <DiscoverMore />
                  // </AuthGuard>
                }
              />
              <Route
                path="/all-artworks"
                element={
                  // <AuthGuard>
                  <Purchase />
                  // </AuthGuard>
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
                path="/artist_detail/:id"
                element={
                  // <AuthGuard>
                  <ArtistDetail />
                  // </AuthGuard>
                }
              />

              <Route
                path="/payment-success"
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
                path="/circlepage"
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
                    <UserCircleList />
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
              <Route path="/all_artist" element={<AllArtist />} />
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`fixed right-4 bottom-4 z-50 p-3 rounded-full shadow-lg ${
                theme ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle mode"
            >
              {theme ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
          {window.location.pathname.includes("/artist-panel") ? null : <FooterSection />}
        </Suspense>
      </Layout>
    </AuthProvider>
  );
};

export default App;
