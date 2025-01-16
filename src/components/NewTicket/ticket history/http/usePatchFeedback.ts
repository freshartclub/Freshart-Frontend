import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

const usePatchFeedbackMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //   const [searchParams] = useSearchParams();
  //   const id = searchParams.get("id");

  const usePatchFeedback = async (input: any) => {
    return await axiosInstance.patch(
      `${ARTTIST_ENDPOINTS.PatchFeedback}/${input.id}`,
      input
    );
  };

  return useMutation({
    mutationFn: usePatchFeedback,
    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: ["like"],
        refetchType: "all",
      });

      toast.success(res.data.message, {
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default usePatchFeedbackMutation;
