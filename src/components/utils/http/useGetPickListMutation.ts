import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { generalPath } from "../paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getPickList}`);
  return data.data;
}

export const useGetPickListMutation = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
