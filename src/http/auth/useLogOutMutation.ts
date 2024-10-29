import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
// import { useAppDispatch } from "../../store/typedReduxHooks";
// import { setIsAuthorized, forgotPasswordUserId } from "../../store/userSlice/userSlice";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  removeUser,
  setIsArtist,
  setIsAuthorized,
} from "../../store/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/typedReduxHooks";

let toastId: any;

async function logOut() {
  const token = localStorage.getItem("auth_token");

  return await axiosInstance.patch(AUTH_ENDPOINTS.LogOut, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
const useLogOutMutation = () => {
  const isAuthorized = useAppSelector((state) => state.user.isArtist);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: logOut,

    onSuccess: async (res) => {
      dispatch(setIsAuthorized(false));

      dispatch(setIsArtist(false));

      toast.dismiss(toastId);
      toast.success(res.data.message);

      dispatch(removeUser());
      console.log("yes this is working");

      localStorage.removeItem("auth_token");

      navigate("/login", { replace: true });
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useLogOutMutation;
