import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.getFullList}`);
  return data.data;
}

export const useGetFullList = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getFullList],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
