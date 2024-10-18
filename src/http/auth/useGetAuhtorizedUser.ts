import { useQuery } from "@tanstack/react-query";

import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import axiosInstance from "../../components/utils/axios";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { setIsAuthorized, updateUser } from "../../store/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

async function getUser() {
  const { data } = await axiosInstance.get(AUTH_ENDPOINTS.CheckToken);
  return data;
}

const useCheckIsAuthorized = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await getUser();

      dispatch(updateUser(res.artist));
      dispatch(setIsAuthorized(true));
      navigate("/home");

      return res;
    } catch (error) {
      dispatch(setIsAuthorized(false));
      navigate("/");
      return error;
    }
  };
  return useQuery({
    queryKey: [AUTH_ENDPOINTS.CheckToken],
    queryFn: fetchUser,
    enabled: true,
  });
};

export default useCheckIsAuthorized;
