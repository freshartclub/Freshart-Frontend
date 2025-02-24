import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const { data } = await axiosInstance.get(
    `${CIRCLE_ENDPOINTS.GetLiked}/${id}`
  );
  return data;
}

export const useGetLikes = (id) => {
  return useQuery({
    queryKey: ["LikeCirclePost", id],
    queryFn: () => fetchData(id),
  });
};
