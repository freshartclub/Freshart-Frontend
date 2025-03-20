import { useState } from "react";
import { useNavigate } from "react-router-dom";
import exclamation from "../../assets/exclamation-thick.png";
import Button from "../ui/Button";
import DiscountCode from "../ui/DiscountCode";
import Header from "../ui/Header";
import Loader from "../ui/Loader";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";
import checkmark from "./assets/checkmark.png";
import { useGetAllPlans } from "./http/useGetAllPlans";
import { useTranslation } from "react-i18next";

const PriceAndPlan = () => {
  const [activePlans, setActivePlans] = useState({});
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllPlans();
  const { t } = useTranslation();

  const redirectToPaymentPage = () => {
    navigate("/premium_payment");
  };

  const handleCompleteForm = () => {
    navigate("/registration_process");
    window.scrollTo(0, 0);
  };

  // Function to group plans by planGrp
  const groupPlans = (plans) => {
    const grouped = plans.reduce((acc, plan) => {
      const { planGrp } = plan;
      if (!acc[planGrp]) acc[planGrp] = [];
      acc[planGrp].push(plan);
      return acc;
    }, {});
    return grouped;
  };

  // Handle select change
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

  return (
    <div className="bg-[#F5F2EB] pt-10 pb-10">
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

        <div className="my-8">
          <div className="flex justify-between items-center">
            <DiscountCode />

            <Button
              variant={{
                fontSize: "md",
                theme: "dark",
                fontWeight: "bold",
                rounded: "full",
              }}
              onClick={handleCompleteForm}
            >
              {t(
                "I am not sure yet. Let me take a look, I will choose later on!"
              )}
            </Button>

            <div className="flex items-center gap-2">
              <img
                src={exclamation}
                alt="exclamation sign"
                className="w-[26px] h-[26px]"
              />
              <P variant={{ size: "md", theme: "dark", weight: "normal" }}>
                {t("Compare plans")}
              </P>
            </div>
          </div>

          <div className="flex gap-5 items-center justify-center w-full">
            {Object.entries(groupedPlans).map(([groupName, plans]) => {
              const defaultPlan = activePlans[groupName] || plans[0];
              return (
                <div
                  key={groupName}
                  className="border rounded-lg shadow-md p-6 bg-white w-full flex-wrap md:wrap-no my-6"
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
                  <Button
                    variant={{
                      fontSize: "md",
                      theme: "dark",
                      fontWeight: "500",
                      rounded: "full",
                    }}
                    className="flex items-center mt-6 w-full justify-center hover:bg-transparent border-2 hover:border-[#102031] hover:text-[#102031]"
                    onClick={redirectToPaymentPage}
                  >
                    {t("Get Started")}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceAndPlan;
