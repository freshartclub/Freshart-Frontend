import { useQuery } from "@tanstack/react-query";

import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

export const useGetComments = (id: string) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${CIRCLE_ENDPOINTS.GetCircleComments}/${id}`
    );
    return data;
  }

  return useQuery({
    queryKey: [CIRCLE_ENDPOINTS.GetCircleComments, id],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
