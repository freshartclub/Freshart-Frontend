import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const { data } = await axiosInstance.get(
    `${CIRCLE_ENDPOINTS.GetCirclePosts}/${id}`
  );
  return data;
}

export const useGetCirclePosts = (id) => {
  return useQuery({
    queryKey: ["CreateCirclePost"],
    queryFn: () => fetchData(id),
  });
};
