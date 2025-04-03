import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetInviteFullData = () => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      ARTTIST_ENDPOINTS.GetInviteFullData
    );
    return data.data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetInviteData],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
