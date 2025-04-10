import { useQuery } from "@tanstack/react-query";

import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import axiosInstance from "../../components/utils/axios";
import { useAppDispatch } from "../../store/typedReduxHooks";
import {
  forgotPasswordUserId,
  setIsArtist,
  setIsArtProvider,
  setIsAuthorized,
  updateUser,
} from "../../store/slice/userSlice";

const useCheckIsAuthorized = () => {
  const dispatch = useAppDispatch();

  async function getUser() {
    const { data } = await axiosInstance.get(AUTH_ENDPOINTS.CheckToken);
    return data;
  }

  const fetchUser = async () => {
    try {
      const res = await getUser();

      dispatch(updateUser(res.artist));
      dispatch(setIsAuthorized(true));

      dispatch(setIsArtProvider(res.artist?.commercilization?.artProvider));

      if (res.artist.isActivated) {
        dispatch(setIsArtist(true));
      }

      return res;
    } catch (error) {
      dispatch(setIsAuthorized(false));
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
