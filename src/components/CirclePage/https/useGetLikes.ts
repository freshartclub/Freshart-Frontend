import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

export const useGetLikes = (id: string) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${CIRCLE_ENDPOINTS.GetLiked}/${id}`
    );
    return data;
  }

  return useQuery({
    queryKey: ["LikeCirclePost", id],
    queryFn: fetchData,
  });
};
