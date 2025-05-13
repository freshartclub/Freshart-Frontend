import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

interface LikeUnlikeInput {
  id: string | number;
  action: string;
}

const useLikeUnlikeArtworkMutation = () => {
  const queryClient = useQueryClient();

  async function useLikeUnLike(input: LikeUnlikeInput) {
    return axiosInstance.patch(`${ARTTIST_ENDPOINTS.LikeUnlikeArtwork}/${input.id}`, { action: input.action });
  }

  return useMutation({
    mutationFn: useLikeUnLike,

    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.GetLikedArtWork],
        refetchType: "all",
      });
      toast.success(res.data.message);
    },
    onError: (res: any) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useLikeUnlikeArtworkMutation;
