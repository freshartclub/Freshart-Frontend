import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function followArtist(id) {
  return await axiosInstance.post(`${ARTTIST_ENDPOINTS.followArtist}/${id}`);
}

const useArtistFollowMutation = () => {

   
  return useMutation({
    mutationFn: followArtist,

    onSuccess: async (res) => {
       
      toast.success(res.data.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useArtistFollowMutation;
