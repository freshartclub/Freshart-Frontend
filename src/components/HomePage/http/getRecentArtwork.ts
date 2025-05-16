import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";
import { useAppSelector } from "../../../store/typedReduxHooks";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.GetRecentArtworks}`);
  return data.data;
}

export const useGetRecentArtwork = () => {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetRecentArtworks],
    queryFn: fetchData,
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
  });
};
