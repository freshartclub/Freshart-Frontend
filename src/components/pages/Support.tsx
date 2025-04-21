import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import support from "../../assets/security.png";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetAllIncidents } from "../NewTicket/ticket history/http/useGetAllIncidents";
import Loader from "../ui/Loader";
import useClickOutside from "../utils/useClickOutside";
import { useGetFaq } from "./http/useGetFaq";
import isBetween from "dayjs/plugin/isBetween";
import { useGetKbDataBase } from "./http/useGetKbDataBase";
import { FaExternalLinkAlt } from "react-icons/fa";

const Support = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dark = useAppSelector((state) => state.theme.mode);

  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const closePopup = useRef(null);
  useClickOutside(closePopup, () => setSearchValue(""));

  const { data: incidents, isLoading: incidentsLoading } = useGetAllIncidents();
  const { data: faqData, isLoading: faqLoading } = useGetFaq();
  const { data: kbData, isLoading: kbLoading } = useGetKbDataBase();

  dayjs.extend(isBetween);
  const now = dayjs();

  const todayIncidents = incidents?.filter((incident) => dayjs(incident.initTime).isBetween(now.startOf("day"), now.endOf("day"), null, "[]"));
  const upcomingIncidents = incidents?.filter((incident) => dayjs(incident.initTime)?.isBetween(now.add(7, "day").startOf("day")));

  const location = useLocation();
  const isArtistProfile = location.pathname.includes("/artist-panel");

  useEffect(() => {
    setLoading(incidentsLoading || faqLoading || kbLoading);
  }, [incidentsLoading, faqLoading, kbLoading]);

  const stripHtmlTags = (html) => html?.replace(/<[^>]*>/g, "").trim();

  const SectionHeader = ({ title, subtitle, dark }: { title: string; subtitle: string; dark: boolean }) => (
    <div className="mb-8">
      <span className={`w-fit p-3 px-4 font-bold bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white rounded`}>{title}</span>
      <p className={`text-2xl font-bold mt-6 ${dark ? "text-gray-400" : "text-black"}`}>{subtitle}</p>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-200`}>
      {todayIncidents?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg p-4 mb-6 ${dark ? "bg-gray-800 border-gray-700" : "bg-yellow-50 border-yellow-200"} border`}
        >
          <h3 className="font-semibold">{t("Important Notice")}:</h3>
          {todayIncidents.map((item, i) => (
            <p key={i} className="mt-1">
              {stripHtmlTags(item?.description)}
            </p>
          ))}

          {upcomingIncidents?.length > 0 && (
            <>
              <h3 className="font-semibold mt-3">{t("Upcoming")}</h3>
              {upcomingIncidents.map((item, i) => (
                <p key={i} className="mt-1 flex items-center gap-3">
                  {stripHtmlTags(item?.title)}
                  <span className="text-xs font-semibold">
                    {dayjs(item.initTime).format("MMM D, YYYY")} - {dayjs(item.endTime).format("MMM D, YYYY")}
                  </span>
                </p>
              ))}
            </>
          )}
        </motion.div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-2/3">
            <SectionHeader title={t("Help Center")} subtitle={t("How we can help you!")} dark={dark} />
            <div className={`flex items-center p-3 rounded-lg ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-zinc-300"} border shadow-sm`}>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={t("Enter your question or keyword")}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none ${
                    dark ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-gray-900"
                  }`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                {searchValue && (
                  <div
                    ref={closePopup}
                    className={`absolute z-10 w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto ${
                      dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    } border`}
                  >
                    <ul className="py-2">
                      {[...(faqData?.data || []), ...(kbData?.data || [])]
                        .filter((item) => (item?.faqQues || item?.kbTitle)?.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((item, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              if (item?.faqQues) {
                                setSelectedItem(item);
                                setIsModalOpen(true);
                              } else {
                                navigate(isArtistProfile ? `/artist-panel/kb-details?id=${item._id}` : `/kb-details?id=${item._id}`);
                              }
                              setSearchValue("");
                            }}
                            className={`px-4 py-2 cursor-pointer hover:bg-opacity-50 ${
                              dark ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item?.faqQues ? `FAQ: ${item.faqQues}` : `KB: ${item.kbTitle}`}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className={`ml-2 px-4 py-2 rounded-lg font-medium ${
                  dark ? "bg-primary-600 hover:bg-primary-700" : "bg-primary-500 hover:bg-primary-600"
                } text-white`}
              >
                {t("Search")}
              </button>
            </div>
          </div>

          <div className="md:w-1/3">
            <div className={`rounded-lg overflow-hidden shadow-md ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}>
              <img src={support} alt="Support" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className={`py-8 rounded-lg mb-8 ${dark ? "bg-gray-800" : "bg-[#E9E4DF]"}`}>
          <div className="container mx-auto px-4">
            <h2 className={`text-2xl font-bold text-center mb-8 ${dark ? "text-white" : "text-gray-800"}`}>
              {t("What can we assist you with today?")}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kbData?.data?.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(isArtistProfile ? `/artist-panel/kb-details?id=${item._id}` : `/kb-details?id=${item._id}`)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    dark ? "bg-gray-700 hover:bg-gray-600 border-gray-600" : "bg-white hover:bg-gray-50 border-gray-200"
                  } border shadow-sm`}
                >
                  <h3 className={`font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{item.kbTitle}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className={`text-2xl font-bold text-center mb-8 ${dark ? "text-white" : "text-gray-800"}`}>{t("Popular Topics")}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqData?.data?.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(isArtistProfile ? "/artist-panel/faq" : "/faq")}
                className={`p-4 rounded-lg cursor-pointer ${
                  dark ? "bg-gray-800 hover:bg-gray-700 border-gray-700" : "bg-white hover:bg-gray-50 border-gray-200"
                } border shadow-sm`}
              >
                <h3 className={`font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{item.faqQues}</h3>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate(isArtistProfile ? "/artist-panel/faq" : "/faq")}
              className={`px-6 py-2 rounded-lg font-medium ${
                dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {t("View All")} {t("Popular Topics")}
            </button>
          </div>
        </div>

        <div className={`py-12 rounded-lg ${dark ? "bg-gray-800" : "bg-[#E9E4DF]"}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className={`text-2xl font-bold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>{t("Didn’t find your answer")}</h2>
            <p className={`mb-8 ${dark ? "text-gray-400" : "text-gray-600"}`}>{t("Contact with us")}</p>

            <div className="max-w-3xl mx-auto">
              <div className={`p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 ${dark ? "bg-gray-700" : "bg-white"} shadow-lg`}>
                <div className={`p-4 rounded-lg ${dark ? "bg-gray-600" : "bg-blue-100"}`}>
                  <BsFillTicketPerforatedFill size={48} className={dark ? "text-blue-400" : "text-blue-600"} />
                </div>

                <div className="text-left flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>{t("Submit a ticket")}</h3>
                  <p className={`mb-4 ${dark ? "text-gray-400" : "text-gray-600"}`}>{t("We are here to help you")}</p>

                  <div className="flex flex-wrap gap-4 justify-between">
                    <button
                      onClick={() => navigate(isArtistProfile ? "/artist-panel/new_ticket" : "/new_ticket")}
                      className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white`}
                    >
                      {t("Submit Ticket")}
                      <FaExternalLinkAlt size={14} />
                    </button>

                    <button
                      onClick={() => navigate(isArtistProfile ? "/artist-panel/ticket/tickets" : "/tickets")}
                      className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white`}
                    >
                      {t("See Recent Ticket History")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`w-full max-w-2xl mx-4 rounded-lg shadow-lg ${dark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="p-6">
                <h2 className={`text-xl font-semibold mb-4 ${dark ? "text-white" : "text-gray-800"}`}>{t("FAQ Details")}</h2>

                <div className={`mb-6 p-4 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <h3 className={`font-semibold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>{t("Question")}:</h3>
                  <p className={dark ? "text-gray-300" : "text-gray-600"}>{selectedItem?.faqQues}</p>
                </div>

                <div className={`mb-6 p-4 rounded-lg ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <h3 className={`font-semibold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>{t("Answer")}:</h3>
                  <p className={dark ? "text-gray-300" : "text-gray-600"}>{selectedItem?.faqAns}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    {t("Close")}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Support;
