import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { useTranslation } from "react-i18next";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

async function getSubscription(input: any) {
  return await axiosInstance.post(ORDERS_ENDPOINTS.SubscriptionPlans, input);
}

const useSubscriptionMutation = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: getSubscription,
    onError: (error) => {
      console.log(error.response?.data?.message);
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default useSubscriptionMutation;
