import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

export const useGetOffersList = () => {
  async function fetchData() {
    const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.getArtistOfferList}`);
    return data.data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getArtistOfferList],
    queryFn: fetchData,
  });
};
