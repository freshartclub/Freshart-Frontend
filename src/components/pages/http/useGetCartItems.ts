import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetCartItems = () => {
  async function fetchData() {
    const { data } = await axiosInstance.get(ARTTIST_ENDPOINTS.cartItems);
    return data;
  }
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.cartItems],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
