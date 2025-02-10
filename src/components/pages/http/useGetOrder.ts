import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

async function fetchData() {
  const { data } = await axiosInstance.get(
    `${ORDERS_ENDPOINTS.GetCheckoutOrders}`
  );
  return data?.data;
}

export const useGetOrder = () => {
  return useQuery({
    queryKey: ["noKey"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
