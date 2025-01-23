import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getPickList}`);
  return data;
}

export const useGetSocialMediaPicklist = () => {
  return useQuery({
    queryKey: [generalPath.getPickList],
    queryFn: fetchData,
  });
};
