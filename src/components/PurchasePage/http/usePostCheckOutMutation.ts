import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import toast from "react-hot-toast";

async function postCheckOut(input: any) {
  return axiosInstance.post(`${ORDERS_ENDPOINTS.PostOrders}`, input);
}

const usePostCheckOutMutation = () => {
  return useMutation({
    mutationFn: postCheckOut,

    onSuccess: async (res, input) => {
      console.log("success");
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default usePostCheckOutMutation;
