import { useQuery } from "@tanstack/react-query";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(`${CIRCLE_ENDPOINTS.GetCircle}`);
  return data;
}

export const useGetCircle = () => {
  return useQuery({
    queryKey: [CIRCLE_ENDPOINTS.GetCircle],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
