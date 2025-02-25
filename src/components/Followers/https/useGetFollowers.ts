import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

async function fetchData(id) {
  const { data } = await axiosInstance.get(
    `${CIRCLE_ENDPOINTS.GetFollowers}/${id}`
  );
  return data;
}

export const useGetFollowers = (id) => {
  return useQuery({
    queryKey: [],
    queryFn: () => fetchData(id),
  });
};
