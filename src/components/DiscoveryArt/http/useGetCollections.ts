import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

export const useGetCollections = (search: string, currPage: number) => {
  async function fetchData() {
    const { data } = await axiosInstance.get(
      `${ARTTIST_ENDPOINTS.getAllCollections}?s=${search}&currPage=${currPage}`
    );

    return data;
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getAllCollections, search, currPage],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
