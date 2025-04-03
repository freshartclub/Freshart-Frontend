import { useQuery } from "@tanstack/react-query";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(ORDERS_ENDPOINTS.checkRef);
  return data;
}

export const useCheckUserRef = () => {
  return useQuery({
    queryKey: [ORDERS_ENDPOINTS.checkRef],
    queryFn: () => fetchData(),
    refetchOnWindowFocus: false,
  });
};
