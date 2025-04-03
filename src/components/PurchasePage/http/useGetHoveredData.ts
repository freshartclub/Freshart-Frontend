import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { ARTIST_BASE_URl } from "../../utils/baseUrls";

async function fetchData() {
  const { data } = await axiosInstance.get(`${ARTIST_BASE_URl}/get-hover-data`);
  return data;
}

export const useGetHoveredData = () => {
  return useQuery({
    queryKey: [`${ARTIST_BASE_URl}/get-hover-data`],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
