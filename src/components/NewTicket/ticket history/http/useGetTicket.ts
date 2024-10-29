import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtistTickets}`
  );
  console.log("data is ", data);
  return data.data;
}

export const useGetTicket = () => {
  return useQuery({
    queryKey: ["artistTickets"],
    queryFn: fetchData,
  });
};
