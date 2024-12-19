import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

export const useGetActiveIncidents = () => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetAllIncidents}`
    );
    return data.data;
  }

  return useQuery({
    queryKey: ["artistTickets"],
    queryFn: fetchData,
  });
};
