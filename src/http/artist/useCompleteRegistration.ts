import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/utils/axios";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { updateUser } from "../../store/slice/userSlice";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

async function completeRegistration(input: any) {
  return await axiosInstance.post(`${AUTH_ENDPOINTS.CompleteProfile}`, input.data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const useCompleteRegistration = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: completeRegistration,

    onSuccess: async (res) => {
      dispatch(updateUser(res.data.user));
      toast.success(t(res.data.message));
      navigate("/priceandplans", { replace: true });
    },
    onError: (error) => {
      toast.error(t(error.response?.data?.message));
    },
  });
};

export default useCompleteRegistration;
