import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

export const useGenerateHash = (
  time: string,
  merchantId: string,
  orderId: string,
  amount: string,
  currency: string
) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ORDERS_ENDPOINTS.getHash}?time=${time}&merchantId=${merchantId}&orderId=${orderId}&amount=${amount}&currency=${currency}`
    );

    return data.data;
  }

  return useQuery({
    queryKey: [ORDERS_ENDPOINTS.getHash],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
