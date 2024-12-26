import { useMutation } from "@tanstack/react-query";

// import { paths } from 'src/routes/paths';
import axiosInstance from "../../components/utils/axios";
import { setToken } from "../../components/utils/tokenHelper";
import { useAppDispatch } from "../../store/typedReduxHooks";
import {
  setIsArtist,
  setIsArtProvider,
  setIsAuthorized,
  setProfile,
  updateUser,
} from "../../store/userSlice/userSlice";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";

let toastId: any;

async function login(input: any) {
  return axiosInstance.post(AUTH_ENDPOINTS.SignIn, input);
}
const useSigInInMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: login,

    onSuccess: async (res, input) => {
      setToken(res.data.token, input.rememberMe);

      dispatch(updateUser(res?.data?.user));
      dispatch(setIsAuthorized(true));

      console.log(res?.data?.user?.commercilization?.artProvider);

      dispatch(
        setIsArtProvider(res?.data?.user?.commercilization?.artProvider)
      );

      if (res.data.user.isActivated) {
        dispatch(setIsArtist(true));

        localStorage.setItem("profile", "artist");
        navigate("/artist-panel", { replace: true });
      } else {
        localStorage.setItem("profile", "user");
        navigate("/home", { replace: true });
      }

      toast.dismiss(toastId);
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useSigInInMutation;
