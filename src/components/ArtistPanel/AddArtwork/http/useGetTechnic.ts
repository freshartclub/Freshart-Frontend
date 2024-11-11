import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { generalPath } from "../../../utils/paths";

async function fetchData() {
  const { data } = await axiosInstance.get(`${generalPath.getTechnic}`);
  console.log("data is ", data);
  return data;
}

export const useGetTechnic = () => {
  let url = `${generalPath.getTechnic}`;
  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};
