import { useQuery } from "@tanstack/react-query";

import { ARTTIST_ENDPOINTS } from "../../../http/apiEndPoints/Artist";
import axiosInstance from "../../utils/axios";

async function fetchData(setArtwork) {
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.GetArtWorkList}`
  );
  console.log("data is ", data);
  setArtwork(data);
  return data;
}

export const useGetArtWorkList = (setArtwork) => {
  return useQuery({
    queryKey: ["Name"],
    queryFn: () => fetchData(setArtwork),
  });
};
