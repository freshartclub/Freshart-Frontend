import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

const useGetPostArtistTicketReplyMutation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const usePostTicketReply = async (input: any) => {
    return await axiosInstance.post(
      `${ARTTIST_ENDPOINTS.PostTicket}/${id}`,
      input,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usePostTicketReply,
    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [`${ARTTIST_ENDPOINTS.GetArtistTicketsDetails}`],
        refetchType: "all",
      });
      // navigate("/artist-panel/ticket/tickets");
      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useGetPostArtistTicketReplyMutation;
