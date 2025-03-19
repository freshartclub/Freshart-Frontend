import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetArtistDetails = (id: string) => {
  async function fetchData() {
    const data = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetSingleArtistDetials}/${id}`
    );

    return data.data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetSingleArtistDetials, id],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
