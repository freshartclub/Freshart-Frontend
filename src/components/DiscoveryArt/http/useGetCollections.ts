import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function fetchData() {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.getAllCollections}`
  );

  return data.data;
}

export const useGetCollections = () => {
  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.getAllCollections],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
