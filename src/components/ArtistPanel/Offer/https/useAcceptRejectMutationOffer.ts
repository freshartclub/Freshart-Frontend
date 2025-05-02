import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";



async function AcceptRejectMutationOffer(input) {
    console.log(input)
  return await axiosInstance.patch(`${ARTTIST_ENDPOINTS.acceptReject}/${input?.id}`, input);
}

const useAcceptRejectMutationOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AcceptRejectMutationOffer,

    onSuccess: async (res) => {
      toast.success( res.message),
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getOfferList],
        refetchType: "all",
      });
    },
    
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useAcceptRejectMutationOffer;
