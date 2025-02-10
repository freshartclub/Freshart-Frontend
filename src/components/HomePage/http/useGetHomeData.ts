import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetHomeData = () => {
  async function fetchData() {
    const { data } = await axiosInstance.get(ARTTIST_ENDPOINTS.GetHomeData);
    return data;
  }

  return useQuery({
    queryKey: ["Home Data"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
