import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function postCheckOutOffer(values: any) {
  return axiosInstance.patch(`${ARTTIST_ENDPOINTS.addToCartOffer}/${values?.artworkId}` , values);
}

const useAddToCartOfferMutation = () => {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCheckOutOffer,
    onSuccess: async (res, input) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getUserOfferList],
        refetchType: "all",
      });
      toast.success(res?.data?.message)
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useAddToCartOfferMutation;
