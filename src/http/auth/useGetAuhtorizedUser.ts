import { useQuery } from "@tanstack/react-query";

import { AUTH_ENDPOINTS } from "../apiEndPoints/Auth";
import axiosInstance from "../../components/utils/axios";
import { useAppDispatch } from "../../store/typedReduxHooks";
import {
  setIsArtist,
  setIsArtProvider,
  setIsAuthorized,
  updateUser,
} from "../../store/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useCheckIsAuthorized = () => {
  const dispatch = useAppDispatch();

  const fetchUser = async () => {
    try {
      async function getUser() {
        const { data } = await axiosInstance.get(AUTH_ENDPOINTS.CheckToken);
        return data;
      }

      const res = await getUser();

      // console.log(res.artist?.commercilization?.artProvider);

      dispatch(setIsArtProvider(res.artist?.commercilization?.artProvider));
      dispatch(updateUser(res.artist));
      dispatch(setIsAuthorized(true));

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
