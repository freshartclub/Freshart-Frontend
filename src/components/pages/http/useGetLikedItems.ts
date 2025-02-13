import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function fetchData() {
  const { data } = await axiosInstance.get(ARTTIST_ENDPOINTS.GetLikedArtWork);
  return data.data;
}

export const useGetLikedItems = () => {
  const token = localStorage.getItem("auth_token");

  if (token === null) {
    return {};
  }

  return useQuery({
    queryKey: [ARTTIST_ENDPOINTS.GetLikedArtWork],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
