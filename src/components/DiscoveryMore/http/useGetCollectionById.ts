import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetCollectionById = (id: string) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.useGetCollectionById}/${id}`
    );

    return data.data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.useGetCollectionById],
    queryFn: fetchData,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
