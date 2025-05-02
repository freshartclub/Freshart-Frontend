import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";



export const useGetUserOfferList = () => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.getUserOfferList}`
    );
    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getUserOfferList],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
