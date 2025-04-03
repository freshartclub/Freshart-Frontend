import { useQuery } from "@tanstack/react-query";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(ORDERS_ENDPOINTS.GetKey);
  return data.data;
}

export const useGetKey = () => {
  return useQuery({
    queryKey: [ORDERS_ENDPOINTS.GetKey],
    queryFn: () => fetchData(),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
