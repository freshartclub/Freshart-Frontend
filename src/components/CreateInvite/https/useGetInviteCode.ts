import { useQuery } from "@tanstack/react-query";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

export const useGetInviteCode = (isGnerated) => {
  async function getInviteCode() {
    const { data } = await axiosInstance.get(ARTTIST_ENDPOINTS.GetInviteCode);
    return data.data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetInviteCode, isGnerated],
    queryFn: () => getInviteCode(),
    enabled: isGnerated,
    refetchOnWindowFocus: false,
  });
};
