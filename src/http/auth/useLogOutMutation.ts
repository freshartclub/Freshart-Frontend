import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
// import { useAppDispatch } from "../../store/typedReduxHooks";
// import { setIsAuthorized, forgotPasswordUserId } from "../../store/userSlice/userSlice";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { removeUser } from "../../store/userSlice/userSlice";
import { useAppDispatch } from "../../store/typedReduxHooks";

let toastId: any;

async function logOut(input: any) {
  return await axiosInstance.post(AUTH_ENDPOINTS.LogOut, input);
}
const useLogOutMuttion = () => {
  // const [searchParam,setSearchParam] = useSearchParams();

  // const id = searchParam.get('id');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: logOut,

    onSuccess: async (res, input) => {
      console.log(res.data.id);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      dispatch(removeUser());
      localStorage.removeItem("auth_token");
      navigate("/login");
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default useLogOutMuttion;
