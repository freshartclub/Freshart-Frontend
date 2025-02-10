import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../http/apiEndPoints/Orders";

export const useGetOrderDetails = (values) => {
  async function fetchData(values) {
    const { data } = await axiosInstance.get(
      `${ORDERS_ENDPOINTS.GetOrderDetails}/${values.orderId}?orderType=${values.orderType}&artworkId=${values.art}`
    );
    return data;
  }
  
  return useQuery({
    queryKey: ["order-single"],
    queryFn: () => fetchData(values),
    refetchOnWindowFocus: false,
  });
};
