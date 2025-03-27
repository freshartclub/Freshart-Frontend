import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../ui/Loader";
import arrow from "../assets/orderApprove1.png";
import print from "../assets/orderApprove2.png";
import { useGetOrderDetails } from "./https/useGetOrderDetails";
import usePostAcceptMutation from "./https/usePostAcceptMutation";
import OrderApproveDetails from "./OrderApproveDetails";
import { useTranslation } from "react-i18next";

const OrderApprove = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const naviagte = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading } = useGetOrderDetails(id);
  console.log(data);
  const { mutate, isPending } = usePostAcceptMutation();

  const handleAccept = () => {
    const newData = {
      id: id,
      status: "accept",
    };
    try {
      mutate(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    naviagte("/artist-panel/order");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="px-5 py-7 ">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex  gap-4 items-center mb-6">
          <div onClick={() => handleNavigate()} className="cursor-pointer">
            <img src={arrow} />
          </div>
          <div className="">
            <div className="font-bold text-[#1C252E] text-lg mb-2">
              {t("Order ID")} : #{data?.orderId}
            </div>

            <p className="text-[#919EAB] text-xs">
              {dayjs(data?.createdAt).format("MMMM D, YYYY , HH:mm:ss")}
            </p>
          </div>
        </div>
        <div className="flex gap-4 text-center ">
          <div className="">
            <img
              className="bg-[#919EAB14] py-4 px-6 rounded-md cursor-pointer "
              src={print}
            />
          </div>
          {data?.status === "accepted" ? null : (
            <div className="flex items-start gap-2">
              <button
                onClick={() => handleAccept()}
                className="bg-[#22C55E]
              py-2 px-2
             sm:py-3 sm:px-8 rounded-md text-white font-bold"
              >
                {isPending ? t("Accepting..") : t("Accept")}
              </button>

              <button
                className="bg-[#FF5630]
               py-2 px-2
             sm:py-3 sm:px-8 rounded-md  text-white font-bold "
              >
                {t("Reject")}
              </button>
            </div>
          )}
        </div>
      </div>

      <OrderApproveDetails data={data} />
    </div>
  );
};

export default OrderApprove;
