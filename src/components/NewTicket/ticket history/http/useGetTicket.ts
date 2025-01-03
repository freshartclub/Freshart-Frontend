import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

export const useGetTicket = () => {
  const value = true;
  let url = `${ARTTIST_ENDPOINTS.GetArtistTickets}`;

  async function fetchData() {
    const { data } = await axiosInstance.get(url);
    return data.data;
  }
  return useQuery({
    queryKey: ["like"],
    queryFn: () => fetchData(),
  });
};
