import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { generalPath } from "../../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getTechnic}`);
  return data;
}

export const useGetTechnic = () => {
  return useQuery({
    queryKey: [generalPath.getTechnic],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
