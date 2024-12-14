import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getKbDataBase}`);
  return data;
}

export const useGetKbDataBase = () => {
  let url = `${generalPath.getKbDataBase}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
