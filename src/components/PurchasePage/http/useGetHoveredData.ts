import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";
import { ARTIST_BASE_URl } from "../../utils/baseUrls";

async function fetchData(value) {
  console.log(value);
  const { data } = await axiosInstance.get(`${ARTIST_BASE_URl}/get-hover-data`);
  return data;
}

export const useGetHoveredData = (value) => {
  return useQuery({
    queryKey: [`${ARTIST_BASE_URl}/get-hover-data`],
    queryFn: () => fetchData(value),
    refetchOnWindowFocus: false,
  });
};
