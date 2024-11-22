import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../utils/axios";
import { generalPath } from "../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getPickList}`);
  return data;
}

export const useGetPicklist = () => {
  let url = `${generalPath.getPickList}`;
  return useQuery({
    // remember query key it is using same same
    queryKey: [url],
    queryFn: fetchData,
  });
};
