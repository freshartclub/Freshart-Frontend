import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const data = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetSingleArtistDetials}/${id}`
  );

  return data.data;
}

export const useGetArtistDetails = (id) => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetSingleArtistDetials, id],
    queryFn: () => fetchData(id),
  });
};
