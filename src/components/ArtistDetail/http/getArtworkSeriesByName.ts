import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const getArtworkSeriesByName = (id: string) => {
  async function fetchData() {
   const { data } = await axiosInstance.get(
  `${ARTTIST_ENDPOINTS.GetArtWorkBySeriesName}/${encodeURIComponent(id)}`
);

    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtWorkBySeries],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
