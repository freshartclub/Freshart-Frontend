import { useQuery } from "@tanstack/react-query";
import { CIRCLE_ENDPOINTS } from "../../../http/apiEndPoints/Circle";
import axiosInstance from "../../utils/axios";

export const useGetCirclePosts = (id: string) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${CIRCLE_ENDPOINTS.GetCirclePosts}/${id}`
    );
    return data;
  }

  return useQuery({
    queryKey: [CIRCLE_ENDPOINTS.GetCirclePosts, id],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
