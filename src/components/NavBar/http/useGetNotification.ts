import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function fetchData() {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetNotifications}`
  );
  return data;
}

export const useGetNotification = () => {
  return useQuery({
    queryKey: [`${ARTTIST_ENDPOINTS.GetNotifications}`],
    queryFn: fetchData,
  });
};
