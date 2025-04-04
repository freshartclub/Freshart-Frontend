import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import exclamation from "../../assets/exclamation-thick.png";
import Button from "../ui/Button";
import DiscountCode from "../ui/DiscountCode";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import checkmark from "./assets/checkmark.png";
import CreditCardForm from "./CreditCardForm";
import { useGetAllPlans } from "./http/useGetAllPlans";
import useSubscriptionMutation from "./http/useSubscriptionMutation";
import { useCheckUserRef } from "./http/useCheckUserRef";
import AddAddress from "./AddAddress";
import { TiTickOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import useAgainSubscription from "./http/useAgainSubscription";

const PriceAndPlan = () => {
  const [activePlans, setActivePlans] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [userNum, setUserNum] = useState("");

  const navigate = useNavigate();
  const { data, isLoading } = useGetAllPlans();
  const { t } = useTranslation();

  const { mutateAsync, isPending } = useSubscriptionMutation();
  const { mutateAsync: againMutateAsync, isPending: againPending } =
    useAgainSubscription();
  const { data: checkRef } = useCheckUserRef();

  const handleNavigate = () => {
    navigate("/home");
    window.scrollTo(0, 0);
  };

  const groupPlans = (plans) => {
    const grouped = plans.reduce((acc, plan) => {
      const { planGrp } = plan;
      if (!acc[planGrp]) acc[planGrp] = [];
      acc[planGrp].push(plan);
      return acc;
    }, {});
    return grouped;
  };

  const handlePlanChange = (planGrp, selectedPlanName) => {
    const selectedPlan = groupPlans(data)[planGrp].find(
      (plan) => plan.planName === selectedPlanName
    );
    setActivePlans((prev) => ({
      ...prev,
      [planGrp]: selectedPlan,
    }));
  };

  if (isLoading) return <Loader />;

  if (!data || Object.keys(data).length === 0) {
    return (
      <P variant={{ size: "base", theme: "dark", weight: "semiBold" }}>
        {t("No Plan Found")}
      </P>
    );
  }

  const groupedPlans = groupPlans(data || []);

  const returnList = (planDesc) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(planDesc, "text/html");

    const listItems = Array.from(doc.querySelectorAll("li")).map(
      (li) => li.textContent
    );
    return listItems;
  };

  const openConfirmation = (plan) => {
    setSelectedPlan(plan);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleSubscribe = () => {
    if (!userNum) return toast.error("CVV is required");

    const input = {
      planId: selectedPlan._id,
      user_num: userNum,
    };

    againMutateAsync(input).then(() => {
      setUserNum("");
      setShowInput(false);
      setIsConfirmationOpen(false);
      window.location.reload();
    });
  };

  return (
    <div className="bg-[#F5F2EB] pt-10 pb-10 relative">
      <div className="container mx-auto md:px-6 px-3">
        <div className="md:w-[65%] w-full m-auto text-center">
          <Header
            variant={{ size: "3xl", theme: "dark", weight: "bold" }}
            className="md:text-3xl sm:text-2xl text-xl"
          >
            {t(
              "Become a certified Art lover, Subscribe plan and explore Fresh Art Club"
            )}
          </Header>
          <P
            variant={{ size: "md", theme: "dark", weight: "medium" }}
            className="mt-3"
          >
            {t("Choose the perfect plan for your business needs")}
          </P>
        </div>

        <div className="mt-8">
          <div className="flex lg:flex-row flex-col gap-4 lg:items-center">
            <DiscountCode />

            <Button
              variant={{
                fontSize: "md",
                theme: "dark",
                fontWeight: "bold",
                rounded: "full",
              }}
              className="w-full"
              onClick={handleNavigate}
            >
              {t(
                "I am not sure yet. Let me take a look, I will choose later on!"
              )}
            </Button>

            <div className="flex whitespace-nowrap items-center lg:w-max w-full justify-center gap-2">
              <img
                src={exclamation}
                alt="exclamation sign"
                className="w-[20px] h-[20px]"
              />
              <P variant={{ size: "small", theme: "dark", weight: "normal" }}>
                {t("Compare plans")}
              </P>
            </div>
          </div>

          <div className="grid mt-6 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 items-center justify-center w-full">
            {Object.entries(groupedPlans).map(([groupName, plans]) => {
              const defaultPlan = activePlans[groupName] || plans[0];

              return (
                <div
                  key={groupName}
                  className="border rounded-lg shadow-md p-6 bg-white w-full flex-wrap md:wrap-no"
                >
                  <img
                    src={`${imageUrl}/users/${defaultPlan?.planImg}`}
                    alt="Plan Image"
                    className="object-cover mb-4 w-[90px] h-[90px]"
                  />
                  <Header
                    variant={{ size: "xl", theme: "dark", weight: "bold" }}
                    className="text-left my-4"
                  >
                    Plan {groupName}
                  </Header>
                  <div className="text-center mb-4 flex">
                    <Header
                      variant={{ size: "2xl", theme: "dark", weight: "bold" }}
                    >
                      ${defaultPlan?.standardPrice}
                    </Header>
                    <P
                      variant={{
                        size: "small",
                        theme: "dark",
                        weight: "medium",
                      }}
                      className="mt-3 ml-1"
                    >
                      {t("/month")}
                    </P>
                  </div>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                    value={defaultPlan?.planName}
                    onChange={(e) =>
                      handlePlanChange(groupName, e.target.value)
                    }
                  >
                    {plans.map((plan) => (
                      <option key={plan.planName} value={plan.planName}>
                        {plan.planName}
                      </option>
                    ))}
                  </select>
                  <ul className="space-y-2 md:min-h-auto min-h-[150px]">
                    {returnList(defaultPlan.planDesc) ? (
                      returnList(defaultPlan.planDesc).map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <img
                            src={checkmark}
                            alt="tick"
                            className="w-5 h-5 mr-2"
                          />
                          <span className="text-left">{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="flex items-center">
                        <img
                          src={checkmark}
                          alt="tick"
                          className="w-5 h-5 mr-2"
                        />
                        <span className="text-left">No Features</span>
                      </li>
                    )}
                  </ul>

                  <input
                    className={`p-2 mt-5 w-full bg-black rounded-md text-center text-white cursor-pointer hover:bg-[#131313df]}`}
                    onClick={() => openConfirmation(defaultPlan)}
                    type="button"
                    value={t("Get Started")}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {isConfirmationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-y-auto scrollbar mx-4">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Confirm Your Subscription
                  </h2>
                  <button
                    onClick={closeConfirmation}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {selectedPlan && (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <img
                        src={`${imageUrl}/users/${selectedPlan?.planImg}`}
                        alt="Plan"
                        className="w-16 h-16 mr-4 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-lg">
                          {selectedPlan.planName}
                        </h3>
                        <p className="text-gray-600">
                          ${selectedPlan.standardPrice}/month
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-b border-gray-200 py-4">
                      <h4 className="font-semibold mb-2">Plan Features:</h4>
                      <ul className="space-y-2">
                        {returnList(selectedPlan.planDesc)?.map(
                          (feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg flex items-start">
                      <svg
                        className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-yellow-800">
                        To Subscribe to the plan, we need to save your card
                        details. Please note that your sensitive information
                        will be secure with us.
                      </p>
                    </div>

                    <div
                      className={`${
                        checkRef.data == false ? "bg-red-50" : "bg-green-50"
                      } p-3 rounded-lg flex items-start`}
                    >
                      {checkRef.data == false ? (
                        <svg
                          className={`h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <TiTickOutline className="h-5 w-5 text-green-800 mr-2" />
                      )}

                      {checkRef.data == false ? (
                        <div>
                          <p className="text-sm text-red-800 mt-1">
                            We found that you don&apos;t have any basic
                            information saved with us. Please enter your basic
                            information and add yourself as a payer.
                          </p>
                        </div>
                      ) : checkRef.status == "active" ? (
                        <div>
                          <p className="text-sm text-green-800">
                            You already have an active subscription plan.
                          </p>
                        </div>
                      ) : checkRef.status == "inactive" &&
                        checkRef?.store == true ? (
                        <div>
                          <p className="text-sm text-green-800">
                            You dont have an active subscription plan. Subscribe
                            to a plan and get started.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-green-800">
                            You already have a payment method saved with us. But
                            your payment method is not active.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg flex items-start">
                      <svg
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-blue-800">
                        By confirming, you agree to our Terms of Service and
                        Privacy Policy. Your subscription will automatically
                        renew each month until canceled.
                      </p>
                    </div>
                  </div>
                )}

                {showInput ? (
                  <div className="mt-4 flex flex-col w-full gap-2">
                    <div className="bg-blue-50 p-3 rounded-lg flex items-start">
                      <svg
                        className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-blue-800">
                        In accordance with PCI compliance regulations, storing
                        the security code (CVN, CVV) is not permitted. So Please
                        enter your CVV to process your transaction
                      </p>
                    </div>
                    <input
                      type="text"
                      value={userNum}
                      onChange={(e) =>
                        setUserNum(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      placeholder="•••"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={4}
                    />
                    <div className="flex w-full gap-2">
                      <button
                        onClick={() => {
                          closeConfirmation();
                          setUserNum("");
                          setShowInput(false);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      {againPending ? (
                        <button
                          disabled={againPending}
                          className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center duration-200"
                        >
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {t("Processing...")}
                        </button>
                      ) : (
                        <button
                          onClick={handleSubscribe}
                          className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={closeConfirmation}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    {checkRef.data == false ? (
                      <button
                        onClick={() => {
                          closeConfirmation();
                          setShowAddress(true);
                        }}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center"
                      >
                        Add Payer
                      </button>
                    ) : checkRef.status == "active" ? (
                      <button className="px-4 py-2 pointer-events-none cursor-not-allowed opacity-65 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center">
                        Already Subscribed
                      </button>
                    ) : checkRef.status == "inactive" &&
                      checkRef?.store == true ? (
                      <button
                        onClick={() => {
                          setShowInput(true);
                        }}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center"
                      >
                        Subscribe To Plan
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          closeConfirmation();
                          setShowCreditCardForm(true);
                        }}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Create & Proceed to Payment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showCreditCardForm && (
          <CreditCardForm
            onClose={() => setShowCreditCardForm(false)}
            planId={selectedPlan._id}
            isPending={isPending}
            onSubmit={(cardDetails) => {
              mutateAsync(cardDetails).then(() => {
                setShowCreditCardForm(false);
                window.location.reload();
              });
            }}
          />
        )}
        {showAddress && (
          <AddAddress
            onClose={() => setShowAddress(false)}
            data={checkRef?.billing ? checkRef.billing : null}
          />
        )}
      </div>
    </div>
  );
};

export default PriceAndPlan;
