import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

async function cancelSchedule(id: string) {
  return axiosInstance.post(`${ORDERS_ENDPOINTS.cancelSchedule}/${id}`);
}

const useCancelSchedule = () => {
  return useMutation({
    mutationFn: cancelSchedule,

    onSuccess: async (res) => {
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res?.response.data.message);
    },
  });
};

export default useCancelSchedule;
