import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.GetRecentArtworks}`);

  return data;
}

export const useGetRecentArtwork = () => {
  let url = `${ARTTIST_ENDPOINTS.GetRecentArtworks}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
