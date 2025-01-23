import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData(id) {
  const { data } = await axiosInstance.get(`${generalPath.getKbDetails}/${id}`);
  return data;
}

export const useGetKbDetails = (id) => {
  return useQuery({
    queryKey: [generalPath.getKbDetails],
    queryFn: () => fetchData(id),
  });
};
