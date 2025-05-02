import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";



export const useGetArtistDashboard = () => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.getArtistDashboard}`
    );
    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getArtistDashboard],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
