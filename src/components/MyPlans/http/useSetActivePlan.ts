import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

async function activePlan(id: string) {
  return axiosInstance.patch(`${ORDERS_ENDPOINTS.setActive}/${id}`);
}

const useSetActivePlan = () => {
  return useMutation({
    mutationFn: activePlan,

    onSuccess: async (res) => {
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useSetActivePlan;
