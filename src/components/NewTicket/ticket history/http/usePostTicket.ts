import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

let toastId: any;

async function usePostTicket(input: any) {
  return await axiosInstance.post(ARTTIST_ENDPOINTS.RaiseTicket, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useGetPostArtistTicketMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: usePostTicket,

    onSuccess: async (res) => {
      navigate("/artist-panel/ticket/tickets");
      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useGetPostArtistTicketMutation;
