import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import NavBar from "./components/NavBar/NavBar.tsx";
import FooterSection from "./components/HomePage/FooterSection.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <NavBar /> */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>

      <FooterSection />
    </BrowserRouter>
  </React.StrictMode>
);


