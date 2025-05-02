import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import toast from "react-hot-toast";

async function postCheckSubs(input: any) {
  return axiosInstance.post(`${ORDERS_ENDPOINTS.checkSubscription}`, input);
}

const useCheckSubscription = () => {
  return useMutation({
    mutationFn: postCheckSubs,

    onSuccess: async (res, input) => {
      console.log("success");
    },
    onError: (res) => {
      toast.error(res.response.data.message);
      console.log(res)
    },
  });
};

export default useCheckSubscription;
