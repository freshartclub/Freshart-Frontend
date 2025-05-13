import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function unFollowArtist(id) {
  return await axiosInstance.patch(`${ARTTIST_ENDPOINTS.unFollowArtist}/${id}`);
}

const useArtistUnFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unFollowArtist,

    onSuccess: async (res) => {
       queryClient.invalidateQueries({
                  queryKey: [ARTTIST_ENDPOINTS.getFavArtist],
                  refetchType: "all",
                });
      toast.success(res.data.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useArtistUnFollowMutation;
