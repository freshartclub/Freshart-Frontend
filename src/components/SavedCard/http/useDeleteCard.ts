import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import toast from "react-hot-toast";

async function deleteCard() {
  return axiosInstance.delete(ORDERS_ENDPOINTS.deleteCard);
}

const useDeleteCard = () => {
  return useMutation({
    mutationFn: deleteCard,

    onSuccess: async (res) => {
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res?.response.data.message);
    },
  });
};

export default useDeleteCard;
