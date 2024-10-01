// src/App.tsx
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./components/pages/Login";
import HomePage from "./components/HomePage/HomePage";
import SignUp from "./components/pages/SignUp";
import GetStarted from "./components/GetStarted/GetStarted";
import ForgetPassword from "./components/pages/ForgetPassword";
import ChangePassword from "./components/pages/ChangePassword";
import OtpPage from "./components/pages/OtpPage";
import PaymentSuccessfull from "./components/pages/PaymentSuccessfull";
import ThankYou from "./components/pages/ThankYou";
import ErrorPage from "./components/pages/ErrorPage";
import BlogAndNews from "./components/BlogAndNews/BlogAndNews";
import CircleBlog from "./components/CircleBlog/CircleBlog";
import CompleteProfileForm from "./components/pages/RegistrationProcess";
import BecomeArtist from "./components/pages/BecomeArtist";
import CardSuccessPage from "./components/pages/CardSuccessPage";
import DiscoveryArt from "./components/DiscoveryArt/DiscoveryArt";
import Support from "./components/pages/Support";
import OrderPage from "./components/pages/OrderPage";
import TermAndCondition from "./components/pages/TermAndCondition";
import PaymentPremium from "./components/PaymentPremium/PaymentPremium";
import Wishlist from "./components/pages/Wishlist";
import PriceAndPlan from "./components/PriceAndPlans/PriceAndPlan";
import ArtistPortfolioPage from "./components/ArtistPortfolioPage/ArtistPortfolioPage";
import DiscoverMore from "./components/DiscoverMore/DiscoverMore";
import Purchase from "./components/PurchasePage/Purchase";
import PurchaseCart from "./components/PurchasePage/PurchaseCart";
import ExplorePage from "./components/Explore/ExplorePage";
import ArtistDetail from "./components/ArtistDetail/ArtistDetail";
import NewTicket from "./components/NewTicket/NewTicket";
import CartSuccess from "./components/pages/CartSuccess";
import UserProfile from "./components/UserProfile/UserProfile";
import CirclePage from "./components/CirclePage/CirclePage";
import Followers from "./components/Followers/Followers";
import AllArtist from "./components/AllArtist/AllArtist";
import DiscoveryMore from "./components/DiscoveryMore/DiscoveryMore";
import ArtworkGroup from "./components/PurchasePage/ArtworkGroup";
import CreateInvite from "./components/CreateInvite/CreateInvite";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import AccountSetting from "./components/AccountSetting/AccountSetting";
import Blogs from "./components/Blogs/Blogs";
import EditProfile from "./components/EditProfile/EditProfile";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isAuthenticated] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/getstarted" element={<GetStarted />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/otp" element={<OtpPage />}></Route>
          <Route
            path="/payment_successful"
            element={<PaymentSuccessfull />}
          ></Route>
          <Route path="/thankyou" element={<ThankYou />}></Route>
          <Route path="/error" element={<ErrorPage />}></Route>
          <Route path="/blog" element={<BlogAndNews />}></Route>
          <Route path="/circleblog" element={<CircleBlog />}></Route>
          <Route
            path="/registration_process"
            element={<CompleteProfileForm />}
          ></Route>
          <Route path="/become_artist" element={<BecomeArtist />}></Route>
          <Route path="/card_success" element={<CardSuccessPage />}></Route>
          <Route path="/discovery_art" element={<DiscoveryArt />}></Route>
          <Route path="/priceandplans" element={<PriceAndPlan />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/terms" element={<TermAndCondition />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/premium_payment" element={<PaymentPremium />}></Route>
          <Route
            path="/artist_portfolio_page"
            element={<ArtistPortfolioPage />}
          ></Route>
          <Route path="/discover_more" element={<DiscoverMore />}></Route>
          <Route path="/purchase" element={<Purchase />}></Route>
          <Route path="/purchase_cart" element={<PurchaseCart />}></Route>
          <Route path="/explore" element={<ExplorePage />}></Route>
          <Route path="/artist_detail" element={<ArtistDetail />}></Route>
          <Route path="/new_ticket" element={<NewTicket />}></Route>
          <Route path="/cart_success_page" element={<CartSuccess />}></Route>
          <Route path="/user_profile" element={<UserProfile />}></Route>
          <Route path="/circle_page" element={<CirclePage />}></Route>
          <Route path="/followers" element={<Followers />}></Route>
          <Route path="/all_artist" element={<AllArtist />}></Route>
          <Route path="/more_discovery" element={<DiscoveryMore />}></Route>
          <Route path="/artwork_group" element={<ArtworkGroup />}></Route>
          <Route path="/create_invite" element={<CreateInvite />}></Route>
          <Route path="/order_detail" element={<OrderDetail />}></Route>
          <Route path="/account_setting" element={<AccountSetting />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/edit_profile" element={<EditProfile />}></Route>
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
