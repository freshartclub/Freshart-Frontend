import { useMutation } from "@tanstack/react-query";

// import { paths } from 'src/routes/paths';
import axiosInstance from "../../components/utils/axios";
import { setToken } from "../../components/utils/tokenHelper";
import { useAppDispatch } from "../../store/typedReduxHooks";
import {
  setIsArtist,
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
      console.log("response", res.data);
      dispatch(updateUser(res.data.user));
      console.log("isautorized");

      dispatch(setIsAuthorized(true));

      if (res.data.user.isActivated) {
        console.log(res.data.user.isActivated);
        dispatch(setIsArtist(true));
        console.log("user event dispatched ");

        localStorage.setItem("profile", "artist");
        console.log("user proffile is setup");
        navigate("/artist-panel", { replace: true });
      } else {
        localStorage.setItem("profile", "user");
        console.log("artis profile is set");
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
