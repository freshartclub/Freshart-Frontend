import { useEffect, useState } from "react";
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
import useSubscriptionMutation from "./http/useSubscriptionMutation";

const PriceAndPlan = () => {
  const [activePlans, setActivePlans] = useState({});
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllPlans();
  const { t } = useTranslation();
  const [hash, setHash] = useState("")

  const [orderData, setOrderData] = useState({
    hash: "",
    amount: "",
    currency: "",
    orderId: "",
    iso: "",
  });

  const generateTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");


    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  const { mutateAsync, isPending } = useSubscriptionMutation()

  useEffect(() => {
    if (orderData?.hash) {
      document.getElementById("hppFrame").submit();
    }
  }, [orderData.hash]);

  const handleCompleteForm = () => {
    navigate("/registration_process");
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


  console.log(activePlans)
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



  const getPlan = async (id: string) => {

    console.log(id);

    const genTime = await generateTimestamp()
    setHash(genTime)

    const newData = {
      planId: id,
      currency: "EUR",
      country: "Spain",
      time: genTime,
      type: "monthly"
    }

    mutateAsync(newData).then((res) => {
    
      setOrderData(
        {

          hash: res.data.data,
          orderId: res.data.orderId,
          amount: res.data.amount,
          currency: res.data.currency,
          iso: res.data.iso,
        }
      )
      // navigate('/payment_success')

    })



  };



  console.log(hash)
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
          <div className="flex lg:flex-row flex-col lg:gap-0 gap-2 lg:justify-between lg:items-center">
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

            <div className="flex items-center lg:w-max w-full justify-center gap-2">
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

          <form
            id="hppFrame"
            method="POST"
            action="https://hpp.sandbox.addonpayments.com/pay"
            target="hppFrame"
          >
            <>
              <input type="hidden" name="TIMESTAMP" value={hash} />
              <input
                type="hidden"
                name="MERCHANT_ID"
                value={import.meta.env.VITE_MERCHANT_ID}
              />
              <input
                type="hidden"
                name="ORDER_ID"
                value={orderData?.orderId}
              />
              <input type="hidden" name="AMOUNT" value={orderData.amount} />
              <input
                type="hidden"
                name="CURRENCY"
                value={orderData?.currency}
              />
              <input type="hidden" name="SHA1HASH" value={orderData?.hash} />
              <input type="hidden" name="AUTO_SETTLE_FLAG" value="1" />
              <input
                type="hidden"
                name="HPP_BILLING_CITY"
                value={"Jablpur"}
              />
              <input
                type="hidden"
                name="HPP_BILLING_COUNTRY"
                value={orderData?.iso}
              />
              <input
                type="hidden"
                name="HPP_BILLING_STREET1"
                value={"ghar"}
              />
              <input
                type="hidden"
                name="HPP_BILLING_POSTALCODE"
                value={"46415616"}
              />
              <input
                type="hidden"
                name="HPP_CUSTOMER_EMAIL"
                value={"sknjdnj@gmail.com"}
              />
              <input
                type="hidden"
                name="MERCHANT_RESPONSE_URL"
                value={`https://4b67-2409-40c4-5d-5bec-522-6a64-14cb-a7d9.ngrok-free.app/api/artist/get-response-data`}
              />
            </>

            <p className="text-[#9999] text-xs mb-1">
              If you have different shipping address then make sure fill
              that
            </p>
          </form>

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
               



                  {isPending ? (
                    <span>Wait....</span>
                  ) : (
                    <input
                      disabled={isPending}
                      className={` p-2 mt-5  w-full bg-black rounded-md text-center text-white cursor-pointer hover:bg-[#131313df]}`}
                      onClick={() => getPlan(defaultPlan?._id)}
                      type="button"
                      value={t("Get Started")}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {orderData?.hash ? (
          <div className="fixed inset-0 z-[99] flex justify-center items-center bg-black/50 backdrop-blur-sm">
            <iframe
              name="hppFrame"
              title="Hosted Payment Page"
              className="md:w-[40%] h-[500px] shadow-lg"
              style={{ border: "none" }}
            // src={hppUrl}
            ></iframe>
          </div>
        ) : null}
      </div>

    </div>
  );
};

export default PriceAndPlan;
