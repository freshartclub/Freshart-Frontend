import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetFavoriteList = (type: string) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.getFavoriteList}?type=${type}`
    );
    return data.data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getFavoriteList],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
