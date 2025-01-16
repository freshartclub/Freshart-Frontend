import Button from "../ui/Button";
import Header from "../ui/Header";
import support from "../../assets/security.png";
import search from "../../assets/MagnifyingGlass.png";
import P from "../ui/P";
import truck from "../../assets/Truck.png";
import lock from "../../assets/LockOpen.png";
import credit from "../../assets/CreditCard.png";
import user from "../../assets/User.png";
import stack from "../../assets/Stack99.png";
import notepad from "../../assets/Notepad.png";
import shopping from "../../assets/CreditCard.png";
import store from "../../assets/Storefront.png";
import arrow from "../../assets/arrow.png";
import call from "../../assets/PhoneCall.png";
import msg from "../../assets/ChatCircleDots.png";
import { FaWhatsapp } from "react-icons/fa";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetAllIncidents } from "../NewTicket/ticket history/http/useGetAllIncidents";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useGetFaq } from "./http/useGetFaq";
import { useGetKbDataBase } from "./http/useGetKbDataBase";
import { useState } from "react";

const Support = () => {
  const navigate = useNavigate();
  const [getSearchValue, setSearchValue] = useState("");

  const handleSubmitButton = () => {
    const submitTicket = isArtistProfile
      ? `/artist-panel/new_ticket`
      : `/new_ticket`;
    navigate(submitTicket);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data, isLoading } = useGetAllIncidents();

  const { data: faqData, isLoading: faqLoading } = useGetFaq();

  const { data: kbData, isLoading: KbLoding } = useGetKbDataBase();

  const newSearchArray = { ...faqData?.data, ...kbData };

  dayjs.extend(isBetween);

  const KbTitle = kbData?.data?.map((item, i) => item?.kbTitle) || [];

  const now = dayjs();
  const startOfDay = now.startOf("day");
  const endOfDay = now.endOf("day");

  const newIncident = data?.filter((incident) => {
    const incidentStart = dayjs(incident.initTime);

    return incidentStart.isBetween(startOfDay, endOfDay, null, "[]");
  });

  const location = useLocation();
  const isArtistProfile = location.pathname.includes("/artist-panel");

  const handleItemClick = (link) => {
    console.log(link);
    if (isArtistProfile) {
      if (link?.faqQues) {
        navigate(`/artist-panel/faq/`);
      } else if (link?.kbTitle) {
        navigate(`/artist-panel/kb-database/`);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/kb-database`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFaq = () => {
    if (isArtistProfile) {
      navigate(`/artist-panel/faq`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/faq`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const assist_Data = [
    {
      image: truck,
      title: "Track Order",
    },
    {
      image: lock,
      title: "Reset Password",
    },
    {
      image: credit,
      title: "Payment Option",
    },
    {
      image: user,
      title: "User & Account",
    },
    {
      image: stack,
      title: "Wishlist & Compare",
    },
    {
      image: notepad,
      title: "Shipping & Billing",
    },
    {
      image: shopping,
      title: "Shoping Cart & Wallet",
    },
    {
      image: store,
      title: "Sell on Clicon",
    },
  ];

  return (
    <div>
      <div className="container mx-auto md:px-6 px-3">
        {newIncident && newIncident?.length > 0 ? (
          <div className="bg-[#E9E4DF] border-2 border-[#FF536B] p-4 mb-4 rounded-md mt-6">
            <h3 className="font-semibold">Important Notice:</h3>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              newIncident?.map((item, i) => (
                <p className="mt-1" key={i}>
                  {item?.description?.replace(/(^<p>|<\/p>$)/g, "")}
                </p>
              ))
            )}
          </div>
        ) : null}
        <div className="flex sm:flex-row flex-col justify-between my-10 w-full">
          <div className="md:w-[70%] w-full">
            <Button
              variant={{
                fontWeight: "400",
                thickness: "thick",
                fontSize: "base",
              }}
              // onClick={handleKbDatabse}
              className="bg-[#FF536B] rounded-md text-white mb-5 uppercase"
            >
              Help Center
            </Button>
            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              How we can help you!
            </Header>
            <div className="border border-lightgray py-2 px-2 md:w-[70%] w-full flex justify-between my-5 bg-[#ffff] rounded-md">
              <div className="flex w-full relative rounded-md">
                <img
                  src={search}
                  alt="search icon"
                  className="w-[24px] h-[24px] mt-3 mr-3"
                />
                <input
                  type="text"
                  placeholder="Enter your question or keyword"
                  className="w-[90%] outline-none"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {getSearchValue && (
                  <div className="search-list-container top-12 absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <ul className="list-none p-2">
                      {[...(faqData?.data || []), ...(kbData?.data || [])]
                        .filter((item) =>
                          (item?.faqQues || item?.kbTitle)
                            ?.toLowerCase()
                            .includes(getSearchValue.toLowerCase())
                        )
                        .map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {item?.faqQues || item?.kbTitle}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button
                variant={{
                  fontWeight: "500",
                  theme: "dark",
                  thickness: "thick",
                  fontSize: "base",
                }}
                className="rounded-sm"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="sm:w-[30%] w-full">
            <img src={support} alt="support image" className="w-full" />
          </div>
        </div>
      </div>

      <div className="bg-[#E9E4DF] py-10">
        <div className="container mx-auto md:px-6 px-3 mb-10">
          <Header
            variant={{ size: "2xl", weight: "bold", theme: "dark" }}
            className="mb-10 text-center"
          >
            What can we assist you with today?
          </Header>
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-4">
            {assist_Data.map((item, index) => (
              <div
                onClick={() => handleKbDatabse(item)}
                key={index}
                className="bg-white flex p-4 border-2 border-[#FFD8DD] shadow-lg cursor-pointer"
              >
                <img className="w-8 h-8" src={item.image} alt="image" />
                <P
                  variant={{ size: "base", theme: "dark", weight: "normal" }}
                  className="ml-3 mt-1 font-bold text-sm"
                >
                  {item.title}
                </P>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container m-auto px-6">
        <div className="my-12">
          <Header
            variant={{ size: "2xl", theme: "dark", weight: "bold" }}
            className="text-center mb-10"
          >
            Popular Topics
          </Header>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 justify-between px-3 gap-5">
            {faqData?.data &&
              faqData?.data?.length > 0 &&
              faqData?.data?.map((item, index) => (
                <div
                  onClick={() => handleFaq()}
                  key={index}
                  className="cursor-pointer"
                >
                  <h3 className="font-semibold">{item.faqQues}</h3>
                  {/* <p>{item.faqAns}</p> */}
                </div>
              ))}
          </div>
        </div>
        <div className="flex justify-center mb-3">
          <button
            onClick={() => handleFaq()}
            className=" bg-black text-white px-4 py-2 rounded-md "
          >
            View All
          </button>
        </div>
      </div>

      <div className="bg-[#E9E4DF] py-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <Button
              variant={{ fontSize: "md", fontWeight: "400" }}
              className="uppercase text-white bg-[#FF536B] mb-3"
            >
              Contact Us
            </Button>
            <Header
              variant={{ size: "2xl", weight: "bold", theme: "dark" }}
              className="mb-3"
            >
              Don’t find your answer.
            </Header>
            <Header
              variant={{ size: "2xl", weight: "bold", theme: "dark" }}
              className="mb-3"
            >
              Contact with us
            </Header>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col md:flex-row bg-white py-8 pl-8">
              <div className="bg-[#d1dde9] w-[120px] h-[80px] p-2 flex items-center justify-center mr-5">
                <BsFillTicketPerforatedFill size="3em" />
              </div>
              <div>
                <Header
                  variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
                  className="mb-3"
                >
                  Submit a ticket
                </Header>
                <P
                  variant={{ size: "md", theme: "dark", weight: "normal" }}
                  className="mb-4 pr-10"
                >
                  we are available online from 9:00 AM to 5:00 PM (GMT95:45)
                  Talk with use now
                </P>

                <Button
                  onClick={handleSubmitButton}
                  variant={{
                    fontSize: "base",
                    fontWeight: "500",
                    theme: "dark",
                  }}
                  className="uppercase flex mt-8"
                >
                  Submit ticket
                  <img src={arrow} alt="arrow" className="mt-1 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-5">
            <Link
              to={isArtistProfile ? "/artist-panel/ticket/tickets" : "/tickets"}
              className="text-red-400 font-medium text-center underline"
            >
              See Recent Ticket History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
