import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

async function fetchData() {
  try {
    const response = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetArtistTicketsDetails}/${id}`
    );
    setTicket(response.data);
  } catch (error) {
    console.error("Error fetching ticket:", error);
  }
}

export const useGetTicket = () => {
  return useQuery({
    queryKey: ["artistTickets"],
    queryFn: fetchData,
  });
};
