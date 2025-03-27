import { useQuery } from "@tanstack/react-query";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";
import axiosInstance from "../../../utils/axios";

async function fetchData(id: string) {
  if (!id) return {};
  const { data } = await axiosInstance.get(
    `${ORDERS_ENDPOINTS.GetArtistOrderDetails}/${id}`
  );
  return data.data;
}

export const useGetOrderDetails = (id: string) => {
  return useQuery({
    queryKey: [ORDERS_ENDPOINTS.GetArtistOrderDetails],
    queryFn: () => fetchData(id),
    refetchOnWindowFocus: false,
  });
};
