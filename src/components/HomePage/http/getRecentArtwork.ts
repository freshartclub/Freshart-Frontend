import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.GetRecentArtworks}`);
  return data.data;
}

export const useGetRecentArtwork = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetRecentArtworks],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
