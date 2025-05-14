import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

async function acceptOffer(input: any) {
  return await axiosInstance.post(`${ARTTIST_ENDPOINTS.acceptReject}/${input?.id}`, input);
}

const useAcceptOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptOffer,

    onSuccess: async (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getArtistOfferList],
      });
    },

    onError: (error) => {
      toast.error(error?.response.data?.message);
    },
  });
};

export default useAcceptOffer;
