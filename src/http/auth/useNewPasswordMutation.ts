import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../../components/utils/axios";

import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";

let toastId: any;

async function newPassword(input: any) {
  console.log(input);
  return axiosInstance.post(
    `${AUTH_ENDPOINTS.ResetPassword}?id=${input.id}&token=${input.token}`,
    input
  );
}
const useNewPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: newPassword,

    onSuccess: async (res, input) => {
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/login");
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useNewPasswordMutation;
