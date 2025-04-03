import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function useinvite(input: any) {
  return await axiosInstance.post(`${ARTTIST_ENDPOINTS.CreateInvite}`, input);
}

const useCreateInviteMutation = (setInviteId) => {
  return useMutation({
    mutationFn: useinvite,

    onSuccess: async (res) => {
      setInviteId(res.data.data);
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useCreateInviteMutation;
