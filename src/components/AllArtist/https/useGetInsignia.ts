import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.getInsignia}`);
  return data.data;
}

export const useGetInsignia = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getInsignia],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
