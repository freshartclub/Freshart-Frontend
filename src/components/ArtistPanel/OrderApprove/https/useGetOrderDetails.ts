import { useQuery } from "@tanstack/react-query";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";
import axiosInstance from "../../../utils/axios";

export const useGetOrderDetails = (id) => {
  const url = `${ORDERS_ENDPOINTS.GetArtistOrderDetails}`;

  async function fetchData(id) {
    const { data } = await axiosInstance.get(`${url}/${id}`);
    return data;
  }

  return useQuery({
    queryKey: ["acceptOrder"],
    queryFn: () => fetchData(id),
  });
};
