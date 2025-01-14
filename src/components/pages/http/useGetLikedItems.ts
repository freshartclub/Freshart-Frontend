import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";

async function fetchData() {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetLikedArtWork}`
  );
  return data;
}

export const useGetLikedItems = () => {
  let url = `${ARTTIST_ENDPOINTS.GetLikedArtWork}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
