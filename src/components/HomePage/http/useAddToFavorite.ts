import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function addToFavorite(input: any) {
  return axiosInstance.post(
    `${ARTTIST_ENDPOINTS.addToFavorite}/${input.id}`,
    input
  );
}

const useAddToFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToFavorite,

    onSuccess: async (res, input) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: [ARTTIST_ENDPOINTS.getFavoriteList],
        refetchType: "all",
      });
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useAddToFavorite;
