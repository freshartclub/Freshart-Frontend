import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData() {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtWorkList}`
  );
  return data;
}

export const useGetArtWorkList = () => {
  return useQuery({
    queryKey: ["Name"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
