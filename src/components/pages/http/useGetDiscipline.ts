import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getDiscipline}`);
  console.log("data is ", data);
  return data;
}

export const useGetDiscipline = () => {
  let url = `${generalPath.getDiscipline}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
