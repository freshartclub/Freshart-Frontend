import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtSeries}/${id}`
  );

  return data;
}

export const useGetArtSeries = (id) => {
  let url = `${ARTTIST_ENDPOINTS.GetArtSeries}`;
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(id),
    enabled: true,
  });
};
