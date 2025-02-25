import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const { data } = await axiosInstance.get(
    `${CIRCLE_ENDPOINTS.FollowRequests}/${id}`
  );
  return data;
}

export const useGetRequest = (id) => {
  return useQuery({
    queryKey: ["FollowCircleRequest"],
    queryFn: () => fetchData(id),
  });
};
