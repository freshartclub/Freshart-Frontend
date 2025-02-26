import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(`${CIRCLE_ENDPOINTS.GetCircleList}`);
  return data;
}

export const useGetAllCircleList = () => {
  return useQuery({
    queryKey: ["FollowCircleRequest"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
