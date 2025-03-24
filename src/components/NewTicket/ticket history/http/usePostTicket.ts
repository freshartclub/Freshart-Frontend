import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";
import { useAppSelector } from "../../../../store/typedReduxHooks";
import { useTranslation } from "react-i18next";

async function usePostTicket(input: any) {
  return await axiosInstance.post(ARTTIST_ENDPOINTS.RaiseTicket, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useGetPostArtistTicketMutation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);

  return useMutation({
    mutationFn: usePostTicket,

    onSuccess: async (res) => {
      if (res.data?.isArtDetail == "true") {
        return toast.success(t(res.data.message), {
          duration: 3000,
        });
      }

      if (user?.isActivated) {
        navigate("/artist-panel/ticket/tickets");
        localStorage.setItem("profile", "artist");
      } else {
        navigate("/tickets");
      }
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default useGetPostArtistTicketMutation;
