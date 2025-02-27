import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

async function fetchData() {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetBillingAddress}`
  );

  return data.data;
}

export const useGetBillingAddress = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetBillingAddress],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
