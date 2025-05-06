import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetArtistDetails = (values) => {
  const fetchData = async () => {
    const url = values?.userId
      ? `${ARTTIST_ENDPOINTS.GetSingleArtistDetials}/${values?.id}?userId=${values?.userId}`
      : `${ARTTIST_ENDPOINTS.GetSingleArtistDetials}/${values?.id}`;

    const response = await axiosInstance.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetSingleArtistDetials, values],
    queryFn: fetchData,
    
    refetchOnWindowFocus: false,
  });
};
