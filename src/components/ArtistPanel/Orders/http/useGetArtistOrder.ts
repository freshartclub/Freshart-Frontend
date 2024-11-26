import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ORDERS_ENDPOINTS } from "../../../../http/apiEndPoints/Orders";

async function fetchData() {
  const { data } = await axiosInstance.get(
    `${ORDERS_ENDPOINTS.GetArtistOrder}`
  );

  return [...data?.purchase, ...data?.subscription];
}

export const useGetArtistOrder = () => {
  return useQuery({
    queryKey: ["getorder"],
    queryFn: fetchData,
  });
};
