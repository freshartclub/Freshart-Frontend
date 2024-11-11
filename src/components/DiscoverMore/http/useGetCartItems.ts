import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetCartItems = () => {
  let url = `${ARTTIST_ENDPOINTS.cartItems}`;

  async function fetchData() {
    const { data } = await axiosInstance.get(url);
    return data;
  }

  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
