import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetWishList = () => {
  let url = `${ARTTIST_ENDPOINTS.getWishList}`;

  async function fetchData() {
    const { data } = await axiosInstance.get(url);
    return data;
  }

  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
