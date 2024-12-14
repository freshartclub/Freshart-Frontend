import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { generalPath } from "../../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getArtworkStyle}`);
  return data;
}

export const useGetArtWorkStyle = () => {
  let url = `${generalPath.getArtworkStyle}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
