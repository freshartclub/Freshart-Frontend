import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow.png";
import search from "../../assets/MagnifyingGlass.png";
import support from "../../assets/security.png";
import { useGetAllIncidents } from "../NewTicket/ticket history/http/useGetAllIncidents";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { useGetFaq } from "./http/useGetFaq";
import { useGetKbDataBase } from "./http/useGetKbDataBase";
import { useTranslation } from "react-i18next";
import useClickOutside from "../utils/useClickOutside";

const Support = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [getSearchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const closePopup = useRef(null);

  useClickOutside(closePopup, () => {
    setSearchValue("");
  });

  const modalRef = useRef(null);

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

  dayjs.extend(isBetween);

  const now = dayjs();
  const startOfDay = now.startOf("day");
  const endOfDay = now.endOf("day");
  const sevenDaysFromNow = now.add(7, "day").startOf("day");

  const newIncident = data?.filter((incident) => {
    const incidentStart = dayjs(incident.initTime);

    return incidentStart.isBetween(startOfDay, endOfDay, null, "[]");
  });

  const incidentAfterSevenDay = data?.filter((incident) => {
    const incidentStart = dayjs(incident.initTime);

    return incidentStart.isBetween(sevenDaysFromNow);
  });

  const location = useLocation();
  const isArtistProfile = location.pathname.includes("/artist-panel");

  const handleItemClick = (link) => {
    if (isArtistProfile) {
      if (link?.faqQues) {
        setIsModelOpen(true);
        setSelectedItem(link);
      } else {
        navigate(`/artist-panel/kb-details?id=${link._id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate(`/kb-database`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeModal = useCallback(() => {
    setIsModelOpen(false); // Close the modal
    setSelectedItem(null); // Reset the selected item
  }, []);

  const handleKbDatabse = (item) => {
    if (isArtistProfile) {
      navigate(`/artist-panel/kb-details?id=${item._id}`);

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

  useEffect(() => {
    if (isLoading || faqLoading || KbLoding) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, faqLoading, KbLoding]);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" } // Final state
      );
    } else {
      gsap.to(modalRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: closeModal,
      });
    }
  }, [isModalOpen, closeModal]);

  const stripHtmlTags = (html) => html?.replace(/<[^>]*>/g, "").trim();

  if (loading) return <Loader />;

  return (
    <div className="mt-5">
      <div className="container mx-auto md:px-6 px-3">
        {newIncident && newIncident?.length > 0 ? (
          <div className="bg-[#E9E4DF] border-2 border-[#FF536B] p-4 mb-4 rounded-md mt-6">
            <h3 className="font-semibold">{t("Important Notice")}:</h3>
            {isLoading ? (
              <h1>{t("Loading...")}</h1>
            ) : (
              newIncident?.map((item, i: number) => (
                <p className="mt-1" key={i}>
                  {stripHtmlTags(item?.description)}
                </p>
              ))
            )}

            <h3 className="font-semibold mt-3">{t("Up Coming")}</h3>
            {isLoading ? (
              <h1>{t("Loading...")}</h1>
            ) : (
              incidentAfterSevenDay?.map((item, i) => (
                <p className="mt-1 flex items-center gap-3" key={i}>
                  {stripHtmlTags(item?.title)}
                  <span className="text-xs font-semibold">
                    {dayjs(item.initTime).format("MMM D, YYYY")}
                    {" " + "-" + " "}
                    {dayjs(item.endTime).format("MMM D, YYYY")}
                  </span>
                </p>
              ))
            )}
          </div>
        ) : null}
        <div className="flex sm:flex-row flex-col justify-between pb-5 w-full">
          <div className="md:w-[70%] w-full">
            <Button
              variant={{
                fontWeight: "400",
                thickness: "thick",
                fontSize: "base",
              }}
              className="bg-[#fe3d57] font-semibold rounded text-white mb-5"
            >
              {t("Help Center")}
            </Button>
            <Header variant={{ size: "2xl", theme: "dark", weight: "bold" }}>
              {t("How we can help you!")}
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
                  placeholder={t("Enter your question or keyword")}
                  className="w-[90%] outline-none"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {getSearchValue && (
                  <div
                    ref={closePopup}
                    className="search-list-container top-12 absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  >
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
                            className="py-1 px-2 border border-zinc-300 rounded-md mb-3 hover:bg-gray-200 cursor-pointer"
                          >
                            {item?.faqQues
                              ? `FAQ: ${item.faqQues}`
                              : `KB: ${item?.kbTitle}`}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-50">
                    <div
                      ref={modalRef}
                      className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
                    >
                      <h2 className="text-lg font-semibold mb-4">
                        {t("FAQ Details")}
                      </h2>
                      <p className="mb-4 flex flex-col gap-2">
                        <span className="text-md font-semibold leading-none tracking-tight">{`${t(
                          "Question"
                        )}: ${selectedItem?.faqQues}`}</span>
                        <span className="font-medium tracking-tight">{`${selectedItem?.faqAns}`}</span>
                      </p>
                      <button
                        onClick={() => {
                          gsap.to(modalRef.current, {
                            scale: 0.5,
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.in",
                            onComplete: closeModal,
                          });
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        {t("Close")}
                      </button>
                    </div>
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
                {t("Search")}
              </Button>
            </div>
          </div>

          <div className="sm:w-[30%] w-full">
            <img
              src={support}
              alt="support image"
              className="w-full border shadow rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#E9E4DF] pt-10 pb-5">
        <div className="container mx-auto md:px-6 px-3 mb-10">
          <Header
            variant={{ size: "2xl", weight: "bold", theme: "dark" }}
            className="mb-10 text-center"
          >
            {t("What can we assist you with today?")}
          </Header>
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-4">
            {kbData?.data?.map((item, index) => (
              <div
                onClick={() => handleKbDatabse(item)}
                key={index}
                className="bg-white flex p-4 border-2 border-[#FFD8DD] shadow-lg cursor-pointer"
              >
                <P
                  variant={{ size: "base", theme: "dark", weight: "normal" }}
                  className="ml-3 mt-1 font-bold text-sm"
                >
                  {item?.kbTitle}
                </P>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container pt-7 pb-5 m-auto px-6">
        <Header
          variant={{ size: "2xl", theme: "dark", weight: "bold" }}
          className="text-center mb-10"
        >
          {t("Popular Topics")}
        </Header>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 justify-between px-3 gap-5">
          {faqData?.data &&
            faqData?.data?.length > 0 &&
            faqData?.data?.map((item, index: number) => (
              <div
                onClick={() => handleFaq()}
                key={index}
                className="cursor-pointer"
              >
                <h3 className="font-semibold">{item.faqQues}</h3>
              </div>
            ))}
        </div>

        <div className="flex justify-center my-3">
          <button
            onClick={() => handleFaq()}
            className=" bg-black font-semibold text-white px-4 py-2 rounded-md "
          >
            {t("View All")}
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
              {t("Contact Us")}
            </Button>
            <Header
              variant={{ size: "2xl", weight: "bold", theme: "dark" }}
              className="mb-3"
            >
              {t("Didn’t find your answer.")}
            </Header>
            <Header
              variant={{ size: "2xl", weight: "bold", theme: "dark" }}
              className="mb-3"
            >
              {t("Contact with us")}
            </Header>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col px-8 md:flex-row bg-white py-8 pl-8">
              <div className="bg-[#d1dde9] w-[120px] h-[80px] p-2 flex items-center justify-center mr-5">
                <BsFillTicketPerforatedFill size="3em" />
              </div>
              <div>
                <Header
                  variant={{ size: "xl", theme: "dark", weight: "semiBold" }}
                  className="mb-3"
                >
                  {t("Submit a ticket")}
                </Header>
                <P
                  variant={{ size: "md", theme: "dark", weight: "normal" }}
                  className="mb-4 pr-10"
                >
                  {t("We are here to help you")}
                </P>
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <Button
                    onClick={handleSubmitButton}
                    variant={{
                      fontSize: "base",
                      fontWeight: "500",
                      theme: "dark",
                    }}
                    className="uppercase flex mt-8"
                  >
                    {t("SUBMIT TICKET")}
                    <img src={arrow} alt="arrow" className="mt-1 ml-2" />
                  </Button>

                  <Link
                    to={
                      isArtistProfile
                        ? "/artist-panel/ticket/tickets"
                        : "/tickets"
                    }
                    className="text-white mt-8 flex mx-auto w-fit bg-green-600 hover:bg-green-800 p-2 rounded font-semibold underline text-center justify-center"
                  >
                    {t("See Recent Ticket History")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
