import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import { useSearchParams } from "react-router-dom";

async function fetchData(id, preview) {
  if (id === null) return {};
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}?preview=${preview}`
  );
  return data;
}

export const useGetArtWorkById = (id, preview) => {
  let url = `${ARTTIST_ENDPOINTS.GetArtWorkListById}/${id}?preview=${preview}`;
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(id, preview),
  });
};
