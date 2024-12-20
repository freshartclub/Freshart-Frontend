import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getStyle}`);
  return data;
}

export const useGetStyle = () => {
  let url = `${generalPath.getStyle}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
