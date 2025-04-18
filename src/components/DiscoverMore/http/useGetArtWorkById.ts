import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetArtWorkById = (id, preview, comingFrom) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}?preview=${preview}&viewType=${comingFrom}`
    );

    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtWorkListById, id, preview],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
