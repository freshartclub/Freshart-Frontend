import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import toast from "react-hot-toast";

async function addNewCard(data: string) {
  return await axiosInstance.post(ORDERS_ENDPOINTS.addCard, { data: data });
}

const useAddNewCard = () => {
  return useMutation({
    mutationFn: addNewCard,

    onSuccess: async (res) => {
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res?.response.data.message);
    },
  });
};

export default useAddNewCard;
