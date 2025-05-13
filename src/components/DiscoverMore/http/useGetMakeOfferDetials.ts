import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetMakeOfferDetials = (id) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.getOffer}/${id}`
    );
    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getOffer, id], // key includes id
    queryFn: fetchData,
    enabled: !!id, // only run query if id exists
    refetchOnWindowFocus: false,
  });
};
