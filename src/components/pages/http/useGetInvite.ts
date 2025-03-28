import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetInvite = (invite: string) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.GetInviteData}?invite=${invite}`
    );
    return data.data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetInviteData, invite],
    queryFn: fetchData,
    enabled: !!invite,
    refetchOnWindowFocus: false,
  });
};
