import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtWorkBySeries}/${id}`
  );
  return data;
}

export const useGetArtWorkBySeries = (id) => {
  return useQuery({
    queryKey: ["SeriesArtwork"],
    queryFn: () => fetchData(id),
  });
};
