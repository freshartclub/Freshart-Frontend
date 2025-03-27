import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

let toastId: any;

async function useinvite(input: any) {
  return await axiosInstance.post(`${ARTTIST_ENDPOINTS.CreateInvite}`, input);
}

const useCreateInviteMutation = () => {


  return useMutation({
    mutationFn: useinvite,

    onSuccess: async (res) => {
      toast.dismiss(toastId);
      toast.success(res.data.message, {
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useCreateInviteMutation;
