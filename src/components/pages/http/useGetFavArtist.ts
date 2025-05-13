import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.getFavArtist}`);
  return data.data;
}

export const useGetFavArtist = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getFavArtist],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
