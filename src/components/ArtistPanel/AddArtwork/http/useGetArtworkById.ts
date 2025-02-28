import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

export const useGetArtWorkById = (id: string, preview) => {
  async function fetchData() {
    if (id === null) return;
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}?preview=${preview}`
    );

    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtWorkListById, id, preview],
    queryFn: fetchData,
  });
};
