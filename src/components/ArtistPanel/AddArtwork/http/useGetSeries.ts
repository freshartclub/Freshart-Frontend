import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";

import { ARTTIST_ENDPOINTS } from "../../../../http/apiEndPoints/Artist";

async function fetchData(userID) {
  if (!userID) return;
  const { data } = await axiosInstance.get(
    `${ARTTIST_ENDPOINTS.getSeries}/${userID}`
  );

  console.log("this is from seris", data);
  return data;
}

export const useGetSeries = (userID) => {
  let url = `${ARTTIST_ENDPOINTS.getSeries}`;
  return useQuery({
    queryKey: ["GetSeries"],
    queryFn: () => fetchData(userID),
  });
};
