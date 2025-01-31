import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

async function newPassword(input: any) {
  return axiosInstance.post(
    `${AUTH_ENDPOINTS.ResetPassword}?id=${input.id}&token=${input.token}`,
    input
  );
}
const useNewPasswordMutation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: newPassword,

    onSuccess: async (res, input) => {
      toast.success(t(res.data.message));
      navigate("/login");
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default useNewPasswordMutation;
