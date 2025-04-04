import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { useTranslation } from "react-i18next";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

async function createSubscription(input: any) {
  return await axiosInstance.post(
    ORDERS_ENDPOINTS.AgainSubscriptionPlans,
    input
  );
}

const useAgainSubscription = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: async (res) => {
      toast.success(t(res.data.message));
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default useAgainSubscription;
