import { useQuery } from "@tanstack/react-query";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ORDERS_ENDPOINTS.getPlans}`);
  return data.data;
}

export const useGetPlans = () => {
  return useQuery({
    queryKey: [ORDERS_ENDPOINTS.getPlans],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
