const getTicketDetail = async () => {
  try {
    const response = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetArtistTicketsDetails}/${id}`
    );
    setTicket(response.data);
  } catch (error) {
    console.error("Error fetching ticket:", error);
  }
};

import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";
import axiosInstance from "../../../utils/axios";

export const useGetTicketDetails = (id) => {
  let url = `${ARTTIST_ENDPOINTS.GetArtistTicketsDetails}`;

  async function fetchData(id) {
    const { data } = await axiosInstance.get(`${url}/${id}`);
    return data;
  }
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(id),
  });
};
