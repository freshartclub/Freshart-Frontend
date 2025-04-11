import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/utils/axios";
import { setToken } from "../../components/utils/tokenHelper";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { setIsArtist, setIsArtProvider, setIsAuthorized, updateUser } from "../../store/slice/userSlice";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useTranslation } from "react-i18next";

async function login(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.SignIn, input);
}

const useSigInInMutation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: login,

    onSuccess: async (res, input) => {
      setToken(res.data.token, input.rememberMe);
      dispatch(updateUser(res?.data?.user));
      dispatch(setIsAuthorized(true));
      dispatch(setIsArtProvider(res?.data?.user?.commercilization?.artProvider));

      if (res.data.user.isActivated) {
        dispatch(setIsArtist(true));

        localStorage.setItem("profile", "artist");
        navigate("/artist-panel", { replace: true });
        window.location.reload();
      } else {
        localStorage.setItem("profile", "user");
        navigate("/home", { replace: true });
        window.location.reload();
      }

      toast.success(t(res.data.message));
    },
    onError: (res) => {
      toast.error(t(res.response.data.message));
    },
  });
};

export default useSigInInMutation;
