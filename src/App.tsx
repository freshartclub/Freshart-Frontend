// src/App.tsx
import React, { useState, Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import useCheckIsAuthorized from "./http/auth/useGetAuhtorizedUser";
import { Provider } from "react-redux";
import { AuthProvider } from "./jwt/auth-provider";
import { store } from "./store/store";
import FooterSection from "./components/HomePage/FooterSection";

const queryClient = new QueryClient();

// Lazy loading the components
const GetStarted = lazy(() => import("./components/GetStarted/GetStarted"));
const LoginPage = lazy(() => import("./components/pages/Login"));
const HomePage = lazy(() => import("./components/HomePage/HomePage"));
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
const OrderDetail = lazy(() => import("./components/OrderDetail/OrderDetail"));
const AccountSetting = lazy(
  () => import("./components/AccountSetting/AccountSetting")
);
const Blogs = lazy(() => import("./components/Blogs/Blogs"));
const EditProfile = lazy(() => import("./components/EditProfile/EditProfile"));
const ArtistDashboard = lazy(
  () => import("./components/ArtistDashboard/ArtistDashboard")
);
const SignUpOtp = lazy(() => import("./components/pages/SignUpOtp"));

const App: React.FC = () => {
  const [isAuthenticated] = useState<boolean>(false);

  useCheckIsAuthorized();

  return (
    <AuthProvider>
      <Layout isAuthenticated={isAuthenticated}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ChangePassword />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/sign-up-otp" element={<SignUpOtp />} />
            <Route
              path="/payment_successful"
              element={<PaymentSuccessfull />}
            />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/blog" element={<BlogAndNews />} />
            <Route path="/circleblog" element={<CircleBlog />} />
            <Route
              path="/registration_process"
              element={<CompleteProfileForm />}
            />
            <Route path="/become_artist" element={<BecomeArtist />} />
            <Route path="/card_success" element={<CardSuccessPage />} />
            <Route path="/discovery_art" element={<DiscoveryArt />} />
            <Route path="/priceandplans" element={<PriceAndPlan />} />
            <Route path="/support" element={<Support />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/terms" element={<TermAndCondition />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/premium_payment" element={<PaymentPremium />} />
            <Route
              path="/artist_portfolio_page"
              element={<ArtistPortfolioPage />}
            />
            <Route path="/discover_more" element={<DiscoverMore />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/purchase_cart" element={<PurchaseCart />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/artist_detail" element={<ArtistDetail />} />
            <Route path="/new_ticket" element={<NewTicket />} />
            <Route path="/cart_success_page" element={<CartSuccess />} />
            <Route path="/user_profile" element={<UserProfile />} />
            <Route path="/circle_page" element={<CirclePage />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/all_artist" element={<AllArtist />} />
            <Route path="/more_discovery" element={<DiscoveryMore />} />
            <Route path="/artwork_group" element={<ArtworkGroup />} />
            <Route path="/create_invite" element={<CreateInvite />} />
            <Route path="/order_detail" element={<OrderDetail />} />
            <Route path="/account_setting" element={<AccountSetting />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/edit_profile" element={<EditProfile />} />
            <Route path="/artist_dashboard" element={<ArtistDashboard />} />
            {/* <Route path="/table_page" element={<TablePage />} /> */}
          </Routes>
        </Suspense>
        <FooterSection />
      </Layout>
    </AuthProvider>
  );
};

export default App;
