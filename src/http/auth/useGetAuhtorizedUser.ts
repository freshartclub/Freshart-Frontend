import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../components/utils/axios";
import { setIsArtist, setIsArtProvider, setIsAuthorized, updateUser } from "../../store/slice/userSlice";
import { useAppDispatch } from "../../store/typedReduxHooks";
import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";

async function getUser() {
  const { data } = await axiosInstance.get(AUTH_ENDPOINTS.CheckToken);
  return data;
}

const useCheckIsAuthorized = () => {
  const dispatch = useAppDispatch();
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
