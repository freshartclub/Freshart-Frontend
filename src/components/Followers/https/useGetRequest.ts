import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

export const useGetRequest = (id: string) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${CIRCLE_ENDPOINTS.FollowRequests}/${id}`
    );
    return data;
  }

  return useQuery({
    queryKey: [CIRCLE_ENDPOINTS.FollowRequests, id],
    queryFn: fetchData,
  });
};
