import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const { data } = await axiosInstance.get(
    `${CIRCLE_ENDPOINTS.GetCircleComments}/${id}`
  );
  return data;
}

export const useGetComments = (id) => {
  return useQuery({
    queryKey: ["CreateCirclePostComment", id],
    queryFn: () => fetchData(id),
  });
};
