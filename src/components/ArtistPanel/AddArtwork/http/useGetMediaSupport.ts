import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { generalPath } from "../../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getMediaSupport}`);
  return data;
}

export const useGetMediaSupport = () => {
  let url = `${generalPath.getMediaSupport}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
