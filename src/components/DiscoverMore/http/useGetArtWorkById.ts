import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function fetchData(id, preview) {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}?preview=${preview}`
  );

  return data;
}

export const useGetArtWorkById = (id, preview) => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtWorkListById, id, preview],
    queryFn: () => fetchData(id, preview),
    refetchOnWindowFocus: false,
  });
};
