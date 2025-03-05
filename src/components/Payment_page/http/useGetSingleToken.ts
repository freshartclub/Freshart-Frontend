import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
async function fetchData() {
  const { data } = await axiosInstance.get(ORDERS_ENDPOINTS.getToken);
  return data.data;
}

export const useGetSingleToken = () => {
  return useQuery({
    queryKey: [ORDERS_ENDPOINTS.getToken],
    queryFn: fetchData,
    enabled: false,
  });
};
