import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function addToCart(values: any) {
  return await axiosInstance.post(`${ARTTIST_ENDPOINTS.makeAnOffer}/${values?.id}`, values);  
}

const useMakeAnOfferMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.makeAnOffer],    
        refetchType: "all",
      });
      toast.success(res.data?.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useMakeAnOfferMutation;
