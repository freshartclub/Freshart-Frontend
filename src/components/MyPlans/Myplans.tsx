import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";
import { useGetPlans } from "./http/useGetPlans";
import { FiExternalLink } from "react-icons/fi";
import useSetActivePlan from "./http/useSetActivePlan";
import useCancelSchedule from "./http/useCancelSchedule";
import { IoMdTrash } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";

type Plan = {
  _id: string;
  status: "active" | "cancelled" | "expired";
  type: "yearly" | "monthly";
  start_date: string;
  end_date: string;
  isScheduled: boolean;
  createdAt: string;
  isCurrActive: boolean;
  isCancelled: boolean;
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
  const [activeTab, setActiveTab] = useState<"all" | "active" | "cancelled" | "expired">("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [deletePop, setDeletePop] = useState({ isDelete: false, isConfirm: false, id: "", text: "" });

  const dark = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetPlans();
  const { mutateAsync: cancelMutate, isPending: cancelPending } = useCancelSchedule();

  const { mutateAsync, isPending } = useSetActivePlan();

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
      case "cancelled":
        return <FaClock size={15} className="text-yellow-500" />;
      case "expired":
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

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const openManageModal = (planId: string) => {
    setSelectedPlanId(planId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlanId(null);
  };

  const returnList = (planDesc: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(planDesc, "text/html");

    const listItems = Array.from(doc.querySelectorAll("li")).map((li) => li.textContent);
    return listItems;
  };

  const handleDeleteSchedule = () => {
    if (deletePop.text?.toLocaleLowerCase() !== "cancel") return alert("Please type cancel to confirm");
    cancelMutate(deletePop.id).then(() => {
      setDeletePop({ isDelete: false, isConfirm: false, id: "", text: "" });
    });
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>My Plans</h1>
          <p className={`${dark ? "text-gray-400" : "text-gray-600"}`}>View and manage your current and past subscription plans</p>
        </div>

        <div className={`mb-8 flex flex-wrap gap-2 border-b ${dark ? "border-gray-700" : "border-gray-200"}`}>
          {["all", "active", "cancelled", "expired"].map((tab) => (
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
          <div className={`text-center py-12 rounded-lg ${dark ? "bg-gray-800" : "bg-white"} shadow`}>
            <h3 className={`text-xl font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>No plans found</h3>
            <p className={`${dark ? "text-gray-400" : "text-gray-500"}`}>
              {activeTab === "all" ? "You don't have any plans yet." : `You don't have any ${activeTab.replace("_", " ")} plans.`}
            </p>
            <button
              onClick={() => navigate("/priceandplans")}
              className={`mt-4 px-4 py-2 rounded-lg font-medium ${
                dark ? "bg-[#EE1D52] hover:bg-[#ee1d51b9] text-white" : "bg-[#EE1D52] hover:bg-[#ee1d51b9] text-white"
              }`}
            >
              Browse Plans
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => {
              const isInfinite = plan.isScheduled;
              const nextMonthDate = isInfinite ? new Date(plan.start_date).setMonth(new Date(plan.start_date).getMonth() + 1) : null;
              const timeRemaining = plan.status === "active" ? calculateTimeRemaining(isInfinite ? nextMonthDate : plan.end_date) : null;
              return (
                <div
                  key={plan._id}
                  className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] ${dark ? "bg-gray-800" : "bg-white"}`}
                >
                  <div className={`p-6 border-b ${dark ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>Plan {plan.plan.planGrp}</h3>
                        <span className={`font-bold ${dark ? "text-white" : "text-gray-400"}`}>
                          {plan.plan.planName} ({plan.isScheduled ? "Recurring" : "One-time"})
                        </span>
                      </div>
                      <div
                        className={` ${
                          plan.isCancelled
                            ? "bg-red-100 px-1.5 py-1 rounded-full text-red-600"
                            : plan.status === "active"
                            ? "bg-green-100 px-1.5 py-1 rounded-full text-green-600"
                            : plan.status === "cancelled"
                            ? "bg-yellow-100 px-1.5 py-1 rounded-full text-yellow-600"
                            : "bg-red-100 px-1.5 py-1 rounded-full text-red-600"
                        } ${dark ? "text-opacity-90" : ""} flex items-center`}
                      >
                        {getStatusIcon(plan.status)}
                        <span className="ml-2 capitalize text-xs">{plan.isCancelled ? "Cancelled" : plan.status.replace("_", " ")}</span>
                      </div>
                    </div>

                    <div className={`mb-4 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                      <div className="flex justify-between mb-2">
                        <span>Purchased On:</span>
                        <span>{formatDateTime(plan.createdAt)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Plan Type:</span>
                        <span>{plan.type === "yearly" ? "Yearly" : "Monthly"}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Period:</span>
                        <span>
                          {plan.status == "expired" && plan.isCancelled == true
                            ? "Plan Cancelled"
                            : plan.status == "expired"
                            ? "Plan Expired"
                            : formatDate(plan.start_date) + " - "}

                          {plan.status == "expired" && plan.isCancelled == true
                            ? ""
                            : plan.status == "expired"
                            ? ""
                            : plan.end_date
                            ? formatDate(plan.end_date)
                            : "Untill Cancelled"}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Price:</span>
                        <span className="font-medium">€ {plan.type === "yearly" ? plan.plan.currentYearlyPrice : plan.plan.currentPrice}</span>
                      </div>
                    </div>

                    {plan.isScheduled ? (
                      <div
                        className={`mt-4 border p-2 justify-center rounded-lg ${
                          dark ? "text-gray-300 bg-gray-700 border-gray-600" : "text-gray-700 border-zinc-300 bg-gray-200"
                        } flex w-full items-center`}
                      >
                        {plan.status == "expired" && plan.isCancelled == true
                          ? "Plan Cancelled"
                          : plan.status == "expired"
                          ? "Plan Expired"
                          : `Automatically Renewed ${plan.type === "yearly" ? "Yearly" : "Monthly"}`}
                      </div>
                    ) : (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className={dark ? "dark:text-gray-400" : "text-gray-600"}>
                            Time remaining: {isInfinite ? "(Untill next billing)" : ""}
                          </span>
                          <span className={`font-medium ${timeRemaining.days < 7 ? "text-yellow-600" : "text-green-600"}`}>
                            {timeRemaining.expired ? "Expired" : `${timeRemaining.days} day${timeRemaining.days !== 1 ? "s" : ""}`}
                          </span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${dark ? "dark:bg-gray-700" : "bg-gray-200"}`}>
                          <div
                            className={`h-2 rounded-full ${
                              timeRemaining.expired ? "bg-red-500" : timeRemaining.days < 7 ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{
                              width: timeRemaining.expired ? "100%" : `${Math.min(100, 100 - (timeRemaining.days / 365) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h4 className={`font-medium mb-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>Features:</h4>
                    <ul className="space-y-3 flex-grow">
                      {returnList(plan.plan.planDesc) ? (
                        returnList(plan.plan.planDesc).map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className={`text-left text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-left">No Features</span>
                        </li>
                      )}
                    </ul>

                    {plan.status == "expired" || plan.status == "cancelled" ? null : (
                      <div className="flex mt-3 flex-wrap gap-3">
                        <>
                          {!plan?.isCurrActive ? (
                            <button
                              onClick={() => openManageModal(plan._id)}
                              className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                                dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                              }`}
                            >
                              <FiExternalLink /> Manage
                            </button>
                          ) : (
                            <span className={`flex-1 px-4 py-2 rounded-lg text-center font-medium bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white`}>
                              Currently Active
                            </span>
                          )}

                          {plan.isScheduled && !plan.isCurrActive && (
                            <button
                              onClick={() => setDeletePop({ isDelete: true, isConfirm: false, id: plan._id, text: "" })}
                              className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                                dark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                              }`}
                            >
                              <IoMdTrash /> Cancel
                            </button>
                          )}
                        </>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md mx-4 rounded-lg shadow-lg ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Manage Plan</h2>
              <p className="text-sm mb-4">
                Only one plan can be active at a time. Activating this plan will automatically deactivate any currently active plan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    mutateAsync(selectedPlanId).then(() => {
                      closeModal();
                      refetch();
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-[#EE1D52] hover:bg-[#EE1D52]/80 text-white rounded-lg font-medium"
                >
                  {isPending ? "Loading..." : "Set Active"}
                </button>
                <button
                  onClick={() => closeModal()}
                  className={`flex-1 px-4 py-2 ${
                    dark ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  } rounded-lg font-medium`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deletePop.isDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md mx-4 rounded-lg shadow-lg ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Cancel Subscription</h2>
              <p className="text-sm mb-4">
                This action cannot be undone. This will permanently cancel your subscription and stop the recurring payment related to this
                subscription.
              </p>

              {!deletePop.isConfirm ? (
                <>
                  <p className="text-sm mb-4">Are you sure you want to delete this subscription? The subscription will be cancelled.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setDeletePop((prev) => ({ ...prev, isConfirm: true }))}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Confirm Proceed
                    </button>
                    <button
                      onClick={() => setDeletePop({ isDelete: false, isConfirm: false, id: "", text: "" })}
                      className={`flex-1 px-4 py-2 ${
                        dark ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      } rounded-lg font-medium`}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm mb-2">
                    To confirm, please type <span className="font-bold">"cancel"</span> below:
                  </p>
                  <input
                    type="text"
                    value={deletePop.text}
                    onChange={(e) => setDeletePop((prev) => ({ ...prev, text: e.target.value }))}
                    className={`w-full px-3 py-2 mb-4 rounded-md border ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                    placeholder="Type 'cancel' to confirm"
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDeleteSchedule}
                      disabled={deletePop.text?.toLowerCase() !== "cancel" || cancelPending}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                        deletePop.text?.toLowerCase() !== "cancel"
                          ? dark
                            ? "bg-gray-700 text-gray-400 pointer-events-none cursor-not-allowed"
                            : "bg-gray-200 text-gray-400 pointer-events-none cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      {cancelPending ? (
                        "Deleting..."
                      ) : (
                        <>
                          <FaTrash /> Confirm Cancel
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setDeletePop((prev) => ({ ...prev, isConfirm: false, text: "" }))}
                      className={`flex-1 px-4 py-2 ${
                        dark ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      } rounded-lg font-medium`}
                    >
                      Go Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlans;
