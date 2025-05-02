import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { useTranslation } from "react-i18next";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

async function getSubscription(input: string) {
  return await axiosInstance.post(ORDERS_ENDPOINTS.SubscriptionPlans, {
    plan: input,
  });
}

const useSubscriptionMutation = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: getSubscription,
    onSuccess: async (res) => {
      toast.success(t(res.data.message));
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
      console.error(error)
    },
  });
};

export default useSubscriptionMutation;
