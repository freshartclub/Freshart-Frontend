import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetArtVisulaization = (userId) => {
  async function fetchData(userId) {
    if (userId) {
      const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.getVisualizationImages}/${userId}`);
      return data;
    } else {
      const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.getVisualizationImages}`);
      return data;
    }
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getVisualizationImages],
    queryFn: () => fetchData(userId),
    refetchOnWindowFocus: false,
  });
};
