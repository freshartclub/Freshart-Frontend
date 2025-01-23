import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getFaq}`);
  return data;
}

export const useGetFaq = () => {
  return useQuery({
    queryKey: [generalPath.getFaq],
    queryFn: fetchData,
  });
};
