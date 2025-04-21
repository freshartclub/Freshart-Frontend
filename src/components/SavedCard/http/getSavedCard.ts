import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.getCard}`);
  return data.data;
}

export const useGetCardDetails = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getCard],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
