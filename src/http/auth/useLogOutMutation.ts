import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/utils/axios";
import { useAppDispatch } from "../../store/typedReduxHooks";
import {
  removeUser,
  setIsArtist,
  setIsAuthorized,
  updateUser,
} from "../../store/slice/userSlice";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

async function logOut() {
  const token = localStorage.getItem("auth_token");

  return await axiosInstance.patch(AUTH_ENDPOINTS.LogOut, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
const useLogOutMutation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: logOut,

    onSuccess: async (res) => {
      dispatch(setIsAuthorized(false));

      dispatch(setIsArtist(false));
      dispatch(updateUser(null));

      toast.success(t(res.data.message));

      dispatch(removeUser());

      localStorage.removeItem("auth_token");
      localStorage.removeItem("profile");

      navigate("/login", { replace: true });
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default useLogOutMutation;
