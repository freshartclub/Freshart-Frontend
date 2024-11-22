import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import { useNavigate } from "react-router-dom";

async function postCheckOut(input: any) {
  return axiosInstance.post(`${ORDERS_ENDPOINTS.PostOrders}`, input);
}
const usePostCheckOutMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postCheckOut,

    onSuccess: async (res, input) => {
      navigate("/cart_success_page");
      console.log(res.data);
    },
    onError: (res) => {
      //   toast.error(res.response.data.message);
    },
  });
};

export default usePostCheckOutMutation;
