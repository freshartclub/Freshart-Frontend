import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { generalPath } from "../../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getTheme}`);
  return data;
}

export const useGetTheme = () => {
  let url = `${generalPath.getTheme}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
