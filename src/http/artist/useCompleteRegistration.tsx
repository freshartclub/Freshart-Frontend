import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/typedReduxHooks";

let toastId: any;

async function completeRegistration(input: any) {
  return await axiosInstance.post(
    `${AUTH_ENDPOINTS.CompleteProfile}/${input.userId}`,
    input.data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

const useCompleteRegistration = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: completeRegistration,

    onSuccess: async (res) => {
      console.log(res.data.id);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
};

export default useCompleteRegistration;
