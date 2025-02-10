import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getDiscipline}`);
  return data;
}

export const useGetDiscipline = () => {
  return useQuery({
    queryKey: [generalPath.getDiscipline],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });
};
