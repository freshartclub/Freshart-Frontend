import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaMoon,
  FaSun,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetPlans } from "./http/useGetPlans";
import { useAppSelector } from "../../store/typedReduxHooks";

type Plan = {
  _id: string;
  status: "active" | "not_started" | "inactive";
  type: "yearly" | "monthly";
  start_date: string;
  end_date: string;
  isScheduled: boolean;
  createdAt: string;
  plan: {
    currentPrice: number;
    currentYearlyPrice: number;
    planDesc: string;
    planGrp: string;
    planImg: string;
    planName: string;
  };
};

const MyPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "not_started" | "inactive"
  >("all");

  const dark = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const { data, isLoading } = useGetPlans();

  useEffect(() => {
    if (data) {
      setPlans(data);
    }
  }, [data]);

  const calculateTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, expired: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { days, expired: false };
  };

  const filteredPlans = plans.filter((plan) => {
    if (activeTab === "all") return true;
    return plan.status === activeTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FaCheckCircle size={15} className="text-green-500" />;
      case "not_started":
        return <FaClock size={15} className="text-yellow-500" />;
      case "inactive":
        return <FaTimesCircle size={15} className="text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const returnList = (planDesc: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(planDesc, "text/html");

    const listItems = Array.from(doc.querySelectorAll("li")).map(
      (li) => li.textContent
    );
    return listItems;
  };

  return (
    <div
      className={`min-h-screen ${
        dark ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              dark ? "text-white" : "text-gray-800"
            }`}
          >
            My Plans
          </h1>
          <p className={`${dark ? "text-gray-400" : "text-gray-600"}`}>
            View and manage your current and past subscription plans
          </p>
        </div>

        <div
          className={`mb-8 flex flex-wrap gap-2 border-b ${
            dark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {["all", "active", "not_started", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium capitalize rounded-t-lg transition-colors ${
                activeTab === tab
                  ? dark
                    ? "bg-gray-700 text-white border-b-2 border-[#EE1D52]"
                    : "bg-white text-[#EE1D52] border-b-2 border-[#EE1D52]"
                  : dark
                  ? "text-gray-400 hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab === "all" ? "All Plans" : tab.replace("_", " ")}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div
            className={`text-center py-12 rounded-lg ${
              dark ? "bg-gray-800" : "bg-white"
            } shadow`}
          >
            <h3
              className={`text-xl font-medium mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              No plans found
            </h3>
            <p className={`${dark ? "text-gray-400" : "text-gray-500"}`}>
              {activeTab === "all"
                ? "You don't have any plans yet."
                : `You don't have any ${activeTab.replace("_", " ")} plans.`}
            </p>
            <button
              onClick={() => navigate("/priceandplans")}
              className={`mt-4 px-4 py-2 rounded-lg font-medium ${
                dark
                  ? "bg-[#EE1D52] hover:bg-[#ee1d51b9] text-white"
                  : "bg-[#EE1D52] hover:bg-[#ee1d51b9] text-white"
              }`}
            >
              Browse Plans
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => {
              const timeRemaining =
                plan.status === "active"
                  ? calculateTimeRemaining(plan.end_date)
                  : null;
              return (
                <div
                  key={plan._id}
                  className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] ${
                    dark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div
                    className={`p-6 border-b ${
                      dark ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <h3
                          className={`text-xl font-bold ${
                            dark ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Plan {plan.plan.planGrp}
                        </h3>
                        <span
                          className={`font-bold ${
                            dark ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {plan.plan.planName}
                        </span>
                      </div>
                      <div
                        className={` ${
                          plan.status === "active"
                            ? "bg-green-100 px-1.5 py-1 rounded-full text-green-600"
                            : plan.status === "not_started"
                            ? "bg-yellow-100 px-1.5 py-1 rounded-full text-yellow-600"
                            : "bg-red-100 px-1.5 py-1 rounded-full text-red-600"
                        } ${dark ? "text-opacity-90" : ""} flex items-center`}
                      >
                        {getStatusIcon(plan.status)}
                        <span className="ml-2 capitalize text-xs">
                          {plan.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`mb-4 ${
                        dark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <div className="flex justify-between mb-2">
                        <span>Period:</span>
                        <span>
                          {formatDate(plan.start_date)} -{" "}
                          {formatDate(plan.end_date)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Price:</span>
                        <span className="font-medium">
                          €{" "}
                          {plan.type === "yearly"
                            ? plan.plan.currentYearlyPrice
                            : plan.plan.currentPrice}
                        </span>
                      </div>
                      {/* {plan.renewalDate && (
                      <div className="flex justify-between">
                        <span>Renews:</span>
                        <span>{formatDate(plan.renewalDate)}</span>
                      </div>
                    )} */}
                    </div>

                    {plan.status === "active" && timeRemaining ? (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span
                            className={
                              dark ? "dark:text-gray-400" : "text-gray-600"
                            }
                          >
                            Time remaining:
                          </span>
                          <span
                            className={`font-medium ${
                              timeRemaining.days < 7
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {timeRemaining.expired
                              ? "Expired"
                              : `${timeRemaining.days} day${
                                  timeRemaining.days !== 1 ? "s" : ""
                                }`}
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-2 ${
                            dark ? "dark:bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`h-2 rounded-full ${
                              timeRemaining.expired
                                ? "bg-red-500"
                                : timeRemaining.days < 7
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: timeRemaining.expired
                                ? "100%"
                                : `${Math.min(
                                    100,
                                    100 - (timeRemaining.days / 365) * 100
                                  )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <div className="flex flex-col text-sm">
                          <span
                            className={
                              dark ? "dark:text-gray-400" : "text-gray-600"
                            }
                          >
                            Time remaining: (Not Started)
                          </span>
                          <div
                            className={`w-full mt-2 rounded-full h-2 ${
                              dark ? "dark:bg-gray-700" : "bg-gray-200"
                            }`}
                          >
                            <div
                              className={`h-2 rounded-full bg-gray-500`}
                              style={{
                                width: "100%",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h4
                      className={`font-medium mb-3 ${
                        dark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Features:
                    </h4>
                    <ul className="space-y-3 flex-grow">
                      {returnList(plan.plan.planDesc) ? (
                        returnList(plan.plan.planDesc).map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            <span
                              className={`text-left text-sm ${
                                dark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-left">No Features</span>
                        </li>
                      )}
                    </ul>

                    {/* <div className="flex flex-wrap gap-3">
                    {plan.status === "active" && (
                      <>
                        <button
                          onClick={() => handleManage(plan._id)}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                            dark
                              ? "bg-gray-700 hover:bg-gray-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                        >
                          <FiExternalLink /> Manage
                        </button>
                        <button
                          onClick={() => handleUpgrade(plan._id)}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                            dark
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          Upgrade
                        </button>
                      </>
                    )}
                    {plan.status === "not_started" && (
                      <button
                        onClick={() => handleManage(plan._id)}
                        className={`w-full px-4 py-2 rounded-lg font-medium ${
                          dark
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        Activate Plan
                      </button>
                    )}
                    {plan.status === "inactive" && (
                      <button
                        onClick={() => handleUpgrade(plan._id)}
                        className={`w-full px-4 py-2 rounded-lg font-medium ${
                          dark
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        Renew Plan
                      </button>
                    )}
                  </div> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlans;
