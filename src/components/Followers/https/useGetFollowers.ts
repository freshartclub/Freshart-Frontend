import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

export const useGetFollowers = (id: string) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${CIRCLE_ENDPOINTS.GetFollowers}/${id}`
    );
    return data;
  }

  return useQuery({
    queryKey: [CIRCLE_ENDPOINTS.GetFollowers, id],
    queryFn: fetchData,
  });
};
