import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

async function fetchData() {
  const data = await axiosInstance.get(`${ARTTIST_ENDPOINTS.GetArtistDetials}`);

  return data;
}

export const useGetArtistDetails = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtistDetials],
    queryFn: fetchData,
  });
};
