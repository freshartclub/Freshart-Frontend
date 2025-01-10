import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";
import { useAppSelector } from "../../../../store/typedReduxHooks";

let toastId: any;

async function usePostTicket(input: any) {
  console.log(input);
  return await axiosInstance.post(ARTTIST_ENDPOINTS.RaiseTicket, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useGetPostArtistTicketMutation = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  return useMutation({
    mutationFn: usePostTicket,

    onSuccess: async (res) => {
      if (user?.isActivated) {
        navigate("/artist-panel/ticket/tickets");
        localStorage.setItem("profile", "artist");
      } else {
        navigate("/tickets");
      }
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
