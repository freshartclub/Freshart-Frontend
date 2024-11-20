import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";

let toastId: any;

async function becomeAnArtist(input: any) {
  return await axiosInstance.post(AUTH_ENDPOINTS.BecomeAnArtist, input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useBecomeAnArtistMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: becomeAnArtist,

    onSuccess: async (res) => {
      console.log(res.data.id);
      toast.dismiss(toastId);
      toast.success(res.data.message, {
        duration: 5000,
      });

      // navigate("/home");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useBecomeAnArtistMutation;
