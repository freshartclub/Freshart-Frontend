import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTTIST_ENDPOINTS.GetAllArtist}`);

  return data;
}

export const useGetAllArtist = () => {
  let url = `${ARTTIST_ENDPOINTS.GetAllArtist}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
