import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getRootPageData}`);
  return data;
}

export const useGetRootPageData = () => {
  return useQuery({
    queryKey: [generalPath.getRootPageData],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
