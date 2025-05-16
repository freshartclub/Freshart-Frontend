import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function offerCart(values: any) {
  return axiosInstance.patch(`${ARTTIST_ENDPOINTS.addToCartOffer}/${values?.artworkId}`, values);
}

const useAddToOfferCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: offerCart,
    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getUserOfferList],
      });
      toast.success(res?.data?.message);
    },
    onError: (res) => {
      toast.error(res?.response.data.message);
    },
  });
};

export default useAddToOfferCart;
