import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const data = await axiosInstance.get(`${ARTTIST_ENDPOINTS.GetArtistDetials}`);
  console.log("data is ", data);
  return data;
}

export const useGetArtistDetails = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetArtistDetials],
    queryFn: fetchData,
  });
};
